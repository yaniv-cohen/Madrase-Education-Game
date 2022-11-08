import { useEffect, useReducer, useState } from "react"
import TeacherContainer from "../Components/Teacher/TeacherContainer"
// import RowsContainer from "../Components/Canvas/RowsContainer"
// import GameOptions from "../Components/GameOptions/GameOptions"
import myQuestionsData from "../vocab"
import Layout from "./Layout"
import './GlobalStyle.scss';

// const axios = require("axios");
// const cheerio = require("cheerio");
// const pretty = require("pretty");
// import './Teacher.scss'
export const Teacher = () => {


    return (
        <div>
            <Layout text={'יצירת משחק התאמה'}></Layout>
            <TeacherContainer></TeacherContainer>
        </div>
    )
}
export default Teacher


