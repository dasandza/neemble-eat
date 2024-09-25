import {CartItem} from "../../interfaces.tsx";

export function isCartItem(item: unknown): item is CartItem {
    if (typeof item === "object" && item !== null) {
        const obj = item as Record<string, unknown>;
        return (
            typeof obj.id === "string" &&
            typeof obj.name === "string" &&
            typeof obj.price === "number" &&
            typeof obj.quantity === "number" &&
            typeof obj.image === "string" &&
            (typeof obj.additionalNote === "undefined" || typeof obj.additionalNote === "string")
        );
    }
    return false;
}