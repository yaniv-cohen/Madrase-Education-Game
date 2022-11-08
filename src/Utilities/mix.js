    // refactor - to outer file
    export function mix(inputArr) {
        let currentIndex = inputArr.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [inputArr[currentIndex], inputArr[randomIndex]] = [
                inputArr[randomIndex], inputArr[currentIndex]];
        }

        return inputArr;
    }
    export default mix