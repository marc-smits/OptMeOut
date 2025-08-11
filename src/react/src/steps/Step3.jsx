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


// Todo for Marc, move classes .formFieldLabelError and .formFieldError  to your place

function Step3(props) {

    let propsFormData = props.formData;

    const [validFirstName, setValidFirstName  ] = useState(true)
    const [validLastName, setValidLastName] = useState(true)
    const [validPhone, setValidPhone] = useState(true)

    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [validDateOfBirth, setValidDateOfBirth] = useState(true)
    const [dateOfBirthIsSet, setDateOfBirthIsSet] = useState(false);

    const [validBsn, setValidBsn] = useState(true)
    // const [formIsValid, setFormIsValid] = useState(true)
    let formIsValid = true;

    /*
    *
    *  Handle change of a text field
    *
    */
    const handleChange = (e) => {
        props.emitUpdateFormdata(e.target.name, e.target.value);
    };

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
    *
    *  Validate form
    *
    */
    const validateForm = (e) => {
            if (!propsFormData.firstName) {
                setValidFirstName(false);
                formIsValid = false;
            }
            if (!propsFormData.lastName) {
                setValidLastName(false);
                formIsValid = false;
            }
            if (!propsFormData.telephone) {
                setValidPhone(false);
                formIsValid = false;
            }
            if (!dateOfBirthIsSet && props.formData.dateOfBirth == '') {
                setValidDateOfBirth(false);
                formIsValid = false;
            }
            if (!propsFormData.bsn) {
                setValidBsn(false);
                formIsValid = false;
            }

            if(formIsValid) {
              console.log("we can continue: " + formIsValid);
              props.emitChangeSection("step4", e);
            }
    };

    /*
    *
    * Open Privacy policy
    *
    */
    const openPrivacyPolicy = (e) => {
            props.emitChangeSection("privacyPolicy", e);
    }

    return (

        <div className="step" id="Step3">

        <div>&nbsp;</div>

            {/* Intro */}
            <h1 className="headline">[[step3.title]]</h1>
            <div className="progress bar2" >&nbsp;</div>
            <p className="intro">[[step3.intro]]</p>

            <div className='formRow'>
              <div className="col">
                <fieldset>
                    <p className="formError">
                        {formIsValid ? "" : "[[global.form.error]]"}
                    </p>
                    <div>
                      <label data-valid={validFirstName}> [[step3.form.field1.label]]</label>
                      <input
                          data-valid={validFirstName}
                          // value={propsFormData.firstName}
                          name="firstName"
                          placeholder="[[step3.form.field1.value]]"
                          onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label data-valid={validLastName}>[[step3.form.field2.label]]</label>
                      <input
                          data-valid={validLastName}
                          // value={propsFormData.lastName}
                          name="lastName"
                          placeholder="[[step3.form.field2.value]]"
                          onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label data-valid={validPhone}>[[step3.form.field3.label]]</label>
                      <input
                          data-valid={validPhone}
                          // value={propsFormData.telephone}
                          name="telephone"
                          placeholder="[[step3.form.field3.value]]"
                          onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label data-valid={validDateOfBirth}>[[step3.form.field4.label]]</label>

                      <DatePicker
                          name="dateOfBirth"
                          data-valid={validDateOfBirth}
                          dateFormat="dd/MM/YYYY"
                          selected={dateOfBirth}
                          showYearDropdown
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                          onChange={changeDate}
                      />
                    </div>
                    <div>
                      <label data-valid={validBsn}>[[step3.form.field5.label]]</label>
                      <input
                          data-valid={validBsn}
                          value={propsFormData.bsn}
                          name="bsn"
                          placeholder="[[step3.form.field5.value]]"
                          onChange={handleChange}
                      />
                    </div>

                </fieldset>
              </div>{/*col*/}
            </div>{/*formRow*/}

            <div className='row'>
                <div className="col flex-center">

                    <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step2", e)}>
                        <BackSvg/>
                        [[button.back]]
                    </div>

                    <div className="button buttonOptMeOut" onClick={(e) => validateForm()}>
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
