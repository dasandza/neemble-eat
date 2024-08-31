import {OrderJson} from "../schema.ts";

function convertToCSV(data: OrderJson[]): string {
    if (data.length === 0) return '';

    const csvRows = [];
    // Assume all objects have the same structure, so use the first one to determine headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Convert each object to a CSV row, ensuring only non-Array fields are included
    for (const item of data) {
        const values = headers.map(header => {
            const field = item[header];
            const escaped = ('' + field).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

/**
 * Triggers a file download from the browser.
 * @param csvContent The CSV content as a string.
 * @param fileName The desired file name for the downloaded file.
 */
function downloadCSV(csvContent: string, fileName: string) {
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Main function to handle conversion and downloading of CSV.
 * @param data Array of AirtableOrders to be processed.
 * @param fileName
 */
function exportDataToCSV(data: OrderJson[], fileName: string = 'download.csv') {
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, fileName);
}

export default exportDataToCSV;