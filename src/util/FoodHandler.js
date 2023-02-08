const FoodHandler = (fooddata) => {
    let prevHour = fooddata.prevHour,
        foodList = prevHour.food,
        nutriInfo = fooddata.currFood,
        amt = fooddata.amt;


    //tally the amounts regardless of foodlist
    for (const key in nutriInfo)
        if (key in prevHour)
            prevHour[key] = parseInt(prevHour[key] || 0) + (parseInt(nutriInfo[key]) * amt);
    //if no food is in hour
    if (prevHour.food === '') {
        prevHour.food = [nutriInfo.name];
        prevHour.servings = amt;
        return prevHour;
    } else {
        let tempList = [...foodList, nutriInfo.name],
            findDuplicates = tempList.some((e, i, arr) => arr.indexOf(e) !== i);
        //if there are duplicate foods
        if (findDuplicates) {
            let getIdx = foodList.indexOf(nutriInfo.name),
                servIdx = prevHour.servings[getIdx],
                updatedServings = [...prevHour.servings];

            updatedServings[getIdx] = parseInt(servIdx) + parseInt(amt);
            prevHour.food = [...prevHour.food];
            prevHour.servings = updatedServings;

            return prevHour;
            //if the foods are new to the list
        } else {
            prevHour.food = [...prevHour.food, nutriInfo.name];
            prevHour.servings = [...prevHour.servings, amt];

            return prevHour;
        }
    };
};

export default FoodHandler;