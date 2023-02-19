import { useContext, useState, useEffect } from 'react';
import { Constants } from '../../constants/Constants';
import { HourContext } from '../../store/hour-context';
import { BlockCal, BlockEdit, BlockFood, BlockMG, BlockML } from '../charts/Blocks';
import EditSplit from '../editFuel/EditSplit';

const Chart = ({ data }) => {
    const { setHour, keys } = useContext(HourContext);
    const { water, food, calories, calcium, magnesium, potassium, sodium, protein, tailwindQty, hour } = data;

    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState('');

    let times = Constants.times,
        foodList = food === ('' || 0) ? '' : [...food],
        id = keys[hour];

    useEffect(() => {
        const resetMsg = setTimeout(() => setMessage(''), 3000);
        return () => clearTimeout(resetMsg);
    });

    // eslint-disable-line
    const handleEdit = () => {
        if (water === 0 && tailwindQty === 0) {
            if (food.length === 0) {
                setMessage('Nothing to edit');
                return;
            }
        }
        setHour(data);
        setEdit(true);
    };

    return (
        <>
            {
                !edit ?
                    <div className='chart' key={id}>
                        <span className='splitMessage' aria-live='polite'>{message}</span>
                        <div className='chartmobile'>
                            <div className='top-row'>{times[hour]}</div>
                            <div className='row'>
                                <BlockML title='Water' children={water} />
                                <BlockML title='Tailwind' children={tailwindQty} />
                                <BlockCal title='Calories' children={calories} />
                                <BlockEdit value={hour} onClick={handleEdit}>Edit</BlockEdit>
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

                        <div className='chartdesktop'>
                            <div className='upper-row'>
                                <div className='block'>
                                    <p className='time'>{times[hour]}</p>
                                </div>
                                <BlockML title='Water' children={water} />
                                <BlockML title='Tailwind' children={tailwindQty} />
                                <BlockCal title='Calories' children={calories} />
                                <BlockEdit value={hour} onClick={handleEdit}>Edit</BlockEdit>
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
                    : <EditSplit setMessage={setMessage} setEdit={setEdit} />
            }
        </>
    );
};

export default Chart;