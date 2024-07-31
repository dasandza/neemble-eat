import React, {useState, useRef, useEffect, useCallback} from 'react';
import {CartIcon, CharmLinkExternal, InformationIcon, CrossSign, Check, MenuIcon, CharmPhone} from "../assets/icons";
import Information from '../Components/Information.tsx'
import Category from "../Components/Category.tsx";
import {Link, useParams} from "react-router-dom";
import fetchAirtableRecords from "../utils/fetcher.ts";
import OrganizeMenuItems from "../utils/OrganizeMenuItems.ts";
import {MenuItem, CategoryData, Business, CartItem, MenuPageParams} from '../interfaces.tsx'
import {decodeString, encodeString} from "../utils/urlhandler.ts";
import {getCartFromLocalStorage, initializeCartInLocalStorage, getItemsInTheCartNumber} from "../utils/cartCRUD.ts";
import {LoadingMenu} from "./LoadingPages";

function Menu(): React.ReactElement {
    const existingCart = getCartFromLocalStorage()
    const cart: Array<CartItem> = existingCart ? existingCart : initializeCartInLocalStorage()

    const [selectedCategory, setSelectedCategory] = useState("none")
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [refs, setRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
    // ---

    const [isInformationVisible, setIsInformationVisible] = useState(false)
    // ---
    // Extract parameters from URL
    const {encodedPlaceName, tableNumber} = useParams() as unknown as MenuPageParams;

    const place = decodeString(encodedPlaceName)

    // State declarations
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [records, setRecords] = useState<Business[]>([]);
    const [airtableItems, setAirtableItems] = useState<MenuItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [business, setBusiness] = useState<Business>()

    useEffect(() => {
        // Initialize refs when categories are ready
        if (categories.length > 0) {
            setRefs(categories.map(() => React.createRef<HTMLDivElement>()));
        }
    }, [categories]);

    // UseEffect to fetch data
    useEffect(() => {
        async function fetchData() {
            try {
                let storedItemsData = sessionStorage.getItem('Items');
                let storedBusinessData = sessionStorage.getItem('Businesses');
                const data: Business[] | null = storedBusinessData ? JSON.parse(storedBusinessData) : null
                if (data && data[0].fields.Name.toLowerCase() != place.toLowerCase()) {
                    storedBusinessData = null
                    storedItemsData = null
                    sessionStorage.clear()
                }
                if (storedItemsData) {
                    setAirtableItems(JSON.parse(storedItemsData))
                } else {
                    const itemsData = await fetchAirtableRecords("Items");
                    sessionStorage.setItem('Items', JSON.stringify(itemsData));
                    setAirtableItems(itemsData);
                }
                if (storedBusinessData) {
                    setRecords(JSON.parse(storedBusinessData))
                } else {
                    const businessesData = await fetchAirtableRecords("Businesses");
                    sessionStorage.setItem('Businesses', JSON.stringify(businessesData));
                    setRecords(businessesData);
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, [place]);

    // Function to organize data
    const organizeMenuItems = useCallback((list: MenuItem[], name: string): CategoryData[] => {
        // Function logic remains unchanged
        return OrganizeMenuItems(list, name); // Replace with actual implementation
    }, []);

    // Function to filter businesses by name
    const filterBusinessesByName = useCallback((businesses: Business[], name: string): Business[] => {
        return businesses.filter(business => business.fields.Name.toLowerCase() === name.toLowerCase());
    }, []);


    // Function to filter items by a list of item IDs
    const filterItems = useCallback((items: MenuItem[], list: string[]): MenuItem[] => {
        return items.filter(item => list.includes(item.id));
    }, []);

    // Filtering businesses
    const businessList = filterBusinessesByName(records, place);

    useEffect(() => {
        const temp = filterBusinessesByName(records, place)
        setBusiness(temp[0])
    }, [records]);

    // Extracting and filtering items from the first business
    const itemsList = businessList.length > 0 && businessList[0].fields.Items ? filterItems(airtableItems, businessList[0].fields.Items) : [];

    // UseEffect to organize items once they are ready
    useEffect(() => {
        if (itemsList.length > 0) {
            const organized = organizeMenuItems(itemsList, place);
            setCategories(organized);
        }
    }, [itemsList.length]);

    // Error handling UI
    if (error) {
        return <div>Error loading data!</div>;
    }

    // Loading state UI
    if (!records.length || !airtableItems.length || business == undefined) {
        return <LoadingMenu/>
    }


    const toggleInformationVisibility = () => {
        setIsInformationVisible(!isInformationVisible);
    };

    const scrollToCategory = (index: number) => {
        if (refs[index] && refs[index].current) {
            const element = refs[index].current;
            const yOffset = -90; // Adjust this value as needed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    function handleSelectCategory(category: string, index: number) {
        setSelectedCategory(category)
        scrollToCategory(index)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {  // Null check
            setIsDragging(true);
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        if (scrollContainerRef.current) {
            e.preventDefault();
            const x = e.pageX - scrollContainerRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            scrollContainerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const closedRestaurant = <div className='font-medium px-1.5 py-0.5 rounded-md flex items-center bg-gray-300'>
        <CrossSign className='mr-1'></CrossSign>
        <p className='prevent-select no cursor-default text-gray-700'>Fechado</p>
    </div>

    const openRestaurant = <div className='font-medium px-1.5 py-0.5 rounded-md flex items-center bg-green-100'>
        <Check className='mr-1'></Check>
        <p className='prevent-select text-emerald-800 cursor-default '>Aberto</p>
    </div>

    const open = true;

    return <div>
        <div className='font-poppins laptop:mx-6 mx-4 mt-2'>
            <div className='flex justify-between items-center '>
                <Link to={`/neemble-eat/o/${encodeString(place)}/${tableNumber}`}>
                    <div
                        className='flex items-center justify-center rounded-xl w-fit px-3 py-1 my-3 bg-gray-200 shadow-inner'>
                        <p className='text-sm'>
                            Pedidos
                        </p>
                    </div>
                </Link>
                <Link to={`/neemble-eat/c/${encodeString(place)}/${tableNumber}`}>
                    <div
                        className='flex  items-center justify-center rounded-xl w-fit px-3 py-1 my-2 bg-gray-200 shadow-inner'>
                        <p className='text-sm mr-1'>
                            {getItemsInTheCartNumber(cart)}
                        </p>
                        <CartIcon className='ml-1'></CartIcon>
                    </div>
                </Link>
            </div>
            <div className='  header-grid-container grid gap-4 laptop:gap-5'>
                <div
                    className='main-image bg-gray-400 justify-center rounded-3xl flex items-center overflow-hidden'>
                    {
                        <img
                            src={business.fields.Banner[0].url}
                            alt="description of image"
                            className='rounded-lg object-cover w-full max-h-60'
                        />
                    }

                </div>
                <div className='title-container font-bold rounded-md flex items-center'>
                    {
                        businessList.map((business, index) =>
                            <p className='title text-4xl'
                               key={index}>
                                {business.fields.Name}
                            </p>
                        )
                    }
                </div>
                <div className='description'>
                    {
                        businessList.map((business, index) =>
                            <p className='w-3/5'
                               key={index}>
                                {business.fields.Description}
                            </p>
                        )
                    }


                </div>
                <div className='main-buttons font-bold rounded-md flex items-center pt-2'>
                    {open ? openRestaurant : closedRestaurant}
                    <div
                        className='cursor-pointer font-medium px-1.5 py-0.5 ml-5 rounded-md border border-gray-200 flex items-center hover:bg-gray-200 transition-colors duration-300 hover:border-gray-400'>
                        <InformationIcon className='mr-1'/>
                        <button
                            className='prevent-select text-gray-700'
                            onClick={toggleInformationVisibility}>Info
                        </button>
                    </div>
                    <div
                        className='flex ml-5 rounded-md border border-gray-200 px-1.5 py-0.5 prevent-select'>
                        <p className='font-medium'>Mesa:&nbsp;</p>
                        <p className='font-light'>{tableNumber}</p>

                    </div>
                </div>
            </div>
            <div className='sticky top-0 bg-white z-10 pt-4'>
                <div className='flex items-center'>
                    <div><MenuIcon className='menuicon mr-4'/></div>
                    <div
                        className='border-b border-gray-200 overflow-x-auto styled-scrollbar mt-4 flex-1'
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        style={{cursor: isDragging ? 'grabbing' : 'grab'}}
                    >
                        <div
                            className='categories flex items-center text-gray-600 font-semibold cursor-pointer prevent-select whitespace-nowrap'>
                            {categories.map((category, index) => <div
                                key={index}
                                className={`mb-0 pb-4 text-sm mr-7 ${selectedCategory === category.name ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
                                onClick={() => handleSelectCategory(category.name, index)}
                            >
                                {category.name}
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                {categories.map((category, index) => <div key={index}>
                    <Category
                        key={`category-${index}`}
                        ref={refs[index]}
                        name={category.name}
                        products={category.products}
                        placeName={businessList[0].fields.Name}
                        tableNumber={tableNumber}>
                    </Category>
                </div>)}
            </div>
        </div>
        <div className='bg-gray-200 laptop:mt-6'>
            <div className='pt-5 pb-10 border-b border-gray-300 px-5 laptop:px-9'>
                {
                    businessList.map((business, index) =>
                        <h1 className='font-semibold text-2xl laptop:text-3xl mb-1.5 laptop:mb-3'
                            key={index}>
                            {business.fields.Name}
                        </h1>
                    )
                }
                <div className='flex items-center'>
                    <CharmPhone
                        className='mt-0.5'>

                    </CharmPhone>
                    <p className='ml-1 text-sm text-gray-600 font-semibold'>
                        {
                            businessList.map((business, index) =>
                                <a
                                    href={`tel:${business.fields.phoneNumber}`}
                                    key={index}>
                                    {business.fields.phoneNumber}
                                </a>
                            )
                        }

                    </p>
                </div>
            </div>
            <div className='flex justify-between pt-4 pb-16 px-5 laptop:px-9'>
                <div className='text-gray-600 underline text-sm'>
                    <div>
                        <a href="#" className='flex items-center'>
                            <p className='mr-1.5'>Política de Privacidade</p>
                            <CharmLinkExternal></CharmLinkExternal>
                        </a>
                    </div>
                    <div>
                        <a href="#" className='flex items-center'>
                            <p className='mr-1.5'>Termos de Serviço</p>
                            <CharmLinkExternal></CharmLinkExternal>
                        </a>
                    </div>
                </div>
                <div className='flex items-end'>
                    <h2 className='font-bold text-gray-600 text-sm'>Powered by <a
                        href="https://www.neemble.net"
                        className='hover:text-gray-400 transition-colors duration-300'
                    >neemble</a>
                    </h2>
                </div>
            </div>
        </div>
        {
            isInformationVisible &&
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white w-full max-w-md rounded-3xl shadow-lg">
                    <Information onClose={toggleInformationVisibility}/>
                </div>
            </div>
        }
    </div>
}

export default Menu;