interface props {
    customerName: string
    togglePopUp: () => void
}

function ClosingSessionCompletePopUp({togglePopUp, customerName}: props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="relative w-11/12 max-w-lg p-6 bg-white rounded shadow-lg ">
                <button
                    onClick={togglePopUp}
                    className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                    &times;
                </button>
                <h2 className=" mt-4 mb-2 text-xl font-bold">
                    A sua conta esta à
                    caminho{customerName != "" && customerName ? `, ${customerName}!` : "!"}
                </h2>
                <p className="mb-4 text-[14px]">
                    A conta chegará a sua mesa em questão de minutos. Obrigado pelo tempo que esteve
                    connosco, volte sempre!
                </p>
                <button
                    onClick={togglePopUp}
                    className="px-7 py-1 text-white bg-black rounded-md focus:outline-none"
                >
                    Fechar
                </button>
            </div>
        </div>

    );
}

export default ClosingSessionCompletePopUp;