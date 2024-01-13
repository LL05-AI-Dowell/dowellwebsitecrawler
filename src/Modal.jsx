/* eslint-disable react/prop-types */


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OccurenceModal({showModal, setOpenModal, handleFormData, showOccurrence, occurrence}) {
  
  const [hasCoupon, setHasCoupon] = useState(false)

  const handleCoupon = () => {
    setHasCoupon(!hasCoupon)
  }

  // const handleCoupon = () => {
  //   setHasCoupon(prevHasCoupon => !prevHasCoupon);
  // };

  return (
    <>
      <Modal centered show={showModal} onHide={() => setOpenModal(false)}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>

        <div className="modal-divs">
          <img
            style={{width: "100px"}}
            src="https://www.uxlivinglab.org/wp-content/uploads/2023/10/image_1-3.png"
            alt="Dowell Logo"
          />

          <div style={{fontWeight: "bold", fontSize: "20px"}}>Dowell Crawler</div>
        </div>

        <div className="modal-divs">
          {
            // experience is greater or equal to 6
            showOccurrence &&
            occurrence >= 6 &&
            occurrence !== null ? (
            <>
              <p>Your experience count is {occurrence}!</p>
              <div>
                <Button variant='danger' onClick={() => setOpenModal(false)}>Cancel</Button> <Button variant='success'>Contribute</Button>
              </div>
            </>
          ) :
          
          // experience is less than 4
          showOccurrence &&
          occurrence < 4 &&
          occurrence !== null ?
          <>
            <p>Your experience count is {occurrence}!</p>
            <div>
              <Button 
                variant='success' 
                onClick={() => {
                  setOpenModal(false);
                  handleFormData();
                }}>
                  Continue
              </Button>
            </div>
          </>

          // experience is greater or equal to 4 and is less than 6
          : 
          showOccurrence &&
            occurrence >= 4 &&
            occurrence < 6 &&
            occurrence !== null && (
              <div>
                <p>Your experience count is {occurrence}!</p>
                <div>
                  <Button variant='success' 
                    onClick={() => {
                      setOpenModal(false);
                      handleFormData();
                    }}>
                      Continue
                      </Button> <Button variant='secondary'>Contribute</Button>
                </div>
              </div>
          )
        }
        
        </div>

        { occurrence >= 4 &&
          <div className = "modal-divs" style={{marginTop: "25px"}}>
            <p>Do you have a coupon? <Button variant={hasCoupon ? "danger" : "primary"} onClick={handleCoupon}>{hasCoupon ? "No" : "Yes"}</Button></p>
          </div>
        }

        { 
          hasCoupon && 
          <div style={{ display: "flex", gap: "5px"}}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Coupon"
            /> <Button>Redeem</Button>
          </div>
        }
        

        
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OccurenceModal;