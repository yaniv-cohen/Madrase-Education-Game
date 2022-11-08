// import { useEffect, useReducer, useState } from "react"
// // import RowsContainer from "../Components/Canvas/RowsContainer"
// // import GameOptions from "../Components/GameOptions/GameOptions"
// import myQuestionsData from "../../vocab"
// import FieldContainer from "./FieldContainer.js/FieldContainer"
// // const axios = require("axios");
// // const cheerio = require("cheerio");

import Layout from "../../../pages/Layout"
import Card from "../../Card/Card"


// // const pretty = require("pretty");
export const StudentHeader = () => {
    return (
        // <>
        //     <Layout text={'יצירת משחק התאמה'}></Layout>
        //     <div>

        //     </div>
        // </>
        <header>
            <Layout text={'משחק התאמה'}></Layout>

            <Card>

                <p>התאימו את המילים בערבית לפירוש העברי</p>
            </Card>
        </header>
    )
}
export default StudentHeader


