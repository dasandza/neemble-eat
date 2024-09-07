import React, {useState} from "react";
import {CategoryParsed, MenuItemJson, MenuParsed} from "../../../schema.ts";
import {BinIcon, CharmCross} from "../../../assets/icons";
import {AddItem, EditItem} from "../index.ts";
import UpdateCategory from "../../../service/updateCategory.ts";


interface EditCategoryProps {
    restaurantID: string,
    editCategory: (category: CategoryParsed) => void,
    close: () => void,
    category: CategoryParsed,
}

function EditCategory({restaurantID, close, editCategory, category}: EditCategoryProps) {


    const [name, setName] = useState<string>("")
    const [items, setItems] = useState<MenuItemJson[]>(category.items ? category.items : [])
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
    const [addingItem, setAddingItem] = useState<boolean>(false)


    function addItem(item: MenuItemJson) {
        setItems(items.concat(item))
    }

    function openEditItemPage(index: number) {
        setSelectedItemIndex(index)
    }

    function openAddItemPage() {
        setAddingItem(true)
    }

    function closeAddItemPage() {
        setAddingItem(false)
    }

    function closeEditItemPage() {
        setSelectedItemIndex(null)
    }

    function deleteItem(itemToBeDeleted: MenuItemJson) {
        setItems(category.items.filter((item) => item != itemToBeDeleted))
    }

    function editItem(selectedIndex: number, editedItem: MenuItemJson) {
        setItems(items.map((item, index) => index == selectedIndex ? editedItem : item))
    }

    function getOriginal(): CategoryParsed | null {
        const savedMenu = sessionStorage.getItem("Menu");
        const parsedMenu: MenuParsed | null = savedMenu ? JSON.parse(savedMenu) : null;

        if (parsedMenu) {
            for (const originalCategory of parsedMenu.categories) {
                if (originalCategory.id == category.id) {
                    return originalCategory;
                }
            }
        }
        return null
    }

    function findDifferences() {
        const original = getOriginal()
        const newName: { name?: string } = {}
        const updateItems: {
            [key: string]: { [key: string]: string | number | boolean | undefined | null | File; }
        } = {}
        let addItems: MenuItemJson[] = []
        let deleteItems: { id?: string }[] = []

        if (category.name != original?.name) {
            newName.name = category.name
        }

        const itemsID: string[] = category.items.map((item) => item.id)
        const originalID: string[] = original ? original?.items.map((item) => item.id) : []

        itemsID.forEach((id, index) => {
            const item = category.items[index]
            if (originalID.includes(id)) {
                const originalItem = original?.items.find((item) => item.id === id)
                if (originalItem) {
                    const compare = deepCompare(item, originalItem)
                    if (Object.keys(compare).length > 0) {
                        updateItems[id] = compare
                    }
                }
            } else {
                addItems = addItems.concat(item)
            }
        })

        originalID.forEach((id, index) => {
            const originalItem = original?.items[index]
            if (originalItem) {
                if (!itemsID.includes(id)) {
                    deleteItems = deleteItems.concat({id: id})
                }
            }
        })


        return {newName, addItems, updateItems, deleteItems}
    }


    function deepCompare(obj1: MenuItemJson, obj2: MenuItemJson) {
        const differences: { [key: string]: string | number | boolean | undefined | null | File; } = {}

        if (obj1 === obj2) {
            return differences;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        for (const key of keys1) {
            if (!keys2.includes(key) || obj1[key] != obj2[key]) {
                if (key == "imageFile" && obj1[key] == null) {
                    continue
                }
                differences[key] = obj1[key]
            }
        }
        return differences;
    }


    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (name != "") {
            category.name = name
        }
        category.items = items

        const {newName, updateItems, addItems, deleteItems} = findDifferences()

        const categoryID = category.id
        UpdateCategory({
            restaurantID: restaurantID,
            categoryID: categoryID,
            name: newName,
            updateItems: updateItems,
            deleteItems: deleteItems,
            addItems: addItems
        }).then((result) => {
            const added: MenuItemJson[] = result[0]
            let itemsCopy = category.items.filter((item) => item.id != undefined)
            itemsCopy = itemsCopy.concat(added)
            category.items = itemsCopy
        })

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
                        categoryID={category.id}
                        categoryName={category.name}/>
    }

    if (selectedItemIndex != null) {
        return <EditItem editItem={(index, item) => editItem(index, item)}
                         index={selectedItemIndex}
                         close={closeEditItemPage}
                         categoryName={category.name}
                         item={items[selectedItemIndex]}/>
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
                           className='text-sm my-4 text-black'>Nome<span
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
                        onClick={openAddItemPage}
                        type='button'
                        className='prevent-select mt-3 w-full flex justify-between items-center py-1 px-3 hover:bg-gray-100 transition-colors duration-300 border text-black border-gray-300 font-poppins-semibold rounded-md'>
                        <p>
                            Adicionar Item
                        </p>
                        <p className='text-gray-400'>
                            +
                        </p>
                    </button>
                    <div
                        className={items.length == 0 ? 'bg-gray-200 rounded-md my-3 py-16 px-8 ' : 'space-y-1 pt-3'}>
                        {
                            items.length > 0 &&
                            items.map((item, index) => (
                                <div key={index}
                                     className='flex items-center'>
                                    <div
                                        onClick={() => {
                                            openEditItemPage(index)
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