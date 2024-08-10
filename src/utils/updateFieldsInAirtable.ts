import Airtable from "airtable";
import {UpdateFieldsParams} from "../interfaces.tsx";

const base = new Airtable(
    {apiKey: 'pattB3WiZmyoSsP2w.2573d1e03a4d234a961f372963227104ee7aa8de7acef7aa2081210a4c28d30b'}
).base('app8D4iyjhnvGzrL7');


async function updateFieldsInAirtable({tableName, recordId, fieldsToUpdate}: UpdateFieldsParams): Promise<void> {
    try {
        await base(tableName).update(recordId, fieldsToUpdate);
        console.log(`Record ${recordId} in table ${tableName} updated successfully.`);
    } catch (error) {
        console.error(`Error updating record ${recordId} in table ${tableName}:`, error);
    }
}

export default updateFieldsInAirtable