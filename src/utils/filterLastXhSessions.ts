import {AirtableSession} from "../interfaces.tsx";

function filterLastXhSessions(session: AirtableSession, h: number = 23): boolean {

    const sessionDate = new Date(session.createdTime);
    const now = new Date(new Date().getTime());

    const diffInMs = now.getTime() - sessionDate.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours <= h
}

export default filterLastXhSessions;