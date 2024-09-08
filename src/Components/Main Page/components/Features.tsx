import {BlueQRCode, LaptopPhoneIcon} from "../../../assets/icons";

function Features() {
    return (
        <section className={`w-full flex justify-center bg-gray-100`}>
            <div className={`max-w-[1080px] px-4 py-8 w-full`}>
                <div>
                    <h1 className={`text-xl py-8 font-poppins-semibold text-center`}>
                        Porque os nossos clientes escolhem NeembleEat?
                    </h1>
                </div>
                <div className={`columns-1 laptop:columns-2 space-y-4`}>
                    <div className={`w-full p-4`}>
                        <div className={`flex justify-center py-4`}>
                            <BlueQRCode
                                width={"40px"}
                                height={"40px"}/>
                        </div>
                        <h1 className={`text-center py-1.5 font-poppins-regular`}>
                            Integração do Menu
                        </h1>
                        <p className={`text-center text-sm font-poppins-light`}>
                            Os seus clientes poderão fazer scan de um QRCode que os irá redirecionar ao seu menu digital
                            para que possam efetuar pedidos de forma fácil e rápida.
                        </p>
                    </div>
                    <div className={`w-full p-4`}>
                        <div className={`flex justify-center py-4`}>
                            <LaptopPhoneIcon
                                width={"40px"}
                                height={"40px"}/>
                        </div>
                        <h1 className={`text-center py-1.5 font-poppins-regular`}>
                            Interface Multi-plataforma
                        </h1>
                        <p className={`text-center text-sm font-poppins-light`}>
                            Nós dispomos uma interface de fácil uso para que possa fazer a gestão dos seu menu,
                            pedidos e demais aspectos relacionados ao seu restaurante atravez do conforto do seu
                            telemóvel ou computador.
                        </p>
                    </div>
                    <div className={`w-full p-4`}>
                        <div className={`flex justify-center py-4`}>
                            <BlueQRCode
                                width={"40px"}
                                height={"40px"}/>
                        </div>
                        <h1 className={`text-center py-1.5 font-poppins-regular`}>
                            QR Codes dinâmicos
                        </h1>
                        <p className={`text-center text-sm font-poppins-light`}>
                            Os seus clientes poderão fazer scan de um QRCode que os irá redirecionar ao menu do seu
                            restaurante para que possam efetuar pedidos de forma fácil e rápida
                        </p>
                    </div>
                    <div className={`w-full p-4`}>
                        <div className={`flex justify-center py-4`}>
                            <BlueQRCode
                                width={"40px"}
                                height={"40px"}/>
                        </div>
                        <h1 className={`text-center py-1.5 font-poppins-regular`}>
                            QR Codes dinâmicos
                        </h1>
                        <p className={`text-center text-sm font-poppins-light`}>
                            Os seus clientes poderão fazer scan de um QRCode que os irá redirecionar ao menu do seu
                            restaurante para que possam efetuar pedidos de forma fácil e rápida
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;