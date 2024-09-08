import {MenuItem} from "../../../schema.ts";
import React, {ChangeEvent, useState} from "react";
import {ImageUpload} from "../../../assets/icons";
import {Switcher} from "../index.ts";

interface props {
    addItem: (item: MenuItem) => void;
    close: () => void;
    categoryName: string;
}

function AddItem({addItem, close, categoryName}: props) {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isAvailable, setIsAvailable] = useState<boolean>(true)


    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (name !== "" && imageFile) {
            addItem({
                name: name,
                description: description ? description : "",
                price: Number(price ? price : "0"),
                imageURL: imageURL,
                imageFile: imageFile,
                availability: isAvailable,
            } as MenuItem);
        }
        handleClose()
    }

    function handleClose() {
        setName("")
        setPrice("")
        handleImageRemoval()
        setDescription("")
        close()
    }

    function handleImageRemoval() {
        setImageURL(null)
        setImageFile(null)
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = getFile(e);
        if (file && file.type.startsWith('image/')) {
            setImageFile(file)
            setImageURL(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file.');
        }
    };

    const getFile = (e: ChangeEvent<HTMLInputElement>): File | undefined => {
        return e.target.files?.[0]
    }


    return (
        <div className={`text-black`}>
            <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 rounded-t rounded-lg">
                <div className="flex items-center justify-center w-full h-full">
                    <form onSubmit={handleSave} className="bg-white w-full h-full overflow-auto">
                        {/* HEADER */}
                        <div
                            className="flex justify-between items-center fixed bg-white w-full py-4 laptop:py-8 laptop:px-16 px-4 z-10">
                            <div className='flex items-center space-x-3'>
                                <p className='font-poppins-semibold text-lg'>
                                    Criar Prato
                                </p>
                                {
                                    categoryName != "" &&
                                    <p className={'bg-gray-200 font-poppins-semibold rounded-[3px] px-2 py-0.5 text-sm hidden laptop:block'}>
                                        {categoryName}
                                    </p>
                                }
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className="px-3 py-1 text-sm laptop:text-base bg-blue-600 hover:bg-blue-700 rounded-md text-white font-poppins-semibold mr-3"
                                >
                                    Salvar
                                </button>
                                <button
                                    type='button'
                                    className="px-3 py-1 text-sm laptop:text-base text-white bg-black rounded-md font-poppins-semibold"
                                    onClick={handleClose}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>

                        {/* BODY */}
                        <div className="overflow-auto laptop:px-16 px-4 mt-20 laptop:mt-28">
                            <div className='laptop:w-[60%]'>
                                <div>
                                    <div className={`flex mb-4`}>
                                        <Switcher isChecked={isAvailable}
                                                  setIsChecked={(value) => setIsAvailable(value)}/>
                                        <div className={`font-poppins-medium prevent-select `}>
                                            {
                                                isAvailable ?
                                                    <h1 className={`text-blue-400 bg-blue-100 px-2 py-0.5 rounded-md transition`}>
                                                        Disponível
                                                    </h1> :
                                                    <h1 className={`text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md transition`}>
                                                        Indisponível
                                                    </h1>
                                            }
                                        </div>
                                    </div>
                                    <label htmlFor="name" className='text-sm ml-1 font-poppins-semibold'>
                                        Nome<span className='text-red-500'>*</span>
                                    </label>
                                    <div className="relative mb-6">
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                                            placeholder="Nome do prato"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className='text-sm font-poppins-semibold ml-1'>
                                        Descrição do prato
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <div className="relative mb-6">
                                    <textarea
                                        id="description"
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500"
                                        placeholder="Descrição"
                                    ></textarea>
                                    </div>
                                </div>

                                <div className='flex items-center space-x-3'>
                                    <div>
                                        <label htmlFor="price" className='text-sm ml-1 font-poppins-semibold'>
                                            Preço<span className='text-red-500'>*</span>
                                        </label>
                                        <div className="relative mb-6">
                                            <input
                                                type="number"
                                                id="price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                                                placeholder="Preço em Kwanza"
                                            />
                                        </div>
                                    </div>
                                    <p className='italic font-poppins-semibold'>
                                        Kz
                                    </p>
                                </div>

                                <div className='w-fit mb-20'>
                                    <p className='text-sm font-poppins-semibold ml-1'>
                                        Selecione uma imagem para o seu prato
                                    </p>
                                    <div className="py-4 px-1.5">
                                        {
                                            !imageURL &&
                                            <label
                                                className="w-40 h-24 flex flex-col items-center justify-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                                                <ImageUpload/>
                                                <input
                                                    type="file"
                                                    id='bannerImage'
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        }

                                        {imageURL && (
                                            <div>
                                                <div
                                                    className='flex items-center justify-center border-[1px] border-gray-300 rounded-lg pb-3 mb-4 bg-gray-100'>
                                                    <div
                                                        className="flex items-center justify-center mt-4 w-32 h-20 overflow-hidden">
                                                        <img src={imageURL} alt="Banner Preview"
                                                             className="object-contain w-full h-full"/>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleImageRemoval}
                                                    className='rounded-lg hover:bg-gray-300 transition-colors duration-300 bg-gray-200 border border-gray-300 px-3 py-1 font-poppins-semibold'>
                                                    Remover imagem
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default AddItem;