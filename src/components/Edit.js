import { useContext, useState } from 'react';
import { HourContext } from '../store/hour-context';
import { SaveEdits } from '../util/SaveEdits';

import { FaMinusCircle } from 'react-icons/fa';

const Edit = ({ setMessage, setActive }) => {
    const { addToHour, key, keys, hour, setHour, fuel } = useContext(HourContext);

    const { water, time, food, id, tailwindQty, servings } = hour;
    const servArr = servings === [] ? [''] : [...servings];
    const foodArr = food === [] ? [''] : [...food];

    const [finalFoods, setFinalFoods] = useState(foodArr);  //new food list to save

    const waterDup = parseInt(water);
    const twDup = parseInt(tailwindQty);

    // eslint-disable-next-line
    const [foodList, setFoodList] = useState(foodArr);  //displayed foods
    const [servAmt, setServAmt] = useState(servArr);
    const [waterAmt, setWaterAmt] = useState(waterDup);
    const [tailwind, setTailwind] = useState(twDup);
    const [anyChanges, setAnyChanges] = useState(false);

    const handleSave = () => {
        if (!anyChanges) {
            setMessage('No changes to save');
            return;
        }
        if (anyChanges) {
            let tailwindQty = tailwind,
                id = keys[key],
                save = SaveEdits({ id, finalFoods, servAmt, waterAmt, tailwindQty, fuel, hour });
            addToHour(id, save);
            setHour(save);
            setActive('Chart');
        }
    };

    const handleCancel = () => {
        setActive('Chart');
    };
    const handleWater = () => {
        if (waterAmt >= 0) {
            setAnyChanges(true);
            setWaterAmt(prevVal => prevVal - 25);
        }
    };
    const handleTW = () => {
        if (tailwind >= 25) {
            setAnyChanges(true);
            setTailwind(prevVal => prevVal - 25);
        }
    };
    const handleServings = (name, value) => {
        if (value === 0) {
            setMessage('Nothing to remove');
            return;
        }

        let newVal = parseInt(value) - 1,
            removeFood = finalFoods.filter((food) =>
                food !== foodList[name]),
            servAmtCopy = [...servAmt];

        switch (true) {
            case (value === 0):
                setMessage('Nothing to remove');
                break;
            case (newVal === 0):
                setFinalFoods(removeFood);
                servAmtCopy[name] = 0;
                setServAmt(servAmtCopy);
                break;
            default: //if value !== 0
                servAmtCopy[name] = newVal;
                setServAmt(servAmtCopy);
                break;
        }
        setAnyChanges(true);
    };

    return (
        <div className='chart'>
            <div className='edit'>
                <div className='top-row'>{time}</div>
                <div className='row'>
                    <div className='block'>
                        <h2>Water</h2>
                        {waterAmt > 0 ? (
                            <span>
                                {waterAmt} ml
                                <button
                                    onClick={handleWater} aria-label='subtract 25ml water'>
                                    <FaMinusCircle aria-hidden='true' />
                                </button>
                            </span>
                        ) : (
                            <p> {waterAmt} ml </p>
                        )}
                    </div>
                    <div className='block'>
                        <h2>Tailwind</h2>
                        {tailwind > 0 ? (
                            <span>
                                {tailwind} ml
                                <button onClick={handleTW}
                                    aria-label='subtract 25ml Tailwind'>
                                    <FaMinusCircle aria-hidden='true' />
                                </button>
                            </span>
                        ) : (
                            <p> {tailwind} ml </p>
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='food-edit'>
                        <h2>Food</h2>
                        <ul>
                            {foodList.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='food-edit'>
                        <h2>Servings</h2>
                        {servings === 0 ? (
                            ['']
                        ) : (
                            <ul>
                                {servAmt.map((servs, i) => (
                                    <li key={i}>
                                        {servs}
                                        <button
                                            name={i}
                                            id={foodList[i]}
                                            value={servs}
                                            aria-label='remove 1 serving'
                                            onClick={() => handleServings(i, servs)}
                                        >
                                            <FaMinusCircle aria-hidden='true' />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='block buttons'>
                        <button value={id} onClick={() => handleSave()}>
                            Save
                        </button>
                        <button onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
