import Edit from './Edit';
import { useState } from 'react';
const Hour = ({ log, clock, save, setEditing }) => {
    const [msg, setMsg] = useState('');
    const [edit, setEdit] = useState(false);
    const food = log[0].food;
    const foodList = food === '' ? [''] : food;

    setTimeout(() => {
        setMsg('');
    }, 5000);

    const handleEdit = () => {
        if (log[0].water === 0 || log[0].tailwind === 0) {
            if (food.length === 0) {
                setMsg('Nothing to edit');
                return;
            }
        }
        setEdit(true);
        setEditing(true);
    };

    return (
        <div className='chart'>
            {!edit && (
                <>
                    {log.map((data, i) => (
                        <>
                            <div className='row'>
                                <div className='blocks'>
                                    <h2 key={i}>Time</h2>
                                    <p>{clock}</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Water</h2>
                                    <p>{data.water} ml</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Tailwind</h2>
                                    <p>{data.tailwindQty} ml</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Food</h2>
                                    <ul>
                                        {foodList.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='blocks'>
                                    <button
                                        onClick={() => handleEdit()}
                                        value={clock}
                                        className='editBtn'
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='blocks'>
                                    <h2>Calories</h2>
                                    <p>{data.calories}</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Potassium</h2>
                                    <p>{data.potassium} mg</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Calcium</h2>
                                    <p>{data.calcium} mg</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Sodium</h2>
                                    <p>{data.sodium} mg</p>
                                </div>
                                <div className='blocks'>
                                    <h2>Magnesium</h2>
                                    <p>{data.magnesium} mg</p>
                                </div>
                            </div>
                        </>
                    ))}
                    <span className='msg'>{msg}</span>
                </>
            )}
            {edit && (
                <Edit
                    hour={log[0].hour}
                    time={clock}
                    water={log[0].water}
                    food={foodList}
                    savebtn={save}
                    edit={setEdit}
                    tailwind={log[0].tailwindQty}
                    servings={log[0].servings}
                    setEditing={setEditing}
                />
            )}
        </div>
    );
};

export default Hour;
