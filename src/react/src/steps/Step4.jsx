/**
 *
 * Section Step4 - Your opt out | PDF, OK & payment
 *
 */
import PropTypes from 'prop-types';
import { useState } from 'react';

import BackSvg from '../partials/BackSvg.jsx';
import ButtonMore from '../partials/ButtonMore.jsx';
import LocalDate from '../partials/LocalDate.jsx';


/* Forms */
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation } from '../utils/inputValidations'


function Step4(props) {

    /* Payment option */
    const [paymentOption, setPaymentOption] = useState(3);

    const selectDonation = (option, e) => {
        setPaymentOption(option);
        //TODO: store payment option in object
    };

    // ReadMore button(s)
    const [readMore1, setReadMore1] = useState(false);
    const toggleReadMore1 = () => setReadMore1(prev => !prev);

    //Forms
    const handleChange = (e) => {
      // props.emitUpdateFormdata(e.target.name, e.target.value);
    };

    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
      //(e) => props.emitChangeSection("step5", e)
      console.log(data)
    })

    return (
        <div className="step" id="step4">
            {/* Headline & Intro */}
            <div className='row'>
              <div className="col col-10">
                <h1 className="headline">[[step4.title]]</h1>
                <div className="progress bar3" >&nbsp;</div>
              </div>
            </div>
            <div className='row'>
              <div className="col col-8">
                <p className="intro">[[step4.intro]]</p>
              </div>
            </div>

            <div className='row'>
                <div className="col">
                  <div className="letter">
                    <div className="letterAddress">
                      <div className="recipient">
                        <p>
                          {props.formData.recipientOrganization}<br />
                          {props.formData.recipientTitle != "" &&
                            <>{props.formData.recipientTitle} <br /></>
                          }
                          {props.formData.recipientFirstName != "" &&
                            <>{props.formData.recipientFirstName} <br /></>
                          }
                          {props.formData.recipientLastName != "" &&
                            <>{props.formData.recipientLastName} <br /></>
                          }
                          {props.formData.recipientAddress1}<br />
                          {props.formData.recipientAddress2}<br />
                          {props.formData.recipientCity}<br />
                          {props.formData.recipientCountry}<br />

                        </p>
                      </div>
                      <div className="sender">
                        <p>
                        <strong>From:</strong><br />
                        {props.formData.senderFirstName} {props.formData.senderLastName}<br />
                        {props.formData.senderAddress1}<br />
                        {props.formData.senderAddress2}<br />
                        {props.formData.senderCity}<br />
                        {props.formData.senderCountry}<br />
                      </p>
                        <p>
                           [[step4.letter.senderBirthDate]] Date of Birth:  {props.formData.senderBirthDate}<br />
                           [[step4.letter.senderId]]:  {props.formData.senderId}<br />
                           [[step4.letter.senderPhone]]:  {props.formData.senderPhone}<br />
                           [[step4.letter.senderEmail]]:  {props.formData.senderEmail}<br />
                        </p>
                      </div>
                    </div>
                    <div className="letterMeta">
                      <p>
                        <strong>Date: </strong><LocalDate localeCode={props.formData.locale} /><br />
                        <strong>Subject: </strong>[[step4.letter.subject]]
                      </p>
                    </div>
                    <div className={readMore1 ? 'letterBody fadeIn' : 'letterBody readLess'}>
                     
                      {props.formData.recipientLastName != "" &&
                        <p>
                          [[step4.letter.saluation]]&nbsp;
                          {props.formData.recipientTitle != "" &&
                            <>{props.formData.recipientTitle}&nbsp;</>
                          }
                          {props.formData.recipientFirstName != "" &&
                             <>{ props.formData.recipientFirstName }&nbsp;</>
                          }
                          {props.formData.recipientLastName}
                        </p>
                      }
                     
                      
                      [[step4.letter.content]]
                      <br/>  <br/>
                      {props.formData.senderFirstName} {props.formData.senderLastName}
                    </div>{/*letterbo*/}

                    <ButtonMore readMore={readMore1} toggleReadMore={toggleReadMore1} />

                  </div>{/*letter*/}
                </div>{/*col*/}
            </div>{/*row*/}

            <div className='row'>
                <div className="col-8">
                    <h3>[[step4.receiveACopy.title]]</h3>
                    <p className="mb-10">[[step4.receiveACopy.text]]</p>
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
                          validation={{...email_validation}}
                        />
                      </form>
                    </FormProvider>

                </div>{/*col*/}
            </div>{/*row*/}

            <div className='row'>
                <div className="col col-8">
                  <h3>[[step4.donate.title]]</h3>
                  <p className="mb-30">[[step4.donate.text]]</p>

                  <div className="donate flex-center">

                    <div className="donateOption" data-selected={paymentOption === 1 ? "true" : "false"}>
                      <div className="button buttonDonate" onClick={(e) => selectDonation(1, e)}>&euro;0.01</div>
                      <div className="donateLabel">[[step4.donate.paymentOptions.1]]</div>
                    </div>

                    <div className="donateOption" data-selected={paymentOption === 2 ? "true" : "false"}>
                      <div className="button buttonDonate" onClick={(e) => selectDonation(2, e)}>&euro;2</div>
                      <div className="donateLabel">[[step4.donate.paymentOptions.2]]</div>
                    </div>

                    <div className="donateOption" data-selected={paymentOption === 3 ? "true" : "false"}>
                      <div className="button buttonDonate" onClick={(e) => selectDonation(3, e)}>&euro;4</div>
                      <div className="donateLabel">[[step4.donate.paymentOptions.3]]</div>
                    </div>

                    <div className="donateOption" data-selected={paymentOption === 4 ? "true" : "false"}>
                      <div className="button buttonDonate" onClick={(e) => selectDonation(4, e)}>&euro;10</div>
                      <div className="donateLabel">[[step4.donate.paymentOptions.4]]</div>
                    </div>
                  </div>

                </div>{/*col*/}
            </div>
{/*
            <PDFViewer>
                <EmailPdf formData={props.formData} />
            </PDFViewer>
*/}

            <div className='row'>
                <div className="col flex-center">
                    <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step3", e)}>
                      <BackSvg/>
                      [[button.back]]
                    </div>

                    <div className="button buttonOptMeOut" onClick={onSubmit}>
                        [[button.send]]
                    </div>
                </div>{/*col*/}
            </div>{/*row*/}

        </div>

    )
}


Step4.propTypes = {
    emitChangeSection: PropTypes.func,
    formData: PropTypes.object,
};

export default Step4
