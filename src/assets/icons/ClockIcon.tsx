import {SVGProps} from 'react'

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="#5c5c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
               color="#5c5c5c">
                <circle cx="12" cy="13" r="9"></circle>
                <path
                    d="m5 19l-2 2m16-2l2 2M19 3.57l.596-.298c.845-.423 1.162-.374 1.834.298s.72.99.298 1.834L21.43 6M5 3.57l-.596-.298c-.845-.423-1.162-.374-1.834.298s-.72.99-.298 1.834L2.57 6M12 9.5v4l2 2m-2-12V2m-2 0h4"></path>
            </g>
        </svg>
    )
}

export default ClockIcon