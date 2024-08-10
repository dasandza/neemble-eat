import axios from 'axios';

const AIRTABLE_API_KEY = "pattB3WiZmyoSsP2w.bdb845d9180f2de685744cd516414a2b8f3850993f0939e2a8ed5cad415af4d1"
const AIRTABLE_BASE_ID = "app8D4iyjhnvGzrL7"


const fetchAirtableRecords = async (TableName: string) => {
    const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TableName}`;
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`
            }
        });
        return response.data.records;
    } catch (error) {
        console.error("Error fetching Airtable records: ", error);
        return [];
    }
};

export default fetchAirtableRecords;