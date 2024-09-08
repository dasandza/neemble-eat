import {Category as CategoryInterface, MenuItem, Menu, RestaurantJson} from "../schema.ts";
import {Category, Header, CategoriesBar, Footer, ProductPage} from "../Components/Menu";
import React, {useEffect, useRef, useState} from "react";
import {fetchMenuParsed, fetchRestaurant} from "../api";
import {getCartFromLocalStorage, initializeCartInLocalStorage} from "../utils/cartCRUD.ts";
import {useParams} from "react-router-dom";
import {LoadingMenu} from "./LoadingPages";


function NewMenu() {

    const existingCart = getCartFromLocalStorage()
    if (!existingCart) {
        initializeCartInLocalStorage()
    }

    const open = true

    const [selectedCategory, setSelectedCategory] = useState<CategoryInterface>()
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [refs, setRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>()

    const [restaurant, setRestaurant] = useState<RestaurantJson>()
    const [menu, setMenu] = useState<Menu>()
    const [categories, setCategories] = useState<CategoryInterface[]>()


    const {restaurantID, menuID, tableNumber} = useParams() as unknown as {
        restaurantID: string,
        menuID: string,
        tableNumber: number
    };

    useEffect(() => {
        const handleBeforeUnload = () => {

            // To show a confirmation dialog:
            sessionStorage.removeItem("Menu"
            )
        };

        // Add event listener for before unload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    useEffect(() => {
        if (categories) {
            setRefs(categories.map(() => React.createRef<HTMLDivElement>()));
        }
    }, [categories]);


    useEffect(() => {
        async function fetch() {
            let storedRestaurantData = sessionStorage.getItem('Restaurant');
            let storedMenuData = sessionStorage.getItem("Menu")
            let restaurantInfoStored: RestaurantJson | null = storedRestaurantData ? JSON.parse(storedRestaurantData) : null
            let menuInfoStored: Menu | null = storedMenuData ? JSON.parse(storedMenuData) : null

            if (!restaurantInfoStored) {
                sessionStorage.clear()
                localStorage.clear()
                storedRestaurantData = null
                storedMenuData = null
            } else {
                if (restaurantInfoStored.id != restaurantID) {
                    sessionStorage.clear()
                    localStorage.clear()
                    storedRestaurantData = null
                    storedMenuData = null
                }
            }
            if (!menuInfoStored) {
                sessionStorage.clear()
                localStorage.clear()
                storedRestaurantData = null
                storedMenuData = null
            } else {
                if (menuInfoStored.id != menuID) {
                    sessionStorage.clear()
                    localStorage.clear()
                    storedRestaurantData = null
                    storedMenuData = null
                }
            }

            if (!restaurantInfoStored || !menuInfoStored) {

                restaurantInfoStored = await fetchRestaurant({restaurantID: restaurantID})
                menuInfoStored = await fetchMenuParsed({menuID: menuID})
            }
            console.log(menuInfoStored)

            menuInfoStored.categories = menuInfoStored.categories?.filter((category) => {
                const isEmpty = category.items.length == 0

                if (isEmpty) {
                    return false
                }
                for (const item of category.items) {
                    if (item.availability) {
                        return true
                    }
                }
                return false
            })

            sessionStorage.setItem("Menu", JSON.stringify(menuInfoStored))
            sessionStorage.setItem("Restaurant", JSON.stringify(restaurantInfoStored))
            setRestaurant(restaurantInfoStored)
            setMenu(menuInfoStored)
            setCategories(menuInfoStored.categories)
        }

        fetch().then()
    }, []);

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

    const scrollToCategory = (index: number) => {
        if (refs[index] && refs[index].current) {
            const element = refs[index].current;
            const yOffset = -90; // Adjust this value as needed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    function handleSelectCategory(category: CategoryInterface, index: number) {
        setSelectedCategory(category)
        scrollToCategory(index)
    }


    if (selectedItem && restaurant) {
        return <ProductPage item={selectedItem}
                            disSelectItem={() => setSelectedItem(null)}
                            menuID={menuID}
                            restaurantID={restaurant?.id}
                            tableNumber={tableNumber}/>
    }

    if (!categories || !menu || !restaurant) {
        return <LoadingMenu/>
    }

    return (
        <div className=''>
            <div className={``}>
                <Header
                    menuID={menuID}
                    tableNumber={tableNumber}
                    open={open}
                    restaurantID={restaurant.id}
                    restaurantName={restaurant?.name}
                    description={restaurant.description}/>
                {
                    categories &&
                    <CategoriesBar categories={categories}
                                   handleMouseDown={(e) => handleMouseDown(e)}
                                   handleMouseLeaveOrUp={handleMouseLeaveOrUp}
                                   handleMouseMove={(e) => handleMouseMove(e)}
                                   handleSelectCategory={(category, index) => handleSelectCategory(category, index)}
                                   selectedCategory={selectedCategory}
                                   isDragging={isDragging}
                                   scrollContainerRef={scrollContainerRef}/>
                }
            </div>
            <div className={``}>
                {
                    categories &&
                    categories.map((category, index) =>
                        <div key={index} ref={refs[index]}>
                            <Category category={category}
                                      selectItem={(item) => setSelectedItem(item)}
                            />
                        </div>
                    )
                }
                <div>
                    <Footer restaurantName={restaurant.name}
                            phoneNumber={restaurant.phoneNumber}/>
                </div>
            </div>
        </div>
    );
}

export default NewMenu;