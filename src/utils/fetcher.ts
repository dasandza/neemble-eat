import axios from 'axios';

const AIRTABLE_API_KEY = "pattB3WiZmyoSsP2w.35fc49ab8c91ebc54bc2c3039ef802d7f05582759114a1f135688aa1e14a6400"
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