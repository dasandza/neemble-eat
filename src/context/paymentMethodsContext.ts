import {createContext, useContext} from "react";

interface PaymentMethodsProps {
    
}

export const PaymentMethodsContext = createContext<PaymentMethodsProps | undefined>(undefined)

export function usePaymentMethods() {
    const context = useContext(PaymentMethodsContext)

    if (!context)
        throw new Error("usePaymentMethods() must be used within the Context");

    return context
}