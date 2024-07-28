import React from 'react';
import {ProductProps} from "../interfaces.tsx";

interface ProductCardProps {
    product: ProductProps;
}

const LoadingProductCard: React.FC<ProductCardProps> = ({product}) => {
    return (

        <div
            className='flex cursor-pointer border-b laptop:border laptop:rounded-2xl laptop:overflow-hidden laptop:hover:shadow-md transition-shadow duration-200'>
            <div className='product-info laptop:ml-5 my-3 laptop:w-3/4 tablet:w-3/4 w-3/5 mr-3'>
                <h1 className='font-bold'>{product.name}</h1>
                <p className='line-clamp-2 mt-0.5 text-sm text-zinc-800'>
                    {product.description}
                </p>
                <p className='text-sm italic text-gray-500 pb-5'>{product.price}Kz</p>
            </div>
            <div
                className='product-image justify-center items-center px-2 py-5 tablet:px-1 tablet:py-3 tablet:mr-2 laptop:mr-0 laptop:py-0 laptop:px-0 grow laptop:grow-0 flex w-2/5 tablet:w-1/4 laptop:w-1/4 '>
                <img src={product.imageURL} alt={product.name} className='object-cover w-full h-full'/>
            </div>
        </div>
    );
};

export default LoadingProductCard;