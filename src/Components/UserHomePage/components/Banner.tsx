import {HamburgerMenuIcon} from "../../../assets/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface props {
    firstName: string,
    lastName: string,
    toggleMenu: () => void,
    logout: () => void
}

function Banner({firstName, lastName, toggleMenu, logout}: props) {
    const [isUserDropdownSelected, setUserDropdownSelected] = useState<boolean>(false)
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setUserDropdownSelected(!isUserDropdownSelected);
    };

    const onLogOut = () => {
        sessionStorage.clear()
        logout()
        navigate(`/neemble-eat/`)
    }


    return (
        <div>
            <div className='h-[58px] flex justify-between items-center px-4 laptop:px-8 bg-white rounded-t-xl'>
                {
                    isUserDropdownSelected &&
                    <div className={`fixed top-0 h-dvh w-full`}
                         onClick={toggleDropdown}>
                    </div>
                }
                <HamburgerMenuIcon
                    className='cursor-pointer'
                    onClick={toggleMenu}/>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className='flex space-x-2 items-center prevent-select hover:bg-gray-100 hover:underline transition duration-200 rounded-md py-1 px-1.5'>
                    <p className='font-poppins-semibold text-sm laptop:tezt-base text-gray-900'>
                        {firstName} {lastName}
                    </p>
                    <svg
                        className="-mr-1 ml-2 h-5 w-5 mt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {isUserDropdownSelected && (
                    <div
                        className="origin-top-right absolute right-3 mt-32 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="menu" aria-orientation="vertical"
                             aria-labelledby="options-menu">
                            <ul>
                                <li>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={onLogOut}>
                                        Terminar Sesssão
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                )}
            </div>
            <div className={`w-full flex justify-center px-3`}>
                <div className={`w-full border-b-[1.5px] border-gray-200`}></div>

            </div>

        </div>
    );
}

export default Banner;