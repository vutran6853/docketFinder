import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      docketData: [],
      userInput: '',
      docketBool: false,
      errorBool: false,
      errorMessage: ''
    }
  }

  setUserInput = (event) => {
    this.setState({ userInput: event.target.value })
  }

  clearData = () => {
    this.setState({ 
      docketData: [],
      userInput: '',
      docketBool: false,
      errorBool: false,
      errorMessage: ''
     })
  }

  getDocketInfo = () => {
    // console.log(this.state)

    let checkValueLength = this.state.userInput.split('')
    // console.log('checkValueLength', checkValueLength)

    if(checkValueLength.length === 6) {
      console.log(true)  
      axios.get(`http://localhost:3015/api/getdocketinfo/${ this.state.userInput }`)
      .then((response) => {
        console.log(response.data)
        if(typeof response.data ==  "object") {
          this.setState({ 
            docketData: response.data, 
            docketBool: true,
            userInput: ""
          })
        } else {
          this.setState({ 
            errorMessage: response.data,
            errorBool: true,
            userInput: ""
          })
        }
      })
      .catch(err => console.log("Danger unable to fetch data at"))
    } else {
      console.log(false)
      console.log("throw error")
    }

  }

  render() {
    let { docketData, errorMessage } = this.state;

    let displayResult = this.state.docketBool ? (
      <div className="result_container">
        <p>Props_id: { docketData.props_id }</p>
        <p>Date: { docketData.date }</p>
        <p>Docket Number: { docketData.docketNumber }</p>
        <p>Docket Order: { docketData.docketOrder }</p>
      </div>
    ) : (
      <>
      </>
    )

    let displayError = this.state.errorBool ? (
      <div className="result_container">
        <p>errorMessage: { errorMessage } </p>
      </div>
    ) : (
      <>
      </>
    )

    return (
      <div className="">
        <div className="title_container">
          <h3>Find Docket Info</h3>
        </div>

        <div className="main_container">
          <div className="input_container">
            <input value={ this.state.userInput } 
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

export default App;