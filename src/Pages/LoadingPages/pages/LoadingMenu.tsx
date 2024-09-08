import LoadingSpinner from "../../../Components/UserHomePage/components/LoadingSpinner.tsx";

function LoadingMenu() {
    return (
        <div className={`flex justify-center items-center h-dvh`}>
            <div className={`flex items-center space-x-3`}>
                <LoadingSpinner
                    color={`gray-800`}
                    size={`20px`}/>
                <h1 className={`font-poppins-semibold text-lg text-gray-800`}>
                    Carregando o menu...
                </h1>
            </div>
        </div>
    );
}

export default LoadingMenu;