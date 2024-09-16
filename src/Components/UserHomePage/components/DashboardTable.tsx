interface props {
    data: [string, number][]
}

function DashboardTable({data}: props) {


    return (
        <div className="overflow-x-auto w-full rounded-3xl border border-gray-200 shadow-sm">
            <div className="overflow-hidden rounded-3xl">
                <table className="w-full bg-white">
                    <thead>
                    <tr className="border-b-[1.5px] border-gray-100 botext-gray-600 text-sm leading-normal">
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Rank</th>
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Item</th>
                        {/*<th className="py-[13px] px-3 laptop:px-6 text-left">Preço</th>*/}
                        <th className="py-[13px] px-3 laptop:px-6 text-left">Quantitade</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {data.map((row, index) => (
                        index + 1 <= 5 &&
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left">{index + 1}</td>
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left truncate">{row[0]}</td>
                            {/*<td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left">{row.price} Kz</td>*/}
                            <td className="py-[13px] px-3 laptop:px-6 font-poppins-regular text-left">{row[1]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardTable;