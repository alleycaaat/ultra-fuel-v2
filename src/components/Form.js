import { useState, useEffect, useContext } from 'react';
import { getFuel, gethours } from '../util/api';
import { GetItemId } from '../util/GetItemId';
import { HourContext } from '../store/hour-context';
import { Constants } from '../constants/Constants';

import Loading from './loading';
import SetSplits from './raceSplits/SetSplits';
import AddFuel from './addFuel/AddFuel';
import Edit from './editFuel/Edit';
import Chart from './charts/Chart';
import HourChart from './charts/HourChart';

import { Header } from './UI/Header';
import { SplitButton } from './raceSplits/SplitButton';
import { SmSplitButton } from './raceSplits/SmSplitButton';
import { FuelGuide } from './UI/FuelGuide';
import { Footer } from './UI/Footer';

export const Form = () => {
    const { setHours, setKeys, setFuel, hours, setHour } = useContext(HourContext);

    const [notesDis, setNotesDis] = useState(false);
    const [addFuel, setAddFuel] = useState(false);
    const [active, setActive] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [readMore, setReadMore] = useState(false);
    const [activeSplit, setActiveSplit] = useState('');

    const times = Constants.times,
        morningHrs = Constants.morningHrs,
        afternoonHrs = Constants.afternoonHrs,
        eveningHrs = Constants.eveningHrs;

    const loadHours = async () => {
        await gethours()
            .then((data) => {
                let hours = [];
                let keys = [];

                data.map((hour, i) => {
                    const key = GetItemId(hour);
                    keys.push(key);
                    return key;
                });
                setKeys(keys);
                data.map((hour, i) => {
                    hours.push(data[i].data);
                    return hours;
                });
                setHours(hours);
            })
            .catch((err) => {
                console.log('loadHours API error', err);
            });
        loadFood();
    };

    const loadFood = async () => {
        await getFuel()
            .then((fuel) => {
                let fuelList = [];
                fuel.map((fuels, i) => {
                    fuelList.push(fuel[i].data);
                    return fuelList;
                });
                setFuel(fuelList);
                setAddFuel(true);
                setLoading(false);
            })
            .catch((err) => {
                console.log('loadFood API error', err);
            });
    };

    useEffect(() => {
        loadHours();
    }, []); // eslint-disable-line

    useEffect(() => {
        if (activeSplit !== '') {
            setActive('');
        }
    }, [activeSplit]);

    useEffect(() => {
        const resetMsg = setTimeout(() => setMessage(''), 3000);
        return () => clearTimeout(resetMsg);
    });

    const splitHour = (e) => {
        let index = times.indexOf(e.target.value);
        setLoading(true);
        setActiveSplit('');
        setHour(hours[index]);
        setActive('Chart');
        setAddFuel(false);
        setLoading(false);
    };

    return (
        <div className='wrapper'>
            {loading && <Loading />}
            <Header />
            <div className='buttonswrapper'>
                <button
                    className='fuelBtn'
                    onClick={() => setNotesDis(!notesDis)}
                >
                    Notes
                </button>
                {!addFuel && (
                    <button
                        className='addNew'
                        onClick={() => setAddFuel(true)}
                    >
                        Add Fuel
                    </button>
                )}
            </div>
            {/* these buttons display the logs of the selected third of the race */}
            {/*SetSplits is the plus sign, SplitButton is the component holding the hours */}
            <div className='raceSplits'>
                <div className='splitbtns'>
                    <SetSplits
                        hrs={morningHrs}
                        splitHour={splitHour}
                    />
                    <SplitButton name={'morning'} onClick={() => setActiveSplit('morning')} />
                </div>

                <div className='splitbtns'>
                    <SetSplits
                        hrs={afternoonHrs}
                        splitHour={splitHour}
                    />
                    <SplitButton name={'afternoon'} onClick={() => setActiveSplit('afternoon')} />
                </div>

                <div className='splitbtns'>
                    <SetSplits
                        hrs={eveningHrs}
                        splitHour={splitHour}
                    />
                    <SplitButton name={'evening'} onClick={() => setActiveSplit('evening')} />
                </div>
                <div className='sm-splitbtns '>
                    <SmSplitButton
                        aria={activeSplit === 'morning' ? 'true' : 'false'}
                        onClick={() => setActiveSplit('morning')}>
                        Morning Hours
                    </SmSplitButton>

                    <SmSplitButton
                        aria={activeSplit === 'afternoon' ? 'true' : 'false'}
                        onClick={() => setActiveSplit('afternoon')}>
                        Afternoon Hours
                    </SmSplitButton>

                    <SmSplitButton
                        aria={activeSplit === 'evening' ? 'true' : 'false'}
                        onClick={() => setActiveSplit('evening')}>
                        Evening Hours
                    </SmSplitButton>
                </div>

            </div>
            {notesDis && (<FuelGuide />)}
            <span className='messageCentre' aria-live='polite'>{message}</span>
            {addFuel && (
                <AddFuel
                    setMessage={setMessage}
                    setLoading={setLoading}
                    setActive={setActive}
                    setActiveSplit={setActiveSplit}
                    setAddFuel={setAddFuel}
                />
            )}
            {active === 'Chart' && (
                <Chart
                    setMessage={setMessage}
                    setActive={setActive}
                    setLoading={setLoading}
                />
            )}
            {activeSplit !== '' && (
                <HourChart
                    setMessage={setMessage}
                    activeSplit={activeSplit}
                    setLoading={setLoading}
                    setActive={setActive}
                />
            )}
            {active === 'Editing' && (
                <Edit
                    setMessage={setMessage}
                    setActive={setActive}
                    setLoading={setLoading}
                />
            )}
            <Footer readMore={readMore} setReadMore={setReadMore} />
        </div>
    );
};