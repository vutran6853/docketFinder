import React from 'react'

function Result(props) {
  return (
    props.docket.map((value, index) => (
      <div className="result_success" key={ index }>
        <p>Prop_id: { value.prop_id }</p>
        <p>Date: { value.date }</p>
        <p>Docket Number: { value.docketNumber }</p>
        <p>Docket Order: { value.docketOrder }</p>
      </div>
    ))
  )
}

export default Result