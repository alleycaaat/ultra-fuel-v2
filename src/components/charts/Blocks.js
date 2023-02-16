export const BlockCal = ({ title, children }) => {
    return (
        <div className='block'>
            <h2>{title}</h2>
            <p>{children} kcal</p>
        </div>
    );
};

export const BlockEdit = ({ onClick, value, children }) => {
    return (
        <div className='block'>
            <button
                onClick={onClick}
                value={value}
            >
                {children}
            </button>
        </div>
    );
};

export const BlockFood = ({ foodList }) => {
    return (
        <div className='block-food'>
            <h2>Food</h2>
            <ul>
                {foodList.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export const BlockMG = ({ title, children }) => {
    return (
        <div className='block'>
            <h2>{title}</h2>
            <p>{children} mg</p>
        </div>
    );
};

export const BlockML = ({ title, children }) => {
    return (
        <div className='block'>
            <h2>{title}</h2>
            <p>{children} ml</p>
        </div>
    );
};

export const BlockServ = ({ servSize }) => {
    return (
        <div className='block serving-size'>
            <option>Serving size: {servSize}</option>
        </div>
    );
};