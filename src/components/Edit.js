import { useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';

const Edit = ({
    time,
    water,
    food,
    hour,
    id,
    edit,
    savebtn,
    tailwind,
    servings,
    setEditing,
    setMessage,
}) => {
    const servDup = servings === 0 ? [''] : [...servings];
    const waterDup = parseInt(water);
    const twDup = parseInt(tailwind);
    const foodList = [...food];
    const [waterAmt, setWaterAmt] = useState(waterDup);
    const [twAmt, setTwAmt] = useState(twDup);
    const [servAmt, setServAmt] = useState(servDup);

    //compare food and serving arrays to see if they're different
    const matching = (a, b) => {
        for (let el in a) {
            return a[el] === b[el];
        }
    };
    const handleSave = () => {
        let changed = false,
            changedQty = [],
            orgServe = [];

        //verify something changes
        if (matching(foodList, food) && matching(servings, servAmt)) {
            if (water === waterAmt && tailwind === twAmt) {
                changed = false;
                setMessage('No changes to save');
                return;
            }
        } else {
            changed = true;
            //get the original servings as a array of numbers
            if (servings.length >= 2) {
                orgServe = servings.map((food) => parseInt(food));
                //get the amount each food decreased by
                changedQty = servings.map((num, i) => num - servAmt[i]);
            }

            //if the servings are one or zero
            else if (servings.length < 2) {
                orgServe = [parseInt(servings)];
                changedQty = [servings - servAmt];
            }
        }
        //save if changes occured
        if (changed) {
            changed = false;
            savebtn(orgServe, changedQty, foodList, hour, waterAmt, twAmt);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        edit(false);
    };

    const handleWater = () => {
        waterAmt === 0 ? setWaterAmt(0) : setWaterAmt(waterAmt - 100);
    };
    const handleTW = () => {
        twAmt === 0 ? setTwAmt(0) : setTwAmt(twAmt - 100);
    };

    const handleServings = (e) => {
        const { name, value } = e.currentTarget;

        //create a copy of the servings before edits are saved
        const copy = [...servAmt];

        //subtract one from the amount of servings for the food item
        copy[name] = value - 1;

        //have an option for saving if there will be no servings left
        const zero = [...servAmt];
        zero[name] = 0;

        //if there's still a serving left, set the new serving amt to the new value
        if (copy[name] > 0) {
            setServAmt(copy);
        } else {
            //otherwise set the new serving amount to zero
            setServAmt(zero);
        }
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
                                <button onClick={handleWater} aria-label='subtract 100ml water'>
                                    <FaMinusCircle aria-hidden='true'/>
                                </button>
                            </span>
                        ) : (
                            <p> {waterAmt} ml </p>
                        )}
                    </div>
                    <div className='block'>
                        <h2>Tailwind</h2>
                        {twAmt > 0 ? (
                            <span>
                                {twAmt} ml
                                <button onClick={handleTW} aria-label='subtract 100ml Tailwind'>
                                    <FaMinusCircle aria-hidden='true'/>
                                </button>
                            </span>
                        ) : (
                            <p> {twAmt} ml </p>
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
                                            value={servs}
                                            aria-label='remove 1 serving'
                                            onClick={(e) => handleServings(e)}
                                        >
                                            <FaMinusCircle aria-hidden='true'/>
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
