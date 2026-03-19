/**
 * 
 * A component to get a payment link and redirect to the payment (Mollie) page
 * 
 */

import { useEffect, useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import AjaxSpinner from '../components/AjaxSpinner.jsx'
function Invoice(props) {
  const [showAjaxSpinner, setShowAjaxSpinner] = useState(false);
  // prevent to recreate the payment link
  const [hasPaymentLink, setHasPaymentLink] = useState(false);


  useEffect(() => {
    if (props.formData.orderNumber != '' && hasPaymentLink == false) {
      getPaymentLink();
    }
  });


  /**
   * Get payment link and redirect
   *  
   */
  const getPaymentLink = (e) => {

    let post = {
      'form': JSON.stringify(props.formData)
    }

    setShowAjaxSpinner(true);
    setHasPaymentLink(true)
    let url = '/api/payment.php';
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
        window.location.href = res.data.link;
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
Invoice.propTypes = {
  emitChangeSection: PropTypes.func,
  formData: PropTypes.object,
};

export default Invoice;