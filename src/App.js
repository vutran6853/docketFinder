import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import datas from './data.json';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      docketData: [],
      userInput: '',
      docketBool: false,
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
      docketBool: false,
      errorBool: false,
     })
  }

  getDocketInfo = () => {
    let checkValueLength = this.state.userInput.split('')

    if(checkValueLength.length === 6) {
      axios.get(`http://localhost:5000/docket/${ this.state.userInput }`)
      .then((response) => {
        if(response.data.length ===  1) {
          this.setState({ 
            docketData: response.data, 
            docketBool: true,
            userInput: ""
          })
        } else {
          this.setState({ errorBool: true, userInput: "" })
        }
      })
      .catch(err => console.log("Danger unable to fetch data at getDocketInfo"))
    } else {
      this.setState({ errorBool: true, userInput: "" })
    }
  }

  render() {
    let { docketData, errorMessage } = this.state;

    let displayResult = this.state.docketBool ? (
      <div className="result_success">
        <p>Props_id: { docketData[0].prop_id }</p>
        <p>Date: { docketData[0].date }</p>
        <p>Docket Number: { docketData[0].DocketNum }</p>
        <p>Docket Order: { docketData[0].DocketOrder }</p>
      </div>
    ) : (
      <>
      </>
    )

    let displayError = this.state.errorBool ? (
      // <div>
        <p>{ errorMessage }</p>
      // </div>
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
            <input value={ this.state.userInput } 
                   type="number"
                   onClick={ this.clearData }
                   onChange={ (e) => this.setUserInput(e) } 
                   placeholder="Enter props_id">
            </input>
            <button onClick={ () => this.getDocketInfo() }>Submit</button>
          </div>
          <div className="result_error">
            { displayError }
          </div>
          { displayResult }
        </div>
        

      </div>
    )
  }
}

export default App;