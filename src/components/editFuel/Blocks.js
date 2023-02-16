import { FaMinusCircle } from 'react-icons/fa';

export const BlockFood = ({ foodList }) => {
    return (
        <div className='food-edit'>
            <h2>Food</h2>
            <ul>
                {foodList.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export const BlockML = ({ title, children, onClick, aria }) => {
    return (
        <div className='block'>
            <h2>{title}</h2>
            {children > 0 ? (
                <span>
                    {children} ml
                    <button onClick={onClick} aria-label={aria}>
                        <FaMinusCircle aria-hidden='true' />
                    </button>
                </span>
            ) : (
                <p> {children} ml </p>
            )}
        </div>
    );
};

export const BlockServings = ({ servings, servAmt, foodList, handleServings }) => {
    return (
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
    );
};