import { Constants } from '../constants/Constants';
import { edit } from '../util/api';

export const SaveEdits = ({ id, finalFoods, servAmt, hour, waterAmt, tailwindQty, fuel }) => {
    let tailwindInfo = Constants.tailwind;

    let remove = [],
        filteredServings = servAmt.filter(e => e !== 0),
        newData = {
            calories: 0,
            potassium: 0,
            sodium: 0,
            calcium: 0,
            protein: 0,
            magnesium: 0
        },
        misc = {
            water: waterAmt,
            hour: hour.hour,
            servings: servAmt === [0] ? '' : [...filteredServings],
            food: finalFoods === [] ? '' : [...finalFoods],
            tailwindQty: tailwindQty,
        },
        tailwindAmt = tailwindQty / 25;
    if (finalFoods !== []) {
        finalFoods.map((name, i) => {
            let idx = fuel.findIndex((f) => f.name === finalFoods[i]);
            remove.push(fuel[idx]);
            return remove;
        });
        if (tailwindAmt !== 0) {
            for (const key in tailwindInfo)
                if (key in newData)
                    newData[key] = parseInt(tailwindInfo[key] * tailwindAmt);
        }
        for (let i = 0; i < finalFoods.length; i++) {
            for (const key in remove[i])
                if (key in newData)
                    newData[key] = (parseInt(newData[key] || 0)) + (parseInt(remove[i][key]) * filteredServings[i]);
        }
    }

    let save = Object.assign({}, newData, misc);

    edit(id, save);
    return save;
};