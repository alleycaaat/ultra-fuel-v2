import Chart from './charts/Chart';
const Hour = ({ log, clock, save, setEditing, setMessage }) => {
    return (
        <>
            {log.map((data, i) => (
                <div key={i}>
                    <Chart
                        water={data.water}
                        time={clock}
                        food={data.food}
                        calories={data.calories}
                        calcium={data.calcium}
                        magnesium={data.magnesium}
                        potassium={data.potassium}
                        sodium={data.sodium}
                        protein={data.protein}
                        hour={data.hour}
                        tailwind={data.tailwindQty}
                        servings={data.servings}
                        id={data.id}
                        save={save}
                        setEditing={setEditing}
                        setMessage={setMessage}
                    />
                </div>
            ))}
        </>
    );
};

export default Hour;
