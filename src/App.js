import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar"
import QuestionPage from "./components/QuestionPage"
import LandingPage from "./components/LandingPage"
import axios from "axios"
import "./App.css"

export default class App extends React.Component {
  state = {
    'data': [],
    'active': "landingpage",
    'selectedLevel': "",
    'selectedSubject': "",
    'selectedTopic': ""
  }


  // fetch data.json on load
  async componentDidMount() {
    let response = await axios.get("data.json")
    this.setState ({
      'data': response.data
    })
  }

  // function to change page from landing to question page + set state (level, subjects)
  changeToQuestionPage = async (evt) => {

    this.setState({
      'active': "questionpage",
      'selectedLevel': evt.target.value,
    })
  }


  // function to change page from question page to landing + reset states
  changeToLandingPage = () => {
    this.setState({
      'active': 'landingpage',
      'selectedLevel': "",
      'selectedSubject': ""
    })
  }


  // recursion function to find object of selected level
  findLevelObj = (array, level) => {
    if (array.length === 1) {
      return array[0]
    } else {
      if (array[0].value === level) {
        return array[0]
      } else {
        return this.findLevelObj(array.slice(1), level)
      }
    }
  }

  selectSubject = (evt) => {
    this.setState({
      'selectedSubject': evt.target.value
    })
  }

  // conditional rendering of pages
  renderContent() {
    if (this.state.active === "landingpage") {
      return(
        <LandingPage data={this.state.data} 
                      changePage={this.changeToQuestionPage}/>
      )
    } else if (this.state.active === "questionpage") {
      return (
        <QuestionPage data={this.state.data} 
                      selectedLevel={this.state.selectedLevel}
                      changePage={this.changeToLandingPage}
                      selectSubject = {this.selectSubject}
                      selectedSubject = {this.state.selectedSubject}
                      levelObj = {this.findLevelObj}
                      />
        
      )
    }
  }




  render () {
    return (
      <React.Fragment>
        <NavBar />
        {this.renderContent()}
      </React.Fragment>
    )
  }

}
