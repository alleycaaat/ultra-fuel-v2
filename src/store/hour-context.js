import { useReducer } from 'react';
import { createContext } from 'react';

export const HourContext = createContext({
    hours: [],
    keys: [],
    fuel: [],
    hour: [],
    key: '',
    addToHour: (id, data) => { },
    setHours: (hours) => { },
    setKeys: (keys) => { },
    setFuel: (fueList) => { },
    setHour: (data) => { },
    setKey: (key) => { }
});


function hourReducer(state, action) {
    switch (action.type) {
        case 'ADDTOHOUR':
            const hourId = state.hours.findIndex(
                (hour) => hour.hour === action.payload.id
            );
            const hourData = state.hours[hourId];
            const updatedHour = { ...hourData, ...action.payload.data };
            const updatedHours = [...state.hours];
            updatedHours[hourId] = updatedHour;
            return { ...state, hours: updatedHours };
        case 'SETHOURS':
            return {
                ...state,
                hours: action.payload
            };
        case 'SETKEYS':
            return {
                ...state,
                keys: action.payload
            };
        case 'SETFUEL':
            return {
                ...state,
                fuel: action.payload
            };
        case 'SETHOUR':
            return {
                ...state,
                hour: action.payload
            };
        case 'SETKEY':
            return {
                ...state,
                key: action.payload
            };
        default:
            return state;
    }
}

function HourContextProvider({ children }) {
    const [state, dispatch] = useReducer(hourReducer, []);

    function addToHour(hour, data) {
        dispatch({ type: 'ADDTOHOUR', payload: { id: hour, data: data } });
    }
    function setHours(hours) {
        dispatch({ type: 'SETHOURS', payload: hours });
    }
    function setKeys(keys) {
        dispatch({ type: 'SETKEYS', payload: keys });
    }
    function setFuel(fuelList) {
        dispatch({ type: 'SETFUEL', payload: fuelList });
    }
    function setHour(data) {
        dispatch({ type: 'SETHOUR', payload: data });
    }
    function setKey(key) {
        dispatch({ type: 'SETKEY', payload: key });
    }

    const value = {
        hours: state.hours,
        keys: state.keys,
        fuel: state.fuel,
        hour: state.hour,
        key: state.key,
        addToHour: addToHour,
        setHours: setHours,
        setKeys: setKeys,
        setFuel: setFuel,
        setHour: setHour,
        setKey: setKey,
    };

    return (
        <HourContext.Provider value={value}>{children}</HourContext.Provider>
    );
}

export default HourContextProvider;