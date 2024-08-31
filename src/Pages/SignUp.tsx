import {HugeiconsView, HugeiconsViewOff, Mail, PhoneIcon} from "../assets/icons";
import Image from "../assets/images/chef.png";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase/firebase.ts";
import {useNavigate} from 'react-router-dom';
import {createRepresentant} from "../api";
import {Representant} from "../schema.ts";


function SignUp() {


    const [signInAttempt, setSignInAttempt] = useState<boolean>(false)
    const [accountRecordID, setAccountRecordID] = useState<Promise<Representant>>()
    const navigate = useNavigate();
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
    const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] = useState<boolean>(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState("")


    useEffect(() => {
        async function getAccountRecordID() {
            const account = await accountRecordID
            if (account) {
                navigate(`/neemble-eat/setup/${account.id}/${firstName}`);
                setSignInAttempt(false)
            } else {
                if (signInAttempt) {
                    setSignInAttempt(false)
                    setError("Houve um erro!")
                }
            }
        }

        getAccountRecordID()
    }, [accountRecordID]);


    function handleVisibility() {
        setPasswordVisibility(!passwordVisibility)
    }

    function handleConfimationVisibility() {
        setPasswordConfirmationVisibility(!passwordConfirmationVisibility)
    }

    function handleSubmition(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (passwordConfirmation == password) {
            setSignInAttempt(true)
            if (firstName == "" || lastName == "" || phoneNumber == "") {
                setError("Preencha todos os campos")
            } else {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) => {
                        //console.log(userCredentials.user.uid)
                        const user = createRepresentant({
                            UUID: userCredentials.user.uid,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            email: email,
                            role: "Owner"
                        })
                        setAccountRecordID(user)
                    }).catch((error) => {

                    // FIREBASE ERRORS: https://firebase.google.com/docs/reference/node/firebase.auth.Error
                    if (error.code === "auth/email-already-in-use") {
                        setError("O email inserido ja está em uso.")
                    } else if (error.code === "auth/invalid-api-key") {
                        // Thrown if the provided API key is invalid.
                    } else {
                        setError("Houve um problema ao criar a sua conta.")
                    }
                    console.log(error)
                })
            }
        } else {
            setError("As palavras passe diferentes")
        }

    }

    return (
        <div className="">
            <div className="font-poppins flex items-center justify-center mx-auto max-w-[920px]">
                <div className='w-full flex justify-between py-10'>
                    <div className='laptop:flex items-center'>
                        <div className='laptop:pl-12 mx-8 my-12 laptop:mt-0 laptop:mx-0'>
                            <h1 className='font-poppins-semibold text-2xl'>
                                Crie a sua conta!
                            </h1>
                            <form action="" onSubmit={handleSubmition} className='mt-8'>
                                <div className='flex space-x-5'>
                                    <div>
                                        <label htmlFor="firstName" className='text-sm ml-1'>Primeiro Nome<span
                                            className='text-red-500'>*</span></label>
                                        <div className="relative mb-6">
                                            <input type="text" id="firstName"
                                                   value={firstName}
                                                   onChange={(e) => setFirstName(e.target.value)}
                                                   className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                                                   placeholder="Primeiro Nome"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ultimoNome" className='text-sm ml-1'>Último Name<span
                                            className='text-red-500'>*</span></label>
                                        <div className="relative mb-6">
                                            <input type="text" id="ultimoNome"
                                                   value={lastName}
                                                   onChange={(e) => setLastName(e.target.value)}
                                                   className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                   placeholder="Último Nome"/>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="tel" className='text-sm ml-1'>Número de Telefone<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <PhoneIcon/>
                                    </div>
                                    <input type="tel" id="tel"
                                           value={phoneNumber}
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                           className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           placeholder="XXX XXX XXX"/>
                                </div>

                                <label htmlFor="email" className='text-sm ml-1'>Email<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <Mail/>
                                    </div>
                                    <input type="email" id="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           placeholder="nome@email.com"/>
                                </div>
                                <label htmlFor="email" className='text-sm ml-1'>Password<span
                                    className='text-red-500'>*</span></label>
                                <div className={error != "" ? "relative mt-1" : "relative mb-6"}>
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
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 hover:bg-gray-100 transition-colors duration-300 focus:border-blue-500 block w-full pr-10 p-2.5"
                                        placeholder="password"/>
                                </div>
                                <label htmlFor="email" className='text-sm ml-1'>Confirmar Password<span
                                    className='text-red-500'>*</span></label>
                                <div className={error != "" ? "relative mt-1" : "relative mb-6"}>
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                                        {
                                            passwordConfirmationVisibility ?
                                                <HugeiconsView
                                                    className='rounded-[4px] cursor-pointer hover:bg-gray-100 transition-colors duration-300 p-1'
                                                    onClick={handleConfimationVisibility}/> :
                                                <HugeiconsViewOff
                                                    className='rounded-[4px] cursor-pointer hover:bg-gray-100 transition-colors duration-300 p-1'
                                                    onClick={handleConfimationVisibility}/>
                                        }
                                    </div>
                                    <input
                                        type={passwordConfirmationVisibility ? "text" : "password"}
                                        id="password"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 hover:bg-gray-100 transition-colors duration-300 focus:border-blue-500 block w-full pr-10 p-2.5"
                                        placeholder="Confirme a password"/>
                                </div>
                                {error != "" &&
                                    <div className="text-[12px] w-[80%] mt-3 mb-6">
                                        <p className='text-red-600 italic'>
                                            {error}
                                        </p>
                                    </div>
                                }
                                <div className="laptop:flex items-center">
                                    <button
                                        type='submit'
                                        className='bg-black px-5 py-2 rounded-lg text-white'>
                                        Criar Conta
                                    </button>
                                </div>
                                <div className='flex text-sm mt-6'>
                                    <p className='text-gray-700'>Já tem uma conta?&nbsp;</p>
                                    <Link to='/neemble-eat/login'>
                                        <p className='font-bold cursor-pointer hover:underline'>Inicie sessão</p>
                                    </Link>
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

export default SignUp;
