import { useContext, useEffect, useState } from 'react';

import { HourContext } from '../store/hour-context';
import { FuelContext } from '../store/fuel-context';

import { SelectFuel, SelectML, SelectServings, SelectTime } from './addFuel/Select';
import { edit, getFuel, gethours } from '../util/api';
import { GetItemId } from '../util/GetItemId';
import { Constants } from '../constants/Constants';
import { BlockServ } from './charts/Blocks';

import WaterHandler from '../util/WaterHandler';
import TailwindHandler from '../util/TailwindHandler';
import FoodHandler from '../util/FoodHandler';
import Chart from './charts/Chart';

const AddFuel = ({ setLoading, setMessage }) => {

    const { fuel, setFuel } = useContext(FuelContext);
    const { hours, setHours, addToHour } = useContext(HourContext);

    const qty = [' ', 1, 2, 3, 4, 5];

    const [keys, setKeys] = useState();
    const [hourly, setHourly] = useState();
    const [foodNutri, setFoodNutri] = useState({});
    const [servSize, setServSize] = useState('');
    const [savedData, setSavedData] = useState();
    const [fuelConsumed, setFuelConsumed] = useState({
        time: 0,
        food: '',
        servings: 0,
        water: '0',
        tailwind: '0',
    });
    const { time, food, servings, water, tailwind } = fuelConsumed;

    let h20 = Constants.h20,
        times = Constants.times,
        tailwindserv = Constants.tailwindserv,
        newWater,
        newTw,
        newFood;

    const loadHours = async () => {
        await gethours()
            .then((data) => {
                let hours = [];
                let hourKey = [];

                data.map((hour, i) => {
                    const key = GetItemId(hour);
                    hourKey.push(key);
                    return hourKey;
                });
                setKeys(hourKey);
                data.map((hour, i) => {
                    hours.push(data[i].data);
                    return hours;
                });
                /*
                .then((data) => {
                    let hours = [];
                    data.map((hour, i) => {
                        const key = GetItemId(hour);
                        hours.push({
                            id: key,
                            calcium: hour.data.calcium,
                            calories: hour.data.calories,
                            food: hour.data.food,
                            hour: hour.data.hour,
                            magnesium: hour.data.magnesium,
                            potassium: hour.data.potassium,
                            protein: hour.data.protein,
                            servings: hour.data.servings,
                            sodium: hour.data.sodium,
                            tailwindQty: hour.data.tailwindQty,
                            water: hour.data.water,
                        });
                        return hours;
                    });
                    */
                setHours(hours);
                setHourly(hours[0]);
            })
            .catch((err) => {
                console.log('loadHours API error', err);
            });
        setLoading(false);
    };
    const loadFood = async () => {
        await getFuel()
            .then((fuel) => {
                let fuelList = [];
                fuel.map((fuels, i) => {
                    fuelList.push(fuel[i].data);
                    return fuelList;
                });
                setFuel(fuelList);
            })
            .catch((err) => {
                console.log('loadFood API error', err);
            });
        loadHours();
    };

    useEffect(() => {
        loadFood();
    }, []);

    const getHourData = (hr) => {
        setHourly(hours[hr]);
    };

    const handleLog = (e) => {
        const { name, value } = e.target;
        if (name === 'time') {
            let hr = times.indexOf(value);
            getHourData(hr);
            setFuelConsumed({ ...fuelConsumed, time: hr });
            return;
        }
        setFuelConsumed({ ...fuelConsumed, [name]: value });
    };

    const handleFood = (e) => {
        const { value } = e.target;
        var idx = fuel.filter((obj) => {
            return obj.name.includes(value);
        });
        //if food is unselected, remove the serving size
        if (value === '') {
            setFuelConsumed({ ...fuelConsumed, food: '' });
            setFoodNutri({});
            setServSize('');
            return;
        }
        setFoodNutri(idx[0]);
        setServSize(idx[0].serving);
        setFuelConsumed({ ...fuelConsumed, food: value });
    };

    //save button
    const handleSave = (e) => {
        e.preventDefault();
        if (food === '' && water === 0 && tailwind === 0) {
            setMessage('Nothing to save');
            return;
        }

        if (food !== '' && servings === 0) {
            setMessage('Servings required');
            return;
        }

        const isEmpty = (val) => val === '0' || val === '';

        let twdata = {
            currTw: parseInt(hours[time].tailwindQty),
            amt: tailwindserv.indexOf(tailwind),
            data: hourly,
        },
            waterdata = {
                currWater: parseInt(hours[time].water),
                water: parseInt(water),
                data: hourly,
            },
            fooddata = {
                currFood: foodNutri,
                amt: servings,
                prevHour: hourly,
            };


        if (!isEmpty(water)) {
            newWater = WaterHandler(waterdata);
            setHourly(newWater);
        }

        switch (true) {
            case (!isEmpty(tailwind) && !isEmpty(food)):
                let data = TailwindHandler(twdata);
                fooddata = {
                    currFood: foodNutri,
                    amt: servings,
                    prevHour: data,
                };
                let updatedHour = FoodHandler(fooddata);
                setHourly(updatedHour);
                break;
            case (!isEmpty(tailwind)):
                newTw = TailwindHandler(twdata);
                setHourly(newTw);
                break;
            case (!isEmpty(food)):
                newFood = FoodHandler(fooddata);
                setHourly(newFood);
                break;
            default:
                setMessage('Nothing to save');
        }
        saveAndUpdate();
    };
    const saveAndUpdate = () => {
        let id = keys[time],
            contextSave = Object.assign({}, hourly),
            save = Object.assign({}, { time: times[time] }, contextSave);
        addToHour(time, contextSave);
        setSavedData([save]);
        edit(id, save);
    };
    return (
        <div className='chart'>
            {/*  MOBILE DISPLAY */}
            <div className='sm-AddFuel'>
                <fieldset>
                    <div className='drops'>
                        <SelectTime
                            name={time}
                            title='Time'
                            onChange={handleLog}
                            list={times}
                        />
                    </div>
                    <div className='drops'>
                        <SelectML
                            name={water}
                            title='Water'
                            onChange={handleLog}
                            list={h20}
                        />
                        <SelectML
                            name={tailwind}
                            title='Tailwind'
                            onChange={handleLog}
                            list={tailwindserv}
                        />
                    </div>
                    <div className='drops'>
                        <SelectFuel
                            forlabel='food'
                            name={food}
                            id={food}
                            title='Food'
                            onChange={handleFood}
                            list={fuel}
                        />
                        <SelectServings
                            name={servings}
                            title='Servings'
                            onChange={handleLog}
                            list={qty}
                            servSize={servSize}
                        />
                    </div>
                    <div className='drops'>
                        <BlockServ servSize={servSize} />
                    </div>
                </fieldset>
            </div>

            {/* LARGE SCREEN DISPLAY */}
            <div className='lg-AddFuel'>
                <fieldset>
                    <div className='drops'>
                        <SelectTime
                            name={time}
                            title='Time'
                            onChange={handleLog}
                            list={times}
                        />
                        <SelectML
                            name={water}
                            title='Water'
                            onChange={handleLog}
                            list={h20}
                        />
                        <SelectML
                            name={tailwind}
                            title='Tailwind'
                            onChange={handleLog}
                            list={tailwindserv}
                        />
                    </div>
                    <div className='drops'>
                        <SelectFuel
                            name={food}
                            title='Food'
                            onChange={handleFood}
                            list={fuel}
                        />
                        <BlockServ servSize={servSize} />
                        <SelectServings
                            name={servings}
                            title='Servings'
                            onChange={handleLog}
                            list={qty}
                            servSize={servSize}
                        />
                    </div>
                </fieldset>
            </div>

            <div className='last'>
                <button
                    className='save'
                    type='submit'
                    onClick={handleSave}
                >
                    Save Entry
                </button>
                {savedData !== undefined &&
                    (<Chart
                        data={savedData}
                        handleSave={handleSave}
                        id={keys[time]}
                    />)
                }
            </div>
        </div>
    );
};

export default AddFuel;
