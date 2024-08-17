import {Link} from "react-router-dom";

interface props {
    isOpen: boolean,
    options: {
        name: string,
        path: string,
        icon: JSX.Element,
    }[]
}

function LeftMenu({isOpen, options}: props) {
    return (
        <div
            className={`fixed h-dvh w-[50%] bg-white z-50 left-0 top-0 transition-all ease-in-out duration-300 ${!isOpen ? "-translate-x-full" : "translate-x-0"} px-4`}>
            <div className='my-10 prevent-select'>
                <Link to='/neemble-eat/'>
                    <h1 className='text-xl font-poppins-semibold cursor-pointer w-fit'>
                        Logo
                    </h1>
                </Link>
            </div>
            <ul className=''>
                {
                    options.map((option, index) =>
                        <li key={index}>
                            <Link to={option.path} className='flex items-center space-x-2 hover:bg-gray-100 py-1'>
                                {option.icon}
                                <p className='text-gray-500'>
                                    {option.name}
                                </p>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default LeftMenu;