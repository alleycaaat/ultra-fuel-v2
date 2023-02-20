export const Select = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label htmlFor={title}>{title}
                <select
                    name={name}
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
            </label>
        </span>
    );
};

export const SelectFuel = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label>{title}
                <select
                    name={name}
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
            </label>
        </span>
    );
};

export const SelectML = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label>{title}
                <select
                    name={name}
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
            </label>
        </span>
    );
};

export const SelectTime = ({ name, title, onChange, list }) => {
    return (
        <span>
            <label>{title}
                <select
                    name={name}
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
            </label>
        </span>
    );
};

export const SelectServings = ({ name, title, onChange, servSize, list }) => {
    return (
        <span>
            <label>{title}
                <select
                    name={name}
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
            </label>
        </span>
    );
};