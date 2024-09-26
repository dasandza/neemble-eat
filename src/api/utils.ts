import axios, {AxiosError} from "axios";


const CloudRunUrl = import.meta.env.VITE_CLOUD_FASTAPI_URL
const localhostUrl = import.meta.env.VITE_LOCAL_FASTAPI_URL

export const online: boolean = true


export const BASE_URL = online ? CloudRunUrl : localhostUrl

const protocol = `${online ? "https:" : "http:"}//`

export const API = axios.create({
    baseURL: `${protocol}${BASE_URL}`
})


export async function handleError(error: AxiosError) {
    try {
        const errorMessage =
            error.message || "An error occurred"
        return Promise.reject(errorMessage)
    } catch (err) {
        throw new Error(`An error occurred: ${err}`)
    }

}