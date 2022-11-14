import Chart from './Chart';
const EveningChart = ({ log, hours, save, setEditing, setMessage }) => {
    return (
        <div>
            {log.map((data, i) => (
                <div key={i}>
                    <Chart
                        water={data.water}
                        time={hours[i]}
                        food={log[i].food}
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
export default EveningChart;
