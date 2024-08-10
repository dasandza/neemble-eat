import {ChangeEvent} from "react";
import {PhoneIcon, ImageUpload, LocationIcon} from "../../assets/icons";


interface RestaurantDetailsProps {
    restaurantName: string,
    phoneNumber: string,
    address: string,
    description: string,
    selectedImage: string | null,

    setRestaurantName: (name: string) => void,
    setPhoneNumber: (phoneNumber: string) => void,
    setAddress: (address: string) => void,
    setDescription: (description: string) => void,
    setSelectedImage: (imageURL: string | null) => void,

}

function RestaurantDetails({
                               setRestaurantName,
                               restaurantName,
                               address,
                               setAddress,
                               setSelectedImage,
                               selectedImage,
                               setDescription,
                               description,
                               setPhoneNumber,
                               phoneNumber
                           }: RestaurantDetailsProps) {
    //const [error, setError] = useState<string>("")


    function handleImageRemoval() {
        setSelectedImage(null)
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
            console.log(URL.createObjectURL(file))
        } else {
            alert('Por favor selecione uma imagem.');
        }
    };

    return (
        <div className='laptop:flex laptop:divide-x-[1px] laptop:divide-gray-300 justify-center'>
            <div className='laptop:mr-12'>
                <div className=''>
                    <label htmlFor="bannerImage" className='text-sm font-poppins-semibold ml-1'>
                        Adicione uma imagem de fundo
                    </label>
                    <div className='w-fit'>
                        <div className="flex flex-col items-center justify-center p-4">
                            {
                                !selectedImage &&
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

                            {selectedImage && (
                                <div>
                                    <div
                                        className='flex items-center justify-center border-[1px] border-gray-300 rounded-lg pb-3 mb-4 bg-gray-100'>
                                        <div
                                            className="flex items-center justify-center mt-4 w-32 h-20 overflow-hidden">
                                            <img src={selectedImage} alt="Banner Preview"
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
            <form action="" className='laptop:pl-12'>
                <div>
                    <label htmlFor="restaurantName" className='text-sm font-poppins-semibold ml-1'>
                        Qual é o nome do seu restaurante?
                        <span className='text-red-500'>*</span>
                    </label>
                    <div className="relative mb-6">
                        <input type="text"
                               id="restaurantName"
                               value={restaurantName}
                               onChange={(e) => setRestaurantName(e.target.value)}
                               className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="nome do restaurante"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="phoneNumber" className='text-sm font-poppins-semibold ml-1'>
                        Número de telefone
                        <span className='text-red-500'>*</span>
                    </label>

                    <div className="relative mb-6">
                        <div
                            className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <PhoneIcon/>

                        </div>
                        <input type="tel" id="phoneNumber"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}
                               className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                               placeholder="número do restaurante"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className='text-sm font-poppins-semibold ml-1'>
                        Onde está localizado o seu restaurante
                        <span className='text-red-500'>*</span>
                    </label>
                    <div className="relative mb-6">
                        <div
                            className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <LocationIcon/>

                        </div>
                        <input type="text" id="address"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               className="border border-gray-300 text-gray-900 text-sm hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                               placeholder="endereço"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className='text-sm font-poppins-semibold ml-1'>
                        Descreva o seu restaurante
                        <span className='text-red-500'>*</span>
                    </label>

                    <div className="relative mb-6">
                        <textarea id="description" rows={5}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-300 rounded-lg focus:ring-blue-500"
                                  placeholder="Descrição"></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RestaurantDetails;