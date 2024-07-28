//import {MenuItem, CategoryData} from "../Components/interfaces.tsx";
import {MenuItem, CategoryData} from "../interfaces.tsx"


function organizeMenuItems(menuItems: MenuItem[], place: string): CategoryData[] {
    const categoryMap = new Map<string, CategoryData>();

    for (const menuItem of menuItems) {
        const category = menuItem.fields.Category;
        const product = {
            name: menuItem.fields.Name,
            description: menuItem.fields.Description,
            price: menuItem.fields.Price,
            record_id: menuItem.id,
            imageURL: menuItem.fields.Image != null ? menuItem.fields.Image[0].url : '' // Handle missing imageURL
        };

        if (categoryMap.has(category)) {
            categoryMap.get(category)!.products.push(product);
        } else {
            categoryMap.set(category, {
                name: category,
                products: [product],
                placeName: place
            });
        }
    }

    return Array.from(categoryMap.values());
}

export default organizeMenuItems;