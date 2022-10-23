import { useEffect, useState } from 'react';
import MenuIcon from '../Canvas/MenuIcon';
import ControlledRadioButton from './ControlledRadioButton';
import './GameOptions.scss';
const GameOptions = (props) => {

  const [gameOptions, setGameOptions] = useState({ audioInHebrew: false, audioInArabic: true, wordCount: 4 })

  // const [wordCount, setWordCount] = useState(gameOptions.wordCount)
  const [customWord, setCustomWord] = useState('')


  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    props.setGameOptions(gameOptions)

  }, [gameOptions]);

  const propegateOptionsUp = () => {
    props.setGameOptions(gameOptions)
  }

  function updateGameOptions(key, value) {
    const copy = { ...gameOptions }
    copy[key] = value
    setGameOptions(copy)
    console.log(copy)

  }


function handleChangeWordCount(newValue){
  console.log('newValue',newValue);

  updateGameOptions('wordCount', newValue)
}

  const addWord = () => {
    if (props.customWordsList.includes(customWord)) {
      setCustomWord('')
      return
    }
    props.setCustomWordsList([...props.customWordsList, customWord])
    setCustomWord('')
  }

  const removeWord = (word) => {
    console.log('remove word', word)
    const index = props.customWordsList.indexOf(word)
    const copy = [...props.customWordsList]
    copy.splice(index, 1)
    if (index !== -1) {
      props.setCustomWordsList(copy)
    }
  }
  return (

    <aside className="optionsTopContainer"
    // onMouseEnter={() => { 
    //   setShowOptions(true) }}
    //   onMouseLeave={() => { setShowOptions(false) }
    //   } 
    >

      <p onClick={() => { setShowOptions(!showOptions) }}>
        {showOptions ? `<<`:<MenuIcon></MenuIcon>  }
        
      </p>
      {showOptions ? <div className="optionsContainer">
        <div className='option'>
          <ControlledRadioButton updateGameOptions={updateGameOptions}
            value={gameOptions.audioInArabic} keyName={'audioInArabic'} text={'קטע שמיעה בקלף הערבית'} />
        </div>
        <div className='option'>
          <ControlledRadioButton updateGameOptions={updateGameOptions}
            value={gameOptions.audioInHebrew} keyName={'audioInHebrew'} text={'קטע שמיעה בקלף העברית'} />
        </div>
        <div className='option'>

          <label>            מספר מילים:
            <input className='numberInput' onChange={(e) => { handleChangeWordCount(parseInt(e.target.value) )}}
              value={"" + gameOptions.wordCount} type='number' />

          </label>
        </div>
        <div className='option customWords'>

          <label>            הוסף מילה:
            <input className='numberInput' onChange={(e) => { setCustomWord(e.target.value) }}
              value={customWord} type='text' />
            <button onClick={() => { addWord() }}>הוסף</button>
          </label>
          <div>
            {props.customWordsList.map(word => {
              return <span key={word} onClick={() => {
                removeWord(word)
              }}>{word + '  '}</span>
            })}
          </div>
        </div>
        <div className='option customWords'>

          <button onClick={props.refreshWords}>רענן מילים</button>
        </div>
      </div> : <></>}

    </aside>
  )

}

export default GameOptions