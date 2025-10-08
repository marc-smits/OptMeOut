/**
 *
 * Section Step5 - What happens now? (newsletter signup)
 *
 */
import PropTypes from 'prop-types';
import {useEffect,useState } from 'react'
/* Forms */
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation, required_validation } from '../utils/inputValidations'
import axios from 'axios';
import AjaxSpinner from '../components/AjaxSpinner.jsx'
import Order from '../lib/Order.jsx';

function Step5(props) {
    const [stayInformed, setStayInformed] = useState('');
    const [isOnMailingList, setIsOnMailingList,] = useState(false);

    useEffect(() => {
        Order.deleteFormDataCookies();
        let checkedStatus = (!props.formData.stayInformed ) ? '' : 'checked'
        setStayInformed(checkedStatus)
    });

    const [showAjaxSpinner, setShowAjaxSpinner] = useState(false);

    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
      if( props.formData.stayInformed ) {
        addToMailingList();
      }
      console.log(data)
      //(e) => props.emitChangeSection("Step6", e)
    })
    const handleChange = (e) => {
      props.emitUpdateFormdata(e.target.name, e.target.value);
    };

    /* Handle change of a check box */
    const handleCheckBoxClick = (e) => { 
      props.formData.stayInformed = (!props.formData.stayInformed ) 
      props.emitUpdateFormdata('stayInformed', props.formData.stayInformed);
    }

  const addToMailingList = (e) => {
    let url = '/api/laposta.php?email=' + props.formData.senderEmail;
    setShowAjaxSpinner(true);

    axios.get(url)
      .then(res => {
        setShowAjaxSpinner(false);;
      })

      .catch((error) => {
        setShowAjaxSpinner(false);
        let errorMsg = error.response.data.error
        if (errorMsg.includes('Email address exists')) {
          setIsOnMailingList(true);
        } else {
          //(e) => props.emitChangeSection("Step6", e)
        }
      });
  }

    return (
        <div className="step" id="step5">
        {showAjaxSpinner &&
          <AjaxSpinner />
        }
            {/* Headline & Intro */}
            <div className='row'>
              <div className="col col-10">
                <h1 className="headline">[[step5.title]]</h1>
              </div>
            </div>
            <div className='row'>
              <div className="col col-8">
                <p className="intro">[[step5.intro]] [[step4.letter.title]] 
                  ObjectrecipientTitle
                  ObjectrecipientFirstName 
                  ObjectrecipientLastName</p>
              </div>
            </div>

            <div className='row'>
              <div className="col col-8">
                <h3>[[step5.stayInformed.title]]</h3>
                <p>[[step5.stayInformed.text]]</p>

                <FormProvider {...methods}>
                  <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    className="container"
                  >
                    <Input
                      label=" "
                      placeholder="[[step4.form.senderEmail.placeholder]]"
                      value={props.formData.senderEmail}
                      type="text"
                      name="senderEmail"
                      handleChange={(e) => handleChange(e)}
                      validation={{
                          ...(stayInformed == 'checked' ? email_validation : {})
                        }}
                    />

                    <input
                      type="checkbox"
                      name="stayInformed"
                      checked={stayInformed}
                      onChange={handleCheckBoxClick}
                    />
                    <span>[[step5.form.stayInformed.label]]</span>
                  </form>
                </FormProvider>
                 {isOnMailingList &&
                  <div>[[step5.form.stayInformed.email_already_in_mailing_list]]</div>
                 }
              </div>
            </div>

            <div className='row'>
                <div className="col flex-center">
                  <div className="button buttonOptMeOut" onClick={onSubmit}>
                      [[button.finish]]
                  </div>
                </div>{/*col*/}
            </div>{/*row*/}
        </div>

    )
}

Step5.propTypes = {
  emitChangeSection: PropTypes.func,
  emitUpdateFormdata: PropTypes.func,
  formData: PropTypes.object

};

export default Step5
