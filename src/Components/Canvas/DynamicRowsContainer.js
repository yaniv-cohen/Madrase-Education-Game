import React, { useRef, useEffect, useState } from 'react'
import EndScreen from './EndScreen/EndScreen'
import GameRow from './GameRow/GameRow'
import './DynamicRowsContainer.scss'
import mix from '../../Utilities/mix'
const DynamicRowsContainer = props => {

    const [leftActiveItemId, setLeftActiveItemId] = useState()
    const [rightActiveItemId, setRightActiveItemId] = useState()

    //states relating to the score
    const [score, setScore] = useState(0)
    const [currentGain, setCurrentGain] = useState(1000)
    const [wrongAnswersCount, setWrongAnswersCount] = useState(0)
    const [currentTimeStart, setCurrentTimeStart] = useState()


    const [markedItemsIds, setMarkedItemsIds] = useState([])
    const [solvedPairsCount, setSolvedPairsCount] = useState(0)

    //   const { draw, ...rest } = props
    //   const canvasRef = useRef(null)
    const [rightArr, setRightArr] = useState([])
    const [leftArr, setLeftArr] = useState([])

    useEffect(() => {
        // console.log(solvedPairs, props.gameOptions.wordCount)

        if (solvedPairsCount === props.gameOptions.wordCount) {
            props.setGameRunning(false)
        }

    }, [solvedPairsCount])

    // on change in props.currentPool
    useEffect(() => {
        //create an array for each row, hebrew and arabic
        let left = []
        let right = []
        props.currentPool.forEach(dataPair => {
            left.push({ text: dataPair.arabic, audio: dataPair.audio, id: dataPair.id })
            right.push({ text: dataPair.hebrew, audio: dataPair.audio, id: dataPair.id })
        });
        right = mix(right)
        // left = mix(left)
        // console.log(right)
        // console.log(left)
        setRightArr(right)
        setLeftArr(left)
        setMarkedItemsIds([])
        setSolvedPairsCount(0)
        setScore(0)
    }, [props.currentPool])

    //on item click, both sides
    useEffect(() => {
        console.log('leftActiveItem is:', leftActiveItemId, 'rightActiveItem is:' + rightActiveItemId)
        //start score timer
        setCurrentTimeStart(Date.now())
        if (leftActiveItemId) {
            //on Correct pair
            if (leftActiveItemId === rightActiveItemId) {
                console.log('nice, correct!')
                setMarkedItemsIds([...markedItemsIds, leftActiveItemId])
                setLeftActiveItemId(null)
                setRightActiveItemId(null)
                const elapsedTime = Date.now() - currentTimeStart
                setScore(score - Math.max(0, Math.min(3, Math.floor(elapsedTime / 500))) * 100 + currentGain - 200 * (wrongAnswersCount <= 4 ? wrongAnswersCount : 3))
                setWrongAnswersCount(0)
                setCurrentTimeStart(Date.now() + 500)
                setSolvedPairsCount(solvedPairsCount + 1)

            }

            //on wrong answer
            else if (rightActiveItemId) {
                // setScore(0)
                setLeftActiveItemId(null)
                setRightActiveItemId(null)
                // setCurrentGain(Math.max(50,currentGain-10))
                setWrongAnswersCount(wrongAnswersCount + 1)
            }
            //on no right row answer
            else {
                // setScore(null)

            }
        }
        //on right row answer only
        else {
            // setScore(null)
        }

    }, [leftActiveItemId, rightActiveItemId])


    function handleLeftItemClick(id, item) {
        console.log('hi left', id, item)
        if (leftActiveItemId === id) {
            setLeftActiveItemId(null)

        }
        else
            setLeftActiveItemId(id)
    }

    function handleRightItemClick(id, item) {
        // console.log('hi right', id, item)
        if (rightActiveItemId === id) {
            setRightActiveItemId(null)

        }
        else
            setRightActiveItemId(id)
    }




    return (
        <div className='RowsContainer'>
            <p>{'SCORE:' + score + ` Mistakes: ${wrongAnswersCount} `}</p>
            {props.gameRunning ? <></> :
                <EndScreen refreshWords={props.refreshWords} score={score}></EndScreen>}
            <section className='rowsSection'>
                <GameRow showAudio={props.gameOptions.audioInHebrew ?? false}
                    gameOptions={props.gameOptions} markedItems={markedItemsIds} activeItem={leftActiveItemId}
                    setActiveItem={handleLeftItemClick} inputArr={leftArr}>
                </GameRow>
                <GameRow showAudio={props.gameOptions.audioInArabic ?? false}
                    gameOptions={props.gameOptions} markedItems={markedItemsIds} activeItem={rightActiveItemId}
                    setActiveItem={handleRightItemClick} inputArr={rightArr}>

                </GameRow>
                {/* <div id='leftDiv'>gggg</div> */}
            </section>
        </div>
    )
}

export default DynamicRowsContainer