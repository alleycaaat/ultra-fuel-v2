import { useContext, useEffect, useState } from 'react';
import { HourContext } from '../../store/hour-context';

import Chart from '../raceSplits/Chart';

const HourChart = ({ activeSplit }) => {
    const { hours } = useContext(HourContext);
    const [split, setSplit] = useState();

    useEffect(() => {
        let morning = hours.slice(0, 5),
            afternoon = hours.slice(5, 10),
            evening = hours.slice(10, 15);
        switch (true) {
            case (activeSplit === 'morning'):
                setSplit(morning);
                break;
            case (activeSplit === 'afternoon'):
                setSplit(afternoon);
                break;
            case (activeSplit === 'evening'):
                setSplit(evening);
                break;
            default:
                return;
        }
        return;
    }, [activeSplit, hours]);

    return (
        <>
            {split !== undefined &&
                <>
                    {split.map((hr, i) => (
                        <Chart data={hr} key={i} />
                    ))}
                </>
            }
        </>
    );
};

export default HourChart;