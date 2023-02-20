export const Select = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label htmlFor={title}>{title}</label>
            <select
                name={name}
                id={title}
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
        </span>
    );
};

export const SelectFuel = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label htmlFor={title}>{title}</label>
            <select
                name={name}
                id={title}
                onChange={onChange}
                className='dropdown'
            >
                {list.map((foods, idx) => (
                    <option
                        id={`${ foods.name }`}
                        key={idx}
                        index={idx}
                        value={foods.name}
                        name={foods.name}
                    >
                        {foods.name}
                    </option>
                ))}
            </select>
        </span>
    );
};

export const SelectML = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label htmlFor={title}>{title}</label>
            <select
                name={name}
                id={title}
                onChange={onChange}
                className='dropdown'
            >
                {list.map((name, idx) => (
                    <option
                        id={`${ name } ml ${ title }`}
                        key={idx}
                        index={idx}
                        value={name}>
                        {name} ml
                    </option>
                ))}
            </select>
        </span>
    );
};

export const SelectTime = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label htmlFor='time'>{title}</label>
            <select
                name={name}
                id='time'
                onChange={onChange}
                className='dropdown time'
            >
                {list.map((name, idx) => (
                    <option
                        id={`${ name }`}
                        key={idx}
                        index={idx}
                        value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </span>
    );
};

export const SelectServings = ({ name, title, onChange, servSize, list }) => {
    return (
        <span>
            <label htmlFor={title}>{title}</label>
            <select
                name={name}
                id={title}
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
                            id={`${ qties } serving`}
                            key={idx}
                            index={idx}
                            value={qties}>
                            {qties}
                        </option>
                    ))
                )}
            </select>
        </span>
    );
};