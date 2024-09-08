interface data {
    item: string
    price: number
    amount: number
}

interface props {
    data: data[]
}

function DashboardTable({data}: props) {
    return (
        <div className="overflow-x-auto w-full rounded-3xl shadow-sm">
            <div className="overflow-hidden rounded-3xl">
                <table className="w-full bg-white">
                    <thead>
                    <tr className="border-b-[1.5px] border-gray-100 botext-gray-600 text-sm leading-normal">
                        <th className="py-[13px] px-3 laptop:px-6 text-center">Rank</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-center">Item</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-center">Preço</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-center">Quantitade</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {data.map((row, index) => (
                        index + 1 <= 5 &&
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-center">{index + 1}</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-center truncate">{row.item}</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-center">{row.price} Kz</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-center">{row.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardTable;