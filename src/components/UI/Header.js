export const Header = () => {
    return (
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
    )
}