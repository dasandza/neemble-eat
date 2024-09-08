import {Category, MenuItem} from "../../../schema.ts";
import ProductCard from "../../ProductCard.tsx";


interface props {
    category: CategoryParsed
    selectItem: (item: MenuItemJson) => void

}

function Category({category, selectItem}: props) {
    return (
        <div className={`mt-4 px-4`}>
            <h1 className={`text-2xl font-poppins-semibold laptop:px-4`}>
                {category.name}
            </h1>
            <div className={`laptop:columns-2 gap-0`}>
                {
                    category.items.map((item, index) =>
                        item.availability &&
                        <div key={index}
                             className={` break-inside-avoid laptop:p-3`}
                             onClick={() => selectItem(item)}>
                            <ProductCard item={item}/>
                        </div>
                    )
                }
            </div>


        </div>
    );
}

export default Category;