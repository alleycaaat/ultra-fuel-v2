import { useContext, useState } from 'react';
import { Constants } from '../../constants/Constants';
import { HourContext } from '../../store/hour-context';
import { SaveEdits } from '../../util/SaveEdits';

import { BlockML, BlockFood, BlockServings } from './Blocks';

const Edit = ({ setMessage, setActive }) => {
    const { addToHour, keys, hour, setHour, fuel } = useContext(HourContext);

    const { water, food, tailwindQty, servings } = hour;

    const servArr = servings === ([] || 0) ? [''] : [...servings];
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
    let times = Constants.times,
        time = times[hour.hour],
        id = keys[hour.hour];

    const handleSave = () => {
        if (!anyChanges) {
            setMessage('No changes to save');
            return;
        }
        if (anyChanges) {
            let tailwindQty = tailwind,
                save = SaveEdits({ id, finalFoods, servAmt, waterAmt, tailwindQty, fuel, hour });
            addToHour(hour.hour, save);
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
                    <BlockML
                        title='Water'
                        children={waterAmt}
                        onClick={handleWater}
                        aria='subtract 25ml water'
                    />
                    <BlockML
                        title='Tailwind'
                        children={tailwind}
                        onClick={handleTW}
                        aria='subtract 25ml Tailwind'
                    />
                </div>
                <div className='row'>
                    <BlockFood foodList={foodList} />
                    <BlockServings
                        servings={servings}
                        servAmt={servAmt}
                        foodList={foodList}
                        handleServings={handleServings}
                    />
                </div>
                <div className='row'>
                    <div className='block buttons'>
                        <button
                            value={id}
                            onClick={() => handleSave()}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
