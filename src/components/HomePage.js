import React, { useEffect } from 'react'
import '../css/HomePage.css'
import logo from '../assets/logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { FormControl } from 'react-bootstrap'
import { useState } from 'react'
import rightArrow from '../assets/back-arrow.png'
import transferIcon from '../assets/transfer.png'
import Modal from './Modal.js'



const HomePage = () => {
    let data = {}

    const [initialCurrency, setInitialCurrency] = useState('')
    const [exchangeCurrency, setExchangeCurrency] = useState('')
    const [newData, setNewData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [tradeAmount, setTradeAmount] = useState('')

    // for logging the data object

    useEffect(() => {
      console.log(newData)
    },[newData])



    const exchangeMoney = () => {

        var myHeaders = new Headers()
        myHeaders.append("apikey", "OcqoRyNEMuJXxvPKry6BXkZ0XoLmEyOU")
        
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        }

        if (exchangeCurrency != '' && initialCurrency != '' && tradeAmount != '') {

          fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${exchangeCurrency}&from=${initialCurrency}&amount=${tradeAmount}`, requestOptions)
          .then(response => response.text())
          .then(result => {
              data = JSON.parse(result)
              setNewData(data)
              setExchangeCurrency('')
              setInitialCurrency('')
              setShowModal(true)
              
              
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
                placeholder={initialCurrency != '' ? initialCurrency : 'Search for currencies...'}
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

      const CustomMenu2 = React.forwardRef(
        ({ children }, ref) => {
          const [value, setValue] = useState('');
      
          return (
            <div className='dropdown-menu'

            >
              <FormControl
                placeholder={exchangeCurrency != '' ? exchangeCurrency : 'Search for currencies...'}
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
        <div className='header'>
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


              <img className='right-arrow' src={rightArrow} /> 


          <Dropdown>
            <Dropdown.Menu as={CustomMenu2} show='true'>
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

        <div className='exchange-info'>
            <form onSubmit={(e) => {
                e.preventDefault()
                exchangeMoney()
                

            }}>
            <input placeholder='Amount of currency...' value={tradeAmount} className='currency-amount-input' type='text' onChange={e => setTradeAmount(e.target.value)}/>
            <button id='btn'><img src={transferIcon} /></button>
            </form>

        </div>

        {showModal ? <Modal data={newData} setShowModal={setShowModal} showModal={showModal}/> : ''}
    </div>
  )
}

export default HomePage