import { Constants } from '../constants/Constants';

const TailwindHandler = (twdata) => {
    const { amt, data } = twdata;

    let nutriInfo = Constants.tailwind;

    if (data.tailwindQty === 0 || data.tailwindQty === '0') {
        for (const key in nutriInfo) if (key in data) data[key] = (parseInt(nutriInfo[key]) * amt);
        data.tailwindQty = parseInt(amt) * 25;
    } else {
        for (const key in nutriInfo) if (key in data) data[key] = parseInt(data[key]) + (parseInt(nutriInfo[key]) * amt);
        data.tailwindQty = (parseInt(amt) * 25) + parseInt(data.tailwindQty);
    }

    return data;
};
export default TailwindHandler;