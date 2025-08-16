/**
 *
 * Section Step3
 *
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackSvg from './partials/BackSvg.jsx';

// Based on https://www.freecodecamp.org/news/how-to-validate-forms-in-react/
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import {
  name_validation,
  desc_validation,
  email_validation,
  num_validation
} from '../utils/inputValidations'

function Step3(props) {
    let propsFormData = props.formData;

    /*
    *  Handle change of a text field
    */
    // const handleChange = (e) => {
    //     props.emitUpdateFormdata(e.target.name, e.target.value);
    //     console.log("handleChange");
    // };
    //
    /*
    *
    *  Change date field
    *
    */
    const changeDate = (date) => {
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let month = date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let year = date.getFullYear();

        let dateStr = day + '/' + month + '/' + year;
        setDateOfBirthIsSet(true);
        props.emitUpdateFormdata('dateOfBirth', dateStr);

        // update date on the Datepicker field
        dateStr = year + '/' + month + '/' + day;
        setDateOfBirth(new Date(dateStr));
    };

    /*
    * Open Privacy policy
    */
    const openPrivacyPolicy = (e) => {
            props.emitChangeSection("privacyPolicy", e);
    }

    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
      console.log(data)
    })

    return (
      <div>
      <FormProvider {...methods}>
        <form
          onSubmit={e => e.preventDefault()}
          noValidate
          className="container"
        >

        <div className='formRow'>
          <div className="col">
          <Input
            label="[[step3.form.field1.label]]"
            type="text"
            id="firstName"
            placeholder="[[step3.form.field1.value]]"
          />
          <Input
            label="[[step3.form.field2.label]]"
            type="text"
            id="lastName"
            placeholder="[[step3.form.field2.value]]"
          />
          <Input
            label="[[step3.form.field3.label]]"
            type="number"
            id="phone"
            placeholder="[[step3.form.field3.value]]"
          />
          <Input
            label="[[step3.form.field4.label]]"
            type="date"
            id="birthDate"
            placeholder="[[step3.form.field4.value]]"
          />
          <Input
            label="[[step3.form.field5.label]]"
            type="text"
            id="bsn"
            placeholder="[[step3.form.field5.value]]"
            maxlength="4"
          />
          </div>
        </div>
        </form>
        </FormProvider>

        <div className='row'>
            <div className="col flex-center">

                <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step2", e)}>
                    <BackSvg/>
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
