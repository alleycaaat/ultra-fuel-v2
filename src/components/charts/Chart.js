import { useContext } from 'react';

import { BlockCal, BlockEdit, BlockFood, BlockMG, BlockML } from './Blocks';
import { HourContext } from '../../store/hour-context';
import { Constants } from '../../constants/Constants';

const Chart = ({ setMessage, setActive }) => {

    const { hour } = useContext(HourContext);

    const { water, food, calories, calcium, magnesium, potassium, sodium, protein, tailwindQty } = hour;
    let times = Constants.times,
        time = times[hour.hour];

    const foodList = food === '' ? [''] : [...food];

    const handleEdit = () => {
        if (water === 0 && tailwindQty === 0) {
            if (food.length === 0) {
                setMessage('Nothing to edit');
                return;
            }
        }
        setActive('Editing');
    };

    return (
        <div className='chart'>

            {/* mobile version*/}
            <div className='chartmobile'>
                <div className='top-row'>{time}</div>
                <div className='row'>
                    <BlockML title='Water' children={water} />
                    <BlockML title='Tailwind' children={tailwindQty} />
                    <BlockCal title='Calories' children={calories} />
                    <BlockEdit value={hour} onClick={e => handleEdit(e)}>Edit</BlockEdit>
                </div>
                <div className='row'>
                    <BlockFood foodList={foodList} />
                </div>
                <div className='row'>
                    <BlockMG title='Prt' children={protein} />
                    <BlockMG title='K' children={potassium} />
                    <BlockMG title='Ca' children={calcium} />
                    <BlockMG title='Na' children={sodium} />
                    <BlockMG title='Mg' children={magnesium} />
                </div>
            </div>

            {/* desktop version*/}
            <div className='chartdesktop'>
                <div className='row'>
                    <div className='block'>
                        <p className='time'>{time}</p>
                    </div>
                    <BlockML title='Water' children={water} />
                    <BlockML title='Tailwind' children={tailwindQty} />
                    <BlockCal title='Calories' children={calories} />
                    <BlockEdit value={hour} onClick={e => handleEdit(e)}>Edit</BlockEdit>
                </div>

                <div className='row'>
                    <BlockFood foodList={foodList} />
                </div>

                <div className='row'>
                    <BlockMG title='Protein' children={protein} />
                    <BlockMG title='Potassium' children={potassium} />
                    <BlockMG title='Calcium' children={calcium} />
                    <BlockMG title='Sodium' children={sodium} />
                    <BlockMG title='Magnesium' children={magnesium} />
                </div>
            </div>
        </div>
    );
};

export default Chart;
