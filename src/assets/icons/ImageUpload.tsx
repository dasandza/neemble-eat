import {SVGProps} from 'react'

export function ImageUpload(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="#5c5c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
               color="#5c5c5c">
                <path
                    d="M5 21c4.21-4.751 8.941-11.052 16-6.327M17 4.5c.491-.506 1.8-2.5 2.5-2.5M22 4.5c-.491-.506-1.8-2.5-2.5-2.5m0 0v8"></path>
                <path
                    d="M21 13c-.002 4.147-.053 6.27-1.391 7.609C18.217 22 15.979 22 11.5 22c-4.478 0-6.718 0-8.109-1.391S2 16.979 2 12.5c0-4.478 0-6.718 1.391-8.109S7.021 3 11.5 3H14"></path>
            </g>
        </svg>
    )
}

export default ImageUpload