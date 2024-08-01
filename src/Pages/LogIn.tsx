import Image from '../assets/images/cooking (1).png'
import {Mail, HugeiconsView, HugeiconsViewOff} from "../assets/icons";
import {useState} from "react";

function LogIn() {

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

    function handleVisibility() {
        setPasswordVisibility(!passwordVisibility)
    }

    return (
        <div className="">
            <div className="font-poppins flex items-center justify-center mx-auto max-w-[1020px]">
                <div className='w-full flex justify-between py-10'>
                    <div className='laptop:flex items-center'>
                        <div className='mx-10 mt-[20%] laptop:mt-0 laptop:mx-0'>
                            <h1 className='font-poppins-semibold text-2xl'>
                                Bem-vindo(a) ao <span className='text-stone-500'>neemble eat</span>
                            </h1>
                            <form action="" className='mt-12'>
                                <label htmlFor="email" className='text-sm ml-1'>Email<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <Mail/>
                                    </div>
                                    <input type="text" id="input-group-1"
                                           className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           placeholder="nome@email.com"/>
                                </div>
                                <label htmlFor="email" className='text-sm ml-1'>Password<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                                        {
                                            passwordVisibility ?
                                                <HugeiconsView
                                                    className='rounded-[4px] cursor-pointer hover:bg-gray-100 transition-colors duration-300 p-1'
                                                    onClick={handleVisibility}/> :
                                                <HugeiconsViewOff
                                                    className='rounded-[4px] cursor-pointer hover:bg-gray-100 transition-colors duration-300 p-1'
                                                    onClick={handleVisibility}/>
                                        }
                                    </div>
                                    <input
                                        type={passwordVisibility ? "text" : "password"}
                                        id="input-group-1"
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 hover:bg-gray-100 transition-colors duration-300 focus:border-blue-500 block w-full pr-10 p-2.5"
                                        placeholder="nome@email.com"/>
                                </div>
                                <div className="laptop:flex items-center">
                                    <button
                                        className='bg-black px-5 py-2 rounded-lg text-white'>
                                        Entrar
                                    </button>
                                    <div
                                        className='mt-3 -ml-3 laptop:mt-0 laptop:ml-6 hover:bg-gray-100 transition-colors duration-[250ms] px-3 py-2 rounded-lg'>
                                        <p className='font-bold text-sm cursor-pointer'>
                                            Esqueci-me da palavra-passe
                                        </p>
                                    </div>
                                </div>
                                <div className='flex text-sm mt-6'>
                                    <p className='text-gray-700'>Não tem uma conta?&nbsp;</p>
                                    <p className='font-bold cursor-pointer hover:underline'>Crie uma conta</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <img src={Image}
                             alt=""
                             className='h-[80%] hidden laptop:block'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;