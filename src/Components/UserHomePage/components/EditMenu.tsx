import {useEffect, useState} from "react";
import {fetchMenuParsed} from "../../../api";
import {Category, RestaurantJson, MenuItem, Menu} from "../../../schema.ts";
import {AddIcon, BinIcon, SearchIcon} from "../../../assets/icons";
import {EditCategory, AddCategory} from "../index.ts";


interface props {
    restaurant: RestaurantJson
}

function EditMenu({restaurant}: props) {

    const [menu, setMenu] = useState<Menu>()
    const [nameIncludes, setNameIncludes] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [addingCategory, setAddingCategory] = useState<boolean>(false)

    useEffect(() => {
        async function fetch() {
            if (restaurant.menus) {
                const menuID = restaurant.menus[0]

                const storedMenuData = sessionStorage.getItem("EditMenu")

                let menuInfoStored: Menu | null = storedMenuData ? JSON.parse(storedMenuData) : null
                if (!menuInfoStored) {
                    menuInfoStored = await fetchMenuParsed({menuID: menuID})

                }
                console.log(menuInfoStored)
                sessionStorage.setItem("EditMenu", JSON.stringify(menuInfoStored))
                setMenu(menuInfoStored)
            }
        }

        fetch()
    }, []);


    useEffect(() => {
        const handleBeforeUnload = () => {

            // To show a confirmation dialog:
            sessionStorage.removeItem("EditMenu"
            )
        };

        // Add event listener for before unload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Edit Category
    function editCategory(editedCategory: Category) {
        if (menu && menu.categories) {
            menu.categories = menu.categories.map((category) => category.id == editedCategory.id ? editedCategory : category)
            setMenu(menu)
            sessionStorage.setItem("EditMenu", JSON.stringify(menu))
        }
    }

    function selectCategory(category: Category) {
        const items: MenuItem[] = []
        for (const item of category.items) {
            const newItem: MenuItem = {
                created_time: item.created_time,
                id: item.id,
                name: item.name,
                description: item.description,
                categoryID: item.categoryID,
                imageURL: item.imageURL,
                price: item.price,
                availability: item.availability
            }
            items.push(newItem)
        }
        const selected: Category = {
            id: category.id,
            name: category.name,
            menuID: category.menuID,
            created_time: category.created_time,
            description: category.description,
            items: items
        }
        setSelectedCategory(selected)
    }


    function unselectCategory() {
        setSelectedCategory(null)
    }

    // Add Category
    function addCategory(addedCategory: Category) {
        console.log("Category: ", addedCategory)
    }

    function openAddCategoryPage() {
        setAddingCategory(true)
    }

    function closeAddCategoryPage() {
        setAddingCategory(false)
    }


    return (
        <div className={``}>
            <div>
                <div className={`mt-10`}>
                    <div className='laptop:flex laptop:justify-between mt-4'>
                        <div className="relative mb-4 laptop:mb-0 w-40 z-0">
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
                        {
                            selectedCategory == null && !addingCategory &&
                            <button
                                onClick={openAddCategoryPage}
                                className='text-sm rounded-lg border border-gray-300 px-3 py-1.5 flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300 h-fit'
                            >
                                <AddIcon className='h-5 w-5'/>
                                <p className="leading-none">
                                    Adicionar categoria
                                </p>
                            </button>
                        }

                    </div>

                    {
                        menu?.categories &&
                        menu?.categories.length != 0 ?
                            <div className="relative overflow-x-auto w-[100%] mx-auto mt-5">
                                <div
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div className="text-zinc-800 border-b-2 border-zinc-200">
                                        <div className={`flex w-full px-6 py-3`}>
                                            <h1 className="laptop:w-[80%] w-[75%]">
                                                Categoria
                                            </h1>
                                            <h1 className="w-[15%]">
                                                Contém
                                            </h1>
                                            <h1 className="laptop:w-[5%] w-[10%]">
                                                &nbsp;
                                            </h1>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            menu?.categories.map((category, index) => (
                                                category.name.toLowerCase().includes(nameIncludes.toLowerCase()) &&
                                                <div key={index}>
                                                    <div
                                                        className={`px-6 py-3 flex w-full items-center text-zinc-800 font-medium hover:bg-gray-100 ${selectedCategory && selectedCategory.id == category.id && "bg-gray-50"} cursor-pointer`}
                                                        onClick={() => {
                                                            selectedCategory ? unselectCategory() : selectCategory(category)
                                                        }}>
                                                        <h2
                                                            onClick={() => {
                                                            }}
                                                            className="laptop:w-[80%] w-[75%]">
                                                            {category.name}
                                                        </h2>
                                                        <h2 className="w-[15%]"
                                                            onClick={() => {
                                                            }}>
                                                            {category.items == undefined ? 0 : category.items.length} {category.items.length <= 1 ? "item" : "itens"}
                                                        </h2>
                                                        <h2 className="laptop:w-[5%] w-[10%] flex justify-center">
                                                            <BinIcon onClick={() => {
                                                            }}/>
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        {
                                                            selectedCategory && selectedCategory.id == category.id &&
                                                            <EditCategory category={selectedCategory}
                                                                          restaurantID={restaurant.id}
                                                                          editCategory={(category) => {
                                                                              editCategory(category)
                                                                          }}
                                                                          close={unselectCategory}/>
                                                        }
                                                        {
                                                            addingCategory &&
                                                            <AddCategory
                                                                addCategory={addCategory}
                                                                close={closeAddCategoryPage}/>
                                                        }
                                                    </div>

                                                </div>

                                            ))

                                        }
                                    </div>
                                </div>
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

export default EditMenu;