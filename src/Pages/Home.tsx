import {Banner, Body, Footer} from "../Components/Main Page";


interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}

function Home({menuOptions}: props) {

    return (

        <div className='font-poppins'>
            {/* bg-gradient-to-br to-yellow-300 from-gray-100 */}
            {/* bg-gradient-to-br to-slate-600 from-blue-100 */}
            <div className='w-full'>
                <div>
                    <Banner menuOptions={menuOptions}/>
                </div>
                <div>
                    <Body/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Home;