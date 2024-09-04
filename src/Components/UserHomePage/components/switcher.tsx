interface props {
    isChecked: boolean;
    setIsChecked: (value: boolean) => void
}

const Switcher = ({isChecked, setIsChecked}: props) => {


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <>
            <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                <input
                    type='checkbox'
                    name='autoSaver'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}/>
                <span
                    className={`slider mr-3 flex h-[20px] w-[50px] items-center rounded-full p-1 duration-200 ${
                        isChecked ? 'bg-blue-600' : 'bg-[#CCCCCE]'
                    }`}>

          <span
              className={`dot h-[12px] w-[12px] rounded-full bg-white duration-200 ${
                  isChecked ? 'translate-x-[1.85rem]' : ''
              }`}>
          </span>
        </span>
            </label>
        </>
    )
}

export default Switcher