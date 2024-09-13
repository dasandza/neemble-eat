import {SVGProps} from 'react'

export function LucideTabletSmartphone(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "1em"} height={props.height || "1em"}
             viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke={props.stroke || "#6b7280"} strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="2">
                <rect width="10" height="14" x="3" y="8" rx="2"></rect>
                <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4M8 18h.01"></path>
            </g>
        </svg>
    )
}

export default LucideTabletSmartphone