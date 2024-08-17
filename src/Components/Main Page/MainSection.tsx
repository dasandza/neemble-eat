import {Link} from "react-router-dom";

function MainSection() {
    return (
        <section className='px-8 laptop:px-24 h-full'>
            <div className='space-y-3'>
                <h1 className='text-3xl font-poppins-semibold laptop:w-[70%]'>
                    Bem-vindo ao Neemble Eat — A sua plataforma de pedidos online em Angola!
                </h1>
                <p className='laptop:w-[45%] text-sm'>
                    A Neemble Eat te conecta aos seus restaurantes favoritos em Angola através de uma experiência de
                    pedido digital única. Com apenas alguns cliques, você pode explorar menus diversificados,
                    personalizar o seu pedido e enviar diretamente para a cozinha sem esperar.
                </p>
            </div>
            <div className='mt-4'>
                <Link to="/neemble-eat/signup">
                    <p className='px-4 py-2 bg-black text-white rounded-md cursor-pointer w-fit text-sm prevent-select'>
                        Começar
                    </p>
                </Link>
            </div>
        </section>
    );
}

export default MainSection;