/**
 *
 * Section Step3 - Your details
 *
 */



/*
 * Data collected:
 *
 * senderFirstName
 * senderLastName
 * senderPhone
 * senderEmail
 * senderAddress1
 * senderAddress2
 * senderCity
 * senderCountry
 * senderBirthDate
 * senderId
 *
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react'
import BackSvg from '../partials/BackSvg.jsx';

// Based on https://www.freecodecamp.org/news/how-to-validate-forms-in-react/
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import {
  required_validation,
  email_validation,
} from '../utils/inputValidations'

function Step3(props) {
  let propsFormData = props.formData;

  /*
  * Open Privacy policy
  */
  const openPrivacyPolicy = (e) => {
    props.emitChangeSection("privacyPolicy", e);
  }

  /* Forms */
  const handleChange = (e) => {
    props.emitUpdateFormdata(e.target.name, e.target.value);
  };

  const methods = useForm()
  const onSubmit = methods.handleSubmit(data => {
    props.emitChangeSection("step4")
  })

  return (
    <div className="step" id="step3">

      {/* Headline & Intro */}
      <div className='row'>
        <div className="col col-10">
          <h1 className="headline">[[step3.title]]</h1>
          <div className="progress bar2" >&nbsp;</div>
        </div>
      </div>
      <div className='row'>
        <div className="col col-8">
          <p className="intro">[[step3.intro]]</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={e => e.preventDefault()}
          noValidate
          className="container"
        >
          <div className='row'>
            <div className="col-8">
              <Input
                label="[[step3.form.senderFirstName.label]]"
                value={propsFormData.senderFirstName}
                type="text"
                name="senderFirstName"
                value={props.formData.senderFirstName}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderLastName.placeholder]]"
                validation={{ ...required_validation }}
              />
              <Input
                label="[[step3.form.senderLastName.label]]"
                value={propsFormData.senderLastName}
                type="text"
                name="senderLastName"
                value={props.formData.senderLastName}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderLastName.placeholder]]"
                validation={{ ...required_validation }}
              />

              <Input
                label="[[step3.form.senderAddress1.label]]"
                value={propsFormData.senderAddress1}
                type="text"
                name="senderAddress1"
                value={props.formData.senderAddress1}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderAddress1.placeholder]]"
                validation={{ ...required_validation }}
              />


              <Input
                value={propsFormData.senderAddress2}
                type="text"
                name="senderAddress2"
                value={props.formData.senderAddress2}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderAddress2.placeholder]]"
                validation={{ ...required_validation }}
              />



              <Input
                label="[[step3.form.senderCity.label]]"
                value={propsFormData.senderCity}
                type="text"
                name="senderCity"
                value={props.formData.senderCity}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderCity.placeholder]]"
                validation={{ ...required_validation }}
              />

              <Input
                label="[[step3.form.senderCountry.label]]"
                value={propsFormData.senderCountry}
                type="text"
                name="senderCountry"
                value={props.formData.senderCountry}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderCountry.placeholder]]"
                validation={{ ...required_validation }}
              />

              <Input
                label="[[step3.form.senderPhone.label]]"
                value={propsFormData.senderPhone}
                type="number"
                pattern="[0-9]*"
                name="senderPhone"
                value={props.formData.senderPhone}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderPhone.placeholder]]"
                validation={{ ...required_validation }}
              />

              <Input
                label="[[step3.form.senderEmail.label]]"
                value={propsFormData.senderEmail}
                type="text"
                name="senderEmail"
                value={props.formData.senderEmail}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderEmail.placeholder]]"
                validation={{ ...email_validation }}
              />
              <Input
                label="[[step3.form.senderBirthDate.label]]"
                value={propsFormData.senderBirthDate}
                type="date"
                name="senderBirthDate"
                value={props.formData.senderBirthDate}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderBirthDate.placeholder]]"
                validation={{ ...required_validation }}
              />
              <Input
                label="[[step3.form.senderId.label]]"
                value={propsFormData.senderId}
                type="text"
                name="senderId"
                value={props.formData.senderId}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step3.form.senderId.placeholder]]"
                maxlength="4"
                validation={{ ...required_validation }}
              />
            </div>{/*col*/}
          </div>{/*formRow*/}
        </form>
      </FormProvider>

      <div className='row'>
        <div className="col flex-center">
          <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step2", e)}>
            <BackSvg />
            [[button.back]]
          </div>
          <div className="button buttonOptMeOut" onClick={onSubmit}>
            [[button.OptMeOut]]
          </div>
        </div>{/*col*/}
      </div>{/*row*/}
    </div>
  )
}

Step3.propTypes = {
  formData: PropTypes.object,
  emitChangeSection: PropTypes.func,
  emitUpdateFormdata: PropTypes.func,
};

export default Step3