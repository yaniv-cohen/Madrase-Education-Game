import { useEffect, useReducer, useState } from "react";
import Flashcard from "../Flashcard/Flashcard"
import Header from "../Header/Header";
import './Container.scss'
const Container = () => {
    const [cardPool, setCardPool] = useState(new Array(10).fill({ front: { title: 'hi' }, back: { title: 'bye' } , weight: 2}))
    useEffect(()=>{
        
    })
    function getNewCard(){
        let currentBucket= 0
        return cardPool[currentBucket]
    }
    // const initialState = { back: false, front: true };
    // const [cardPool, setCardPool] = useState()


    // //runs on mount
    // useEffect(() => {
    //     console.log('getCardPool from http request - todo - not working')
    //     setCardPool([{ front: { title: 'hi' }, back: { title: 'bye' } , weight: 2}
    // ,{ front: { title: '2' }, back: { title: 'bye3' } , weight: 5}
    // ,{ front: { title: 'hi3' }, back: { title: 'bye3' } , weight: 4}
    // ])
    // }, [])
    // function cardReducer(side, action) {
    //     switch (action.type) {
    //         case 'showAll':
    //             return { back: true, front: true };
    //         case 'showfront':
    //             return { back: false, front: true };
    //         case 'toggleAnswer':
    //             return { back: !side.back, front: true };
    //         default:
    //             throw new Error();
    //     }
    // }

    // const [side, dispatch] = useReducer(cardReducer, initialState);
    return (
        <div className='Container'>
            <Header></Header>
            <Flashcard getNewCard ={getNewCard} card={{ front: { title: 'hi' }, back: { title: 'bye' } , weight: 2}} />
        </div>
    )
}
export default Container