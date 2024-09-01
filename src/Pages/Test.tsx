import {useEffect, useState} from "react";
import {fetchRepresentantByUUID} from "../api";
import {RepresentantJson} from "../schema.ts";

function Test() {

    const [representant, setRepresentant] = useState<RepresentantJson>();

    const UUID = "BBvy47WaQCXJvbksPZBBDXaFYQj2"


    useEffect(() => {
        fetchRepresentantByUUID({UUID: UUID}).then((representant) => representant ? setRepresentant(representant) : console.log("Nenhum representante encontrado"))

    }, []);


    return (
        <div>
            <h1>UUID</h1>
            <div>
                Representant:
            </div>
            <div>
                {representant ? `${representant}` : "Produrando..."}
            </div>
        </div>
    );
}

export default Test;