import {AirtableSession} from "../interfaces.tsx";

function getLastSessions(sessions: AirtableSession[]): AirtableSession[] {
    const lastSessions: AirtableSession[] = []
    const tablesLastSessions: {
        [key: number]: AirtableSession
    } = {}
    for (const session of sessions) {
        if (session.fields.Status == "Billed") {
            const sessionTableNumber = Number(session.fields["Table Number"][0])
            const sessionUniqueNumber = Number(session.fields["Session Number"])
            if (sessionTableNumber in tablesLastSessions) {
                tablesLastSessions[sessionTableNumber] = Number(tablesLastSessions[sessionTableNumber].fields["Session Number"]) > sessionUniqueNumber ?
                    tablesLastSessions[sessionTableNumber] :
                    session
            } else {

                tablesLastSessions[sessionTableNumber] = session
            }
        } else {
            if (session.fields.Status === "Open" && session.fields.Orders) {
                lastSessions.push(session)
            }

        }
    }

    for (const key in tablesLastSessions) {
        lastSessions.push(tablesLastSessions[key]);
    }

    return lastSessions;
}


export default getLastSessions;
