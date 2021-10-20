import React from "react"
import GradeRadioBtn from "./GradeRadioBtn"
import TopicList from "./TopicList"
import SubjectBtn from "./SubjectBtn"

export default function SearchForm () {
        return (
            <React.Fragment>
                <GradeRadioBtn />
                <br/>
                <TopicList />
                <br/>
                <SubjectBtn />
            </React.Fragment>
        )
}