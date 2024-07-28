import {SVGProps} from 'react'

export function Check(props: SVGProps<SVGSVGElement>) {

    const size = "14px";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" {...props}>
            <path fill="#065f46"
                  d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06a.733.733 0 0 1 1.047 0l3.052 3.093l5.4-6.425z"></path>
        </svg>
    )
}

export default Check