import {useState} from "react";

interface Soluction {
    title: string,
    description: string
    text: string
}


function OurSolutions() {

    const soluctions: Soluction[] = [
        {
            title: "Tempo de pedido reduzido",
            description: "Dinamizamos e aceleramos o processo de execução de pedidos, reduzindo significativamente o tempo de espera.",
            text: "Com a nossa solução, o processo de pedido é otimizado desde o QR code até à cozinha, eliminando esperas desnecessárias. Os pedidos chegam diretamente à equipa, acelerando a preparação e garantindo um serviço mais rápido e eficiente. Assim, os clientes recebem os seus pratos mais depressa, e o restaurante aumenta a sua produtividade, melhorando a experiência de todos."
        },
        {
            title: "Redução de custos",
            description: "Nós tiramos dos restauramtes a necessidade de ter uma extensiva equipa de atendimento.",
            text: "A nossa solução elimina a necessidade de uma equipa de atendimento extensa, permitindo que os restaurantes operem de forma mais eficiente com menos recursos humanos. Com os pedidos feitos diretamente pelos clientes através do QR code, o serviço é automatizado, reduzindo significativamente os custos com pessoal e permitindo que a equipa se concentre em outras áreas essenciais do negócio."
        },
        {
            title: "Rápida troca de informação",
            description: "Facilitamos uma automatizada e moderna comunicação entre os clientes e a cozinha, além de reduzir erros.",
            text: "A nossa plataforma garante uma comunicação imediata e automatizada entre os clientes e a cozinha. Ao eliminar intermediários, os pedidos chegam diretamente e sem atrasos, minimizando erros e garantindo uma maior precisão na execução dos pedidos. Com esta solução moderna, a informação flui rapidamente, melhorando a eficiência e a satisfação tanto da equipa como dos clientes."
        },
        {
            title: "Maior fluxo de clientes",
            description: "Aumentamos a velocidade com que o seu restaurante serve os clientes, aumento igualmente o fluxo diário de clientes. ",
            text: "Com a nossa solução, o seu restaurante consegue servir os clientes de forma mais rápida e eficiente. Ao reduzir o tempo de espera e acelerar o processo de atendimento, é possível atender mais pessoas ao longo do dia, aumentando o fluxo diário de clientes. Isto traduz-se em maior rotatividade de mesas e, consequentemente, em mais vendas e lucros para o seu negócio."
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
                        <div className={`text-sm w-full h-full p-4`}>
                            {solution.text}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurSolutions;