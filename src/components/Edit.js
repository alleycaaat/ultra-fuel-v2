import { useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';


const Edit = ({ data, setMessage, savebtn, setEdit }) => {

    const { water, time, food, id, tailwindQty, hour, servings } = data[0];
    const servArr = servings === [] ? [''] : [...servings];
    const foodArr = food === [] ? [''] : [...food];

    const [finalFoods, setFinalFoods] = useState(foodArr);
    const waterDup = parseInt(water);
    const twDup = parseInt(tailwindQty);

    const [foodList, setFoodList] = useState(foodArr);
    const [waterAmt, setWaterAmt] = useState(waterDup);
    const [tailwind, setTailwind] = useState(twDup);
    const [servAmt, setServAmt] = useState(servArr);

    //compare food and serving arrays
    const matching = (a, b) => {
        for (let el in a) {
            return a[el] === b[el];
        }
    };

    const handleSave = () => {
        //verify something changes
        if (matching(food, finalFoods) && matching(servings, servAmt)) {
            if (water === waterAmt && tailwind === tailwindQty) {
                setMessage('No changes to save');
                return;
            }
        } else {
            savebtn(finalFoods, servAmt, waterAmt, tailwind);
        }
    };

    const handleCancel = () => {
        setEdit(false);
    };

    const handleWater = () => {
        if (waterAmt >= 0) {
            setWaterAmt(prevVal => prevVal - 25);
        }
    };
    const handleTW = () => {
        if (tailwind >= 25) {
            setTailwind(prevVal => prevVal - 25);
        }
    };
    const handleServings = (name, value) => {
        let newVal = value - 1;
        if (newVal === 0) {
            let removeFood = finalFoods.filter((food) =>
                food !== foodList[name]);
            setFinalFoods(removeFood);
        }
        const deduct = servAmt.map((value, i) => {
            if (i === name && value !== 0) {
                return newVal;
            } else {
                return value;
            }
        });
        setServAmt(deduct);
    };

    return (
        <>
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
                                <button onClick={() => handleTW}
                                    aria-label='subtract 100ml Tailwind'>
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
        </>
    );
};

export default Edit;
