/**
 *
 * Section Step2 - Recipient
 *
 */

 
/*
 * Data collected:
 *
 * recipientTitle
 * recipientFirstName
 * recipientLastName
 * recipientAddress1
 * recipientAddress2
 * recipientCity
 * recipientCountry (can be taken from language selection)
 *
 */

import PropTypes from 'prop-types';
import BackSvg from '../partials/BackSvg.jsx';
import RecipientSearch from '../components/RecipientSearch.jsx'

// Based on https://www.freecodecamp.org/news/how-to-validate-forms-in-react/
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { required_validation } from '../utils/inputValidations'
import { useEffect, useState } from 'react'

function Step2(props) {

  const [searchField, setSearchField] = useState("")
  const methods = useForm()
  const onSubmit = methods.handleSubmit(data => {
    props.emitChangeSection("step3")
  })

  let propsFormData = props.formData;
  let propsCheckCustomRecipient = props.formData.customRecipient;
  /*
  *  Handle change text input
  */
  const handleChange = (e) => {
    props.emitUpdateFormdata(e.target.name, e.target.value);
  };


  /*
  *  Handle search Field change 
  */
  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  /*
  *  Handle change of a check box
  */
  const handleCheckBoxClick = (e) => {

    props.emitUpdateFormdata(e.target.name, !props.formData.customRecipient);
  }

  return (
    <div className="step" id="step2">
      {/* Headline & Intro */}
      <div className='row'>
        <div className="col col-10">
          <h1 className="headline">[[step2.title]]</h1>
          <div className="progress bar1" >&nbsp;</div>
        </div>
      </div>
      <div className='row'>
        <div className="col col-8">
          <p className="intro">[[step2.intro]]</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={e => e.preventDefault()}
          noValidate
          className="container"
        >

          <div className='row'>
            <div className="col col-8">
              <input name="searchField"
                placeholder="[[step2.recipient_search.search]]"
                value={searchField}
                onChange={handleSearchChange}
              />

              <RecipientSearch
                formData={props.formData}
                searchField={searchField}
                locale={props.formData.locale}
                emitHandleChange={handleChange}
              />
            </div>
          </div>

          <div className='row'>
            <div className="col col-8">

              <Input
                label="[[step2.form.recipientOrganization.label]]"
                value={propsFormData.recipientOrganization}
                type="text"
                name="recipientOrganization"
                maxlength="40"
                value={props.formData.recipientOrganization}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step2.form.recipientOrganization.placeholder]]"
                validation={{
                  required: {
                    value: (propsCheckCustomRecipient) ? true : false,
                    message: 'required',
                  },
                }}
              />

              <Input
                label="[[step2.form.recipientTitle.label]]"
                value={propsFormData.recipientTitle}
                type="text"
                name="recipientTitle"
                maxlength="10"
                value={props.formData.recipientTitle}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step2.form.recipientTitle.placeholder]]"
              />

              <Input
                label="[[step2.form.recipientFirstName.label]]"
                value={propsFormData.recipientFirstName}
                type="text"
                name="recipientFirstName"
                maxlength="20"
                value={props.formData.recipientFirstName}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step2.form.recipientFirstName.placeholder]]"
              />

              <Input
                label="[[step2.form.recipientLastName.label]]"
                value={propsFormData.recipientLastName}
                type="text"
                maxlength="20"
                name="recipientLastName"
                value={props.formData.recipientLastName}
                handleChange={(e) => handleChange(e)}
                placeholder="[[step2.form.recipientLastName.placeholder]]"
              />


              <div className="fadeIn" disabled={(propsCheckCustomRecipient)}>
                <Input
                  label="[[step2.form.recipientAddress1.label]]"
                  value={propsFormData.recipientAddress1}
                  type="text"
                  name="recipientAddress1"
                  maxlength="20"
                  value={props.formData.recipientAddress1}
                  handleChange={(e) => handleChange(e)}
                  placeholder="[[step2.form.recipientAddress1.placeholder]]"
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
                  maxlength="20"
                  value={props.formData.recipientAddress2}
                  handleChange={(e) => handleChange(e)}
                  placeholder="[[step2.form.recipientAddress2.placeholder]]"
                  validation={{
                    required: {
                      value: (propsCheckCustomRecipient) ? true : false,
                      message: 'required',
                    }
                  }}
                />
                <Input
                  label="[[step2.form.recipientCity.label]]"
                  type="text"
                  name="recipientCity"
                  maxlength="20"
                  value={props.formData.recipientCity}
                  handleChange={(e) => handleChange(e)}
                  placeholder="[[step2.form.recipientCity.placeholder]]"
                  validation={{
                    required: {
                      value: (propsCheckCustomRecipient) ? true : false,
                      message: 'required',
                    }
                  }}
                />

                <Input
                  label="[[step2.form.recipientCountry.label]]"
                  type="text"
                  name="recipientCountry"
                  maxlength="20"
                  value={props.formData.recipientCountry}
                  handleChange={(e) => handleChange(e)}
                  placeholder="[[step2.form.recipientCountry.placeholder]]"
                  validation={{
                    required: {
                      value: (propsCheckCustomRecipient) ? true : false,
                      message: 'required',
                    },
                  }}
                />
              </div>


            </div>{/*col*/}
          </div>{/*formRow*/}
        </form>
      </FormProvider>

      <div className='row'>
        <div className="col flex-center">

          <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step1", e)}>
            <BackSvg /> [[button.back]]
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
