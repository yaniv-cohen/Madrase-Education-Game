import { useEffect, useState } from "react"
// import GameOptions from "../Components/GameOptions/GameOptions"
import RowsContainer from "../Components/Student/RowsContainer/RowsContainer"
import StudentHeader from "../Components/Student/StudentHeader/StudentHeader"
// const axios = require("axios");
// const cheerio = require("cheerio");
// const pretty = require("pretty");
// import myQuestionsData from "../vocab"

import './Student.scss'
import './GlobalStyle.scss';

export const Student = () => {

    const [gameOptions, setGameOptions] = useState({})
    const [pool, setPool] = useState([])
    const [gameRunning, setGameRunning] = useState(false)

    useEffect(() => {
        let urlStr = window.location.href
        let salt = urlStr.substring(urlStr.indexOf('student')+8 ,urlStr.indexOf('%w%'))
        console.log(`salt:`,salt)
        urlStr = urlStr.substring(urlStr.indexOf('%w%') + 3)
        // console.log(urlStr)

        //split to an array of 2 word definition-word pair
        let arr = urlStr.split('&').map(word => word.split(':'))
        // console.log(arr)
        let out = arr.map((pair, index) => {
            // console.log(pair)
            return pair.map(
                word => {
                    // let char = String.fromCharCode(word.toString(10)+'')
                    // console.log(word);
                    let hexArr = word.split('-')
                    // .map(hex => {parseInt(hex,16)})
                    console.log(parseInt(salt[index%salt.length].charCodeAt(0), 16));
                    console.log(hexArr);
                    let numArr = hexArr.map(hex => 
                        parseInt(hex, 16) - salt[index%salt.length].charCodeAt(0)
                        )
                    console.log(numArr);
                    let charArr = numArr.map(num => String.fromCharCode(num))
                    // console.log(charArr.join(''));

                    // let code = char.charCodeAt(0).toString(16)
                    return charArr.join('')
                    // return {hebrew: , arabic: }
                }
            )
        })
        //split each pair to definition, and translation
        // arr = arr
        let outputJSON = []
        out.forEach((pair, index) => {
            outputJSON.push({ arabic: pair[1], hebrew: pair[0], id: index + 1 })
        })
        setGameOptions({ wordCount: outputJSON.length })

        refreshWords(outputJSON)
    }, [])

    // useEffect(() => {
    //     console.log(gameOptions)
    //     refreshWords()
    // }, [gameOptions])

    useEffect(() => {
        console.log(pool)
        setGameRunning(true)
    }, [pool])

    useEffect(() => {
        console.log(`gameRunning ${gameRunning}`)
    }, [gameRunning])

    function refreshWords(inputWords = []) {
        // if(inputWords.length>0)
        // {
        console.log(`got words from from url `)
        // console.log(inputWords)
        setPool(inputWords)
    }
    return (
        <>
            <StudentHeader>
            </StudentHeader>
                <RowsContainer refreshWords={refreshWords} gameRunning={gameRunning}
                    setGameRunning={setGameRunning} gameOptions={gameOptions}
                    currentPool={pool}></RowsContainer>
        </>
    )
}
export default Student


