import {SVGProps} from 'react'

export function AddIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}>
            <path fill="none" stroke="#5c5c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                  d="M256 112v288m144-144H112"></path>
        </svg>
    )
}

export default AddIcon