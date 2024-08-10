import {useState} from "react";
import {MenuSetup, RestaurantDetails, TableConfiguration} from "./SetupSteps";
import {useParams} from "react-router-dom";
import {Category} from "../interfaces.tsx";
import addRecord from "../utils/writeAirtable.ts";


function AccountSetUp() {

    const [setupStep, setSetupStep] = useState<number>(0);
    const {name, recordID} = useParams() as { name: string, recordID: string }


    // Restautant Details Parameters
    const [restaurantNameRestaurantDetails, setRestaurantNameRestaurantDetails] = useState("")
    const [phoneNumberRestaurantDetails, setPhoneNumberRestaurantDetails] = useState("")
    const [addressRestaurantDetails, setAddressRestaurantDetails] = useState("")
    const [descriptionRestaurantDetails, setDescriptionRestaurantDetails] = useState("")
    const [selectedImageRestaurantDetails, setSelectedImageRestaurantDetails] = useState<string | null>(null);


    // Table Configuration Parameters
    const [numberOfTablesTableConfiguration, setNumberOfTablesTableConfiguration] = useState<number>(0);


    // Menu Setup Parameters
    const [categoriesMenuSetupParams, setCategoriesMenuSetupParams] = useState<Category[]>([])


    const steps: { [key: number]: JSX.Element } = {
        0: <RestaurantDetails
            setRestaurantName={(restaurantName: string) => setRestaurantNameRestaurantDetails(restaurantName)}
            setDescription={(description: string) => setDescriptionRestaurantDetails(description)}
            setAddress={(address: string) => setAddressRestaurantDetails(address)}
            setSelectedImage={(imageURL: string | null) => setSelectedImageRestaurantDetails(imageURL)}
            setPhoneNumber={(phoneNumber: string) => setPhoneNumberRestaurantDetails(phoneNumber)}
            restaurantName={restaurantNameRestaurantDetails}
            phoneNumber={phoneNumberRestaurantDetails}
            address={addressRestaurantDetails}
            description={descriptionRestaurantDetails}
            selectedImage={selectedImageRestaurantDetails}/>,
        1: <TableConfiguration
            setNumberOfTables={(numberOfTables: number) => setNumberOfTablesTableConfiguration(numberOfTables)}
            numberOfTables={numberOfTablesTableConfiguration}/>,
        2: <MenuSetup
            restaurantID={recordID}
            setCategories={categories => (setCategoriesMenuSetupParams(categories))}
            categories={categoriesMenuSetupParams}/>,
    };

    function handlePageChange(operation: string) {
        if (operation == '-') {
            setSetupStep(setupStep - 1)
        } else {
            setSetupStep(setupStep + 1)
        }

    }

    function getStep(): JSX.Element | null {
        return steps[setupStep] || null;
    }

    //function concludeAccountSetUp() {
    //
    //    const restaurantID = addRecord("Businesses", {
    //        Name: restaurantNameRestaurantDetails,
    //        Representant: recordID,
    //        phoneNumber: phoneNumberRestaurantDetails,
    //        Banner: selectedImageRestaurantDetails,
    //        Description: descriptionRestaurantDetails,
    //        numberOfTables: numberOfTablesTableConfiguration,
    //        Items:
    //    })
    //}

    return (
        <div className='max-w-[1080px] mx-auto'>
            <div className="container text-center font-poppins py-10">
                <h1 className='text-lg'>Bem vindo(a), &nbsp;
                    <span className='font-poppins-semibold text-stone-500'>{name}</span>!
                </h1>
                <p className='text-2xl my-3 font-poppins-semibold'>
                    {
                        setupStep === 0 ? "Detalhes do restaurante" :
                            setupStep === 1 ? "Configuração das mesas" :
                                "Montagem do menu"
                    }
                </p>
            </div>
            <div className=''>
                <div className="mx-8">
                    <div className=''>
                        {getStep()}
                    </div>
                    <div className='my-10'>
                        {
                            setupStep !== 0 &&
                            <button
                                onClick={() => handlePageChange('-')}
                                type='button'
                                className='px-3 py-1 bg-black rounded-lg text-white font-poppins-semibold border-2 border-gray-300 mr-3'
                            >
                                Voltar
                            </button>
                        }
                        {
                            setupStep !== 2 &&
                            <button
                                type='button'
                                onClick={() => handlePageChange('+')}
                                className='px-3 py-1 bg-black rounded-lg text-white font-poppins-semibold border-2 border-gray-300'
                            >
                                Próximo
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSetUp;