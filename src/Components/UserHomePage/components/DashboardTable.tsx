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
        <div className="overflow-x-auto w-full laptop:mb-0">
            <div className="overflow-hidden rounded-xl mb-12 ">
                <table className="w-full bg-white">
                    <thead>
                    <tr className="border-t border-b border-gray-200 text-gray-600 text-sm leading-normal">
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Rank</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Item</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Preço</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Quantitade</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {data.map((row, index) => (
                        index + 1 <= 5 &&
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left">{index + 1}</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left truncate">{row.item}</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left">{row.price} Kz</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left">{row.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardTable;