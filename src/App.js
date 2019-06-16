import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Result from './components/Result/result'

class App extends Component {
  constructor() {
    super() 
    this.state = {
      docketData: [],
      userInput: '',
      errorBool: false,
      errorMessage: 'Invald prop_id or unable to find ID. Try again'
    }
  }

  setUserInput = (e) => {
    this.setState({ userInput: e.target.value })
  }

  // reset local state
  clearData = () => {
    this.setState({ 
      docketData: [],
      userInput: '',
      errorBool: false,
     })
  }

  getDocketInfo = () => {
    let checkValueLength = this.state.userInput.split('')

    if(checkValueLength.length === 6) {
      
      axios.get(`http://localhost:3015/api/getdocketinfo/${ this.state.userInput }`)
      .then((response) => {
        console.log('response', response)
        if(response.data.length >=  1) {
          this.setState({ 
            docketData: response.data, 
            userInput: ""
          })
        } else {
          this.setState({ errorBool: true, userInput: "" })
        }
      })
      .catch(err => console.log("Danger unable to fetch data at getDocketInfo" + err))
    } else {
      this.setState({ errorBool: true, userInput: "" })
    }
  }

  render() {
    let { docketData, errorMessage, errorBool, userInput } = this.state

    let displayResult = docketData ? 
      <Result docket={this.state.docketData}/>
    : (
      <>
      </>
    )

    let displayError = errorBool ? (
      <p>{ errorMessage }</p>
    ) : (
      <>
      </>
    )

    return (
      <div className="container">
        <div className="title">
          <h3>Find Docket Info</h3>
        </div>

        <div className="main_container">
          <div className="main_items">
            <input value={ userInput } 
                   type="number"
                   onClick={ this.clearData }
                   onChange={ (e) => this.setUserInput(e) } 
                   placeholder="Enter props_id">
            </input>
            <button onClick={ () => this.getDocketInfo() }>Submit</button>
          </div>
          { displayResult }
          { displayError }
        </div>
      </div>
    )
  }
}

export default App