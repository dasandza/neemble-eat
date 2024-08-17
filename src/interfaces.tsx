// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

// TEMP INTERFACES

interface Category {
    name: string;
    menuItems: Array<ProductProps>;
}

interface ProductProps {
    name: string;
    description: string;
    price: number;
    imageURL: string | null;
    record_id: string
}

// Airtable interfaces

interface AirtableItem {
    Name: string,
    Description: string,
    Owner: [string],
    Price: number,
    Category: string,
    image?: string,
}

interface RecordData {
    fields: {
        [key: string]: string | number | boolean | Array<never> | object | null;
    }
}

interface UpdateFieldsParams {
    tableName: string;
    recordId: string;
    fieldsToUpdate: { [key: string]: string | string[] };
}

interface Representant {
    "First Name": string,
    "Last Name": string,
    "UUID": string,
    "Phone Number": string,
    "Email": string
}

interface AirtableRepresentant {
    "createdTime": string,
    "id": string,
    fields: Representant
}


interface AirtableOrders {
    "createdTime": string,
    "id": string,
    fields: {
        [key: string]: any;
        "Price (from Item)": number,
        "Name (from Item)": string,
        "Time Created": string;
        "Item": Array<string>;
        "Quantity": number;
        "Aditional Note": string,
        "Table": Array<string>;
        "Total": number,
        "Table Number": string;
        "Session Status": Array<string>,
        "Order Status": string,
        "Restaurant ID": Array<string>,
        "Session ID": Array<string>
    }
}

interface AirtableTable {
    id: string,
    createdTime: string,
    fields: AirtableTableParams
}

interface AirtableTableParams {
    Session: Array<string>,
    "Status (from Session)": string,
    "Orders (from Session)": Array<string>,
    "Restautant": Array<string>,
    "Name (from Restaurant)": Array<string>,
    "Number": string,
}

interface AirtableSession {
    id: string,
    createdTime: string,
    fields: AirtableSessionParams
}

interface AirtableSessionParams {
    Table: Array<string>,
    "Restaurant Name": Array<string>,
    "Restaurant ID": Array<string>,
    "Table Number": Array<string>,
    Orders: Array<string>,
    "Status": string,
    "Session Number": string,
    Total: number,
}

// Rest

interface CategoryData {
    name: string,
    products: Array<ProductProps>,
    placeName: string
}

interface CategoryProps {
    name: string;
    key: string;
    ref: React.RefObject<HTMLDivElement>;
    products: ProductProps[];
}

interface Business {
    id: string,
    createdTime: string,
    fields: BusinessFields,

}

interface MenuPageParams {
    encodedPlaceName: string;
    tableNumber: string;
}

interface OrdersPageParams {
    encodedBusinessName: string;
    tableNumber: string;
}


interface ProductPageParams {
    encodedBusinessName: string,
    tableNumber: string,
    productId: string
}

interface CartPageParams {
    encodedBusinessName: string,
    tableNumber: string,
}

interface CategoryParams {
    categories: CategoryData[];
}

interface BusinessFields {
    phoneNumber: string,
    Banner: Array<BannerFields>,
    Description: string,
    numberOfTables: string,
    Items: Array<string>,
    Name: string
}

interface CartItem {
    id: string,
    name: string,
    price: number,
    quantity: number;
    image?: string;
    aditionalNote?: string;
}


interface MenuItem {
    createdTime: string,
    fields: {
        Availability: string,
        Category: string,
        Description: string,
        Name: string,
        Price: number,
        Owner: Array<string>,
        Image: Array<ImageFields>
    }
    id: string

}

interface ImageFields {
    filename: string,
    height: number,
    id: string,
    thumbnails: {
        full: {
            height: number,
            url: string,
            width: number,
        },
        large: {
            height: number,
            url: string,
            width: number,
        },
        small: {
            height: number,
            url: string,
            width: number,
        },
    },
    type: string,
    url: string,
    width: number,
}

interface BannerFields {
    fileName: string,
    height: number,
    id: string,
    size: number,
    type: string,
    width: number,
    url: string,
    thumbnails: {
        full: {
            height: number,
            url: string,
            width: number,
        },
        large: {
            height: number,
            url: string,
            width: number,
        },
        small: {
            height: number,
            url: string,
            width: number,
        },
    }
}

export type {
    AirtableRepresentant,
    Representant,
    AirtableSession,
    OrdersPageParams,
    CartPageParams,
    ProductPageParams,
    MenuPageParams,
    AirtableTable,
    CartItem,
    CategoryData,
    MenuItem,
    Category,
    Business,
    AirtableSessionParams,
    RecordData,
    AirtableItem,
    ProductProps,
    CategoryParams,
    UpdateFieldsParams,
    AirtableOrders,
    CategoryProps
}