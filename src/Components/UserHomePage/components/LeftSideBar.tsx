import {MenuOption} from "../../../interfaces.tsx";

interface props {
    mainOptions: MenuOption[],
    sideOptions: MenuOption[],
    setOption: (option: MenuOption) => void,
    current: MenuOption
}


function LeftSideBar({mainOptions, sideOptions, setOption, current}: props) {


    return (
        <div className='w-full bg-white h-dvh z-40 red relative'>
            <div className='flex justify-center items-center py-4 border-b-[1.5px] mx-[5%] border-gray-200'>
                <h1 className='font-poppins-semibold mt-2.5 prevent-select cursor-pointer'>
                    Neemble <span className='text-blue-700'>Eat</span>
                </h1>
            </div>
            <div className={`h-full flex flex-col justify-between`}>
                <div className={`divide-y-[1.5px] divide-gray-200 px-2`}>
                    <div className='mt-8 space-y-2 mb-5'>
                        {mainOptions.map((option, index) =>
                            option.name != current.name ?
                                <div key={index}
                                     onClick={() => setOption(option)}
                                     className='cursor-pointer flex items-center space-x-2 px-4 py-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 hover:font-poppins-semibold rounded-md prevent-select'>
                                    <div>
                                        {option.notSelectedIcon}
                                    </div>
                                    <p className={`text-sm`}>
                                        {option.name}
                                    </p>

                                </div> :
                                <div key={index}
                                     className='cursor-pointer flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-800 font-poppins-semibold rounded-md prevent-select'>
                                    <div>
                                        {option.selectedIcon}
                                    </div>
                                    <p className={`text-sm`}>
                                        {option.name}
                                    </p>

                                </div>
                        )}
                    </div>
                    <div>
                        <ul className={`text-sm mt-5 space-y-2`}>
                            {
                                sideOptions.map((option, index) =>
                                    option.name != current.name ?
                                        <li key={index}
                                            onClick={() => setOption(option)}
                                            className={`flex items-center space-x-2 px-4 py-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 hover:font-poppins-semibold rounded-md prevent-select cursor-pointer`}>
                                            {option.name}
                                        </li> :
                                        <li key={index}
                                            className='cursor-pointer flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-800 font-poppins-semibold rounded-md prevent-select'>
                                            {option.name}
                                        </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

                <div
                    className={`pb-4 h-fit w-full flex justify-center absolute left-0 bottom-0 `}>
                    <p className={`px-6 py-1 rounded-lg bg-gray-200 font-poppins-semibold text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-200 cursor-pointer transition duration-300 prevent-select`}>
                        Powered by @neemble
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LeftSideBar;