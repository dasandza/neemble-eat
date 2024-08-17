import {Banner, MainSection} from "../Components/Main Page";


interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}

function MainPage({menuOptions}: props) {

    return (

        <div className='font-poppins h-dvh bg-gradient-to-br to-slate-600 from-blue-100'>
            {/* bg-gradient-to-br to-yellow-300 from-gray-100 */}
            {/* bg-gradient-to-br to-slate-600 from-blue-100 */}
            <div className='max-w-[1080px] mx-auto'>
                <Banner menuOptions={menuOptions}/>
                <div className='laptop:mt-20 mt-14'>
                    <MainSection/>
                </div>

            </div>
        </div>
    );
}

export default MainPage;