import React from "react";

interface props {
    LoadingPage: React.FC;
    loadingParams: boolean[];
    children: React.ReactNode
}

function Loading({loadingParams, LoadingPage, children}: props) {

    return (
        <div>
            {
                loadingParams.every(param => !param) ?
                    <div>{children}</div> :
                    <LoadingPage/>
            }
        </div>
    );
}

export default Loading;