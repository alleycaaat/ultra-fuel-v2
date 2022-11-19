import Chart from './charts/Chart';
const SavedLog = ({ log, time, save, setEditing, setMessage }) => {
    let clock = time[log[0].hour];

    return (
        <div>
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
        </div>
    );
};

export default SavedLog;
