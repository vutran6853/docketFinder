import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect, should } from 'chai'
import App from '../App'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Check className in App Exist', () => {
  
  it('Check className main_container', () => {
    let component = shallow(<App />)
    let wrapper = component.find('.main_container')
    // console.log("component = ", component.debug())
    
    expect(wrapper).to.have.lengthOf(1)
  })

  it('Check className input_container', () => {
    let component = shallow(<App />)
    let wrapper = component.find('.input_container')

    expect(wrapper).to.have.lengthOf(1)
  })
})

describe('Check inital state in App', () => {

  it('Check initalState docketBool', () => {
    let component = shallow(<App />)
    let initalState = false

    expect(component.state().docketBool).to.equal(initalState)
  })

  it('Check initalState userInput ', () => {
    let component = shallow(<App />)
    let initalState = 'thereissomethinghere'

    expect(component.state().userInput).not.equal(initalState)
  })
})

describe('check for input field', () => {

  it('find input and enter some value', () => {
    let component = shallow(<App />)
    let value = '123456'

    component.find('input').simulate('click')
    component.setState({ userInput: value })
    expect(component.state().userInput).to.equal("123456")

  })
})