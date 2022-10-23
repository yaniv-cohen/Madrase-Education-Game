import { useEffect, useReducer, useState } from "react";
import Back from "./Back/Back";
import './Flashcard.scss'
import Front from "./Front.js/Front";
const Flashcard = (props) => {
    const [currentCard, setCurrentCard] = useState({front:"", back:""})
    useEffect(() => {
        setCurrentCard(props.card)
    },[])
    const initialState = { back: false, front: true, bucket: 4 };

    function cardReducer(card, action) {
        switch (action.type) {
            case 'showAll':
                return { back: true, front: true , bucket: 4 };
            case 'showfront':
                return { back: false, front: true , bucket: 4 };
            case 'showBack':
                return { back: true, front: true , bucket: 4 };
            case 'toggleAnswer':
                return { back: !card.back, front: true , bucket: 4 };
            case 'getNewCard':
                {
                    setCurrentCard( props.getNewCard());
                    return { back: false, front: true , bucket: 4 };
                }

            default:
                throw new Error();
        }
    }
    function markAs(val) {
        console.log(`Recieved markAs ${val} to base of ${card.value}`)
        dispatch({ type: 'getNewCard' })
    }
    const [card, dispatch] = useReducer(cardReducer, initialState);
    return (
        < >
            <div>{'secret data: ' + JSON.stringify(card)}</div>
            <div className="cardDataContainer">
                {card.front ? <Front text={currentCard.front.title} additionalText={null} /> : <></>}
                {card.back ? <Back text={currentCard.back.title} additionalText={null} /> : <></>}
            </div>
            <div className="buttonsContainer">
                {
                    card.back ?


                        <>
                            <button onClick={() => { markAs(3) }}>Too Easy</button>
                            <button onClick={() => { markAs(2) }}>Easy</button>
                            <button onClick={() => { markAs(1) }}>Medium</button>
                            <button onClick={() => { markAs(0) }}>Hard</button>
                        </>
                        :
                        <button onClick={() => { dispatch({ type: 'showBack' }) }}>הראה תשובה</button>

                }
            </div>

            <div>
                <button onClick={() => { dispatch({ type: 'toggleAnswer' }) }}>toggle Answer</button>
                <button onClick={() => { dispatch({ type: 'showAll' }) }}>show All</button>
            </div>
        </>
    )

}
export default Flashcard