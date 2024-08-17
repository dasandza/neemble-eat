interface props {
    isSelected: boolean,
    toggle: () => void,
}

function DarkBackground({isSelected, toggle}: props) {
    return (
        <div
            className={`z-40 transition-all fixed duration-700 ${isSelected ? "opacity-[30%] block" : "opacity-[0%] hidden"} bg-black w-full h-dvh top-0 left-0`}
            onClick={toggle}>
        </div>
    );
}

export default DarkBackground;