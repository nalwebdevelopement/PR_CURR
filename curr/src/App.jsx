import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import Header from './component/Header'
import CurrencyRow from './component/CurrencyRow'
import Convert from './component/Convert'
const BASE_URL =  "https://v6.exchangerate-api.com/v6/9bb6af9629d4dc00b91c5153/latest/USD"

function App() {
  const [count, setCount] = useState(0)
  const[currOption,SetCurrOption] = useState([])
  const [fromcurrency, SetFromCurrency] = useState()
  const [tocurrency,SetToCurrency] = useState()
  const [conversionRates, setConversionRates] = useState({});
  const [convertedValue, setConvertedValue] = useState(0); 
  const [amount, setAmount] = useState(1); 
  console.log(currOption)

  // const getSelectedValue = (e) => {
  //   const currValue = e.target.value
  //   console.log(e.target.value)
    
  // }

  useEffect( () => {
      fetch(BASE_URL)
      .then(res => res.json())
     // .then(data => console.log(data))
      .then(data => {
        console.log("data",data)
        if(data && data.conversion_rates){
        const firstCurrency = Object.keys(data.conversion_rates)[0]
        console.log("first",firstCurrency)
        SetCurrOption([data.base_code , ...Object.keys(data.conversion_rates)])
        SetFromCurrency(data.base_code);
        SetToCurrency(firstCurrency)
        setConversionRates(data.conversion_rates);
        
        }
        else
        {
          console.log("Conversinon rate is not present in the fetched data")
        }
      })
      .catch(err=>console.log("Error Fetching Data:",err))
    },[])// empty array
    const convertcurrency =() => {
      if((fromcurrency &&  tocurrency  && amount) > 0){
      console.log("from and to and amount ",fromcurrency,tocurrency,amount) 
      const fromRate = conversionRates[fromcurrency]
      console.log("from rate", fromRate)
      

      const toRate = conversionRates[tocurrency]
      console.log("To rate", toRate)
      const result = (amount * toRate) /fromRate
      setConvertedValue(result.toFixed(2));
      console.log(`Converted Value: ${result}`);
      console.log(`Converted Value:`,convertedValue);
      }
      else
      {
        console.error("Invalid input or missing data for conversion.");
      }
    };
    const getAmtFun = (value) => 
    {
      setAmount(value)
    }

  return (
    <>
     <Header />
     <CurrencyRow currOption1={currOption} 
     selectedCurrency={fromcurrency}
     getSelectedValue={ e => SetFromCurrency(e.target.value)}
     value={amount}
     getAmtFun={getAmtFun}
     /> 
     <div className="equals">  = </div>
     <CurrencyRow currOption1={currOption}
      selectedCurrency={tocurrency}
      getSelectedValue={ e => SetToCurrency(e.target.value)}
      value ={convertedValue}
      getAmtFun={getAmtFun}
      /> 
      
      <button name="convert1" onClick= {convertcurrency}> convert</button>
    </>
  )
}

export default App
