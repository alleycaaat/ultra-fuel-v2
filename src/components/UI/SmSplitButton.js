export const SmSplitButton = ({aria, onClick,children}) => {
    return (
        <button
        className='split'
        aria-expanded={aria}
        onClick={onClick}
    >
        {children}
    </button>
        )
}