import {Link} from "react-router-dom";
import Logo from "../assets/images/NeembleEat.png"

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
            className={`fixed h-dvh w-[55%] bg-white z-50 left-0 top-0 transition-all ease-in-out duration-300 ${!isOpen ? "-translate-x-full" : "translate-x-0"} `}>
            <div className='mt-10 mb-4 prevent-select'>
                <Link to='/neemble-eat/'>
                    <img src={Logo} alt="" className={`w-[55%] mx-6`}/>
                    <h1 className='hidden text-xl font-poppins-semibold cursor-pointer'>
                        NeembleEat
                    </h1>
                </Link>
            </div>
            <div className={`divide-y-[1.5px] divide-gray-100`}>
                <div className={`py-4`}>
                    <ul className=''>
                        {
                            options.map((option, index) =>
                                <li key={index}
                                    className={`hover:bg-gray-100 py-2 px-6`}>
                                    <Link to={option.path}
                                          className='flex items-center space-x-2 text-gray-500 hover:text-black'>
                                        {/* O ICON VAI AQUI */}
                                        <p className='text-base'>
                                            {option.name}
                                        </p>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>

                </div>
                <div className={`py-4`}>
                    <ul className='text-base'>
                        <Link to="/neemble-eat/login">
                            <li className='hover:bg-gray-100 py-2 px-6 text-gray-500 hover:text-black'>
                                Iniciar Sessão
                            </li>
                        </Link>
                        <Link to="/neemble-eat/signup">
                            <li className='hover:bg-gray-100 py-2 px-6 text-gray-500 hover:text-black'>
                                Criar Conta
                            </li>
                        </Link>
                    </ul>

                </div>
            </div>

        </div>
    );
}

export default LeftMenu;