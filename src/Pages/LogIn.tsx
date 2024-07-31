import Image from '../assets/images/cooking (1).png'


function LogIn() {
    return (
        <div className=" h-screen">
            <div className="font-poppins flex items-center justify-center mx-auto max-w-[930px]">
                <div className='w-full flex justify-between py-10'>
                    <div className='flex items-center'>
                        <div className=''>
                            <h1 className='font-poppins-semibold text-2xl'>
                                Bem-vindo(a) ao <span className='text-stone-600'>neemble EAT</span>
                            </h1>
                            <form action="" className='mt-12'>
                                <label htmlFor="email" className='text-sm'>Email<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path
                                                d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                            <path
                                                d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                        </svg>
                                    </div>
                                    <input type="text" id="input-group-1"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           placeholder="nome@email.com"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <img src={Image}
                             alt=""
                             className='h-[80%]'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;