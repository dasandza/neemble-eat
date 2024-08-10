import Airtable, {FieldSet} from 'airtable';


const base = new Airtable(
    {apiKey: 'pattB3WiZmyoSsP2w.2573d1e03a4d234a961f372963227104ee7aa8de7acef7aa2081210a4c28d30b'}
).base('app8D4iyjhnvGzrL7');


// TypeScript interface for the record data type

// Function to add a new record
async function addRecord(tableName: string, data: FieldSet): Promise<string | null> {
    try {
        const record = await base(tableName).create([
            {
                fields: data
            }
        ], {
            typecast: true  // Automatically typecast the provided data to the correct field types
        });
        console.log('Record created successfully!');
        return record[0].id
    } catch (error) {
        console.error('Error creating record:', error);
        return null
    }
}

export default addRecord