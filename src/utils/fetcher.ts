import axios from 'axios';

const AIRTABLE_API_KEY = "pattB3WiZmyoSsP2w.2573d1e03a4d234a961f372963227104ee7aa8de7acef7aa2081210a4c28d30b"
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