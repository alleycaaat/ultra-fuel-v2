export const Select = ({ name, title, onChange, list }) => {
    return (
        <>
            <label htmlFor={name}>{title}</label>
            <select
                name={name}
                id={name}
                onChange={onChange}
                className='dropdown'
            >
                {list.map((name, idx) => (
                    <option
                        key={idx}
                        index={idx}
                        value={name}>
                        {name} ml
                    </option>
                ))}
            </select>
        </>
    );
};

export const SelectFuel = ({ forlabel, name, id, title, onChange, list }) => {
    return (
        <>
            <label htmlFor={forlabel}>{title}</label>
            <select
                name={name}
                id={id}
                onChange={onChange}
                className='dropdown'
            >
                {list.map((foods, idx) => (
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
        </>
    );
};

export const SelectML = ({ name, title, onChange, list }) => {
    return (
        <>
            <label>{title}</label>
            <select
                name={title.toLowerCase()}
                id={name}
                onChange={onChange}
                className='dropdown'
            >
                {list.map((name, idx) => (
                    <option
                        key={idx}
                        index={idx}
                        value={name}>
                        {name} ml
                    </option>
                ))}
            </select>
        </>
    );
};

export const SelectTime = ({ name, title, onChange, list }) => {
    return (
        <>
            <label>{title}</label>
            <select
                name='time'
                id={name}
                onChange={onChange}
                className='dropdown time'
            >
                {list.map((name, idx) => (
                    <option
                        key={idx}
                        index={idx}
                        value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    );
};

export const SelectServings = ({ name, id, title, onChange, servSize, list }) => {
    return (
        <>
            <label>{title}</label>
            <select
                name={title.toLowerCase()}
                id={id}
                type='number'
                onChange={onChange}
                className='dropdown serving'
                required
            >
                {servSize === '' ? (
                    <option>{' '}</option>
                ) : (
                    list.map((qties, idx) => (
                        <option
                            key={idx}
                            index={idx}
                            value={qties}>
                            {qties}
                        </option>
                    ))
                )}
            </select>
        </>
    );
};