import {useEffect, useState} from "react";
import {MenuSetup, RestaurantDetails, TableConfiguration} from "./SetupSteps";
import {useNavigate, useParams} from "react-router-dom";
// import {User} from "firebase/auth";
import {useAuth} from "../AuthContext.tsx";
import {Category} from "../schema.ts"
import ConcludeAccountSetUp from "../service/ConcludeAccountSetUp.ts";
import LoadingAccountSetUp from "./LoadingPages/pages/LoadingAccountSetUp.tsx";
import {Navigate} from 'react-router-dom';

function AccountSetUp() {
    const {user} = useAuth();

    const navigate = useNavigate();
    const [done, setDone] = useState<boolean>(false)

    //const [promiseTableID, setPromiseTableID] = useState()
    const [setupStep, setSetupStep] = useState<number>(0);
    const {name, representantID} = useParams() as { name: string, representantID: string }


    // Restautant Details Parameters
    const [restaurantNameRestaurantDetails, setRestaurantNameRestaurantDetails] = useState("")
    const [phoneNumberRestaurantDetails, setPhoneNumberRestaurantDetails] = useState("")
    const [addressRestaurantDetails, setAddressRestaurantDetails] = useState("")
    const [descriptionRestaurantDetails, setDescriptionRestaurantDetails] = useState("")
    const [selectedImageURLRestaurantDetails, setSelectedImageURLRestaurantDetails] = useState<string | null>(null);
    const [errorRestaurantDetails, setErrorRestaurantDetails] = useState<string | null>(null)
    const [selectedImageFileRestaurantDetails, setSelectedImageFileRestaurantDetails] = useState<File | null>(null);


    // Table Configuration Parameters
    const [numberOfTablesTableConfiguration, setNumberOfTablesTableConfiguration] = useState<number>(0);
    const [errorTableConfiguration, setErrorTableConfigurationTableConfiguration] = useState<string | null>(null)


    // Menu Setup Parameters
    const [categoriesMenuSetupParams, setCategoriesMenuSetupParams] = useState<Category[]>([])


    const steps: { [key: number]: JSX.Element } = {
        0: <RestaurantDetails
            setRestaurantName={(restaurantName: string) => setRestaurantNameRestaurantDetails(restaurantName)}
            setDescription={(description: string) => setDescriptionRestaurantDetails(description)}
            setAddress={(address: string) => setAddressRestaurantDetails(address)}
            setSelectedImageURL={(imageURL: string | null) => setSelectedImageURLRestaurantDetails(imageURL)}
            setSelectedImageFile={(imageFile: File | null) => setSelectedImageFileRestaurantDetails(imageFile)}
            setPhoneNumber={(phoneNumber: string) => setPhoneNumberRestaurantDetails(phoneNumber)}
            restaurantName={restaurantNameRestaurantDetails}
            phoneNumber={phoneNumberRestaurantDetails}
            address={addressRestaurantDetails}
            description={descriptionRestaurantDetails}
            selectedImageURL={selectedImageURLRestaurantDetails}
            selectedImageFile={selectedImageFileRestaurantDetails}
            error={errorRestaurantDetails}/>,
        1: <TableConfiguration
            setNumberOfTables={(numberOfTables: number) => setNumberOfTablesTableConfiguration(numberOfTables)}
            numberOfTables={numberOfTablesTableConfiguration}
            error={errorTableConfiguration}/>,
        2: <MenuSetup
            setCategories={categories => (setCategoriesMenuSetupParams(categories))}
            categories={categoriesMenuSetupParams}/>,
    };

    useEffect(() => {
        if (!name || !representantID) {
            navigate(`/neemble-eat/login/`)
        }
    }, []);


    useEffect(() => {
        async function conclude() {
            if (selectedImageFileRestaurantDetails != null) {
                await ConcludeAccountSetUp({
                        numberOfTables: numberOfTablesTableConfiguration,
                        categories: categoriesMenuSetupParams,
                        representantID: representantID
                    },
                    {
                        name: restaurantNameRestaurantDetails,
                        description: descriptionRestaurantDetails,
                        bannerFile: selectedImageFileRestaurantDetails,
                        phoneNumber: phoneNumberRestaurantDetails,
                        address: addressRestaurantDetails,
                    }
                ).then(() =>
                    navigate(`/neemble-eat/user/rep/${representantID}/`)
                )
            }
        }

        if (done) {
            conclude().then()
        }

    }, [done]);


    function RestaurantDetailsCompleted() {
        return restaurantNameRestaurantDetails != "" &&
            phoneNumberRestaurantDetails != "" &&
            addressRestaurantDetails != "" &&
            selectedImageURLRestaurantDetails != null &&
            selectedImageFileRestaurantDetails != null &&
            descriptionRestaurantDetails != "";

    }

    function TableConfigurationCompleted() {
        return numberOfTablesTableConfiguration != 0
    }


    function handlePageChange(operation: string) {
        let blocker = false;

        if (setupStep == 0 && !RestaurantDetailsCompleted() && operation == "+") {
            blocker = true
            setErrorRestaurantDetails("Complete todos os campos")
        }

        if (setupStep == 1 && !TableConfigurationCompleted() && operation == "+") {
            blocker = true
            setErrorTableConfigurationTableConfiguration("Digite o número de mesas")
        }

        if (setupStep == 2 && categoriesMenuSetupParams.length != 0 && operation == "+") {
            setDone(true)
            blocker = true
        }

        if (setupStep == 2 && categoriesMenuSetupParams.length == 0 && operation == "+") {
            blocker = true
        }
        if (!blocker) {
            setErrorRestaurantDetails(null)
            setErrorTableConfigurationTableConfiguration(null)
            if (operation == '-') {
                setSetupStep(setupStep - 1)
            } else {
                setSetupStep(setupStep + 1)
            }
        }
    }

    function getStep(): JSX.Element | null {
        return steps[setupStep] || null;
    }


    if (done) {
        return <LoadingAccountSetUp/>
    }

    if (!user) {
        return <Navigate to={`/neemble-eat/auth-error`}/>
    }

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

                        <button
                            type='button'
                            onClick={() => handlePageChange('+')}
                            className={`px-3 py-1 ${setupStep == 2 && categoriesMenuSetupParams.length == 0 ? "cursor-not-allowed bg-gray-400" : "bg-black"} rounded-lg text-white font-poppins-semibold border-2 border-gray-300`}
                        >
                            {setupStep == 2 ? "Concluir" : "Próximo"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSetUp;