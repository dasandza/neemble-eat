import MenuPage from "../../../assets/images/MenuPage.png"

function AboutTheService() {
    return (
        <section className={`w-full bg-gray-100 flex justify-center`}>
            <div className={`max-w-[1080px] w-full`}>
                <h1 className={`text-3xl text-left font-poppins-semibold leading-tight`}>
                    Conheça a Neemble Eat
                </h1>
                <div className={`flex my-4`}>
                    <p className={`w-1/2 text-gray-800`}>
                        O nosso sistema de pedidos através de QR code permite que os clientes visualizem o menu e façam
                        os seus pedidos diretamente das suas mesas, utilizando apenas os seus smartphones. Ao escanear o
                        QR code disponível em cada mesa, os clientes são redirecionados para uma página web interativa
                        onde podem escolher os seus pratos preferidos, personalizar os pedidos conforme desejam e enviar
                        instantaneamente para a cozinha. Tudo isso sem a necessidade de esperar pelo atendimento
                        tradicional.
                    </p>
                    <div className={`w-1/2`}>
                        <div>
                            <img src={MenuPage} alt="" className={`shadow-md w-[10px] rounded-3xl`}/>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTheService;