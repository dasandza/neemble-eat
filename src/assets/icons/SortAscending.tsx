import {SVGProps} from 'react'


export function SortAscending(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "1em"} height={props.width || "1em"}
             viewBox="0 0 24 24" {...props}>
            <path fill="none" stroke="#616161" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M11 8h8m-8 4h5m-5 4h3M11 4h10M5.5 21V3m0 18c-.7 0-2.008-1.994-2.5-2.5M5.5 21c.7 0 2.008-1.994 2.5-2.5"
                  color="#616161"></path>
        </svg>
    )
}

export default SortAscending