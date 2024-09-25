import React, {useRef, useState} from "react";
import {Category} from "../schema.ts";


function useCategoriesAutoScroll(categories: Category[] | undefined) {

    const [refs] = useState<React.RefObject<HTMLDivElement>[]>(() =>
        categories ? categories.map(() => React.createRef<HTMLDivElement>()) : []
    );

    const [selectedCategory, setSelectedCategory] = useState<Category>()

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }

    const scrollToCategory = (index: number) => {
        if (refs[index] && refs[index].current) {
            const element = refs[index].current;
            const yOffset = -55; // Adjust this value as needed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    const handleSelectCategory = (category: Category, index: number) => {
        setSelectedCategory(category)
        scrollToCategory(index)
    }

    return {
        refs,
        selectedCategory,
        handleSelectCategory,
        handleMouseDown,
        handleMouseLeaveOrUp,
        handleMouseMove,
        isDragging,
        scrollContainerRef
    };

}

export default useCategoriesAutoScroll;