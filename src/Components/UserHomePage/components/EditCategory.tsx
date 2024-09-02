import React, {useEffect, useState} from "react";
import {CategoryParsed, MenuItemJson} from "../../../schema.ts";
import {BinIcon, CharmCross} from "../../../assets/icons";


interface EditCategoryProps {
    editCategory: (category: CategoryParsed) => void,
    close: () => void,
    category: CategoryParsed,
}

function EditCategory({close, editCategory, category}: EditCategoryProps) {


    const [,] = useState<boolean>(false)
    const [,] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [items, setItems] = useState<MenuItemJson[]>(category.items ? category.items : [])
    const [,] = useState<number>(-1)


    useEffect(() => {
        if (items != null) {
            setItems(category.items)
        }

    }, [category.items]);


    //  function addItem(item: MenuItemJson) {
    //      category.items = category.items.concat(item)
    //  }
//
    //  function openEditItemPage(index: number) {
    //      setItemBeingEditedIndex(index)
    //      setIsEditItemPageOpen(true)
    //  }
//
    //  function closeEditItemPage() {
    //      setItemBeingEditedIndex(-1)
    //      setIsEditItemPageOpen(false)
    //  }

    function deleteItem(itemToBeDeleted: MenuItemJson) {
        setItems(category.items.filter((item) => item != itemToBeDeleted))
    }

    // function editItem(item: MenuItemJson) {
    //     category.items[itemBeingEditedIndex] = item
    // }

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


    if (category.name == "" && category.items.length == 0) return <div></div>


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
            <form action="" onSubmit={handleSave}
                  className={`laptop:w-[65%] my-5`}>
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
                    <h1 className='py-1 pl-3 bg-blue-50 text-blue-600 border border-blue-200 font-poppins-semibold rounded-md prevent-select'>
                        Itens
                    </h1>

                    <button
                        onClick={() => {
                        }}
                        type='button'
                        className='prevent-select mt-5 w-full flex justify-between items-center py-1 px-3 hover:bg-gray-100 transition-colors duration-300 border text-gray-600 border-gray-300 font-poppins-semibold rounded-md'>
                        <p>
                            Adicionar Item
                        </p>
                        <p className='text-gray-400'>
                            +
                        </p>
                    </button>
                    <div
                        className={category.items.length == 0 ? 'bg-gray-200 rounded-md my-3 py-16 px-8 ' : 'space-y-1 pt-3'}>
                        {
                            category.items.length > 0 &&
                            category.items.map((item, index) => (
                                <div key={index}
                                     className='flex items-center'>
                                    <div
                                        onClick={() => {
                                        }}
                                        className='w-full px-3 text-sm py-1 flex justify-between rounded-md border border-gray-300 hover:bg-gray-100 transition-color duration-300 cursor-pointer'>
                                        <p className='font-poppins-semibold text-gray-600 max-w-[60%] truncate'>
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
                            category.items ?
                                category.items.length == 0 &&
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
                    className="px-6 py-1.5 text-sm laptop:text-sm bg-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-150 hover:bg-gray-700 rounded-md text-white font-poppins-semibold my-8">
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default EditCategory;