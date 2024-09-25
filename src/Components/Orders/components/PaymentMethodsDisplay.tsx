import {PaymentMethodsContext} from "../../../context/paymentMethodsContext.ts";
import {useOrdersContext} from "../../../context/ordersContext.ts";
import MulticaixaExpressLogo from "../../../assets/images/MCX_Express.png";
import SwipeToConfirmButton from "../../ui/SwipeToConfirmButton.tsx";
import React from "react";

interface props {
    children: React.ReactNode;
}

function PaymentMethodsDisplay({children}: props) {
    return (
        <div className='space-y-3'>
            <PaymentMethodsContext.Provider value={{}}>
                {children}
            </PaymentMethodsContext.Provider>
        </div>
    );
}

PaymentMethodsDisplay.Cash = function Cash() {
    const {closeSessionMutation} = useOrdersContext()
    return <SwipeToConfirmButton label="Cash"
                                 onConfirm={
                                     async () => {
                                         try {
                                             await closeSessionMutation()
                                         } catch (error) {
                                             console.log(error)
                                         }
                                     }
                                 }
                                 color="bg-green-500"
                                 icon={<div></div>}/>
}


PaymentMethodsDisplay.Card = function Card() {
    const {closeSessionMutation} = useOrdersContext()
    return <SwipeToConfirmButton label="Cartão"
                                 onConfirm={
                                     async () => {
                                         try {
                                             await closeSessionMutation()
                                         } catch (error) {
                                             console.log(error)
                                         }
                                     }
                                 }
                                 color="bg-black"
                                 icon={<div></div>}/>
}


PaymentMethodsDisplay.MuilticaixaExpress = function MuilticaixaExpress() {
    const {closeSessionMutation} = useOrdersContext()

    return <SwipeToConfirmButton label=""
                                 onConfirm={
                                     async () => {
                                         try {
                                             await closeSessionMutation()
                                         } catch (error) {
                                             console.log(error)
                                         }
                                     }
                                 }
                                 color="bg-orange-600"
                                 icon={<img src={MulticaixaExpressLogo} alt=""
                                            className='h-20'/>}/>
}

export default PaymentMethodsDisplay;