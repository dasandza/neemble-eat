import {Restaurant, RestaurantJson, Category, MenuJson} from "../schema.ts";
import {
    createMenu,
    createRestaurant,
    addMenuCategory,
    addCategoryItem,
    createRestaurantTable,
    assignOwner
} from "../api";

interface props {
    representantID: string
    categories: Category[]
    numberOfTables: number

}

async function ConcludeAccountSetUp({representantID, categories, numberOfTables}: props, {
    name,
    address,
    phoneNumber,
    bannerFile,
    description
}: Restaurant) {
    const restaurantData: RestaurantJson | void = await createRestaurant({
        name: name,
        description: description,
        address: address,
        phoneNumber: phoneNumber,
        bannerFile: bannerFile
    } as Restaurant).catch((error) => {
        console.error(error)
    })


    if (restaurantData) {
        console.log(representantID)
        console.log(restaurantData.id)
        await assignOwner({
            accountID: representantID,
            restaurantID: restaurantData.id,
        })


        const menuData: MenuJson = await createMenu({name: "Menu", restaurantID: restaurantData.id})
        for (const category of categories) {
            const category_json = await addMenuCategory({
                name: category.name,
                description: category.description,
                menuID: menuData.id
            })
            const categoryID = category_json.id
            for (const item of category.items) {
                if (item.imageFile != null) {
                    await addCategoryItem({
                        name: item.name,
                        description: item.description ? item.description : "",
                        imageFile: item.imageFile,
                        price: item.price,
                        categoryID: categoryID
                    })
                }
            }
        }
        for (let number = 0; number < numberOfTables; number++) {
            await createRestaurantTable({restaurantID: restaurantData.id})
        }
    }

}


export default ConcludeAccountSetUp;