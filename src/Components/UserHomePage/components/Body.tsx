import React from "react";


interface props {
    currentPage: React.ReactNode

}


function Body({currentPage}: props) {
    return (
        <div className='h-full shadow-inner'>
            {currentPage}
        </div>
    );
}

export default Body;