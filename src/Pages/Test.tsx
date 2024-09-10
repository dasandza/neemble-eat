function Test() {


    return (
        <div className="relative">
            <div className="h-[485px] bg-blue-200">
                Header Content Here
            </div>

            <div className="sticky top-[0px] z-50 bg-red-200">
                CategoriesBar should stick
            </div>

            <div className="h-screen bg-green-200">
                Scrollable content here
            </div>
        </div>
    );
}

export default Test;