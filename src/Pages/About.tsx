import {Banner} from "../Components/Main Page";

interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}


function About({menuOptions}: props) {
    return (
        <div>
            <Banner menuOptions={menuOptions}/>
            <div>
                <p>Sobre</p>
            </div>
        </div>
    );
}

export default About;