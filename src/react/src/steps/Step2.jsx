/**
 *
 * Section Step2 - Recipient
 *
 */

/*
 * Data collected:
 *
 * recipientName
 * recipientAddress1
 * recipientAddress2
 * recipientCity
 * recipientCountry (can be taken from language selection)
 *
 */

import PropTypes from 'prop-types';
// import React, { useState } from 'react'
import BackSvg from '../partials/BackSvg.jsx';

// Based on https://www.freecodecamp.org/news/how-to-validate-forms-in-react/
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import {
  required_validation,
} from '../utils/inputValidations'

function Step2(props) {
    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
      props.emitChangeSection("step3")
      console.log(data)
    })

    let propsFormData = props.formData;
    let propsCheckCustomRecipient = props.formData.customRecipient;
    const handleChange = (e) => {
      props.emitUpdateFormdata(e.target.name, e.target.value);
    };

    /*
    *  Handle change of a check box
    */
    const handleCheckBoxClick = (e) => {
        props.emitUpdateFormdata(e.target.name, !props.formData.customRecipient);
    }

      return (
        <div className="step" id="step2">
            {/* Intro */}
            <h1 className="headline">[[step2.title]]</h1>
            <div className="progress bar1" >&nbsp;</div>
            <p className="intro">[[step2.intro]]</p>

            <FormProvider {...methods}>
              <form
                onSubmit={e => e.preventDefault()}
                noValidate
                className="container"
              >
                <div className='formRow'>
                  <div className="col">
                      <Input
                        label="[[step3.form.recipientName.label]]"
                        value={propsFormData.recipientName}
                        type="text"
                        name="recipientName"
                        value={props.formData.recipientName}
                        handleChange={(e) => handleChange(e)}
                        placeholder="[[step3.form.recipientName.placeholder]]"
                        validation={{...required_validation}}
                      />
                      {(propsCheckCustomRecipient) &&
                        <>
                          <div className="fadeIn" disabled={(propsCheckCustomRecipient)}>
                            <Input
                              label="[[step3.form.recipientAddress1.label]]"
                              value={propsFormData.recipientAddress1}
                              type="text"
                              name="recipientAddress1"
                              value={props.formData.recipientAddress1}
                              handleChange={(e) => handleChange(e)}
                              placeholder="[[step3.form.recipientAddress1.placeholder]]"
                              validation={{
                                required: {
                                  value: (propsCheckCustomRecipient) ? true : false,
                                  message: 'required',
                                },
                              }}
                            />
                            <Input
                              value={propsFormData.recipientAddress2}
                              type="text"
                              name="recipientAddress2"
                              value={props.formData.recipientAddress2}
                              handleChange={(e) => handleChange(e)}
                              placeholder="[[step3.form.recipientAddress2.placeholder]]"
                              validation={{
                                required: {
                                  value: (propsCheckCustomRecipient) ? true : false,
                                  message: 'required',
                                },
                              }}
                            />
                            <Input
                              label="[[step3.form.recipientCity.label]]"
                              type="text"
                              name="recipientCity"
                              value={props.formData.recipientCity}
                              handleChange={(e) => handleChange(e)}
                              placeholder="[[step3.form.recipientCity.placeholder]]"
                              validation={{
                                required: {
                                  value: (propsCheckCustomRecipient) ? true : false,
                                  message: 'required',
                                },
                              }}
                            />
                          </div>
                        </>
                      }
                      <input
                          type="checkbox"
                          name="customRecipient"
                          checked={propsCheckCustomRecipient}
                          value={props.formData.customRecipient}
                          onChange={handleCheckBoxClick}
                      />
                      <span>[[step2.form.check.label]]</span>

                  </div>{/*col*/}
                </div>{/*formRow*/}
              </form>
              </FormProvider>

              <div className='row'>
                <div className="col flex-center">

                      <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step1", e)}>
                        <BackSvg/> [[button.back]]
                      </div>

                      <div className="button buttonOptMeOut" onClick={onSubmit}>
                          [[button.OptMeOut]]
                      </div>
                </div>{/*col*/}
              </div>{/*row*/}
        </div>

    )
}


Step2.propTypes = {
    formData: PropTypes.object,
    emitChangeSection: PropTypes.func,
    emitUpdateFormdata: PropTypes.func,
};
export default Step2
