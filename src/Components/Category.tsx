import ProductCard from "./ProductCard.tsx";
import {CategoryData} from "../interfaces.tsx";
import React from "react";
import {Link} from "react-router-dom";
import {encodeString} from "../utils/urlhandler.ts";


const Category = React.forwardRef<HTMLDivElement, CategoryData & { tableNumber: string }>(({
                                                                                               name,
                                                                                               products,
                                                                                               placeName,
                                                                                               ...rest
                                                                                           }, reference) => (
    <div>
        <div ref={reference}
             className='laptop:pl-0'>
            <h1 className=' text-3xl mt-6'>{name}</h1>
            <div
                className='category-container laptop:border-none mt-1 laptop:mt-5 grid grid-cols-1 laptop:gap-5 laptop:grid-cols-2'>
                {products.map((product, index) => (
                    <Link to={`/neemble-eat/p/${encodeString(placeName)}/${rest.tableNumber}/${product.record_id}`}
                          key={`${name}-product-${index}`}>
                        <ProductCard product={product}/>
                    </Link>
                ))}
            </div>
        </div>
    </div>
));

export default Category;