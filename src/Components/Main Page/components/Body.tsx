import {HeroSection, OurSolutions, Features} from "../index.ts";

function Body() {
    return (
        <div className={`flex flex-col items-center`}>
            {/* WEBSITE BODY SECTIONS */}
            <HeroSection/>
            <OurSolutions/>
            <Features/>
        </div>
    );
}

export default Body;