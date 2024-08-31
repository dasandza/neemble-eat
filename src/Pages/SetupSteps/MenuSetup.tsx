import {AddIcon, SearchIcon, BinIcon} from "../../assets/icons";
import {useState} from "react";
import AddCategory from "./Aditional/AddCategory.tsx";
import EditCategory from "./Aditional/EditCategory.tsx";
import {Category} from "../../schema.ts";

interface MenuSetupParams {
    categories: Category[],
    setCategories: (categories: Category[]) => void;
}

function MenuSetup({categories, setCategories}: MenuSetupParams) {

    const [isEditCategoryPageOpen, setIsEditCategoryPageOpen] = useState<boolean>(false)
    const [isCreateCategoryPageOpen, setIsCreateCategoryPageOpen] = useState<boolean>(false)
    const [nameIncludes, setNameIncludes] = useState<string>("")
    const [categoryBeingEditedIndex, setCategoryBeingEditedIndex] = useState<number>(-1)


    function deleteCategory(category: Category) {
        setCategories(categories.filter(x => x !== category))
    }

    function openEditCategoryPage(index: number) {
        setCategoryBeingEditedIndex(index)
        setIsEditCategoryPageOpen(true)
    }

    function closeEditCategoryPage() {
        setCategoryBeingEditedIndex(-1)
        setIsEditCategoryPageOpen(false)
    }

    function editCategory(category: Category) {
        categories[categoryBeingEditedIndex] = category
    }

    function addCategory(category: Category) {
        setCategories(categories.concat(category))
    }

    return (
        <div>
            <div>

            </div>
            <div className='laptop:flex justify-between border-b border-gray-100 pb-4'>
                <div className="relative mb-6 w-40">
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
                    onClick={() => setIsCreateCategoryPageOpen(true)}
                    className='text-sm rounded-lg border border-gray-300 px-3 py-1.5 flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300 h-fit'
                >
                    <AddIcon className='h-5 w-5'/>
                    <p className="leading-none">
                        Adicionar categoria
                    </p>
                </button>
            </div>

            {
                categories.length != 0 ? <div className="relative overflow-x-auto w-[100%] mx-auto mt-5">
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
                                categories.map((category, index) => (
                                    category.name.toLowerCase().includes(nameIncludes.toLowerCase()) &&
                                    <tr key={index}
                                        className="text-zinc-800 hover:bg-gray-100 cursor-pointer">
                                        <th scope="row"
                                            onClick={() => openEditCategoryPage(index)}
                                            className="px-6 py-3 font-medium w-[80%]">
                                            {category.name}
                                        </th>
                                        <td className="px-6 py-3 w-[10%]"
                                            onClick={() => openEditCategoryPage(index)}>
                                            {category.items == undefined ? 0 : category.items.length} itens
                                        </td>
                                        <td className="px-6 py-3 w-[10%]">
                                            <BinIcon onClick={() => deleteCategory(category)}/>
                                        </td>
                                    </tr>
                                ))

                            }
                            </tbody>
                        </table>
                    </div> :
                    <div className='flex items-center justify-center text-sm text-gray-400 laptop:py-[10%] py-[40%]'>
                        Adicione a primeira categoria do seu menu
                    </div>
            }
            {
                isCreateCategoryPageOpen &&
                <AddCategory isOpen={isCreateCategoryPageOpen}
                             close={() => setIsCreateCategoryPageOpen(false)}
                             addCategory={(category) => addCategory(category)}/>

            }
            {
                isEditCategoryPageOpen &&
                <EditCategory close={closeEditCategoryPage}
                              editCategory={(category) => editCategory(category)}
                              isOpen={isEditCategoryPageOpen}
                              category={categoryBeingEditedIndex != -1 ? categories[categoryBeingEditedIndex] : {
                                  name: "",
                                  menuID: "",
                              } as Category}/>
            }

        </div>
    );
}

export default MenuSetup;