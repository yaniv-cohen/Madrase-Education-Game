// import './Flashcard.scss'
const Front = (props) => {
    

    return (
        <div >
            <h1>{props.text}</h1>
            {props.additionalText?<p>props.additionalText</p>:<></>}
        </div>
    )
}
export default Front