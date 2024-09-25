import React from "react";

interface props {

    children: React.ReactNode;
}


function Layout({children}: props) {
    return (
        <div className={`min-h-svh px-8 font-poppins pt-4`}>
            {children}
        </div>
    );
}

export default Layout;