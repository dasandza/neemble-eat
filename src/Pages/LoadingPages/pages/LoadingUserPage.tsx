import {LoadingSpinner} from "../../../Components/UserHomePage";

function LoadingUserPage() {
    return (
        <div className={`flex justify-center items-center w-full h-dvh`}>
            <LoadingSpinner
                color={`gray-800`}
                size={`20px`}/>
        </div>
    );
}

export default LoadingUserPage;