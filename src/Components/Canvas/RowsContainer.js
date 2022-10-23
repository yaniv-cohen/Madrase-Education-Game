import React, { useRef, useEffect, useState } from 'react'
import EndScreen from './EndScreen/EndScreen'
import GameRow from './GameRow/GameRow'
import './RowsContainer.scss'
const RowsContainer = props => {
    // in props i get an array of arrays => [[{text:'', imgUr:'', value:'', id:#},{ id:#}] ,{},{} ]
    const [leftActiveItem, setLeftActiveItem] = useState()
    const [rightActiveItem, setRightActiveItem] = useState()

    //states relating to the score
    const [currentPool, setCurrentPool] = useState(props.currentPool)
    const [score, setScore] = useState(0)
    const [currentGain, setCurrentGain] = useState(1000)
    const [wrongAnswersCount, setWrongAnswersCount] = useState(0)
    const [currentTimeStart, setCurrentTimeStart] = useState()



    const [markedItems, setMarkedItems] = useState([])
    const [solvedPairs, setSolvedPairs] = useState(0)

    //   const { draw, ...rest } = props
    //   const canvasRef = useRef(null)
    const [rightArr, setRightArr] = useState([])
    const [leftArr, setLeftArr] = useState([])
    useEffect(() => {
        // console.log(`props.currentPool ${props.currentPool}`);
    }, [])



    useEffect(() => {
        // console.log(solvedPairs, props.gameOptions.wordCount)

        if (solvedPairs === props.gameOptions.wordCount) {
            props.setGameRunning(false)
        }

    }, [solvedPairs])




    useEffect(() => {
        // console.log(`arr was achanged`)
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
        setMarkedItems([])
        setSolvedPairs(0)
        setScore(0)
    }, [props.currentPool])

    useEffect(() => {
        console.log('leftActiveItem is:', leftActiveItem, 'rightActiveItem is:' + rightActiveItem)
        setCurrentTimeStart(Date.now())
        if (leftActiveItem) {
            //on Correct pair
            if (leftActiveItem === rightActiveItem) {
                console.log('nice')

                setMarkedItems([...markedItems, leftActiveItem])
                setLeftActiveItem(null)
                setRightActiveItem(null)
                const elapsedTime = Date.now() - currentTimeStart
                setScore(score - Math.max(0, Math.min(3, Math.floor(elapsedTime / 500))) * 100 + currentGain - 200 * (wrongAnswersCount <= 4 ? wrongAnswersCount : 3))
                setWrongAnswersCount(0)
                setCurrentTimeStart(Date.now() + 500)
                setSolvedPairs(solvedPairs + 1)

            }

            //on wrong answer
            else if (rightActiveItem) {
                // setScore(0)
                setLeftActiveItem(null)
                setRightActiveItem(null)
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

    }, [leftActiveItem, rightActiveItem])


    function handleLeftItemClick(id, item) {
        console.log('hi left', id, item)
        if (leftActiveItem === id) {
            setLeftActiveItem(null)

        }
        else
            setLeftActiveItem(id)
    }

    function handleRightItemClick(id, item) {
        console.log('hi right', id, item)
        if (rightActiveItem === id) {
            setRightActiveItem(null)

        }
        else
            setRightActiveItem(id)
    }

    function mix(inputArr) {
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


    return (
        <div className='RowsContainer'>
            <p>{'SCORE:' + score + ` Mistakes: ${wrongAnswersCount} `}</p>
            {props.gameRunning ? <></> :
                <EndScreen refreshWords={props.refreshWords} score={score}></EndScreen>}
            <section className='rowsSection'>
                <GameRow showAudio={props.gameOptions.audioInHebrew ?? false}
                    gameOptions={props.gameOptions} markedItems={markedItems} activeItem={leftActiveItem}
                    setActiveItem={handleLeftItemClick} inputArr={leftArr}>
                </GameRow>
                <GameRow showAudio={props.gameOptions.audioInArabic ?? false}
                    gameOptions={props.gameOptions} markedItems={markedItems} activeItem={rightActiveItem}
                    setActiveItem={handleRightItemClick} inputArr={rightArr}>

                </GameRow>
                {/* <div id='leftDiv'>gggg</div> */}
            </section>
        </div>
    )
}

export default RowsContainer