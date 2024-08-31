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
            className={`fixed h-dvh w-[55%] bg-white z-50 left-0 top-0 transition-all ease-in-out duration-300 ${!isOpen ? "-translate-x-full" : "translate-x-0"} `}>
            <div className='my-10 prevent-select'>
                <Link to='/neemble-eat/'>
                    <h1 className='px-6 text-xl font-poppins-semibold cursor-pointer w-fit'>
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
                                          className='flex items-center space-x-2 '>
                                        {/* O ICON VAI AQUI */}
                                        <p className='text-gray-500'>
                                            {option.name}
                                        </p>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>

                </div>
                <div className={`py-4`}>
                    <ul className='text-sm'>
                        <Link to="/neemble-eat/login">
                            <li className='hover:bg-gray-100 py-2 px-6 text-gray-500'>
                                Iniciar Sessão
                            </li>
                        </Link>
                        <Link to="/neemble-eat/signup">
                            <li className='hover:bg-gray-100 py-2 px-6 text-gray-500'>
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