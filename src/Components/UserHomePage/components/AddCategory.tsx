import {BinIcon, CharmCross} from "../../../assets/icons";
import {useState} from "react";
import {AddItem, EditItem} from "../index.ts";
import {MenuItem, Category} from "../../../schema.ts";

interface props {
    close: () => void,
    addCategory: (category: Category) => void,
}

function AddCategory({close, addCategory}: props) {

    const [name, setName] = useState<string>("")
    const [items, setItems] = useState<MenuItem[]>([])
    const [addingItem, setAddingItem] = useState<boolean>(false)
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)


    function openAddItemPage() {
        setAddingItem(true)
    }

    function closeAddItemPage() {
        setAddingItem(false)
    }

    function closeEditItemPage() {
        setSelectedItemIndex(null)
    }

    function deleteItem(itemToBeDeleted: MenuItem) {
        if (items.length == 1)
            setItems([])
        else
            setItems(items.filter((item) => item != itemToBeDeleted))
    }

    function openEditItemPage(index: number) {
        setSelectedItemIndex(index)
    }

    function addItem(item: MenuItem) {
        setItems(items.concat(item))
    }

    function editItem(selectedIndex: number, editedItem: MenuItem) {
        setItems(items.map((item, index) => index == selectedIndex ? editedItem : item))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addCategory({
            name: name,
            items: items,
        } as Category)
    }

    function handleClose() {
        setName("")
        setItems([])
        close()
    }


    if (addingItem) {
        return <AddItem addItem={(item) => addItem(item)}
                        close={closeAddItemPage}
                        categoryName={name}/>
    }

    if (selectedItemIndex != null) {
        return <EditItem editItem={(index, item) => editItem(index, item)}
                         index={selectedItemIndex}
                         close={closeEditItemPage}
                         categoryName={name}
                         item={items[selectedItemIndex]}/>
    }

    return (
        <div className={`p-6 border-[1.5px] border-gray-200 rounded-md text-black`}>
            <div className="flex justify-between items-center">
                <h1 className='font-poppins-semibold text-black text-base'>
                    Criar Categoria
                </h1>
                <CharmCross className={`cursor-pointer`}
                            onClick={handleClose}/>
            </div>
            <div className="flex items-center justify-center w-full h-full">

                <form action="" onSubmit={handleSave} className="bg-white w-full h-full overflow-auto my-5">
                    <div className=''>
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
                                    onClick={openAddItemPage}
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
                    <button
                        type='submit'
                        className={`px-6 py-1.5 mt-8 text-sm laptop:text-sm bg-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-150 hover:bg-gray-700 rounded-md text-white font-poppins-semibold`}>
                        Salvar
                    </button>
                </form>

            </div>
        </div>
    );
}

export default AddCategory;