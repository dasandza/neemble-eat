import {SVGProps} from 'react'

export function InformationIcon(props: SVGProps<SVGSVGElement>) {
    const size = "14px";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height="14px" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
               color="#000000">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"></path>
                <path d="M12.242 17v-5c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.009"></path>
            </g>
        </svg>
    )
}

export default InformationIcon;