const FoodHandler = (fooddata) => {

    let nutriInfo = fooddata.currFood,
        amt = fooddata.amt,
        prevHour = fooddata.prevHour;
    let foodList = prevHour.food;

    if (prevHour.food === '') {
        prevHour.food = [nutriInfo.name];
        prevHour.servings = amt;

        for (const key in nutriInfo) if (key in prevHour) prevHour[key] = (parseInt(nutriInfo[key]) * amt);

    } else {
        let tempList = [...foodList, nutriInfo.name],
            findDuplicates = tempList.some((e, i, arr) => arr.indexOf(e) !== i);
        if (findDuplicates) {
            let getIdx = foodList.indexOf(nutriInfo.name),
                servIdx = prevHour.servings[getIdx],
                updatedServings = [...prevHour.servings];

            for (const key in nutriInfo) if (key in prevHour) prevHour[key] = parseInt(prevHour[key]) + (parseInt(nutriInfo[key]) * amt);
            updatedServings[getIdx] = parseInt(servIdx) + parseInt(amt);
            prevHour.food = [prevHour.food];
            prevHour.servings = updatedServings;
            return prevHour;
        }
        prevHour.food = [...prevHour.food, nutriInfo.name];
        prevHour.servings = [...prevHour.servings, amt];
        for (const key in nutriInfo) if (key in prevHour) prevHour[key] = parseInt(prevHour[key]) + (parseInt(nutriInfo[key]) * amt);
    }
    return prevHour;
};

export default FoodHandler;