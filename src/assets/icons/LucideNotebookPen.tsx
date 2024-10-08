import {SVGProps} from 'react'

export function LucideNotebookPen(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "1em"} height={props.height || "1em"}
             viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke={props.stroke || "#6b7280"} strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="2">
                <path
                    d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4M2 6h4m-4 4h4m-4 4h4m-4 4h4"></path>
                <path
                    d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
            </g>
        </svg>
    )
}

export default LucideNotebookPen