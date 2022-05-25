import React from 'react'
import '../../css/HomePage.css'
import logo from '../../assets/logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { FormControl } from 'react-bootstrap'
import { useState } from 'react'
import rightArrow from '../../assets/back-arrow.png'
import transferIcon from '../../assets/transfer.png'



const HomePage = () => {
    let tradeAmount = '0'
    let data = {}

    const [initialCurrency, setInitialCurrency] = useState('')
    const [exchangeCurrency, setExchangeCurrency] = useState('')
    const [newData, setNewData] = useState(null)



    const exchangeMoney = (tradeAmount) => {

        var myHeaders = new Headers()
        myHeaders.append("apikey", "OcqoRyNEMuJXxvPKry6BXkZ0XoLmEyOU")
        
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        }

        if (exchangeCurrency != '' && initialCurrency != '' && tradeAmount != 0) {

          fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${exchangeCurrency}&from=${initialCurrency}&amount=${tradeAmount}`, requestOptions)
          .then(response => response.text())
          .then(result => {
              data = JSON.parse(result)
              setNewData(data)
              setExchangeCurrency('')
              setInitialCurrency('')
          })
          .catch(error => console.log('error', error));
        } else {
          console.log('missing input!')
        }
        


    }

    const CustomMenu = React.forwardRef(
        ({ children }, ref) => {
          const [value, setValue] = useState('');
      
          return (
            <div className='dropdown-menu'

            >
              <FormControl
                autoFocus
                placeholder="Search for currencies"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <ul id='currency-list' style={value != '' ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                {React.Children.toArray(children).filter(
                  (child) =>
                    !value || child.props.children.toLowerCase().includes(value),
                )}
              </ul>
            </div>
          );
        },
      );



  return (
    <div className='homepage-container'>
        <div id='header'>
            <img src={logo} id='main-logo' />
            <h1 id='main-title'>Exchange It</h1>
        </div>

        <div className='currency-search'>
        <Dropdown>
            <Dropdown.Menu as={CustomMenu} show='true'>
                <Dropdown.Item eventKey="1" id='USD' onClick={e => setInitialCurrency(e.target.id)}>US Dollar ( USD )</Dropdown.Item>
                <Dropdown.Item eventKey="2" id='EUR' onClick={e => setInitialCurrency(e.target.id)}>Euro ( EUR )</Dropdown.Item>
                <Dropdown.Item eventKey="3" id='GBP' onClick={e => setInitialCurrency(e.target.id)}>Pound Sterling ( GBP )</Dropdown.Item>
                <Dropdown.Item eventKey="4" id='JPY' onClick={e => setInitialCurrency(e.target.id)}>Japanese Yen ( JPY )</Dropdown.Item>
                <Dropdown.Item eventKey="5" id='AUD' onClick={e => setInitialCurrency(e.target.id)}>Australian Dollar ( AUD )</Dropdown.Item>
                <Dropdown.Item eventKey="6" id='CAD' onClick={e => setInitialCurrency(e.target.id)}>Canadian Dollar ( CAD )</Dropdown.Item>
                <Dropdown.Item eventKey="7" id='CHF' onClick={e => setInitialCurrency(e.target.id)}>Swiss Franc ( CHF )</Dropdown.Item>
                <Dropdown.Item eventKey="8" id='CNH' onClick={e => setInitialCurrency(e.target.id)}>Chinese Renminbi ( CNH )</Dropdown.Item>
                <Dropdown.Item eventKey="9" id='HKD' onClick={e => setInitialCurrency(e.target.id)}>Hong Kong Dollar ( HKD )</Dropdown.Item>
                <Dropdown.Item eventKey="10" id='NZD' onClick={e => setInitialCurrency(e.target.id)}>New Zealand Dollar ( NZD )</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <div className='exchange-info'>
            <div className='conversion-header'>
              <h4>{initialCurrency != '' ? initialCurrency : '‎'}</h4>
              <img className='right-arrow' src={rightArrow} /> 
              <h4>{exchangeCurrency != '' ? exchangeCurrency : '‎'}</h4>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                exchangeMoney(tradeAmount)
                
                
            }}>
            <input placeholder='Amount of currency' className='currency-amount-input' type='text' onChange={e => tradeAmount = e.target.value}/>
            <button><img src={transferIcon} /></button>
            {newData != null ? <p>Exchange Rate: {newData.info.rate}</p> : <p>Exchange Rate: 0</p>}
            {newData != null ? <p>Amount Recieved: {newData.result}</p> : <p>Amount Recieved: 0</p>}
            </form>
        </div>

        <Dropdown>
            <Dropdown.Menu as={CustomMenu} show='true'>
                <Dropdown.Item eventKey="1" id='USD' onClick={e => setExchangeCurrency(e.target.id)}>US Dollar ( USD )</Dropdown.Item>
                <Dropdown.Item eventKey="2" id='EUR' onClick={e => setExchangeCurrency(e.target.id)}>Euro ( EUR )</Dropdown.Item>
                <Dropdown.Item eventKey="3" id='GBP' onClick={e => setExchangeCurrency(e.target.id)}>Pound Sterling ( GBP )</Dropdown.Item>
                <Dropdown.Item eventKey="4" id='JPY' onClick={e => setExchangeCurrency(e.target.id)}>Japanese Yen ( JPY )</Dropdown.Item>
                <Dropdown.Item eventKey="5" id='AUD' onClick={e => setExchangeCurrency(e.target.id)}>Australian Dollar ( AUD )</Dropdown.Item>
                <Dropdown.Item eventKey="6" id='CAD' onClick={e => setExchangeCurrency(e.target.id)}>Canadian Dollar ( CAD )</Dropdown.Item>
                <Dropdown.Item eventKey="7" id='CHF' onClick={e => setExchangeCurrency(e.target.id)}>Swiss Franc ( CHF )</Dropdown.Item>
                <Dropdown.Item eventKey="8" id='CNH' onClick={e => setExchangeCurrency(e.target.id)}>Chinese Renminbi ( CNH )</Dropdown.Item>
                <Dropdown.Item eventKey="9" id='HKD' onClick={e => setExchangeCurrency(e.target.id)}>Hong Kong Dollar ( HKD )</Dropdown.Item>
                <Dropdown.Item eventKey="10" id='NZD' onClick={e => setExchangeCurrency(e.target.id)}>New Zealand Dollar ( NZD )</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    </div>
  )
}

export default HomePage