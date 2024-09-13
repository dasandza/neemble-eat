import {HeroSection, OurSolutions, Features, AboutTheService} from "../index.ts";

function Body() {
    return (
        <div className={`flex flex-col items-center`}>
            {/* WEBSITE BODY SECTIONS */}
            <HeroSection/>
            <AboutTheService/>
            <OurSolutions/>
            <Features/>
        </div>
    );
}

export default Body;