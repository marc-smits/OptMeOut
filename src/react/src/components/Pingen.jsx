/**
 * 
 * A component to get a payment link and redirect to the payment (Mollie) page
 * 
 */

import { useEffect, useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

import AjaxSpinner from './AjaxSpinner.jsx'
function Pingen(props) {
  const [showAjaxSpinner, setShowAjaxSpinner] = useState(false);
  // Flag to indicate the the letter is posted to Pingen
  const [isPinged, setIsPinged] = useState(false);

  useEffect(() => {
    if (props.canPingen == true && isPinged == false) {
      pingen()
    }
  });


  /**
   * Create opt-me-out pds and send to pingen and email to client
   *  
   */
  const pingen = (e) => {
    setIsPinged(true);
    let post = {
      'form': JSON.stringify(props.formData)
    }

    setShowAjaxSpinner(true);
    let url = '/api/pingen.php';
    axios.post(
      url,
      post,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then(res => {
        setShowAjaxSpinner(false);
        props.emitChangeSection("step5")
      }

      )
      .catch(function (error) {
        setShowAjaxSpinner(false);
        props.emitChangeSection("error")

      });
  };

  return (
    <div > {showAjaxSpinner && <AjaxSpinner />
    }

    </div>
  )
}
Pingen.propTypes = {
  emitChangeSection: PropTypes.func,
  canPingen: PropTypes.bool,
  formData: PropTypes.object,
};

export default Pingen;