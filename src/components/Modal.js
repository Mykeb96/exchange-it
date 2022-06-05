import React from 'react'
import '../css/Modal.css'
import moneyBag from '../assets/money-bag.png'
import trend from '../assets/trend.png'
import closeIcon from '../assets/back-arrow-64.png'
const Modal = ({data, setShowModal, showModal}) => {
  return (
    <div className='modal-background'>
        <div className='modal'>
            <div className='modal-info-container'>
                <div className='modal-column'>
                    <img src={moneyBag} />
                    <p>You Recieve: {data.result}</p>
                    <p>{data.query.from} ➪ {data.query.to}</p>
                </div>

                <div className='modal-column'>
                    <img src={trend} />
                    <p>Rate of Exchange: {data.info.rate}</p>
                    <p>{data.date}</p>
                </div>
            </div>

            <img src={closeIcon} className='closeIcon' onClick={() => setShowModal(false)}/>
        </div>
    </div>
  )
}

export default Modal