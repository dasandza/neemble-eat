import {useEffect, useState} from "react";
import {fetchTopOrders} from "../../../api";


interface props {
    restaurantID: string
}

function DashboardTable({restaurantID}: props) {

    const [data, setData] = useState<[string, number][]>([])

    useEffect(() => {
        async function fetch() {
            const topOrdersStored = sessionStorage.getItem("TopOrders")
            let topOrders: [string, number][] | null = topOrdersStored ? JSON.parse(topOrdersStored) : null
            if (topOrdersStored == null)
                topOrders = await fetchTopOrders({restaurantID: restaurantID})

            if (topOrders) {
                sessionStorage.setItem("TopOders", JSON.stringify(topOrders))
                setData(topOrders)
                console.log(topOrders)
            }
        }

        fetch()
    }, []);


    return (
        <div className="overflow-x-auto w-full rounded-3xl shadow-sm">
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