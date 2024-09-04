import {DocumentReference, Timestamp} from "firebase/firestore";


enum SessionStatus {
    Open = "Open",
    Billed = "Billed"
}

enum OrderStatus {
    New = "New",
    InProgress = "In Progress",
    Done = "Done",
    Cancelled = "Cancelled"
}

interface Category {
    id?: string,
    created_time?: string
    name: string,
    description?: string,
    menuID: string,
    items: MenuItem[],
}

interface CategoryJson {
    id: string,
    created_time: string
    name: string,
    description?: string,
    menuID: string,
    items: string[],
}

interface CategoryParsed {
    id: string,
    name: string,
    description?: string,
    menuID: string,
    items: MenuItemJson[]
}

interface Invoice {
    id?: string,
    created_time?: string
    total?: number,
    generatedTime: string,
    sessionID: string,
    orders?: Array<string>,
}

interface InvoiceJson {
    id: string,
    created_time: string
    total?: number,
    generatedTime: string,
    sessionID: string,
    orders?: Array<Order>,
}

interface Menu {
    id?: string,
    created_time?: string
    restaurantID: string,
    name: string,
    description?: string,
    categories?: Array<Category>,
}

interface MenuJson {
    id: string,
    created_time: string
    restaurantID: string,
    name: string,
    description?: string,
    categories?: Array<string> | null,
}

interface MenuParsed {
    id: string,
    restaurantID: string,
    name: string,
    description?: string,
    categories: CategoryParsed[]
}

interface MenuItem {
    id?: string,
    created_time?: string,
    name: string,
    description?: string,
    categoryID: string,
    availability?: boolean,
    price: number,
    imageURL: string | null,
    imageFile: File | null
}

interface MenuItemJson {
    [key: string]: string | number | boolean | undefined | null | File;

    id: string,
    created_time: string,
    name: string,
    description?: string,
    categoryID: string,
    availability: boolean,
    price: number,
    imageURL: string,
    imageFile?: File | null
}


interface Order {
    id?: string,
    created_time?: string,
    sessionID: string
    orderTime?: string,
    itemID: string,
    unitPrice?: number,
    total?: number,
    orderedItemName?: string,
    quantity: number,
    delivered?: boolean,
    prepStatus?: OrderStatus,
    tableNumber?: number,
    sessionStatus?: SessionStatus,
    additionalNote?: string

}

interface OrderJson {
    [key: string]: string | number | boolean | undefined;

    id: string,
    created_time?: string,
    sessionID: string
    orderTime: string,
    itemID: string,
    unitPrice: number,
    total: number,
    orderedItemName: string,
    quantity: number,
    delivered?: boolean,
    prepStatus: OrderStatus,
    tableNumber: number,
    sessionStatus?: SessionStatus,
    additionalNote?: string
}

interface OrderFirestore {
    id: string,
    createdAt: Timestamp,
    sessionID: DocumentReference
    orderTime: string,
    itemID: DocumentReference,
    unitPrice: number,
    total: number,
    orderedItemName: string,
    quantity: number,
    delivered?: boolean,
    prepStatus: OrderStatus,
    tableNumber: number,
    sessionStatus?: SessionStatus,
    additionalNote?: string
}

interface Representant {
    id?: string,
    created_time?: string,
    UUID: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phoneNumber: string,
    restaurantID?: string
}

interface RepresentantJson {
    id: string,
    created_time: string,
    UUID: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phoneNumber: string,
    restaurantID?: string
}

interface Restaurant {
    id?: string,
    created_time?: string,
    name: string,
    address: string,
    phoneNumber: string,
    representants?: Array<string>,
    bannerFile: File,
    description: string,
    orders?: Array<string>,
    sessions?: Array<TableSession>
    menus?: Array<Menu>,
    tables?: Array<Table>
}

interface RestaurantJson {
    id: string,
    created_time: string,
    name: string,
    address: string,
    phoneNumber: string,
    representants?: Array<string>,
    bannerURL: string,
    description: string,
    orders?: Array<string>,
    sessions?: Array<string>,
    menus?: Array<string>,
    tables?: Array<string>
}

interface RestaurantFirestore {
    id: string,
    name: string,
    address: string,
    phoneNumber: string,
    representants?: Array<DocumentReference>,
    bannerURL: string,
    description: string,
    orders?: Array<DocumentReference>,
    sessions?: Array<DocumentReference>,
    menus?: Array<DocumentReference>,
    tables?: Array<DocumentReference>
}

interface Table {
    id?: string,
    created_time?: string,
    number?: number,
    currentSessionID?: string,
    sessionStatus?: SessionStatus,
    sessionOrders?: Array<string>,
    restaurantID: string,
    link: string
}

interface TableJson {
    id: string,
    created_time: string,
    number?: number,
    currentSessionID?: string,
    sessionStatus?: SessionStatus,
    sessionOrders?: Array<string>,
    restaurantID: string,
    link: string
}

interface TableSession {
    id: string,
    created_time: string,
    invoiceID?: string,
    startTime?: string,
    endTime?: string,
    tableID: string,
    tableNumber?: number,
    restaurantID: string,
    orders?: Array<Order>,
    status?: SessionStatus,
    total: number
}

interface TableSessionJson {
    id: string,
    created_time: string,
    invoiceID?: string,
    startTime?: string,
    endTime?: string,
    tableID: string,
    tableNumber: number,
    restaurantID: string,
    orders: Array<string>,
    status: SessionStatus
    total: number
}

export type {
    MenuParsed,
    Category,
    Invoice,
    Menu,
    MenuItem,
    Order,
    Representant,
    Restaurant,
    Table,
    TableSession,
    CategoryJson,
    InvoiceJson,
    MenuItemJson,
    MenuJson,
    OrderJson,
    TableSessionJson,
    TableJson,
    RestaurantJson,
    RepresentantJson,
    OrderStatus,
    SessionStatus,
    CategoryParsed,
    RestaurantFirestore,
    OrderFirestore,
}