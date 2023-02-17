import { FaPlusCircle } from 'react-icons/fa';

export const SplitButton = ({ time, onClick }) => {
    return (
        <>
            <button
                className='plus'
                aria-label={`show all ${ time } hour options`}
                onClick={onClick}
            >
                <FaPlusCircle aria-hidden='true' />
            </button>
        </>
    );
};