const SetSplits = ({ hrs, splitHour }) => {
    return (
        <>
            {hrs.map((clock, idx) => (
                <button
                    key={idx}
                    name={idx}
                    value={clock}
                    className='tab'
                    onClick={(e) => splitHour(e)}
                >
                    {clock}
                </button>
            ))}
        </>
    );
};

export default SetSplits;
