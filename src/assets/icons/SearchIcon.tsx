import {SVGProps} from 'react'

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}>
            <path fill="none" stroke="#5c5c5c" strokeMiterlimit="10" strokeWidth="32"
                  d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"></path>
            <path fill="none" stroke="#5c5c5c" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"
                  d="M338.29 338.29L448 448"></path>
        </svg>
    )
}

export default SearchIcon