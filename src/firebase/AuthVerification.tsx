import {useAuth} from "../AuthContext.tsx";
import React from "react";
import {Navigate} from "react-router-dom";

interface props {
    children: React.ReactNode;
}


function AuthVerification({children}: props) {

    const {user} = useAuth();

    if (!user)
        return <Navigate to={`/neemble-eat/auth-error`}/>

    return (
        <div>
            {children}
        </div>
    );
}

export default AuthVerification;