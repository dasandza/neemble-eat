import {Banner} from "../Components/Main Page";

interface props {
    menuOptions: {
        name: string,
        path: string,
        icon: JSX.Element
    }[]
}

function Contact({menuOptions}: props) {
    return (
        <div>
            <Banner menuOptions={menuOptions}/>
            <div>
                <p>Contacto</p>
            </div>
        </div>
    );
}

export default Contact;