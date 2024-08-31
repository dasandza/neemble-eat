import {CategoryParsed} from "../../../schema.ts";
import {HamburgerMenuIcon} from "../../../assets/icons";
import React from "react";

interface props {
    categories: CategoryParsed[]
    isDragging: boolean
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
    handleMouseLeaveOrUp: () => void
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
    selectedCategory: CategoryParsed | undefined
    scrollContainerRef: React.RefObject<HTMLDivElement>
    handleSelectCategory: (category: CategoryParsed, index: number) => void
}

function CategoriesBar({
                           categories,
                           isDragging,
                           handleMouseMove,
                           handleMouseLeaveOrUp,
                           handleMouseDown,
                           selectedCategory,
                           scrollContainerRef,
                           handleSelectCategory
                       }: props) {


    return (
        <div>
            <div className='sticky top-0 bg-white z-10 px-4'>
                <div className='flex items-center'>
                    <div><HamburgerMenuIcon className='menuicon mr-4'/></div>
                    <div
                        className='border-b border-gray-200 overflow-x-auto styled-scrollbar mt-4 flex-1 cursor-default'
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        style={{cursor: isDragging ? 'grabbing' : 'grab'}}
                    >
                        <div
                            className='categories flex items-center text-gray-600 font-semibold cursor-pointer prevent-select whitespace-nowrap w-fit'>
                            {categories.map((category, index) => <div
                                key={index}
                                className={`mb-0 pb-4 text-sm mr-7 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 ${category ? selectedCategory?.name === category.name ? 'text-blue-500 border-b-2 border-blue-500' : '' : ''}`}
                                onClick={() => handleSelectCategory(category, index)}
                            >
                                {category.name}
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesBar;