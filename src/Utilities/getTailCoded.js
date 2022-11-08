import getCodeOfString from "./getCodeOfString"

    //refactor
    export function getTailCoded(entries) {
        let urlTailCoded = ''
        let salt = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            + String.fromCharCode(Math.floor(Math.random() * 26) + 97)

        entries.forEach((entry, index) => {
            console.log(entry, index)
            if (index < entries.length - 1) {
                urlTailCoded += getCodeOfString(entry[0], salt[index % salt.length].charCodeAt(0)) +
                    ':' + getCodeOfString(entry[1], salt[index % salt.length].charCodeAt(0)) + '&'

            }
            else {
                urlTailCoded += getCodeOfString(entry[0], salt[index % salt.length].charCodeAt(0)) +
                    ':' + getCodeOfString(entry[1], salt[index % salt.length].charCodeAt(0))
            }

        })
        let url = window.location.href + ''
        url = url.replace('/teacher', '')
        let output = url + '/student?' + salt + '%w%' + urlTailCoded
        return output
    }
    export default getTailCoded
