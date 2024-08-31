import {TableSessionJson} from "../schema.ts";

function filterLastXhSessions(session: TableSessionJson, h: number = 23): boolean {

    const sessionDate = new Date(session.created_time);
    const now = new Date(new Date().getTime());

    const diffInMs = now.getTime() - sessionDate.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours <= h
}

export default filterLastXhSessions;