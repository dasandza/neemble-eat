import {Link} from "react-router-dom";
import {HamburgerMenuIcon} from "../../../assets/icons";
import {useState} from "react";
import DarkBackground from "../../DarkBackground.tsx";
import LeftMenu from "../../LeftMenu.tsx";


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
        <nav className='py-4 prevent-select flex justify-center'>

            <DarkBackground isSelected={isLeftMenuOpen} toggle={toggleLeftMenu}/>
            <LeftMenu isOpen={isLeftMenuOpen} options={menuOptions}/>

            <div className='container max-w-[1080px]'>
                <div className='flex items-center justify-between'>
                    <div className='laptop:pr-24'>
                        <Link to="/neemble-eat/">
                            <p className='cursor-pointer font-poppins-semibold text-xl'>
                                NeembleEat
                            </p>
                        </Link>
                    </div>
                    <div className=''>
                        <ul className='flex items-center space-x-4 text-sm '>
                            {
                                menuOptions.map((option, index) =>
                                    <Link key={index} to={option.path}>
                                        <li
                                            className={`hidden laptop:block cursor-pointer hover:bg-gray-100 transition durantion-200 px-2 py-0.5 rounded-md text-sm`}>
                                            {option.name}
                                        </li>
                                    </Link>
                                )
                            }
                        </ul>
                    </div>
                    <div>
                        <ul className='flex items-center space-x-4 text-sm'>
                            <Link to="/neemble-eat/login">
                                <li className='hidden bg-white laptop:block px-3 py-1 border border-black rounded-md cursor-pointer laptop:text-sm'>
                                    Iniciar Sessão
                                </li>
                            </Link>
                            <Link to="/neemble-eat/signup">
                                <li className='hidden laptop:block px-3 py-1 bg-black text-white rounded-md cursor-pointer laptop:text-sm'>
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