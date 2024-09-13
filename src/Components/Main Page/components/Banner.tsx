import {Link} from "react-router-dom";
import {HamburgerMenuIcon} from "../../../assets/icons";
import {useState} from "react";
import DarkBackground from "../../DarkBackground.tsx";
import LeftMenu from "../../LeftMenu.tsx";
import Logo from "../../../assets/images/NeembleEat.png"

interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}


function Banner({menuOptions}: props) {

    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)

    function toggleLeftMenu() {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }

    return (
        <nav className='py-6 prevent-select bg-gray-100 flex justify-center'>

            <DarkBackground isSelected={isLeftMenuOpen} toggle={toggleLeftMenu}/>
            <LeftMenu isOpen={isLeftMenuOpen} options={menuOptions}/>

            <div className='container max-w-[1080px]'>
                <div className='flex items-center justify-between w-full '>
                    <div className='laptop:mx-0 mx-4 flex-1'>
                        <Link to="/neemble-eat/">
                            <img src={Logo} alt="" className={`laptop:w-[40%]`}/>
                        </Link>
                    </div>
                    <div className='flex-1 text-center'>
                        <ul className='flex items-center space-x-4 text-sm '>
                            {
                                menuOptions.map((option, index) =>
                                    <Link key={index} to={option.path}>
                                        <li
                                            className={`hidden laptop:block cursor-pointer hover:bg-gray-200 transition durantion-200 px-2 py-0.5 rounded-md text-sm`}>
                                            {option.name}
                                        </li>
                                    </Link>
                                )
                            }
                        </ul>
                    </div>
                    <div className={`flex-1 flex justify-end`}>
                        <ul className='flex items-center space-x-4 text-sm'>
                            <Link to="/neemble-eat/login">
                                <li className='hidden laptop:block px-3 py-1 rounded-md cursor-pointer laptop:text-sm'>
                                    Iniciar Sessão
                                </li>
                            </Link>
                            <Link to="/neemble-eat/signup">
                                <li className='hidden laptop:block px-3 py-1 bg-black hover:bg-gray-700 d text-white rounded-md cursor-pointer laptop:text-sm'>
                                    Criar Conta
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className='laptop:hidden mr-2'>
                        <HamburgerMenuIcon
                            width={"22px"}
                            height={"22px"}
                            onClick={toggleLeftMenu}/>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Banner;