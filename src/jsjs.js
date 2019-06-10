
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const uuidv1 = require('uuid');

const Counter = () => {
    return (
        <div>
          <br/> {0}<br/>
          <button>+</button><button>-</button>
          <br/>
        </div>
    )
}

let count = 0;
const App = () => {
    const [Elements, SetElements] = useState({ AllCounters: new Map() });

    const getUniqueKey = () => {
        return uuidv1();
    }

    const getNewCounter = () => {
        return (
            <div>
              <Counter />
            </div>
        )
    }

    const AddCounter = () => {
        let newMap = new Map(Elements.AllCounters);
        newMap.set(getUniqueKey(), getNewCounter());

        SetElements({ AllCounters: newMap });
    }

    return (
        <>
          <button onClick={AddCounter}>Add Counter</button>{' '}
          <ul>
              {
                Elements.AllCounters.forEach((value,key,map) => {
                  return( <li key={key} >{value}</li> )
                })
              }
          </ul>
        </>
    );
}