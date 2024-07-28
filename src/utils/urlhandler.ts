function encodeString(str: string) {
    return encodeURIComponent(str);
}

function decodeString(encodedStr: string) {
    return decodeURIComponent(encodedStr);
}

export {encodeString, decodeString};