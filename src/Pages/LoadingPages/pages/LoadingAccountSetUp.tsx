import LoadingSpinner from "../../../Components/UserHomePage/components/LoadingSpinner.tsx";

function LoadingAccountSetUp() {
    return (
        <div className='flex items-center justify-center w-full h-dvh'>
            <div className={`flex justify-center items-center h-dvh`}>
                <div className={`flex items-center space-x-3`}>
                    <LoadingSpinner
                        color={`gray-800`}
                        size={`20px`}/>
                    <h1 className={`font-poppins-semibold text-lg text-gray-800`}>
                        Configurando a sua conta. Este Processo pode levar alguns segundos...
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default LoadingAccountSetUp;