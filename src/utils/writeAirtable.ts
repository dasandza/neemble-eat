import Airtable, {FieldSet} from 'airtable';


const base = new Airtable(
    {apiKey: 'pattB3WiZmyoSsP2w.35fc49ab8c91ebc54bc2c3039ef802d7f05582759114a1f135688aa1e14a6400'}
).base('app8D4iyjhnvGzrL7');


// TypeScript interface for the record data type

// Function to add a new record
async function addRecord(tableName: string, data: FieldSet): Promise<void> {
    try {
        await base(tableName).create([
            {
                fields: data
            }
        ], {
            typecast: true  // Automatically typecast the provided data to the correct field types
        });
        console.log('Record created successfully!');
    } catch (error) {
        console.error('Error creating record:', error);
    }
}

export default addRecord