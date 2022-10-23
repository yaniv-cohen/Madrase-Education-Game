import { useEffect, useState } from "react"
import RowsContainer from "../Components/Canvas/RowsContainer"
import GameOptions from "../Components/GameOptions/GameOptions"
import myQuestionsData from "../vocab"
// const axios = require("axios");
// const cheerio = require("cheerio");
// const pretty = require("pretty");
import './Connect.scss'
export const Connect = () => {

    const [gameOptions, setGameOptions] = useState({})
    const [pool, setPool] = useState([])
    const [gameRunning, setGameRunning] = useState(false)
    const [customWordsList, setCustomWordsList] = useState([])

    useEffect(() => {
        console.log(gameOptions)
        refreshWords()
    }, [gameOptions])

    useEffect(() => {
        // console.log(pool)
        setGameRunning(true)
    }, [pool])

    useEffect(() => {
        console.log(customWordsList)
        refreshWords()

    }, [customWordsList])


    async function getArabic(word) {
        const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: "עכבר",
                source: "he",
                target: "ar",
                format: "text",
                api_key: ""
            }),
            headers: { "Content-Type": "application/json" }
        });
        
        console.log(await res.json());
        // let resultArabic = (await res.json());
        // return resultArabic

    }
    function getItemFromPool(word) {
        let output = myQuestionsData.find(item => item.hebrew === word)
        console.log('getting item from db', word, 'got', output)
        return output
    }
    function refreshWords() {

        const poolCopy = [...myQuestionsData]
        const customWordsListCopy = [...customWordsList]
        const output = []

        //add all customWords to the pool
        while (output.length < gameOptions.wordCount && poolCopy.length > 0) {
            while (customWordsListCopy.length > 0 && output.length < gameOptions.wordCount) {
                let randomIndex = Math.floor(Math.random() * customWordsListCopy.length)
                const word = customWordsListCopy[randomIndex]
                const wordFromDb = getItemFromPool(word)
                customWordsListCopy.splice(randomIndex, 1)
                console.log('wordFromDb from ', wordFromDb, randomIndex)

                if (wordFromDb) {
                    output.push(wordFromDb);

                }
                else {
                    if (word) {
                        console.log('fetch word form dic', word);

                        let url = 'https://milon.madrasafree.com/?searchString=' + word
                        getArabic(url).then(res => console.log(res, 'from internet'))
                    }

                    // console.log('word not in db')
                    let randomIndex = Math.floor(Math.random() * poolCopy.length)
                    output.push(poolCopy[randomIndex]);
                    poolCopy.splice(randomIndex, 1)

                }
            }
            ///fill pool with random words
            let randomIndex = Math.floor(Math.random() * poolCopy.length)
            output.push(poolCopy[randomIndex]);
            poolCopy.splice(randomIndex, 1)
        }
        console.log(`output: `, output)
        setPool([...output])
        // return output
    }
    return (
        <div className="GameContainer">
            <header>
                <img src="https://madrasa-images.s3.eu-west-2.amazonaws.com/new-designs/play.png" width="120" alt="play" />
                <h1>התאימו את ההקלטות בערבית לפירוש העברי</h1>
            </header>
            <main>
                <GameOptions refreshWords={refreshWords} customWordsList={customWordsList} setCustomWordsList={setCustomWordsList} setGameOptions={setGameOptions}></GameOptions>

                <RowsContainer refreshWords={refreshWords} gameRunning={gameRunning} setGameRunning={setGameRunning} gameOptions={gameOptions} currentPool={pool}></RowsContainer>
            </main>
        </div>
    )
}
export default Connect


