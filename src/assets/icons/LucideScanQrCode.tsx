import {SVGProps} from 'react'

export function LucideScanQrCode(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "1em"} height={props.width || "1em"}
             viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke={props.stroke || "#6b7280"} strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="2">
                <path
                    d="M17 12v4a1 1 0 0 1-1 1h-4m5-14h2a2 2 0 0 1 2 2v2m-4 1V7m4 10v2a2 2 0 0 1-2 2h-2M3 7V5a2 2 0 0 1 2-2h2m0 14h.01M7 21H5a2 2 0 0 1-2-2v-2"></path>
                <rect width="5" height="5" x="7" y="7" rx="1"></rect>
            </g>
        </svg>
    )
}

export default LucideScanQrCode