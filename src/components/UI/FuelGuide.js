export const FuelGuide = () => {
    return (
        <div className='fuel-guide'>
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
    );
};