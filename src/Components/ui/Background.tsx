import React from "react";

interface props {
    color: string,
    children: React.ReactNode
}

function Background({color, children}: props) {
    return (
        <div>
            <div className={`${color} fixed w-full h-dvh top-0 left-0 -z-50`}></div>
            {children}
        </div>
    );
}

export default Background;