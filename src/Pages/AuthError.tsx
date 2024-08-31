import {Link} from "react-router-dom";


function AuthError() {
    return (
        <div className='flex items-center justify-center w-full h-dvh'>
            <div>
                <div>
                    <h1 className={`font-semibold text-2xl text-center py-2`}>
                        Não pode proceguir ainda...
                    </h1>
                    <h2 className={`text-center`}>
                        Notamos que não tem uma sessão iniciada. Para que possa proceguir, escolha umas opções abaixo
                    </h2>
                </div>
                <div className={`flex justify-center py-12 space-x-3`}>
                    <Link to={`/neemble-eat/login`}>
                        <button className={`rounded-md bg-black text-white px-3 py-1 font-poppins-semibold`}>Iniciar
                            Sessão
                        </button>
                    </Link>
                    <Link to={`/neemble-eat/signup`}>
                        <button className={`rounded-md bg-black text-white px-3 py-1 font-poppins-semibold`}>
                            Criar Conta
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthError;