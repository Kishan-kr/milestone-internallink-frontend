import React from 'react'

function CustomerInfo(props) {
  const {data} = props;

  return (
    <div> 
      <tr>
        <td>{data.sn}</td>
        <td>{data.name}</td>
        <td>{data.contact}</td>
        <td>{data.email}</td>
        <td>{data.seniorName}</td>
        <td>{data.seniorContact}</td>
      </tr>
    </div>
  )
}

export default CustomerInfo