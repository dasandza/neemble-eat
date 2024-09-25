import {ArrowDropdown} from "../../../assets/icons";
import {useEffect, useState} from "react";
import {TipInput, OrdersCost, PaymentMethodsDisplay, Disclaimer, Total} from "../index.ts";
import {useOrdersContext} from "../../../context/ordersContext.ts";

function PaymentSection() {

    const [sessionPrice, setSessionPrice] = useState<number>(0)
    const [tip, setTip] = useState<number>(0);
    const [paymentMethodShowing, setPaymentMethodShowing] = useState<boolean>(false)

    const {orders} = useOrdersContext()


    useEffect(() => {
        if (orders) {
            let total = 0
            for (const order of orders) {
                total += order.prepStatus != "Cancelled" ? order.total : 0
            }
            setSessionPrice(total)
        }
    }, [orders]);

    function toggleShowPaymentMethods() {
        if ((sessionPrice + tip) != 0) {
            setPaymentMethodShowing(!paymentMethodShowing)
        }

    }


    return (
        <div>
            <div
                className='bg-white -mb-1 shadow-sm py-3 px-3.5 rounded-3xl mt-3 border border-gray-200'>
                <TipInput tip={tip} setTip={setTip}/>
                {
                    tip != 0 &&
                    <OrdersCost sessionPrice={sessionPrice}/>
                }
                <div className='flex items-end mt-3 justify-between '>
                    <div className='space-y-2 bg-red-5'>
                        <Total tip={tip} sessionPrice={sessionPrice}/>

                    </div>
                    <div>
                        <button
                            className={`px-7 py-3 ${(sessionPrice + tip) == 0 ? "bg-gray-600 cursor-not-allowed" : "bg-black"} text-sm hover:bg-gray-600 transition duration-100 text-white rounded-full `}
                            onClick={toggleShowPaymentMethods}>
                            Pedir Conta
                        </button>
                    </div>
                </div>
                {
                    paymentMethodShowing &&
                    <div className='mt-3 border-t border-gray-100 pt-3'>
                        <div className='flex mb-3 items-center'>
                            <h1 className='mr-2'>
                                Selecione o mêtodo de pagamento
                            </h1>
                            <ArrowDropdown
                                className='cursor-pointer'
                                onClick={toggleShowPaymentMethods}/>
                        </div>

                        <PaymentMethodsDisplay>
                            <PaymentMethodsDisplay.Cash/>
                            <PaymentMethodsDisplay.Card/>
                            <PaymentMethodsDisplay.MuilticaixaExpress/>
                        </PaymentMethodsDisplay>
                    </div>
                }

            </div>
            <Disclaimer/>
        </div>
    );
}

export default PaymentSection;