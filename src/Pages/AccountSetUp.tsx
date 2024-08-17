import {useEffect, useState} from "react";
import {MenuSetup, RestaurantDetails, TableConfiguration} from "./SetupSteps";
import {useNavigate, useParams} from "react-router-dom";
import {AirtableItem, Category, ProductProps} from "../interfaces.tsx";
import addRecord from "../utils/writeAirtable.ts";
import {onAuthStateChanged, User} from "firebase/auth";
import auth from "../firebase/firebase.ts";
import AuthError from "./AuthError.tsx";
import updateFieldsInAirtable from "../utils/updateFieldsInAirtable.ts";


function AccountSetUp() {
    const [authUser, setAuthUser] = useState<null | User>(null)
    const navigate = useNavigate();

    //const [promiseTableID, setPromiseTableID] = useState()
    const [setupStep, setSetupStep] = useState<number>(0);
    const {name, recordID} = useParams() as { name: string, recordID: string }
    const [restaurantIDPromise, setRestaurantIDPromise] = useState<null | Promise<string>>(null)
    const [dataCreated, setDataCreated] = useState<boolean>(false)

    // Restautant Details Parameters
    const [restaurantNameRestaurantDetails, setRestaurantNameRestaurantDetails] = useState("")
    const [phoneNumberRestaurantDetails, setPhoneNumberRestaurantDetails] = useState("")
    const [addressRestaurantDetails, setAddressRestaurantDetails] = useState("")
    const [descriptionRestaurantDetails, setDescriptionRestaurantDetails] = useState("")
    const [selectedImageRestaurantDetails, setSelectedImageRestaurantDetails] = useState<string | null>(null);
    const [errorRestaurantDetails, setErrorRestaurantDetails] = useState<string | null>(null)


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
            setSelectedImage={(imageURL: string | null) => setSelectedImageRestaurantDetails(imageURL)}
            setPhoneNumber={(phoneNumber: string) => setPhoneNumberRestaurantDetails(phoneNumber)}
            restaurantName={restaurantNameRestaurantDetails}
            phoneNumber={phoneNumberRestaurantDetails}
            address={addressRestaurantDetails}
            description={descriptionRestaurantDetails}
            selectedImage={selectedImageRestaurantDetails}
            error={errorRestaurantDetails}/>,
        1: <TableConfiguration
            setNumberOfTables={(numberOfTables: number) => setNumberOfTablesTableConfiguration(numberOfTables)}
            numberOfTables={numberOfTablesTableConfiguration}
            error={errorTableConfiguration}/>,
        2: <MenuSetup
            restaurantID={recordID}
            setCategories={categories => (setCategoriesMenuSetupParams(categories))}
            categories={categoriesMenuSetupParams}/>,
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
                if (user) {
                    setAuthUser(user)
                } else {
                    setAuthUser(null)
                }
            }
        )
    }, []);


    useEffect(() => {
        async function setStringRestaurantID() {
            const realRestaurantID = await restaurantIDPromise
            if (realRestaurantID) {
                concludeAccountSetUp2(realRestaurantID)
                setDataCreated(true)
            }
        }

        if (!dataCreated) {
            setStringRestaurantID()
        }
    }, [restaurantIDPromise]);

    function RestaurantDetailsCompleted() {
        return restaurantNameRestaurantDetails != "" &&
            phoneNumberRestaurantDetails != "" &&
            addressRestaurantDetails != "" &&
            selectedImageRestaurantDetails != null &&
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
            concludeAccountSetUp1()
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


    function convertCategoryToAirtableItems(category: Category, restaurantID: string): AirtableItem[] {
        return category.menuItems.map((product: ProductProps): AirtableItem => {
            return product.imageURL ? {
                    Name: product.name,
                    Description: product.description,
                    Owner: [restaurantID],
                    Price: product.price,
                    Category: category.name,
                    image: product.imageURL,
                } :
                {
                    Name: product.name,
                    Description: product.description,
                    Owner: [restaurantID],
                    Price: product.price,
                    Category: category.name
                };
        });
    }


    function concludeAccountSetUp1() {
        // RESTAURANT CREATED
        const restaurantID = addRecord("Businesses",
            selectedImageRestaurantDetails ?
                {
                    Name: restaurantNameRestaurantDetails,
                    Representant: recordID,
                    phoneNumber: phoneNumberRestaurantDetails,
                    Banner: selectedImageRestaurantDetails,
                    Description: descriptionRestaurantDetails,
                    numberOfTables: numberOfTablesTableConfiguration.toString()
                } :
                {
                    Name: restaurantNameRestaurantDetails,
                    Representant: recordID,
                    phoneNumber: phoneNumberRestaurantDetails,
                    Description: descriptionRestaurantDetails,
                    numberOfTables: numberOfTablesTableConfiguration.toString()
                }
        )
        setRestaurantIDPromise(restaurantID)
    }

    function concludeAccountSetUp2(realRestaurantID: string) {
        for (const category of categoriesMenuSetupParams) {
            const items = convertCategoryToAirtableItems(category, realRestaurantID)
            for (const item of items) {
                addRecord("Items", item.image == undefined ? {
                        Name: item.Name,
                        Description: item.Description,
                        Owner: item.Owner,
                        Price: item.Price,
                        Category: item.Category,
                    } : {
                        Name: item.Name,
                        Description: item.Description,
                        Owner: item.Owner,
                        Price: item.Price,
                        Category: item.Category,
                        Image: item.image
                    }
                )
            }

        }
        const table = "Businesses"
        const id = realRestaurantID
        const fieldsToUpdate = {"Representant": [recordID]}
        updateFieldsInAirtable({
            tableName: table,
            recordId: id,
            fieldsToUpdate: fieldsToUpdate,
        })
        for (let i = 1; i <= numberOfTablesTableConfiguration; i++) {
            addRecord("Tables", {
                "Number": i.toString(),
                "Restaurant": [realRestaurantID]
            }).then(tableID =>
                addRecord("Sessions", {
                    "Table": [tableID],
                }))
        }
        navigate(`/neemble-eat/user/rep/${recordID}/`)
    }

    if (!authUser) {
        return <AuthError/>
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