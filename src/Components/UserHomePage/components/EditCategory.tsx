import React, {useState} from "react";
import {CategoryParsed, MenuItemJson} from "../../../schema.ts";
import {BinIcon, CharmCross} from "../../../assets/icons";
import {AddItem, EditItem} from "../index.ts";


interface EditCategoryProps {
    editCategory: (category: CategoryParsed) => void,
    close: () => void,
    category: CategoryParsed,
}

function EditCategory({close, editCategory, category}: EditCategoryProps) {
    const [name, setName] = useState<string>("")
    const [items, setItems] = useState<MenuItemJson[]>(category.items ? category.items : [])
    const [selectedItem, setSelectedItem] = useState<MenuItemJson | null>(null)
    const [addingItem, setAddingItem] = useState<boolean>(false)

    function addItem(item: MenuItemJson) {
        setItems(items.concat(item))
    }

    function openEditItemPage(item: MenuItemJson) {
        setSelectedItem(item)
    }

    function openAddItemPage() {
        setAddingItem(true)
    }

    function closeAddItemPage() {
        setAddingItem(false)
    }

    function closeEditItemPage() {
        setSelectedItem(null)
    }

    function deleteItem(itemToBeDeleted: MenuItemJson) {
        setItems(category.items.filter((item) => item != itemToBeDeleted))
    }

    function editItem(editedItem: MenuItemJson) {
        if (editedItem.id && editedItem.created_time) {
            setItems(category.items.map((item) => item.id == editedItem.id ? editedItem : item))
        }
    }

    function deepEqual(obj1: MenuItemJson, obj2: MenuItemJson): boolean {
        if (obj1 === obj2) {
            return true;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        for (const key of keys1) {
            console.log(obj1[key], obj2[key])
            if (!keys2.includes(key) || obj1[key] != obj2[key]) {
                return false;
            }
        }

        return true;
    }

    function itemsListCompare(arr1: MenuItemJson[], arr2: MenuItemJson[]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (!deepEqual(arr1[i], arr2[i])) {
                return false;
            }
        }

        return true;
    }


    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (name != "") {
            category.name = name
        }
        category.items = items
        editCategory(category);
        handleClose()
    }

    function handleClose() {
        setName("")
        close()
    }


    if (addingItem) {
        return <AddItem addItem={(item) => addItem(item)}
                        close={closeAddItemPage}
                        categoryName={category.name}/>
    }

    if (selectedItem) {
        return <EditItem editItem={(item) => editItem(item)}
                         close={closeEditItemPage}
                         categoryName={category.name}
                         item={selectedItem}/>
    }


    return (
        <div className={`p-6 border-[1.5px] border-gray-200 rounded-md`}>
            <div className="flex justify-between items-center">
                <h1 className='font-poppins-semibold text-black text-base'>
                    Edite a categoria: <span
                    className={`text-gray-500 italic`}>{category.name}</span>
                </h1>
                <CharmCross className={`cursor-pointer`}
                            onClick={close}/>
            </div>
            <form action=""
                  onSubmit={handleSave}
                  className={`laptop:w-[65%] my-5 pb-4`}>
                <div className={`space-y-1`}> {/* NAME COMPONENT */}
                    <label htmlFor="name"
                           className='text-sm my-4'>Nome<span
                        className='text-red-500'>*</span>
                    </label>
                    <div className="relative mb-6">
                        <input type="text" id="name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                               placeholder={category.name}/>
                    </div>
                </div>
                <div className={`mt-16`}> {/* ITEMS COMPONENT */}
                    <h1 className='py-1 pl-3 bg-blue-50 text-cyan-600 font-poppins-semibold rounded-md prevent-select'>
                        Itens
                    </h1>

                    <button
                        onClick={() => {
                        }}
                        type='button'
                        className='prevent-select mt-3 w-full flex justify-between items-center py-1 px-3 hover:bg-gray-100 transition-colors duration-300 border text-black border-gray-300 font-poppins-semibold rounded-md'>
                        <p onClick={openAddItemPage}>
                            Adicionar Item
                        </p>
                        <p className='text-gray-400'>
                            +
                        </p>
                    </button>
                    <div
                        className={items.length == 0 ? 'bg-gray-200 rounded-md my-3 py-16 px-8 ' : 'divide-y divide-gray-100 pt-3'}>
                        {
                            items.length > 0 &&
                            items.map((item, index) => (
                                <div key={index}
                                     className='flex items-center mb-1 pt-1'>
                                    <div
                                        onClick={() => {
                                            openEditItemPage(item)
                                        }}
                                        className='w-full px-3 text-sm py-1 flex justify-between rounded-md hover:bg-gray-100 transition-color duration-300 cursor-pointer'>
                                        <p className='font-poppins-semibold text-black max-w-[60%] truncate'>
                                            {item.name}
                                        </p>
                                        <div className='flex space-x-5'>
                                            <p className='italic font-poppins-semibold text-gray-500'>
                                                {item.price} Kz
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`px-2 flex justify-center`}>
                                        <button
                                            className='h-fit '
                                            type='button'
                                            onClick={() => deleteItem(item)}>
                                            <BinIcon/>
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                        {
                            items ?
                                items.length == 0 &&
                                <p className='prevent-select justify-center text-gray-500 italic flex items-center'>
                                    Nenhum prato adicionado à esta
                                    categoria
                                </p> :
                                <p className='prevent-select justify-center text-gray-500 italic flex items-center'>
                                    Nenhum prato adicionado à esta
                                    categoria
                                </p>
                        }
                    </div>
                </div>
                <button
                    type='submit'
                    className={`px-6 py-1.5 mt-8 text-sm laptop:text-sm bg-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-150 hover:bg-gray-700 rounded-md text-white font-poppins-semibold`}>
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default EditCategory;