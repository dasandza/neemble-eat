import {SVGProps} from 'react'

export function OrdersMenu(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M12 3V2m-7 8a7.1 7.1 0 0 1 14 0M4 10h16M2 14h12a2 2 0 1 1 0 4h-2"></path>
                <path
                    d="m15.4 17.4l3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18m0-4v7H2"></path>
            </g>
        </svg>
    )
}

export default OrdersMenu