interface props {
    tip: number
    sessionPrice: number
}


function Total({sessionPrice, tip}: props) {
    return (
        <div>
            <h1 className='font-semibold text-sm'>
                Total
            </h1>
            <p className='text-xl text-gray-700'>
                {sessionPrice + tip} Kz
            </p>
        </div>
    );
}

export default Total;