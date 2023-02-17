<button className='addNew' onClick={() => addFuelBtn()}>
    New Entry
</button>;

let fuel = [];
data.map((food, i) => {
    const key = GetItemId(food);
    fuel.push({
        name: food.data.name,
        serving: food.data.serving,
        qty: food.data.qty,
        calories: food.data.calories,
        potassium: food.data.potassium,
        sodium: food.data.sodium,
        magnesium: food.data.magnesium,
        calcium: food.data.calcium,
        protein: food.data.protein,
        id: key
    });
    return fuel;
})

{/* these are the thirds activated by the raceSplits div */ }
{
    active === 'MorningChart' && (
        <BlockData
            log={log}
            hours={morningHrs}
            save={saveEdit}
            setEditing={setEditing}
            setMessage={setMessage}
        />
    );
}
{
    active === 'AfternoonChart' && (
        <BlockData
            log={log}
            hours={afternoonHrs}
            save={saveEdit}
            setEditing={setEditing}
            setMessage={setMessage}
        />
    );
}
{
    active === 'EveningChart' && (
        <BlockData
            log={log}
            hours={eveningHrs}
            save={saveEdit}
            setEditing={setEditing}
            setMessage={setMessage}
        />
    );
}
{/* when an new entry is added, this section is activated to show the hour's log */ }
{
    updatedHour !== '' && (
        <SavedLog
            time={time}
            log={updatedHour}
            save={saveEdit}
            setEditing={setEditing}
            setMessage={setMessage}
        />
    );
}
{/* this displays the individual hour selected from the raceSplits buttons */ }
{
    hrLog !== '' && (
        <Hour
            log={hrLog}
            clock={clock}
            save={saveEdit}
            setEditing={setEditing}
            setMessage={setMessage}
        />
    );
}