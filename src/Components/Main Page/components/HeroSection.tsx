import {Link} from "react-router-dom";

function HeroSection() {
    return (
        <section className=' w-full flex justify-center'>
            <div className={`max-w-[1080px] px-8 pt-8 pb-16 laptop:px-24`}>
                <div className='space-y-3'>
                    <h1 className='text-center text-sm my-3'>
                        A sua plataforma de pedidos online em Angola!
                    </h1>
                    <h2 className='text-center text-2xl mt-8 h-auto font-poppins-semibold'>
                        A NeembleEat proporciona uma experiencia <span className={`text-blue-400`}>dinâmica e eficiente
                </span> dinâmica e eficiente para
                        os clientes do seu <span className={`text-blue-400`}>restaurante</span>,
                        a sua equipe e para si.
                    </h2>
                </div>
                <div className=' flex justify-center space-x-3 my-16'>
                    <Link to="/neemble-eat/signup">
                        <p className='px-4 py-2 bg-blue-400 text-white rounded-md cursor-pointer w-fit text-sm hover:shadow hover:bg-blue-500 prevent-select transition duration-100 hover:-translate-y-1'>
                            Acessar
                        </p>
                    </Link>
                    <button
                        className={`px-4 py-2 bg-black text-white rounded-md cursor-pointer w-fit text-sm hover:shadow prevent-select transition duration-100 hover:-translate-y-1`}>
                        <p className=''>
                            Demonstração gratuita
                        </p>
                    </button>
                </div>
                <div className={`flex justify-center`}>
                    <div className="relative aspect-video w-full max-w-[720px] shadow-xl">
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