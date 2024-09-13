import {useState} from "react";
import {LucideScanQrCode, LucideTabletSmartphone, LucideNotebookPen, LucideMonitorCheck} from "../../../assets/icons";

function AboutTheService() {

    const [selectedWidget, setSelectedWidget] = useState<number>(0)

    function handleSelectedWidgetChange(number: number): void {
        setSelectedWidget(number)
    }


    return (
        <section className={`w-full bg-zinc-100 py-8 flex justify-center`}>
            <div className={`max-w-[1080px] w-full`}>
                <div className={`mb-8`}>
                    <h2 className={`text-gray-400 text-center font-poppins-semibold text-xs my-2`}>Sobre nós</h2>
                    <h1 className={`text-2xl text-center font-poppins-semibold leading-tight`}>
                        Como Funciona?
                    </h1>
                </div>
                <div
                    className={`laptop:flex mx-4 laptop:mx-0 my-4 laptop:space-x-3 justify-center laptop:space-y-0 space-y-4`}>
                    <div onMouseMove={() => handleSelectedWidgetChange(1)}
                         className={`relative h-72 transition-all ease-in-out duration-500 ${selectedWidget == 1 ? "grow" : ""} bg-gray-200 rounded-3xl p-8`}>
                        <div className={`flex items-center space-x-1.5`}>
                            <LucideScanQrCode stroke={"#000000"}/>
                            <h1 className={`w-[60%] text-lg font-poppins-semibold`}>
                                Escanear
                            </h1>
                        </div>
                        <p className={`${selectedWidget != 1 ? "laptop:opacity-0" : " opacity-100"} absolute transition-all duration-300 mr-8 text-gray-500`}>
                            O cliente utiliza o smartphone para escanear o QR code que está na mesa.
                        </p>
                    </div>
                    <div onMouseMove={() => handleSelectedWidgetChange(2)}
                         className={`relative h-72 transition-all ease-in-out duration-500 ${selectedWidget == 2 ? "grow" : ""} bg-gray-200 rounded-3xl p-8`}>
                        <div className={`flex items-center space-x-1.5`}>
                            <LucideTabletSmartphone stroke={`#000000`}/>
                            <h1 className={`w-[60%] text-lg font-poppins-semibold`}>
                                Escolher
                            </h1>
                        </div>

                        <p className={`${selectedWidget != 2 ? "laptop:opacity-0" : " opacity-100"} absolute transition-all duration-300 mr-8 text-gray-500`}>
                            Após o scan, o menu do restaurante é exibido no dispositivo móvel do cliente. Cada prato vem
                            acompanhado de uma imagem e descrição detalhada.
                        </p>
                    </div>
                    <div onMouseMove={() => handleSelectedWidgetChange(3)}
                         className={`relative h-72 transition-all ease-in-out duration-500 ${selectedWidget == 3 ? "grow" : ""} bg-gray-200 rounded-3xl p-8`}>
                        <div className={`flex items-center space-x-1.5`}>
                            <LucideNotebookPen stroke={`#000000`}/>
                            <h1 className={`w-[60%] text-lg font-poppins-semibold `}>
                                Personalizar
                            </h1>
                        </div>

                        <p className={`${selectedWidget != 3 ? "laptop:opacity-0" : " opacity-100"} absolute transition-all duration-500 mr-8 text-gray-500`}>
                            Opções de personalização e um campo para notas especiais estão disponíveis para que o pedido
                            seja feito exatamente como o cliente deseja.
                        </p>
                    </div>
                    <div onMouseMove={() => handleSelectedWidgetChange(4)}
                         className={`relative h-72 transition-all ease-in-out duration-500 ${selectedWidget == 4 ? "grow" : ""} bg-gray-200 rounded-3xl p-8`}>
                        <div className={`flex items-center space-x-1.5 laptop:pr-16`}>
                            <LucideMonitorCheck stroke={`#000000`}/>
                            <h1 className={`w-[60%] text-lg font-poppins-semibold`}>
                                Pedir
                            </h1>
                        </div>

                        <p className={`${selectedWidget != 4 ? "laptop:opacity-0" : " opacity-100"} absolute transition-all duration-700 mr-8 text-gray-500`}>
                            Com alguns cliques, o pedido é enviado diretamente para a cozinha e entra na fila de preparo
                            de forma organizada e eficiente.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTheService;