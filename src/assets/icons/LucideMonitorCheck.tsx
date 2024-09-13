import {SVGProps} from 'react'

export function LucideMonitorCheck(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "1em"} height={props.height || "1em"}
             viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke={props.stroke || "#6b7280"} strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="2">
                <path d="m9 10l2 2l4-4"></path>
                <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                <path d="M12 17v4m-4 0h8"></path>
            </g>
        </svg>
    )
}

export default LucideMonitorCheck