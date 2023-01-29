const SetSplits = ({ hrs, onClick }) => {
    return (
        <>
            {hrs.map((clock, idx) => (
                <button
                    key={idx}
                    value={clock}
                    className='tab'
                    onClick={onClick}
                >
                    {clock}
                </button>
            ))}
        </>
    );
};

export default SetSplits;
