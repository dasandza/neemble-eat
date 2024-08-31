import React, {useEffect, useState} from "react";
import {Category, MenuItem} from "../../../schema.ts";
import AddItem from "./AddItem.tsx";
import EditItem from "./EditItem.tsx";
import {BinIcon} from "../../../assets/icons";

interface AddCategoryProps {
    isOpen: boolean;
    addCategory: (category: Category) => void;
    close: () => void;
}

function AddCategory({isOpen, close, addCategory}: AddCategoryProps) {

    const [isEditItemPageOpen, setIsEditItemPageOpen] = useState<boolean>(false)
    const [isCreateItemPageOpen, setIsCreateItemPageOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [items, setItems] = useState<MenuItem[]>([])
    const [itemBeingEditedIndex, setItemBeingEditedIndex] = useState<number>(-1)


    useEffect(() => {
        if (isOpen) {
            // Disable scroll on the body by adding overflow hidden
            document.body.style.overflow = 'hidden';
        }
        return () => {
            // Re-enable scroll on body by removing overflow hidden
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]); // Only re-run the effect if isOpen changes


    function addItem(item: MenuItem) {
        //console.log("NEW ITEM: ", item)
        setItems([item, ...items])
    }

    function openEditItemPage(index: number) {
        setItemBeingEditedIndex(index)
        setIsEditItemPageOpen(true)
    }

    function closeEditItemPage() {
        setItemBeingEditedIndex(-1)
        setIsEditItemPageOpen(false)
    }

    function editItem(item: MenuItem) {
        items[itemBeingEditedIndex] = item
    }

    function deleteItem(itemToBeDeleted: MenuItem) {
        setItems(items.filter((item) => item != itemToBeDeleted))
    }


    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (name != "") {
            addCategory({
                name: name,
                items: items
            } as Category);
        }
        handleClose()
    }

    function handleClose() {
        setItems([])
        setName("")
        close()
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 rounded-t rounded-lg">
            <div className="flex items-center justify-center w-full h-full">

                <form action="" onSubmit={handleSave} className="bg-white w-full h-full overflow-auto">
                    <div
                        className='flex justify-between items-center absolute bg-white w-full py-4 laptop:py-8 laptop:px-16 px-4'>
                        <div>
                            <p className='font-poppins-semibold text-lg'>
                                Criar Categoria
                            </p>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className="px-3 py-1 text-sm laptop:text-base bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-poppins-semibold mr-3"
                            >
                                Salvar
                            </button>
                            <button
                                type='button'
                                className="px-3 py-1 text-sm laptop:text-base text-white bg-black rounded-lg font-poppins-semibold border-2 border-gray-300"
                                onClick={handleClose}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                    <div className='laptop:px-16 px-4 mt-20 laptop:mt-32'>
                        <div className='laptop:w-[60%]'>
                            <div> {/* NAME COMPONENT */}
                                <label htmlFor="name" className='text-sm ml-1'>Nome<span
                                    className='text-red-500'>*</span></label>
                                <div className="relative mb-6">
                                    <input type="text" id="name"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                                           placeholder="Nome da categoria"/>
                                </div>
                            </div>

                            <div> {/* ITEMS COMPONENT */}
                                <h1 className='py-1 pl-3 bg-blue-50 font-poppins-semibold rounded-lg'>
                                    Itens
                                </h1>
                                <p className='ml-3 my-1 italic text-sm text-gray-400'>
                                    Escolha os pratos que farão parte desta categoria.
                                    (Se quiser, pode adicionar mais tarde)
                                </p>
                                <button
                                    onClick={() => setIsCreateItemPageOpen(true)}
                                    type='button'
                                    className='prevent-select mt-5 w-full flex justify-between items-center py-1 px-3 hover:bg-gray-100 transition-colors duration-300 border text-gray-600 border-gray-300 font-poppins-semibold rounded-lg'>
                                    <p>
                                        Adicionar Item
                                    </p>
                                    <p className='text-gray-400'>
                                        +
                                    </p>
                                </button>
                                <div
                                    className={items.length == 0 ? 'bg-gray-200 rounded-lg my-3 py-16 px-8 ' : 'space-y-1 pt-3'}>
                                    {
                                        items.length > 0 &&
                                        items.map((item, index) => (
                                            <div key={index}
                                                 className='flex'>
                                                <div
                                                    onClick={() => {
                                                        openEditItemPage(index)
                                                    }}
                                                    className='px-3 text-sm py-1 flex justify-between rounded-lg border border-gray-300 hover:bg-gray-100 transition-color duration-300 w-[95%] cursor-pointer'>
                                                    <p className='font-poppins-semibold'>
                                                        {item.name}
                                                    </p>
                                                    <div className='flex space-x-5'>
                                                        <p className='italic font-poppins-semibold text-gray-500'
                                                        >
                                                            {item.price} Kz
                                                        </p>

                                                    </div>
                                                </div>
                                                <button
                                                    className='w-[5%] flex justify-center items-center ml-1 laptop:ml-0'
                                                    type='button'
                                                    onClick={() => deleteItem(item)}>
                                                    <BinIcon/>
                                                </button>
                                            </div>
                                        ))
                                    }
                                    {
                                        items.length == 0 &&
                                        <p className='prevent-select justify-center text-gray-500 italic flex items-center'>
                                            Nenhum prato adicionado à esta categoria
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            {
                isCreateItemPageOpen &&
                <AddItem isOpen={isCreateItemPageOpen}
                         close={() => setIsCreateItemPageOpen(false)}
                         addItem={(item) => addItem(item)}
                         categoryName={name}/>
            }
            {
                isEditItemPageOpen &&
                <EditItem isOpen={isEditItemPageOpen}
                          editItem={(item) => editItem(item)}
                          close={closeEditItemPage}
                          categoryName={name}
                          item={itemBeingEditedIndex != -1 ? items[itemBeingEditedIndex] : {
                              name: "",
                              price: 0,
                              imageURL: "",
                              description: "",
                          } as MenuItem}/>
            }


        </div>
    );
}

export default AddCategory;