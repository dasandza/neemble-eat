import {SVGProps} from 'react'

export function HugeiconsViewOff(props: SVGProps<SVGSVGElement>) {
    const size = "23px"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
            <path fill="none" stroke="#5c5c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M22 8s-4 6-10 6S2 8 2 8m13 5.5l1.5 2.5m3.5-5l2 2M2 13l2-2m5 2.5L7.5 16" color="#5c5c5c"></path>
        </svg>
    )
}

export default HugeiconsViewOff