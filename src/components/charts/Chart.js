import { useState } from 'react';
import Edit from '../Edit';

const Chart = ({
    time,
    hour,
    water,
    food,
    calories,
    calcium,
    magnesium,
    potassium,
    sodium,
    protein,
    id,
    tailwind,
    servings,
    save,
    setEditing,
    setMessage,
}) => {
    const [edit, setEdit] = useState(false);
    const foodList = food === '' ? [''] : food;

    const handleEdit = () => {
        if (water === 0 && tailwind === 0) {
            if (food.length === 0) {
                setMessage('Nothing to edit');
                return;
            }
        }
        setEditing(true);
        setEdit(true);
    };

    const savebtn = (servings, changedQty, foodList, hour, waterAmt, twAmt) => {
        setEdit(false);
        save(servings, changedQty, foodList, hour, waterAmt, twAmt);
    };

    return (
        <div className='chart'>
            {!edit && (
                <>
                    {/* mobile version */}
                    <div className='chartmobile'>
                        <div className='top-row'>{time}</div>
                        <div className='row'>
                            <div className='block'>
                                <h2>Water</h2>
                                <p>{water} ml</p>
                            </div>
                            <div className='block'>
                                <h2>Tailwind</h2>
                                <p>{tailwind} ml</p>
                            </div>
                            <div className='block'>
                                <h2>kcal</h2>
                                <p>{calories}</p>
                            </div>
                            <div className='block'>
                                <button
                                    onClick={(e) => handleEdit(e)}
                                    value={hour}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='block-food'>
                                <h2>Food</h2>
                                <ul>
                                    {foodList.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='block'>
                                <h2>Prt</h2>
                                <p>{protein} g</p>
                            </div>
                            <div className='block'>
                                <h2>K</h2>
                                <p>{potassium} mg</p>
                            </div>
                            <div className='block'>
                                <h2>Ca</h2>
                                <p>{calcium} mg</p>
                            </div>
                            <div className='block'>
                                <h2>Na</h2>
                                <p>{sodium} mg</p>
                            </div>
                            <div className='block'>
                                <h2>Mg</h2>
                                <p>{magnesium} mg</p>
                            </div>
                        </div>
                    </div>

                    {/* desktop version */}
                    <div className='chartdesktop'>
                        <div className='row'>
                            <div className='block'>
                                <p className='time'>{time}</p>
                            </div>
                            <div className='block'>
                                <h2>Water</h2>
                                <p>{water} ml</p>
                            </div>
                            <div className='block'>
                                <h2>Tailwind</h2>
                                <p>{tailwind} ml</p>
                            </div>
                            <div className='block'>
                                <h2>Calories</h2>
                                <p>{calories}</p>
                            </div>
                            <div className='block'>
                                <button
                                    onClick={(e) => handleEdit(e)}
                                    value={hour}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='block-food'>
                                <h2>Food</h2>
                                <ul>
                                    {foodList.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='block'>
                                <h2>Protein</h2>
                                <p>{protein} g</p>
                            </div>
                            <div className='block'>
                                <h2>Potassium</h2>
                                <p>{potassium} mg</p>
                            </div>
                            <div className='block'>
                                <h2>Calcium</h2>
                                <p>{calcium} mg</p>
                            </div>
                            <div className='block'>
                                <h2>Sodium</h2>
                                <p>{sodium} mg</p>
                            </div>
                            <div className='block'>
                                <h2>Magnesium</h2>
                                <p>{magnesium} mg</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {edit && (
                <Edit
                    hour={hour}
                    time={time}
                    water={water}
                    food={food}
                    id={id}
                    savebtn={savebtn}
                    edit={setEdit}
                    tailwind={tailwind}
                    servings={servings}
                    setEditing={setEditing}
                    setMessage={setMessage}
                />
            )}
        </div>
    );
};

export default Chart;
