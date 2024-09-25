import Notifications from "../../../assets/icons/Notifications.tsx";
import {useMenuContext} from "../../../context/menuContext.ts";
import OpenState from "./openState.tsx";

function TableInfo() {

    const {tableNumber} = useMenuContext()

    return (
        <div className={`my-4 flex space-x-4`}>
            <OpenState/>
            <div
                className={`flex justify-center rounded-xl bg-gray-100 space-x-1 px-3 py-0.5 text-gray-600 font-poppins-semibold prevent-select`}>
                <p>
                    Mesa
                </p>
                <p>
                    {tableNumber}
                </p>
            </div>
            <div
                className='flex ml-5 items-center rounded-xl px-3 bg-gray-100 hover:bg-gray-200 cursor-pointer py-0.5 prevent-select '>
                <Notifications className='m-1 laptop:mr-1 laptop:my-0 laptop:ml-0'/>
                <p className='text-gray-600 font-poppins-semibold hidden laptop:block'>Chamar Garçon</p>
            </div>
        </div>
    );
}

export default TableInfo;