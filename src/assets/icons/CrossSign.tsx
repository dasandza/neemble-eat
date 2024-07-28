import {SVGProps} from 'react'

export function CrossSign(props: SVGProps<SVGSVGElement>) {
    const size = "14px";

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
               color="#000000">
                <path d="M15.5 8.5L12 12m0 0l-3.5 3.5M12 12l3.5 3.5M12 12L8.5 8.5"></path>
                <circle cx="12" cy="12" r="10"></circle>
            </g>
        </svg>
    )
}

export default CrossSign