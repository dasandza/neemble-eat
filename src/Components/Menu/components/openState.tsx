import {Check, CrossSign} from "../../../assets/icons";
import {useMenuContext} from "../../../context/menuContext.ts";

const closedRestaurant = <div
    className='font-medium px-2 py-0.5 rounded-xl flex justify-center items-center bg-gray-100 w-fit'>
    <CrossSign className='mr-1 mt-0.5'></CrossSign>
    <p className='prevent-select cursor-default'>Fechado</p>
</div>

const openRestaurant = <div
    className='font-medium px-2 py-0.5 rounded-xl flex justify-center items-center bg-green-100 w-fit'>
    <Check className='mr-1 mt-0.5'></Check>
    <p className='prevent-select text-emerald-800 cursor-default '>Aberto</p>
</div>


function OpenState() {

    const {open} = useMenuContext()

    if (open)
        return openRestaurant
    return closedRestaurant
}


export default OpenState;