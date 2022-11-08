    //refactor
    export function getCodeOfString(word, saltNum) {
        let output = ''
        for (let index = 0; index < word.length; index++) {
            let char = word[index]
            console.log(char);
            let code = (char.charCodeAt(0) + saltNum).toString(16)
            console.log(`char ${char} is coded to ${code}`)
            if (index < word.length - 1) { output += code + '-' }
            else { output += code }

        }
        return output
    }
    export default getCodeOfString
