import {SVGProps} from 'react'

export function ArrowDropdown(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}>
            <path d="M128 192l128 128 128-128z" fill="#616161"></path>
        </svg>
    )
}

export default ArrowDropdown