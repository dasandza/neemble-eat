const New = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-blue-200 rounded-full'>
        <div className={`h-1 w-1 bg-blue-400 rounded-full`}></div>
        <p className='font-poppins-medium text-xs'>
            Novo
        </p>
    </div>
}


const InProgress = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-yellow-300 rounded-full'>
        <div className={`h-1 w-1 bg-yellow-500 rounded-full`}></div>
        <p className='font-poppins-medium text-xs'>
            Em Preparo
        </p>
    </div>
}


const Done = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 rounded-full bg-green-200'>
        <div className={`h-1 w-1 bg-green-400 rounded-full`}></div>
        <p className='font-poppins-medium text-xs'>
            Pronto
        </p>
    </div>
}


const Cancelled = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-red-200 rounded-full'>
        <div className={`h-1 w-1 bg-red-400 rounded-full`}></div>
        <p className='font-poppins-medium text-xs'>
            Cancelado
        </p>
    </div>
}


export {New, InProgress, Done, Cancelled}