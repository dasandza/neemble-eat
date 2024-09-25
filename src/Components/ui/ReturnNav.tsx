import {Link} from "react-router-dom";

interface props {
    path: string,
    pageName: string
}

function ReturnNav({pageName, path}: props) {
    return (
        <div className='flex relative justify-between items-center mt-4 mb-8'>
            <Link to={path}
                  className='absolute flex-none'>
                <div className="text-left">
                    <p className='text-lg font-bold pr-3'>
                        {'<'}
                    </p>
                </div>
            </Link>
            <div className='flex-grow'></div>
            <div className='flex-none text-center '>
                {pageName}
            </div>
            <div className='flex-grow'></div>
        </div>
    );
}

export default ReturnNav;