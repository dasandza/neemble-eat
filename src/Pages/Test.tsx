import {useEffect} from "react";


function Test() {


    useEffect(() => {
        async function test() {
            const response = await fetch("http://localhost:8003/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({val: "test"})
            })
            if (response.ok) {
                return await response.json()
            }
        }

        test().then((response) => console.log(response))
    }, []);


    return (
        <div>

        </div>
    );
}

export default Test;