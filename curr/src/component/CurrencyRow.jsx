import React, { useState } from 'react'
import App from '../App'

function CurrencyRow({currOption1,selectedCurrency, getSelectedValue, value,getAmtFun}) {

  // const {currOption} = currOption1
  const [getAmt,SetGetAmt] = useState(0)
  const { currOption2 } = {...currOption1} 
  console.log({currOption1})
  console.log(`curr`, {currOption2})
  const handleAmount =(e) =>
  {
    const {value} =e.target;
      SetGetAmt(value)
      getAmtFun(value)
  }
  
  return (
    <div>

     
      <input className="input"
      type="text"
      name="amt"
      placeholder='Enter the amount'
      onChange={handleAmount}
      value={value }
      />
    <select value={selectedCurrency} onChange={getSelectedValue}>
      {currOption1.map((option,index) => (
        <option key = {index} value ={option}>{option}</option>
      ))}
      
    </select>
    
    </div>
  )
}

export default CurrencyRow
