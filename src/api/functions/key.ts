const CloudRunUrl = import.meta.env.VITE_CLOUD_FASTAPI_URL
const localUrl = import.meta.env.VITE_LOCAL_FASTAPI_URL

const online: boolean = true

const apiUrl = online ? CloudRunUrl : localUrl

export {online, apiUrl}