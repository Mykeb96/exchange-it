import React from 'react'
import '../css/Modal.css'
import moneyBag from '../assets/money-bag.png'
import trend from '../assets/trend.png'

const Modal = ({data, setShowModal}) => {
  return (
    <div className='modal-background' onClick={() => setShowModal(false)}>
        <div className='modal'>
            <div className='modal-column'>
                <img src={moneyBag} />
                <p>You Recieve: {data.result}</p>
            </div>

            <div className='modal-column'>
                <img src={trend} />
                <p>Rate of Exchange: {data.info.rate}</p>
            </div>
        </div>
    </div>
  )
}

export default Modal