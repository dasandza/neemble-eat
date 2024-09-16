const Billed = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-green-200 rounded-full '>
        <div className={`h-1 w-1 bg-green-400 rounded-full`}></div>
        <p className='text-xs font-poppins-semibold'>
            Fatura
        </p>
    </div>
}

const Free = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-blue-200 rounded-full'>
        <div className={`h-1 w-1 bg-blue-400 rounded-full`}></div>
        <p className='font-poppins-medium text-xs'>
            Sem Pedidos
        </p>
    </div>
}

const Open = () => {
    return <div
        className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-yellow-300 rounded-full'>
        <div className={`h-1 w-1 bg-yellow-500 rounded-full`}></div>
        <p className='font-poppins-medium text-xs'>
            Em Consumo
        </p>
    </div>
}

export {Billed, Free, Open}