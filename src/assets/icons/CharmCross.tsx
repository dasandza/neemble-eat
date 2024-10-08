import {SVGProps} from 'react'


export function CharmCross(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || '1em'} height={props.height || '1em'}
             viewBox="0 0 16 16" {...props}>
            <path fill="none" stroke="#6b7276" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"></path>
        </svg>
    )
}

export default CharmCross