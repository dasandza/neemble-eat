import {CategoriesBar, Category} from "../index.ts";
import {useMenuContext} from "../../../context/menuContext.ts";
import useCategoriesAutoScroll from "../../../hooks/useCategoriesAutoScroll.ts";

function Categories() {

    const {menu, setSelectedItem} = useMenuContext()

    const {
        refs,
        selectedCategory,
        handleSelectCategory,
        handleMouseLeaveOrUp,
        handleMouseMove,
        handleMouseDown,
        isDragging,
        scrollContainerRef

    } = useCategoriesAutoScroll(menu.categories)

    return (
        <div>
            <div className={`sticky top-[0px] z-50 border-b border-gray-200 shadow-sm`}>
                <CategoriesBar selectedCategory={selectedCategory}
                               scrollContainerRef={scrollContainerRef}
                               handleSelectCategory={handleSelectCategory}
                               handleMouseMove={handleMouseMove}
                               handleMouseDown={handleMouseDown}
                               handleMouseLeaveOrUp={handleMouseLeaveOrUp}
                               isDragging={isDragging}
                />
            </div>
            <div>
                {
                    menu.categories &&
                    menu.categories.map((category, index) =>
                        <div key={index} ref={refs[index]}>
                            <Category category={category}
                                      selectItem={(item) => setSelectedItem(item)}
                            />
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default Categories;