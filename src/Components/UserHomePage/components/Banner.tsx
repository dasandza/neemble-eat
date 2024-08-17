interface props {
    firstName: string,
    lastName: string,
}

function Banner({firstName, lastName}: props) {
    return (
        <div className='max-w-[1080px]'>
            <div className='flex justify-center items-center'>
                <h1 className='py-6 text-3xl font-poppins-semibold text-gray-700'>
                    Boa noite, {firstName} {lastName}
                </h1>
            </div>
            <div className='flex justify-center items-center'>
                <p>Bem vindo à sua Dashboard</p>
            </div>
        </div>

    );
}

export default Banner;