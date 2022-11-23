
import { useState, useEffect, useRef } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi'
import AddFuel from './components/AddFuel';
import Morning from './components/raceSplits/Morning';
import Afternoon from './components/raceSplits/Afternoon';
import Evening from './components/raceSplits/Evening';
import MorningChart from './components/charts/MorningChart';
import AfternoonChart from './components/charts/AfternoonChart';
import EveningChart from './components/charts/EveningChart';
import SavedLog from './components/SavedLog';
import api from './api';
import Hour from './components/Hour';
import Loading from './components/loading';

function App() {
    const [fuel, setFuel] = useState();
    const [hourLog, setHourLog] = useState();

    const [editing, setEditing] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const [fuelGuide, setFuelGuide] = useState(false);
    const [loading, setLoading] = useState(true);

    const [active, setActive] = useState('');
    const [updatedHour, setUpdatedHour] = useState('');
    const [keys, setKeys] = useState();
    const [log, setLog] = useState();
    const [message, setMessage] = useState();
    const [soloHr, setSoloHr] = useState({
        hrLog: '',
        clock: '',
    });
    const { hrLog, clock } = soloHr;
    const [alertHour, setAlertHour] = useState();
    const [alertStatus, setAlertStatus] = useState(false)

    const loadFood = async () => {
        await api
        .getfuel()
        .then((fuel) => {
            let fuelList = [];
            fuel.map((fuels, i) => {
                fuelList.push(fuel[i].data);
                return fuelList;
            });
            setFuel(fuelList);
        })
        .catch((err) => {
                console.log('loadFood API error', err);
            });
    };

    const loadHours = async () => {
        await api
        .gethours()
        .then((hours) => {
            let hourArr = [];
            let hourKey = [];
        
            hours.map((hour, i) => {
                const key = getId(hour);
                hourKey.push(key);
                return hourKey;
            });
            setKeys(hourKey);
            hours.map((hour, i) => {
                hourArr.push(hours[i].data);
                return hourArr;
            });
            setLoading(false);
            setHourLog(hourArr);
        })
        .catch((err) => {
                console.log('loadHours API error', err);
            });
    };

    const isFirstRender = useRef(true);
    console.log('fooooood:',fuel)
    useEffect(() => {
        if (isFirstRender.current) {
            console.log('Food loaded');
            console.log(isFirstRender,isFirstRender.current)
        loadFood();
            isFirstRender.current = false; //toggle flag after first render/mounting
            return;
        }
    }, []);

    useEffect(() => {
        loadHours();
    }, []);

    useEffect(() => {
        const resetMsg = setTimeout(() => setMessage(''), 3000);
        return () => clearTimeout(resetMsg)
    })

    useEffect(() => {
        const resetAlert = setTimeout(() => setAlertStatus(false), 1000);
        return () => clearTimeout(resetAlert)
    })

    //handles solorHr which displays an individual hour based
    //on clicking a button in raceSplits
    const setHr = (e) => {
        let clock = e.target.value,
            hr = time.indexOf(clock);

        //if a split is expanded and individual hour is selected from raceSplits
        if (active !== '' && editing === true) {
            setActive('');
            setSoloHr({ hrLog: [hourLog[hr]], clock: clock });
            setEditing(false);
            return;
        }
        //selecting a different hour while editing
        if (editing === true) {
            setMessage('Press cancel to select a different hour');
            return;
        }
        setLoading(true);
        setEditing(false);
        setUpdatedHour('');
        setActive('');

        //close the hour if the same one is clicked
        if (soloHr.clock === clock) {
            setSoloHr({ hrLog: '', clock: '' });
            setLoading(false);
            return;
        }

        setSoloHr({ hrLog: [hourLog[hr]], clock: clock });
        setLoading(false);
    };

    //display the selected split of the race
    const activeSplit = (e) => {
        if (e === active) {
            setActive('');
            return;
        }
        setEditing(false);
        setSoloHr({ hrLog: '', clock: '' });
        setUpdatedHour('');
        setActive(e);

        //get the first part of the name of the selected split
        //then add Hrs to the end
        let split = e.substring(0, e.length - 5);
        let lower = split.toLowerCase().concat('Hrs');

        //grab the correct section from the hourLog based on what
        //was created with the last two lines
        //code could be made simpler, but there's already enough gibberish here
        if (lower === 'morningHrs') {
            setLog(hourLog.slice(0, 5));
        }
        if (lower === 'afternoonHrs') {
            setLog(hourLog.slice(5, 10));
        }
        if (lower === 'eveningHrs') {
            setLog(hourLog.slice(10));
        }
    };

    const water = ['0', '100', '200', '300', '400', '500'];
    const tailwind = ['0', '100', '200', '300', '400', '500'];
    //tw will be bagged 200cal a serving
    const tw = {
        serving: '100ml',
        qty: '1, 2, 3, 4, 5',
        calories: '40',
        potassium: '36',
        sodium: '126',
        magnesium: '5',
        calcium: '11',
        protein: '0',
    };
    const time = [
        '07:00-08:00',
        '08:01-09:00',
        '09:01-10:00',
        '10:01-11:00',
        '11:01-12:00',
        '12:01-13:00',
        '13:01-14:00',
        '14:01-15:00',
        '15:01-16:00',
        '16:01-17:00',
        '17:01-18:00',
        '18:01-19:00',
        '19:01-20:00',
        '20:01-21:00',
        '21:01-22:00',
    ];
    const morningHrs = [
        '07:00-08:00',
        '08:01-09:00',
        '09:01-10:00',
        '10:01-11:00',
        '11:01-12:00',
    ];
    const afternoonHrs = [
        '12:01-13:00',
        '13:01-14:00',
        '14:01-15:00',
        '15:01-16:00',
        '16:01-17:00',
    ];
    const eveningHrs = [
        '17:01-18:00',
        '18:01-19:00',
        '19:01-20:00',
        '20:01-21:00',
        '21:01-22:00',
    ];

    //add only liquid
    const onlyWater = (data) => {
        setUpdatedHour('');
        setAlertHour(data.hour)
        let oldHour = [hourLog[data.hour]],
            id = keys[data.hour],
            waterLogged;
        let waterLog =
                oldHour[0].water === 0
                    ? parseInt(data.water)
                    : parseInt(oldHour[0].water) + parseInt(data.water),
            twLog =
                oldHour[0].tailwindQty === undefined
                    ? data.tailwind
                    : parseInt(oldHour[0].tailwindQty) +
                      parseInt(data.tailwind),
            old = oldHour[0];

        waterLogged = {
            hour: data.hour,
            water: waterLog,
            food: old.food,
            calories: old.calories,
            potassium: old.potassium,
            sodium: old.calories,
            calcium: old.calcium,
            magnesium: old.magnesium,
            protein: old.protein,
            servings: old.servings,
            tailwindQty: twLog,
        };

        //if only water is added, save the entry
        if (data.tailwind === 0) {
            setUpdatedHour([waterLogged]);
            saveAPI(id, waterLogged);
            return;
        }
        //if tailwind was added, do the math then send it on
        if (data.tailwind !== 0) {
            let amt = data.tailwind.slice(0, 1);
            let twHr = {
                hour: waterLogged.hour,
                water: waterLog,
                food: waterLogged.food,
                calories: waterLogged.calories + tw.calories * amt,
                potassium: waterLogged.potassium + tw.potassium * amt,
                sodium: waterLogged.sodium + tw.sodium * amt,
                calcium: waterLogged.calcium + tw.calcium * amt,
                magnesium: waterLogged.magnesium + tw.magnesium * amt,
                protein: waterLogged.protein,
                servings: waterLogged.servings,
                tailwindQty: twLog,
            };
            setUpdatedHour([twHr]);
            saveAPI(id, twHr);
        }
    };

    //edit fuel
    const saveEdit = (servings, changedQty, foods, hour, waterAmt, twQty) => {
        setEditing(false);
        setAlertHour(time[hour])
        //sum up the amount of foods changed
        let sum = changedQty.reduce((a, b) => a + b, 0);

        let old = hourLog[hour],
            id = keys[hour],
            prevHourLog = {
                water: waterAmt,
                food: old.food,
                calories: old.calories,
                potassium: old.potassium,
                sodium: old.sodium,
                magnesium: old.magnesium,
                calcium: old.calcium,
                protein: old.protein,
                servings: old.servings,
                tailwindQty: old.tailwindQty,
            };

        //if only water is being removed, save prevHourLog
        //because the water quantity has been replaced
        if (sum === 0) {
            if (old.tailwindQty === twQty) {
                console.log('only water');
                saveAPI(id, prevHourLog);
                return;
            }
        }
        //shorten code by finding the new twamt and slicing the first number
        let twHr,
            amt = (prevHourLog.tailwindQty - twQty).toString().slice(0, 1);

        //if only tailwind is removed, deduct the tw nutrition then save
        if (sum === 0) {
            if (old.tailwindQty !== twQty) {
                twHr = {
                    hour: old.hour,
                    water: waterAmt,
                    food: old.food,
                    calories: old.calories - tw.calories * amt,
                    potassium: old.potassium - tw.potassium * amt,
                    sodium: old.sodium - tw.sodium * amt,
                    magnesium: old.magnesium - tw.magnesium * amt,
                    calcium: old.calcium - tw.calcium * amt,
                    protein: old.protein,
                    servings: old.servings,
                    tailwindQty: twQty,
                };
                console.log('tailwind || tailwind and water');
                saveAPI(id, twHr);
                return;
            }
        }

        //get the nutritional information of the foods to be removed
        let remove = [];
        foods.map((name, i) => {
            let index = fuel.findIndex((p) => p.name === foods[i]);
            remove.push(fuel[index]);
            return remove;
        });

        let removeAmts,
            modFoodList = [],
            newServings = [],
            subtract;

        remove.map((food, i) => {
            //if the new quantities don't match the amount being removed and the servings don't match
            //aka if there will be servings left to display
            if (changedQty[i] !== servings[i]) {
                //if there will be more than one food left or there will be a serving left
                if (foods.length > 1 || servings[i] >= 1) {
                    //push the food to the array that'll be the new foods list
                    modFoodList.push(foods[i]);
                } else {
                    //otherwise display no foods
                    modFoodList = '';
                }
            }

            //get amount of servings remaining
            subtract = servings[i] - changedQty[i];
            if (subtract > 0) {
                newServings.push(subtract);
            }

            //if changes need to be made
            if (changedQty[i] !== 0) {
                //concat the object keys of the nutri. info of the food to be removed and the previous log
                removeAmts = Object.keys(remove[i])
                    .concat(Object.keys(prevHourLog))
                    // iterate to generate the object
                    .reduce((obj, k) => {
                        //obj will be an object, k is the key

                        // define object property, treat as 0 if not defined
                        //new object value will be the nutritional value times the quantity being removed, subtracted from the previous log
                        obj[k] =
                            (prevHourLog[k] || 0) -
                            //this is still being mapped, so need [i] to keep alignment
                            (remove[i][k] * changedQty[i] || 0);
                        return obj;
                    }, {});
            }
            return removeAmts;
        });
        if (modFoodList.length === 0) {
            modFoodList = ''
            newServings = 0}
        let newHour = {
            hour: hour,
            water: waterAmt,
            food: modFoodList,
            calories: removeAmts.calories,
            potassium: removeAmts.potassium,
            sodium: removeAmts.sodium,
            magnesium: removeAmts.magnesium,
            calcium: removeAmts.calcium,
            protein: removeAmts.protein,
            servings: newServings,
            tailwindQty: old.tailwindQty,
        };
        
        if (twQty === prevHourLog.tailwindQty) {
            console.log('no trailwind removed');
            saveAPI(id, newHour);
            return;
        }

        if (twQty !== prevHourLog.tailwindQty) {
            twHr = {
                hour: newHour.hour,
                water: waterAmt,
                food: newHour.food,
                calories: newHour.calories - tw.calories * amt,
                potassium: newHour.potassium - tw.potassium * amt,
                sodium: newHour.sodium - tw.sodium * amt,
                calcium: newHour.calcium - tw.calcium * amt,
                magnesium: newHour.magnesium - tw.magnesium * amt,
                protein: newHour.protein,
                servings: newHour.servings,
                tailwindQty: twQty,
            };
            console.log('tailwind removed');
            saveAPI(id, twHr);
        }
    };

    //add new fuel
    const handleSave = (data) => {
        //get the specific food object from the list
        var newHour = fuel.filter((o) => {
            return o.name.includes(data.name);
        });
        
        //get the previous hour log
        let oldHour = [hourLog[data.hour]],
            id = keys[data.hour],
            updateHour = [],
            twHr = [];
        const orgFood = oldHour[0].food;
        
        setAlertHour(time[data.hour])
        //duplicate the objects to iterate them
        let old = { ...oldHour[0] },
            now = { ...newHour[0] };

        //convert from string to int
        Object.keys(old).forEach((val) => {
            old[val] = parseInt(old[val]);
        });
        Object.keys(now).forEach((val) => {
            now[val] = parseInt(now[val]);
        });

        let qty = data.qty,
            food = data.name;

        let waterLog =
                data.water === undefined
                    ? old.water
                    : old.water + parseInt(data.water),
            foodList =
                orgFood.length <= 0 ? [food] : [...oldHour[0].food, food],
            foodQty =
                oldHour[0].servings === 0
                    ? [qty]
                    : [...oldHour[0].servings, qty],
            twQty = old.tailwindQty <= 0 ? 0 : oldHour[0].tailwindQty;

        updateHour = {
            hour: data.hour,
            water: waterLog,
            food: foodList,
            calories: old.calories + now.calories * qty,
            potassium: old.potassium + now.potassium * qty,
            sodium: old.sodium + now.sodium * qty,
            calcium: old.calcium + now.calcium * qty,
            magnesium: old.magnesium + now.magnesium * qty,
            protein: old.protein + now.protein * qty,
            servings: foodQty,
            tailwindQty: twQty,
        };

        //if no tailwind is added, save
        if (data.tailwind === 0) {
            setUpdatedHour([updateHour]);
            saveAPI(id, updateHour);

            //if tailwind is also added, do the math then save
        } else if (data.tailwind !== '0') {
            let amt = data.tailwind.slice(0, 1),
                update = updateHour;

            //check if there's any water in the log
            waterLog = update.water === undefined ? 0 : update.water;
            foodQty = orgFood.length <= 0 ? qty : [...update.servings, qty];
            twQty =
                update.tailwindQty <= 0
                    ? data.tailwind
                    : update.tailwindQty + parseInt(data.tailwind);

            twHr = {
                hour: data.hour,
                water: waterLog,
                food: update.food,
                calories: update.calories + tw.calories * amt,
                potassium: update.potassium + tw.potassium * amt,
                sodium: update.sodium + tw.sodium * amt,
                magnesium: update.magnesium + tw.magnesium * amt,
                calcium: update.calcium + tw.calcium * amt,
                protein: update.protein,
                servings: foodQty,
                tailwindQty: twQty,
            };
            setUpdatedHour([twHr]);
            saveAPI(id, twHr);
        }
    };

    const saveAPI = async (id, data) => {
        console.log('API CALL')
        setLoading(true);
        setAlertStatus(true);
        setSoloHr({ hrLog: '', clock: '' });
        setUpdatedHour([data])
        //setUpdatedHour('');
        //need to set hrLog to empty or things can end up going negative removing fuel
        //setHourLog('');
        setActive('');
        
        await api
            .edit(id, data)
            .then((res) => {
                console.log('save API response', res)
                loadHours();
            })
            .catch((err) => {
                console.log('save API error', err);
            });
    };
console.log('SOLO:',soloHr,'UPDATED:',updatedHour,'ACTIVE:',active,'CLOCK:',clock)
    const addFuelBtn = () => {
        setSoloHr({ clock: '', hrLog: '' });
        setUpdatedHour('');
        setActive('AddFuel');
    };

    return (
        <div className='wrapper'>
            {loading === true && <Loading />}
            <span className='header'>
                <h1>Ultra Fuel</h1>
                <svg aria-hidden='true' focusable='false' viewBox='0 0 100 100' preserveAspectRatio='none'>
                    <polygon
                        className='svg--sm'
                        fill='#7d7d7d'
                        points='0,47 7,17 27,53 39,37 47,53 61,11 80,50, 93,31 100,50 100,100 0,100'
                    />
                    <polygon
                        className='svg--sm'
                        fill='#bfbfbf'
                        points='0,80 9,48 17,73 25,37 31,63 36,47 47,61 61,31 77,73 85,60 91,40 100,80 100,100 0,100'
                    />
                    <polygon
                        className='svg--lg'
                        fill='#7d7d7d'
                        points='0,33 7,17 17,33 25,9 33,3 37,30 41,20 47,43 53,13 58,83 65,5 69,30 72,59 77,10 80,20, 85,11 87,17 91,3 100,50 100,100 0,100'
                    />
                    <polygon
                        className='svg--lg'
                        fill='#bfbfbf'
                        points='0,80 7,48 11,90 17,77 25,37 31,63 38,33 47,61 61,31 73,73 77,50 79,67 84,20 87,45 91,50 95,15 100,80 100,100 0,100'
                    />
                </svg>
            </span>
            <button className='addNew' onClick={() => addFuelBtn()}>
                New Entry
            </button>
            <button
                className='fuelBtn'
                onClick={() => setFuelGuide(!fuelGuide)}
            >
                Notes
            </button>

            {/* these buttons display the logs of the selected third of the race */}
            <div className='raceSplits'>
                <div className='splitbtns'>
                    <Morning hrs={morningHrs} setHr={setHr} />
                    <button
                        className='plus'
                        aria-label='show all morning hour options'
                        onClick={() => activeSplit('MorningChart')}
                    >
                        <FaPlusCircle aria-hidden='true' />
                    </button>
                </div>
                
                <div className='splitbtns'>
                    <Afternoon hrs={afternoonHrs} setHr={setHr} />
                    <button
                        className='plus'
                        aria-label='show all afternoon hour options'
                        onClick={() => activeSplit('AfternoonChart')}
                    >
                        <FaPlusCircle aria-hidden='true' />
                    </button>
                </div>

                <div className='splitbtns'>
                    <Evening hrs={eveningHrs} setHr={setHr} />
                    <button
                        className='plus'
                        aria-label='show all evening hour options'
                        onClick={() => activeSplit('EveningChart')}
                    >
                        <FaPlusCircle aria-hidden='true' />
                    </button>
                </div>

                <div className='sm-splitbtns '>
                    <button
                        className='split'
                        aria-expanded={active === 'MorningChart' ? 'true' : 'false'}
                        onClick={() => activeSplit('MorningChart')}
                    >
                        Morning Hours
                    </button>
                
                    <button
                        className='split'
                        aria-expanded={active === 'AfternoonChart' ? 'true' : 'false'}
                        onClick={() => activeSplit('AfternoonChart')}
                    >
                        Afternoon Hours
                    </button>
                    <button
                        className='split'
                        aria-expanded={active === 'EveningChart' ? 'true' : 'false'}
                        onClick={() => activeSplit('EveningChart')}
                    >
                        Evening Hours
                    </button>
                </div>
                
            </div>
            {fuelGuide === true && (
                <div className='fuel-guide' aria-expanded={fuelGuide === true ? 'true' : 'false'}>
                    <div className='ul-row'>
                        <ul>
                            <h2>Fueling Goals</h2>
                            <li>
                                <strong>Water</strong> 500ml per hour
                            </li>
                            <li>
                                <strong>Calories</strong> 300 per hour
                            </li>
                            <li>
                                <strong>Protein</strong> 6g per hour
                            </li>
                            <li>
                                <strong>Sodium</strong> 200mg per hour
                            </li>
                        </ul>

                        <ul>
                            <h3>Sodium Values</h3>
                            <li>
                                <strong>Tomato soup</strong> 240mg
                            </li>
                            <li>
                                <strong>Cliff Razz</strong> 95mg
                            </li>
                            <li>
                                <strong>Saltstick</strong> 100mg
                            </li>
                            <li>
                                <strong>Tailwind</strong> 126mg
                            </li>
                        </ul>
                    </div>
                    <h3>After Hour Three</h3>
                    <ul className='cir'>
                        <li>Mix in real food</li>
                        <li>Begin consuming protein</li>
                        <li>Be replenishing electrolytes</li>
                    </ul>
                    <p>*********</p>
                    <ul>
                        <li>Have tomato soup at AS 7</li>
                        <li>Caffeine in small servings</li>
                        <li>May need reminders early to drink</li>
                        <li>Check in with body: don't ignore sh!t</li>
                    </ul>
                </div>
            )}
            <span className='messageCentre' aria-live='polite'>{message}</span>
            
            {alertStatus === true && (
                <div className='alert' aria-expanded={fuelGuide === true ? 'true' : 'false'}>
                <h3>Changes to {alertHour} were saved</h3>
                </div>
            )}
            {active === 'AddFuel' && (
                <AddFuel
                    fuel={fuel}
                    h20={water}
                    tailwind={tailwind}
                    times={time}
                    save={handleSave}
                    onlyWater={onlyWater}
                    setMessage={setMessage}
                />
            )}
            {/* these are the thirds activated by the raceSplits div */}
            {active === 'MorningChart' && (
                <MorningChart
                    log={log}
                    hours={morningHrs}
                    save={saveEdit}
                    setEditing={setEditing}
                    setMessage={setMessage}
                />
            )}
            {active === 'AfternoonChart' && (
                <AfternoonChart
                    log={log}
                    hours={afternoonHrs}
                    save={saveEdit}
                    setEditing={setEditing}
                    setMessage={setMessage}
                />
            )}
            {active === 'EveningChart' && (
                <EveningChart
                    log={log}
                    hours={eveningHrs}
                    save={saveEdit}
                    setEditing={setEditing}
                    setMessage={setMessage}
                />
            )}
            {/* when an new entry is added, this section is activated to show the  hour's log */}
            {updatedHour !== '' && (
                <SavedLog
                    time={time}
                    log={updatedHour}
                    save={saveEdit}
                    setEditing={setEditing}
                    setMessage={setMessage}
                />
            )}
            {/* this displays the individual hour selected from the raceSplits buttons */}
            {hrLog !== '' && (
                <Hour
                    log={hrLog}
                    clock={clock}
                    save={saveEdit}
                    setEditing={setEditing}
                    setMessage={setMessage}
                />
            )}
            <div className='footer'>
                <svg aria-hidden='true' focusable='false' viewBox='0 0 100 100' preserveAspectRatio='none'>
                    <polygon fill='#6c6c6c' points='0,100 100,0 100,100' />
                    <polygon fill='#6c6c6c' points='100,100 0,100 0,0' />
                </svg>
                <h2>About Ultra Fuel</h2>
                <span className='sr-only'>The links below are all external</span>
                <p>
                    This web-app was created by{' '}
                    <a
                        href='https://achulslander.com/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        AC Hulslander
                        <BiLinkExternal aria-hidden='true' className='footericons' alt='external link'/>
                    </a>{' '}
                    as a means to keep track of nutrition and hydration during an
                    ultramarathon.{' '}
                    { /* the checkbox doesn't display, so the label acts as the clickable element.  it's wrapped in a button so keyboard users can access it */ }
                    <button>
                    {/* 17 Nov 2022 - htmlFor throws an error, 'React does not recognize the htmlFor prop on an element...' changing to a lowercase F also throws an error, 'Did you mean htmlFor?' so, y'know. */}
                    <label htmlFor='toggle'>
                        {readMore ? 'Show less...' : 'Read more...'}
                    </label>
                    </button>
                </p>
                <input
                    type='checkbox'
                    focusable='false'
                    name='toggle'
                    id='toggle'
                    onClick={() => setReadMore(!readMore)}
                />
                <div className='footerSlide' style={{display: readMore ? 'block' : 'none'}}>
                    <p>
                        Ultra Fuel is a Jamstack web-app developed with React for
                        the front-end and SCSS for styling; it is designed for mobile-fist, responsive, optimized and addresses several issues that could impare accessibility.</p>

                        <p>Fetch API calls are made to the Fauna
                        database to retrieve the foods collection and hourly logs collection. The
                        foods are saved as an object, and data is handled with the
                        map and reduce methods. Ternary operators are
                        frequently utilized to reduce the line count and speed
                        up operations. React Hooks are also heavily used, specifically useState, useEffect and useRef; the latter is used in
                        conjunction with the useEffect Hook to only load the
                        foods collection on initial render. During some functions a loading
                        screen shows to allow the API calls to the serverless functions to finish  and prevent errors.
                    </p>
                    <p>
                        Currently, this web-app is insecure in that anyone can
                        add or remove food to any hour.  However, the database key is <strong>not</strong> exposed. This is done for demonstration purposes.  It is also catered to the hours of the event I developed the app for.  The end goal is to develop Ultra Fuel into a mobile app, and offer it for download.  Several changes will be made before that happens, such as adding a log-in option, and the ability for a user to add new foods to the database. The end-goal is to utilize an API to simply search for a food and add it, as well as having a manual option.
                    </p>
                    <p className='last'>
                        Full code on{' '}
                        <a
                            href='https://github.com/alleycaaat'
                            target='_blank'
                            rel='noreferrer'
                        >
                            GitHub
                            <BiLinkExternal aria-hidden='true' className='footericons' alt='external link'/>
                        </a>{' '}
                        |{' '}
                        <a
                            href='https://achulslander.com/#contactForm'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Contact AC
                            <BiLinkExternal aria-hidden='true' className='footericons' alt='external link'/>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

function getId(el) {
    //if no ref
    if (el.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    //otherwise, return the id
    return el.ref['@ref'].id;
}

export default App;
