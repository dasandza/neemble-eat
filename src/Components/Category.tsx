import ProductCard from "./ProductCard.tsx";
import {Link} from "react-router-dom";
import {encodeString} from "../utils/urlhandler.ts";
import {CategoryParsed} from "../schema.ts";


interface props {
    restaurantName: string,
    tableNumber: number
    category: CategoryParsed
}

function Category({category, restaurantName, tableNumber}: props) {
    return (
        <div>
            <div ref={ref} className='laptop:pl-0'>
                <h1 className='text-3xl mt-6'>{category.name}</h1>
                <div
                    className='category-container laptop:border-none mt-1 laptop:mt-5 grid grid-cols-1 laptop:gap-5 laptop:grid-cols-2'>
                    {category.items.map((item, index) => (
                        <Link
                            to={`/neemble-eat/p/${encodeString(restaurantName)}/${tableNumber}/${item.id}`}
                            key={`${category.name}-product-${index}`}
                        >
                            <ProductCard item={item}/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;