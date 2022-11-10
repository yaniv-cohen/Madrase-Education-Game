import { useEffect, useReducer, useState } from "react"
import getCodeOfString from "../../Utilities/getCodeOfString"
import getTailCoded from "../../Utilities/getTailCoded"
// import RowsContainer from "../Components/Canvas/RowsContainer"
// import GameOptions from "../Components/GameOptions/GameOptions"
import myQuestionsData from "../../vocab"
import Card from "../Card/Card"
import FieldContainer from "./FieldContainer.js/FieldContainer"
// const axios = require("axios");
// const cheerio = require("cheerio");
// const pretty = require("pretty");
import './TeacherContainer.scss'
export const TeacherContainer = () => {

    const [wordPool, setWordPool] = useState({})
    const [wordInput, setWordInput] = useState('')
    const [userError, setUserError] = useState(null)
    const [translation, setTranslation] = useState('')
    const [translationFromDb, setTranslationFromDb] = useState('')
    const [outputUrl, setOutputUrl] = useState(null)
    const [manualTranslation, setManualTranslation] = useState(false)
    const [useArabicLetters, setUseArabicLetters] = useState(true)

    const handleHebrewInputChange = async (text) => {
        console.log(text, ' set to Hebrew state')


        setWordInput(text)

    }

    const handleArabicInputChange = (text) => {
        console.log(text, ' set to Arabic state')
        setTranslation(text)
    }

    const handleSubmitTextInput = () => {
        let newValObj = { [wordInput]: null }
        if (!manualTranslation) {
            const fetchedData = myQuestionsData.find((val) => val.hebrew === wordInput)
            console.log('in memory : ', translation)
            console.log(translation)
            if (translation) {
                console.log({ [wordInput]: translation })
                newValObj = { [wordInput]: translation }
            }
        }
        else {
            newValObj = { [wordInput]: translation ?? null }
        }
        if (newValObj[wordInput]) {
            //add to word pool
            setWordPool({ ...wordPool, ...newValObj })
        }
        else {
            console.log("something went wrong, didn't add to word pool")
        }
        //reset the input fields
        setWordInput('')
        setTranslation('')

    }

    useEffect(() => {
        console.log(wordPool)
        if (outputUrl) {
            setOuputFromWordPool(Object.entries(wordPool))
        }
    }, [wordPool])

    useEffect(() => {
        // console.log(wordInput)

        // if (!manualTranslation) {
        //     findInDb()

        // }


    }, [wordInput])

    function findInDb() {
        console.log('searching for ', wordInput);
        let objectFromDb = myQuestionsData.find((val) => val.hebrew === wordInput)
        if (objectFromDb) {
            setUserError(null)
            setTranslationFromDb(
                objectFromDb.arabic
            )
            setTranslation(

                objectFromDb.arabic

            )
        }
        else {
            // setWordInput('')
            setUserError(`המילה "${wordInput}" לא קיימת במאגר`)
            // setUserError('מילה לא קיימת במאגר')
        }
    }

    async function handleInputSubmit() {
        let input = wordInput
        let response = await fetch(`http://18.233.6.108:8080/get_word/${input}`)
        let output = await response.json()
        console.log(output);
        if (output.words.length === 0) {
            setUserError('לא הצלחתי למצוא את המילה ' + input + ' ' + 'במאגר')
        }
        let translation = useArabicLetters ? output.words.pop().arabic_word : output.words.pop().arabic_translation


        console.log(translation)
        if (translation) {

            setUserError(null)
            setTranslationFromDb(translation)

            setTranslation(translation)
        }
    }

    //refactor
    function handleGenerateUrlClick() {
        if (Object.keys(wordPool).length > 0) {
            // console.log('generate from ', wordPool);
            setOuputFromWordPool(Object.entries(wordPool))
        }
    }
    function setOuputFromWordPool(entries) {
        let url = getTailCoded(entries)
        if (url) {

            setOutputUrl(url)
        }
        else
            setOutputUrl(null)
    }
    function removeItemFromPool(key, val) {

        //refactor
        console.log(`remove ${key}: ${val}`)
        let newWordPool = { ...wordPool }
        delete newWordPool[key]
        setWordPool(newWordPool)
    }

    return (
        <main className='TeacherContainer'>
            {/* <div onClick={() => { handleAction() }}>Pool action?</div> */}
            <FieldContainer>
                <form
                    onBlur={(e) => { e.preventDefault(); handleInputSubmit() }}
                    onSubmit={(e) => { e.preventDefault(); handleInputSubmit() }}>                <label>
                        <p>הגדרה בעברית:</p>
                        <input
                            // onFocus={() => {
                            //     handleHebrewInputChange('')
                            // }} 
                            value={wordInput} type="text"
                            onChange={(e) => { handleHebrewInputChange(e.target.value) }}></input>
                    </label>
                </form>

            </FieldContainer>
            <FieldContainer>
                <div>

                    <label>

                        <input type='checkbox' checked={manualTranslation}
                            onChange={(e) => {
                                setUserError(null);
                                setManualTranslation(e.target.checked)
                                // if (!manualTranslation) { findInDb() }
                                // setTranslationFromDb()
                                findInDb()
                            }}
                        >
                        </input>{' שימוש בתרגום ידני '}</label>


                    {manualTranslation ?
                        <div>
                            <p>
                                <p>
                                    {'הקלד הגדרה בערבית - '}
                                </p>
                                <input value={translation} type="text"
                                    onChange={(e) => { handleArabicInputChange(e.target.value) }}></input>
                            </p>
                        </div> :
                        <div>
                            <p>מחפש מילה בעברית...</p>
                            <label>
                                <input type='checkbox'
                                    onChange={() => {
                                        if (useArabicLetters) {
                                            setUseArabicLetters(false)
                                        }
                                        else
                                            setUseArabicLetters(true)
                                        handleInputSubmit()

                                    }} checked={useArabicLetters}></input>
                                שימוש בתעתיק</label>
                        </div>

                    }
                </div>

                {!manualTranslation ? (
                    wordInput ?
                        (userError ?
                            <span className='errorText'>{userError}</span>
                            : <span className="definition">{wordInput + " : " + translationFromDb}</span>
                        ) : <></>
                ) : (
                    <span className="definition">{wordInput + " : " + translation}</span>
                )

                }
                <button onClick={() => { handleSubmitTextInput() }}
                    class="button-74" role="button"
                >הוסף</button>
            </FieldContainer>


            <ul>
                {/* {JSON.stringify(wordPool)} */}
                <h1>רשימת המילים:</h1>
                {Object.entries(wordPool).map((input, index) => {
                    console.log(input)
                    return (
                        <li key={index} className="OutputLI">

                            <span key={index}
                            >{input[0] + ': ' + input[1]}</span>
                            <span className='delete'
                                onClick={() => {
                                    removeItemFromPool(input[0], input[1])

                                }}>X</span>

                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => { handleGenerateUrlClick() }}
                    class="button-74" role="button">צור תרגיל</button>

            </div>
            {outputUrl ?
                <Card>
                    <div className="OutputDiv">
                        <button onClick={() => {
                            console.log('coping text', outputUrl)
                            navigator.clipboard.writeText(outputUrl)
                        }}
                        >
                            <img src='https://www.svgrepo.com/show/3110/copy.svg' alt='העתק'></img>
                        </button>
                        <div style={{ width: '350px', direction: "ltr" }}>
                            <p>
                                <a target={"_blank"} href={outputUrl}>{outputUrl}</a>
                            </p>
                        </div>
                    </div>
                </Card> :
                <></>}

        </main>
    )
}
export default TeacherContainer


