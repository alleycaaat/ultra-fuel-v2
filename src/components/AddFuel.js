import { useState } from 'react';

const AddFuel = ({
    h20,
    tailwind,
    fuel,
    times,
    save,
    onlyWater,
    setMessage,
}) => {
    const [servSize, setServSize] = useState('');
    const qty = [0, 1, 2, 3, 4, 5];
    const [fuelConsumed, setFuelConsumed] = useState({
        time: 0,
        food: '',
        foodqty: 0,
        water: 0,
        tw: 0,
    });
    const { time, food, foodqty, water, tw } = fuelConsumed;
    //////////remember that the qty is multiplied by the serving
    //so 2 qty of soup, which is 1/4 can means
    //consuming 1/2 can
    const handleLog = (e) => {
        const { name, value } = e.target;
        setFuelConsumed({ ...fuelConsumed, [name]: value });
    };

    //when a food is selected
    const handleFood = (e) => {
        const { value } = e.target;
        var idx = fuel.filter((obj) => {
            return obj.name.includes(value);
        });

        //if food is unselected, remove the serving size
        if (value === '') {
            //also need to set the food back to an empty string, if a food is selected and then it's changed to the empty option, the food is still saved in fuelConsumed and will prompt user to enter a serving size
            setFuelConsumed({...fuelConsumed, food: ''})
            setServSize('');
            return;
        }
        setServSize(idx[0].serving);
        setFuelConsumed({ ...fuelConsumed, food: value });
    };

    //save button
    const handleSave = (e) => {
        e.preventDefault();
        if (food === '' && water === 0 && tw === 0) {
            setMessage('Nothing to save');
            return;
        }
        if (food !== '' && foodqty === 0) {
            setMessage('Servings required');
            return;
        }
        let checkwater = [food, foodqty],
            liquiddata = {
                hour: time,
                water: water,
                tailwind: tw,
            },
            data = {
                hour: time,
                name: food,
                qty: foodqty,
                tailwind: tw,
                water: water,
            };

        const isEmpty = (val) => val === 0 || val === '';

        if (checkwater.every(isEmpty)) {
            onlyWater(liquiddata);
            return;
        }

        save(data);
    };

    return (
        <div className='chart'>
            {/*  MOBILE DISPLAY */}
            <div className='sm-AddFuel'>
            <fieldset>
                <div className='drops'>
                    <label htmlFor='time'>Time</label>
                    <select
                        name='time'
                        id='time'
                        onChange={handleLog}
                        className='dropdown'
                    >
                        {times.map((clock, idx) => (
                            <option key={idx} index={idx} value={idx}>
                                {clock}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='drops'>
                    <label htmlFor='water'>Water</label>
                    <select
                        name='water'
                        id='water'
                        onChange={handleLog}
                        className='dropdown'
                    >
                        {h20.map((water, idx) => (
                            <option key={idx} index={idx} value={water}>
                                {water} ml
                            </option>
                        ))}
                    </select>

                    <label htmlFor='tw'>Tailwind</label>
                    <select
                        name='tw'
                        id='tw'
                        onChange={handleLog}
                        className='dropdown'
                    >
                        {tailwind.map((tw, idx) => (
                            <option key={idx} index={idx} value={tw}>
                                {tw} ml
                            </option>
                        ))}
                    </select>
                </div>
                <div className='drops'>
                    <label htmlFor='food'>Food</label>
                    <select
                        name='food'
                        id='food'
                        onChange={handleFood}
                        className='dropdown'
                    >
                        {fuel.map((foods, idx) => (
                            <option
                                key={idx}
                                index={idx}
                                value={foods.name}
                                name={foods.name}
                            >
                                {foods.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor='foodqty'>Servings</label>
                    <select
                        name='foodqty'
                        id='foodtqy'
                        type='number'
                        onChange={handleLog}
                        className='dropdown'
                        required
                    >
                        {servSize === '' ? (
                            <option></option>
                        ) : (
                            qty.map((qties, idx) => (
                                <option key={idx} index={idx} value={qties}>
                                    {qties}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <div className='drops'>
                    <div className='block'>
                        <option>Serving size: {servSize}</option>
                    </div>
                </div>
                </fieldset>
            </div>

            {/* LARGE SCREEN DISPLAY */}
            <div className='lg-AddFuel'>
            <fieldset>
            <div className='drops'>
                <label htmlFor='time'>Time</label>
                <select
                    name='time'
                    id='time'
                    onChange={handleLog}
                    className='dropdown'
                >
                    {times.map((clock, idx) => (
                        <option key={idx} index={idx} value={idx}>
                            {clock}
                        </option>
                    ))}
                </select>

                <label htmlFor='water'>Water</label>
                <select
                    name='water'
                    id='water'
                    onChange={handleLog}
                    className='dropdown'
                >
                    {h20.map((water, idx) => (
                        <option key={idx} index={idx} value={water}>
                            {water} ml
                        </option>
                    ))}
                </select>

                <label htmlFor='tw'>Tailwind</label>
                <select
                    name='tw'
                    id='tw'
                    onChange={handleLog}
                    className='dropdown'
                >
                    {tailwind.map((tw, idx) => (
                        <option key={idx} index={idx} value={tw}>
                            {tw} ml
                        </option>
                    ))}
                </select>
            </div>
            <div className='drops'>
                <label htmlFor='food'>Food</label>
                <select
                    name='food'
                    id='food'
                    onChange={handleFood}
                    className='dropdown'
                >
                {fuel.map((foods, idx) => (
                        <option
                            key={idx}
                            index={idx}
                            value={foods.name}
                            name={foods.name}
                        >
                            {foods.name}
                        </option>
                    )
                    )}
                </select>
                <div className='block'>
                    <option>Serving size: {servSize}</option>
                </div>
                <label hmtlFor='foodqty'>Servings</label>
                <select
                    name='foodqty'
                    id='foodtqy'
                    type='number'
                    onChange={handleLog}
                    className='dropdown'
                    required
                >
                    {servSize === '' ? (
                        <option></option>
                    ) : (
                        qty.map((qties, idx) => (
                            <option key={idx} index={idx} value={qties}>
                                {qties}
                            </option>
                        ))
                    )}
                </select>
            </div>
            </fieldset>
            </div>
            <div className='last'>
                <button className='save' type='submit' onClick={handleSave}>
                    Save Entry
                </button>
            </div>
        </div>
    );
};

export default AddFuel;
