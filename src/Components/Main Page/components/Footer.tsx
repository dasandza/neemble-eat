function Footer() {
    return (
        <footer className={`w-full bg-black py-6`}>
            <div className={`flex justify-around py-8`}>
                <div>
                    <h1 className={`text-gray-400`}>
                        Contacte-nos
                    </h1>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>email</p>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>phone number</p>
                </div>
                <div>
                    <h1 className={`text-gray-400`}>
                        Redes Sociais
                    </h1>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>linkedin</p>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>twitter</p>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>facebook</p>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>instagram</p>
                </div>
                <div>
                    <h1 className={`text-gray-400`}>
                        Empresa
                    </h1>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>Sobre Nos</p>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>Demo</p>
                    <p className={`text-sm text-white hover:underline cursor-pointer`}>Suporte</p>
                </div>
            </div>
            <div className={`text-gray-400 text-sm mx-8`}>
                <div>
                    NeembleEat by Neemble, LTDA
                </div>
                <div className={`flex space-x-1`}>
                    <p>
                        &copy; 2024
                    </p>
                    <p>
                        Proteção de dados
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;