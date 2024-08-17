import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import fetchAirtableRecords from "../utils/fetcher.ts";
import {AirtableRepresentant} from "../interfaces.tsx";
import {Banner} from "../Components/UserHomePage";


function UserHomePage() {

    const {representantID} = useParams() as unknown as { representantID: string }
    const [representant, setRepresentant] = useState<AirtableRepresentant | null>(null)
    //const [time, setTime] = useState()


    useEffect(() => {
        async function fetch() {

            const data: AirtableRepresentant[] = await fetchAirtableRecords("Representant")
            for (const representant of data) {
                if (representant.id == representantID) {
                    setRepresentant(representant)
                    break
                }
            }

        }

        fetch()

    }, []);


    if (!representant) {
        return <div>Loading</div>
    }


    return (
        <div>
            <Banner firstName={representant?.fields["First Name"]} lastName={representant?.fields["Last Name"]}/>
        </div>
    );
}

export default UserHomePage;