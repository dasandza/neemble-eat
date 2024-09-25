import {useMenuContext} from "../../../context/menuContext.ts";

function Banner() {

    const {restaurant} = useMenuContext()

    return (
        <div
            className='bg-gray-400 justify-center flex items-center overflow-hidden'>
            <img
                src={restaurant.bannerURL}
                alt="description of image"
                className='object-cover w-full max-h-40 laptop:max-h-60'
            />
        </div>
    );
}

export default Banner;