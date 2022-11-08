import Card from '../../Card/Card'
import './EndScreen.scss'
const EndScreen = (props) => {
    return (
        <Card>
        <div className='EndScreen'>
            {/* <div> */}
            <div>
                <h1>
                כל הכבוד!</h1>
            </div>
            <div>
                <p>{'הניקוד שלך הוא ' + props.score ?? 0}</p>
                <button onClick={() => { props.clickFuncion() }}>שחק שוב</button>
            </div>

        </div>
        </Card>
    )
}
export default EndScreen