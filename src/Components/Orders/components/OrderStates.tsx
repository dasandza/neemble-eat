function Ready() {
    return <p
        className='bg-green-100 border border-green-600 font-semibold text-green-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
        Pronto
    </p>
}


function Cancelled() {
    return <p
        className='bg-red-100 border border-red-600 font-semibold text-red-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
        Cancelado
    </p>
}

function InProgress() {
    return <p
        className='bg-purple-100 border border-purple-600 font-semibold text-purple-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
        A ser preparado
    </p>
}

export {
    InProgress,
    Ready,
    Cancelled
}