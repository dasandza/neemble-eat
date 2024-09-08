import {Link} from "react-router-dom";

function HeroSection() {
    return (
        <section className='w-full bg-gray-100 flex justify-center'>
            <div className={`max-w-[1080px] px-8 pt-8 pb-16 laptop:px-24 laptop:flex`}>
                <div className={`laptop:w-1/2`}>
                    <div className='space-y-3'>
                        <h1 className='justify-center text-gray-500 font-poppins-semibold laptop:justify-start text-xs my-3 flex capitalize'>
                            <span className={`laptop:block hidden`}>-&nbsp;&nbsp;</span> A sua plataforma de pedidos
                            online em Angola!
                        </h1>
                        <h2 className='text-center laptop:text-left text-5xl mt-8 h-auto font-poppins-semibold'>
                            Faça pedidos sem esforço, ao passo de um scan.
                        </h2>
                    </div>
                    <div className=' flex justify-center laptop:justify-start space-x-3 my-16'>
                        <Link to="/neemble-eat/signup">
                            <p className='px-4 py-2 bg-blue-500 font-poppins-semibold text-white rounded-lg cursor-pointer w-fit text-sm shadow-sm hover:shadow-md hover:bg-blue-600 prevent-select transition duration-150 hover:-translate-y-1'>
                                Acesse Já
                            </p>
                        </Link>
                        <button
                            className={`px-4 font-poppins-semibold py-2 border border-black text-black rounded-lg cursor-pointer w-fit text-sm shadow-sm hover:shadow-md prevent-select transition duration-150 hover:-translate-y-1`}>
                            <p className=''>
                                Veja como funciona
                            </p>
                        </button>
                    </div>
                </div>
                <div className={`flex justify-center laptop:items-center laptop:w-1/2`}>
                    <div className="relative aspect-video h-48 laptop:h-56 max-w-auto shadow-xl">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/mKgedq7YvtQ?si=lSNh3GOlyIyCXYi1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default HeroSection;