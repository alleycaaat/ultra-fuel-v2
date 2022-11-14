const Morning = ({ hrs, setHr }) => {
    return (
        <>
            {hrs.map((clock, idx) => (
                <button
                    key={idx}
                    value={clock}
                    className='tab'
                    onClick={e => setHr(e)}
                >
                    {clock}
                </button>
            ))}
        </>
    );
};

export default Morning;
