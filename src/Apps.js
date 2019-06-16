import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import Result from './components/Result/result'

function App() {
  const [docketData, setDocketData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [errorBool, setErrorBool] = useState(false)
  const [docketBool, setDocketBool] = useState(false)
  const [errorMessege, setErrorMessage] = useState('Invald prop_id ')

  // reset local state
  const resetState = () => {
    setInputValue('')
    setDocketData([])
    setErrorBool(false)
    setDocketBool(false)
  }

  const getDocketInfo = () => {
    let checkValueLength = inputValue.split('')

    if(checkValueLength.length === 6) {
      axios.get(`http://localhost:3015/api/getdocketinfo/${ inputValue }`)
      .then((response) => {
        if(response.data.length >=  1) {
          setDocketData(response.data)
          setInputValue('')
          setDocketBool(true)
        } else {
          setErrorBool(true)
          setInputValue('')
        }
      })
      .catch(err => console.log("Danger unable to fetch data at getDocketInfo" + err))
    } else {
      setErrorBool(true)
      setInputValue('')
    }
  }  

  let displayResult = docketBool ?
    <Result docket={docketData}/>
  : (
    <>
    </>
  )

  let displayError = errorBool ? (
    <p>{ errorMessege }</p>
  ) : (
    <>
    </>
  )

  return(
    <div className="container">
      <div className="title">
        <h3>Find Dcoket Info</h3>
      </div>
      <div className="main_container">
        <div className="main_items">
          <input type="number"
                 placeholder="Enter prop_id"
                 value={ inputValue }
                 onClick={ resetState }
                 onChange={ (e) => setInputValue(e.target.value) }>
          </input>
          <button onClick={ getDocketInfo } >Submit</button>
        </div>
        { displayResult }
        { displayError }
      </div>
    </div>
  )
}

export default App