import {Banner} from "../Components/Main Page";

interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}

function Support({menuOptions}: props) {
    return (
        <div>
            <Banner menuOptions={menuOptions}/>
            <div>
                <p>Suporte</p>
            </div>
        </div>
    );
}

export default Support;