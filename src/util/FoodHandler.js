const FoodHandler = (fooddata) => {

    let nutriInfo = fooddata.food,
        amt = fooddata.amt,
        data = fooddata.data;
        //id = fooddata.id;

    //data.id = id;
    if (data.food === '') {
        data.food = nutriInfo.name;
        data.servings = amt;

        for (const key in nutriInfo) if (key in data) data[key] = (parseInt(nutriInfo[key]) * amt);

    } else {
        data.food = [data.food, nutriInfo.name];
        data.servings = [...data.servings, amt];
        for (const key in nutriInfo) if (key in data) data[key] = parseInt(data[key]) + (parseInt(nutriInfo[key]) * amt);
    }

    return data;
};

export default FoodHandler;