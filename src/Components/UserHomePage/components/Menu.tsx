import {useEffect, useState} from "react";
import {fetchMenuParsed} from "../../../api";
import {MenuParsed, RestaurantJson} from "../../../schema.ts";
import {AddIcon, BinIcon, SearchIcon} from "../../../assets/icons";


interface props {
    restaurant: RestaurantJson
}

function Menu({restaurant}: props) {
    const [menu, setMenu] = useState<MenuParsed>()
    const [nameIncludes, setNameIncludes] = useState<string>("")


    useEffect(() => {
        async function fetch() {
            if (restaurant.menus) {
                const menuID = restaurant.menus[0]

                const storedMenuData = sessionStorage.getItem("Menu")

                let menuInfoStored: MenuParsed | null = storedMenuData ? JSON.parse(storedMenuData) : null
                if (!menuInfoStored) {
                    menuInfoStored = await fetchMenuParsed({menuID: menuID})
                }

                sessionStorage.setItem("Menu", JSON.stringify(menuInfoStored))
                setMenu(menuInfoStored)
            }
        }

        fetch()

    }, []);


    return (
        <div>
            <div>
                <div className={`mt-10`}>
                    <div className='laptop:flex justify-between mt-4'>
                        <div className="relative mb-0 w-40">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <SearchIcon/>
                            </div>
                            <input
                                type="text"
                                id="search"
                                value={nameIncludes}
                                onChange={(e) => setNameIncludes(e.target.value)}
                                className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5"
                                placeholder="Pesquisar"
                            />
                        </div>
                        <button
                            onClick={() => {
                            }}
                            className='text-sm rounded-lg border border-gray-300 px-3 py-1.5 flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300 h-fit'
                        >
                            <AddIcon className='h-5 w-5'/>
                            <p className="leading-none">
                                Adicionar categoria
                            </p>
                        </button>
                    </div>

                    {
                        menu?.categories.length != 0 ? <div className="relative overflow-x-auto w-[100%] mx-auto mt-5">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-zinc-800 border-b-2 border-zinc-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 w-[80%]">
                                            Categoria
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[10%]">
                                            Contém
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[10%]">
                                            &nbsp;
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        menu?.categories.map((category, index) => (
                                            category.name.toLowerCase().includes(nameIncludes.toLowerCase()) &&
                                            <tr key={index}
                                                className="text-zinc-800 hover:bg-gray-100 cursor-pointer">
                                                <th scope="row"
                                                    onClick={() => {
                                                    }}
                                                    className="px-6 py-3 font-medium w-[80%]">
                                                    {category.name}
                                                </th>
                                                <td className="px-6 py-3 w-[10%]"
                                                    onClick={() => {
                                                    }}>
                                                    {category.items == undefined ? 0 : category.items.length} itens
                                                </td>
                                                <td className="px-6 py-3 w-[10%]">
                                                    <BinIcon onClick={() => {
                                                    }}/>
                                                </td>
                                            </tr>
                                        ))

                                    }
                                    </tbody>
                                </table>
                            </div> :
                            <div
                                className='flex items-center justify-center text-sm text-gray-400 laptop:py-[10%] py-[40%]'>
                                Adicione a primeira categoria do seu menu
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Menu;