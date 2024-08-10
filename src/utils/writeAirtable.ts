import Airtable, {FieldSet} from 'airtable';


const base = new Airtable(
    {apiKey: 'pattB3WiZmyoSsP2w.bdb845d9180f2de685744cd516414a2b8f3850993f0939e2a8ed5cad415af4d1'}
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