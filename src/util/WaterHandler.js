const WaterHandler = (waterdata) => {
    const { currWater, water, data } = waterdata;
    if (currWater === 0) {
        data.water = water;
    } else {
        data.water = currWater + water;
    }

    return data;
};

export default WaterHandler;