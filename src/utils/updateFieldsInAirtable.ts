import Airtable from "airtable";
import {UpdateFieldsParams} from "../interfaces.tsx";

const base = new Airtable(
    {apiKey: 'pattB3WiZmyoSsP2w.35fc49ab8c91ebc54bc2c3039ef802d7f05582759114a1f135688aa1e14a6400'}
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