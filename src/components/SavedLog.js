import { type } from '@testing-library/user-event/dist/type';
import { Constants } from '../constants/Constants';
import Chart from './charts/Chart';
const SavedLog = ( {data} ) => {
    let time = Constants.times
    console.log('data:', data)
    console.log('typeof data:',typeof data)
    let log = Array.from(data)
    console.log('log:', log)
    console.log('typeof:',typeof log)
    //let clock = time[log.hour];
    //log, time, save, setEditing, setMessage
//console.log('saved',log)
    return (
        <div>
            {log.map((data, i) => (
                <div key={i}>
                    <Chart
                        water={data.water}
                        //time={clock}
                        //food={data.food}
                        calories={data.calories}
                        calcium={data.calcium}
                        magnesium={data.magnesium}
                        potassium={data.potassium}
                        sodium={data.sodium}
                        protein={data.protein}
                        hour={data.hour}
                        tailwind={data.tailwindQty}
                        servings={data.servings}
                        //id={data.id}
                        //save={save}
                        //setEditing={setEditing}
                        //setMessage={setMessage}
                    />
                </div>
            ))}

                    </div>
    );
};

export default SavedLog;
