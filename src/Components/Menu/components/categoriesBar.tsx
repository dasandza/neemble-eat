import {HamburgerMenuIcon} from "../../../assets/icons";
import {useMenuContext} from "../../../context/menuContext.ts";
import {Category} from "../../../schema.ts";
import React from "react";


interface props {
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void,
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void,
    handleMouseLeaveOrUp: () => void,
    handleSelectCategory: (category: Category, index: number) => void,
    selectedCategory: Category | undefined,
    isDragging: boolean,
    scrollContainerRef: React.RefObject<HTMLDivElement>
}


function CategoriesBar({
                           selectedCategory,
                           isDragging,
                           scrollContainerRef,
                           handleSelectCategory,
                           handleMouseLeaveOrUp,
                           handleMouseMove,
                           handleMouseDown
                       }: props) {

    const {menu} = useMenuContext()


    return (
        <div className={`bg-white`}>
            <div className='z-10 px-4'>
                <div className='flex items-center'>
                    <div>
                        <HamburgerMenuIcon className='menuicon mr-4'/>
                    </div>
                    <div
                        className='overflow-x-auto styled-scrollbar mt-4 flex-1 cursor-default'
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        style={{cursor: isDragging ? 'grabbing' : 'grab'}}
                    >
                        <div
                            className='categories flex items-center text-gray-600 font-semibold cursor-pointer prevent-select whitespace-nowrap w-fit'>
                            {
                                menu.categories &&
                                menu.categories.map((category, index) => {

                                        const gotNoItems = category.items.length == 0

                                        const gotNoItemsAvailble = category.items.every(item => item.availability === false)

                                        if (gotNoItemsAvailble || gotNoItems) {
                                            return <div></div>
                                        }

                                        return <div
                                            key={index}
                                            className={`mb-0 pb-4 text-sm mr-7 hover:text-blue-500 ${category ? selectedCategory?.name === category.name ? 'text-blue-500 border-b-2 border-blue-500' : '' : ''}`}
                                            onClick={() => handleSelectCategory(category, index)}
                                        >
                                            {category.name}
                                        </div>
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesBar;