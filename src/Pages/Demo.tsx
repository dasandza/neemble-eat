import {Banner} from "../Components/Main Page";


interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}

function Demo({menuOptions}: props) {
    return (
        <div>
            <Banner menuOptions={menuOptions}/>
            <div>
                <p>Demo</p>
            </div>
        </div>
    );
}

export default Demo;