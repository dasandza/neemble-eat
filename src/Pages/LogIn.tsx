import Image from '../assets/images/cooking (1).png'
import {Mail, HugeiconsView, HugeiconsViewOff} from "../assets/icons";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../firebase/firebase.ts";
import {signInWithEmailAndPassword} from "firebase/auth";
import handleLogIn from "../utils/handleLogIn.ts";
import LoadingSpinner from "../Components/UserHomePage/components/LoadingSpinner.tsx";


function LogIn() {

    const navigate = useNavigate();
    const [UUID, setUUID] = useState<string | null>(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetch() {
            if (UUID != undefined) {
                try {
                    await handleLogIn({UUID: UUID, navigate: navigate})
                } catch (error) {
                    setLoading(false)
                    console.log(error)
                }
            }
        }

        fetch().then()


    }, [UUID]);

    function handleSubmition(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setError(null)
                const userID = userCredentials.user.uid
                setUUID(userID)
            }).catch(() => {
            setLoading(false)
            setError("Houve um problema ao iniciar sessão. Tente novamente ou troque a sua palavra passe")
        })

    }

    function handleVisibility() {
        setPasswordVisibility(!passwordVisibility)
    }

    return (
        <div className="">
            <div className="font-poppins flex items-center justify-center mx-auto max-w-[920px]">
                <div className='w-full flex justify-between py-10 '>
                    <div className='laptop:flex items-center '>
                        <div className='mx-10 mt-[20%] laptop:mt-0 laptop:mx-0'>
                            <h1 className='font-poppins-semibold text-2xl'>
                                Bem-vindo(a) de volta ao <span className='text-stone-500'>neemble eat</span>
                            </h1>
                            <form action="" onSubmit={handleSubmition} className='mt-8'>
                                <label htmlFor="email" className='text-sm ml-1'>Email<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <Mail/>
                                    </div>
                                    <input type="email"
                                           value={email}
                                           id="email"
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="border border-gray-300 text-gray-900 text-base hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           placeholder="nome@email.com"/>
                                </div>
                                <label htmlFor="email" className='text-sm ml-1'>Password<span
                                    className='text-red-500'>*</span></label>
                                <div className={error != "" ? "relative mb-1" : "relative mb-6"}>
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
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 hover:bg-gray-100 transition-colors duration-300 focus:border-blue-500 block w-full pr-10 p-2.5"
                                        placeholder="password"/>

                                </div>
                                {error != "" &&
                                    <div className="text-[12px] w-[80%] mb-6">
                                        <p className='text-red-600 italic'>
                                            {error}
                                        </p>
                                    </div>
                                }
                                <div className="laptop:flex items-center">
                                    <button
                                        type={loading ? "button" : "submit"}
                                        className={`bg-black px-4 py-1 rounded-md text-sm ${loading ? '-translate-y-1 bg-gray-600 cursor-not-allowed' : 'hover:-translate-y-1 hover:bg-gray-600 transition durantion-150'}  text-white`}>
                                        <div className={`flex items-center space-x-2`}>
                                            <p>
                                                {!loading ? "Entrar" : "Carregando"}
                                            </p>
                                            {
                                                loading && <LoadingSpinner
                                                    size={`12px`}/>
                                            }

                                        </div>
                                    </button>
                                    <div
                                        className='mt-3 -ml-3 laptop:mt-0 laptop:ml-6 w-fit hover:bg-gray-100 transition-colors duration-[250ms] px-3 py-2 rounded-lg'>
                                        <p className='font-bold text-sm cursor-pointer'>
                                            Esqueci-me da palavra-passe
                                        </p>
                                    </div>
                                </div>
                                <div className='flex text-sm mt-6'>
                                    <p className='text-gray-700'>Não tem uma conta?&nbsp;</p>
                                    <p className='font-bold cursor-pointer hover:underline'>
                                        <Link to='/neemble-eat/signup'>
                                            Crie uma conta
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex  items-center justify-center'>
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