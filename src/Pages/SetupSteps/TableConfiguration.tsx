import {ChangeEvent} from "react";


interface TableConfigurationParams {
    numberOfTables: number,
    setNumberOfTables: (numberOfTables: number) => void;
    error: null | string,
}


function TableConfiguration({numberOfTables, setNumberOfTables, error}: TableConfigurationParams) {

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setNumberOfTables(Number(value));
        }
    };


    return (
        <div className=''>
            <div className='italic text-gray-700 text-sm space-y-2'>
                <p className=''>
                    Para que possamos gerar o número certo de códigos QR para o seu restaurante, precisamos que nos dê o
                    número exato de mesas presentes no seu restaurante.
                </p>
                <p>
                    Não se preocupe, poderá alterar à qualquer momento após a configuração da conta.
                </p>
            </div>
            <form action="" className='mt-4'>
                <label className='mr-2'>
                    Número de mesas:
                </label>
                <input
                    type="text"
                    value={numberOfTables !== null ? numberOfTables : ''}
                    onChange={handleNumberChange}
                    className={`mt-2 w-14 border ${error ? "border-red-500" : "border-gray-300"}  hover:bg-gray-100 px-2 rounded`}
                    placeholder="0-99"
                />
            </form>
            {
                error &&
                <div className='mt-6'>
                    <p className='font-poppins-semibold text-red-500 italic text-sm'>
                        *{error}
                    </p>
                </div>
            }
        </div>
    );
}

export default TableConfiguration;