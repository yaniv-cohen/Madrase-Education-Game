import './EndScreen.scss'
const EndScreen = (props)=> {
    return(
        <div className='EndScreen'>
            <div>
            EndScreen
            </div>
            <div>
            כל הכבוד!
            <p>{'הניקוד שלך הוא ' + props.score??0 }</p>
            <button onClick={()=>{props.refreshWords()}}>שחק שוב</button>
            </div>
            
            </div>
    )
}
export default EndScreen