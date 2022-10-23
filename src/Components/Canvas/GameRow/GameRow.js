import React, { useRef, useEffect } from 'react'
import './GameRow.scss'
import SoundIcon from './SoundIcon'

const GameRow = props => {
// useEffect(()=>{
//     console.log(props.inputArr)
// })
    return (

        <div className="GameRow">
            {props.inputArr.map((data, index) => {
                let divState = props.markedItems.includes(data.id)
                return (<div className={'BasicBlock ' + (divState ? 'CorrectItem' : '')
                    + (props.activeItem == data.id ? 'SelectedItem' : '')} key={data.id} onClick={(e) => {
                        if (!divState) {
                            props.setActiveItem(data.id, e.target)
                        }
                    }}>

                    {data.text + ' id:' + data.id}
                    {props.showAudio?<SoundIcon audioUrl={data.audio}/>:<></>}
                    </div>)
            })}
            {props.children}

        </div>

    )
}

export default GameRow