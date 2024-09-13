import {useState} from "react";

interface Soluction {
    title: string,
    description: string
}


function OurSolutions() {

    const soluctions: Soluction[] = [
        {
            title: "Tempo de pedido reduzido",
            description: "Dinamizamos e aceleramos o processo de execução de pedidos, reduzindo significativamente o tempo de espera."
        },
        {
            title: "Redução de custos",
            description: "Nós tiramos dos restauramtes a necessidade de ter uma extensiva equipa de atendimento."
        },
        {
            title: "Rápida troca de informação",
            description: "Facilitamos uma automatizada e moderna comunicação entre os clientes e a cozinha, além de reduzir erros."
        },
        {
            title: "Maior fluxo de clientes",
            description: "Aumentamos a velocidade com que o seu restaurante serve os clientes, aumento igualmente o fluxo diário de clientes. "
        }
    ]
    const [solution, setSolution] = useState<Soluction>(soluctions[0])


    return (
        <section className={`w-full bg-gray-100 flex justify-center px-4 laptop:px-0 py-8`}>
            <div
                className={`max-w-[1080px] py-4 px-4 laptop:px-12 rounded-3xl bg-white border border-gray-200 overflow-hidden`}>
                <div className={`w-full text-center`}>
                    <h1 className={`text-2xl font-poppins-semibold py-4 laptop:py-6`}>
                        Explore as nossas soluções
                    </h1>
                    <p className={`text-sm text-gray-700 hidden laptop:block`}>
                        Integre facilmente o nosso sistema de menu digital acessível por QR Code.
                        Connosco, os seus clientes poderão efetuar pedidos de forma rápida e eficiente, agilizando o
                        trabalho
                        da sua equipe. Faça parte da nova e moderna geração de resturantes de sucesso
                    </p>
                </div>
                <div className={`flex divide-x divide-gray-200 py-8`}>
                    <div className={`laptop:w-1/2 w-full px-4`}>
                        <ul className={`py-4`}>
                            {
                                soluctions.map((solutionCard, index) =>
                                    solutionCard.title == solution.title ?
                                        <li key={index}
                                            className={`border-l-4 border-blue-400 p-4 bg-gray-200 cursor-pointer`}>
                                            <h1 className={`text-md font-poppins-semibold`}>
                                                {solutionCard.title}
                                            </h1>
                                            <p className={`font-poppins-light text-sm`}>
                                                {solutionCard.description}
                                            </p>
                                        </li> :
                                        <li key={index}
                                            onClick={() => setSolution(solutionCard)}
                                            className={`p-4 hover:bg-gray-200 cursor-pointer`}>
                                            <h1 className={`text-md font-poppins-semibold`}>
                                                {solutionCard.title}
                                            </h1>
                                            <p className={`font-poppins-light text-sm hidden laptop:block`}>
                                                {solutionCard.description}
                                            </p>
                                        </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className={`w-1/2 px-4 pb-16 hidden laptop:block`}>
                        <h1 className={`py-4 text-lg font-poppins-semibold text-center`}>
                            {solution.title}
                        </h1>
                        <div className={`shadow-sm rounded-md bg-white w-full h-full p-4`}>
                            test
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurSolutions;