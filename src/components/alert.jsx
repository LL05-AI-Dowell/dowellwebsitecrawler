/* eslint-disable react/prop-types */
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible({message, variant}) {
  const [show, setShow] = useState(true);

  return (
    <>
    { show && 
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    }
    </>
  );
}


export default AlertDismissible;