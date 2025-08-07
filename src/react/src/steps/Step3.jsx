/**
 * 
 * Section Step3
 * 
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



// Todo for Marc, move classes .formFieldLabelError and .formFieldError  to your place
import './step2.scss'

function Step3(props) {

    let propsFormData = props.formData;

    const [styleFirstNameField, setStyleFirstNameField] = useState('')
    const [styleFirstNameFieldLabel, setStyleFirstNameFieldLabel] = useState('')

    const [styleLastNameField, setStyleLastNameField] = useState('')
    const [styleLastNameFieldLabel, setStyleLastNameFieldLabel] = useState('')

    const [styleTelephoneField, setStyleTelephoneField] = useState('')
    const [styleTelephoneFieldLabel, setStyleTelephoneFieldLabel] = useState('')


    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [styleDateOfBirthField, setStyleDateOfBirthField] = useState('')
    const [styleDateOfBirthFieldLabel, setStyleDateOfBirthFieldLabel] = useState('')
    const [dateOfBirthIsSet, setDateOfBirthIsSet] = useState(false);


    const [styleBsnField, setStyleBsnField] = useState('')
    const [styleBsnFieldLabel, setStyleBsnFieldLabel] = useState('')

    const [formIsValid, setFormIsValid] = useState(true)


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

        setStyleFirstNameField('');
        setStyleFirstNameFieldLabel('');
        setStyleLastNameField('');
        setStyleLastNameFieldLabel('');
        setStyleTelephoneField('');
        setStyleTelephoneFieldLabel('');
        setStyleDateOfBirthField('');
        setStyleDateOfBirthFieldLabel('');
        setStyleBsnField('');
        setStyleBsnFieldLabel('');
        setFormIsValid(true);

        if (
            propsFormData.firstName != '' &&
            propsFormData.lastName != '' &&
            propsFormData.telephone != '' &&
            (dateOfBirthIsSet || props.formData.dateOfBirth != '')
        ) {
            props.emitChangeSection("step4", e);
        } else {
            setFormIsValid(false);
            if (propsFormData.firstName == '') {
                setStyleFirstNameField('formFieldError');
                setStyleFirstNameFieldLabel('formFieldLabelError');
            }
            if (propsFormData.lastName == '') {
                setStyleLastNameField('formFieldError');
                setStyleLastNameFieldLabel('formFieldLabelError');
            }

            if (propsFormData.telephone == '') {
                setStyleTelephoneField('formFieldError');
                setStyleTelephoneFieldLabel('formFieldLabelError');
            }

            if (!dateOfBirthIsSet && props.formData.dateOfBirth == '') {
                setStyleDateOfBirthField('formFieldError');
                setStyleDateOfBirthFieldLabel('formFieldLabelError');
            }

            if (propsFormData.bsn == '') {
                setStyleBsnField('formFieldError');
                setStyleBsnFieldLabel('formFieldLabelError');
            }
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
            {/* Todo for Marc, make a class for this */}
            <div style={{
                textAlign: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: "url(" + "/src/assets/img/step2.svg    " + ")",
                width: '229px',
                margin: 'auto'
            }}
            >&nbsp;</div>

            {/* Intro */}
            <h1 className="headline">[[step3.title]]</h1>

            <p className="intro">
                [[step3.intro]]
            </p>
            <p className="intro">
                <p style={{ color: 'red' }}>
                    {formIsValid ? "" : "[[global.form.error]]"}
                </p>
                <span className={'classes generic Input Labels By Marc ' + styleFirstNameFieldLabel}> [[step3.form.field1.label]]</span>
                <input
                    className={'classes generic Input By Marc ' + styleFirstNameField}
                    value={propsFormData.firstName}
                    name="firstName"
                    placeholder="[[step3.form.field1.value]]"
                    onChange={handleChange}
                />

                <br />
                <span className={'classes generic Input Labels By Marc ' + styleLastNameFieldLabel}> [[step3.form.field2.label]]</span>
                <input
                    className={'classes generic Input By Marc ' + styleLastNameField}
                    value={propsFormData.lastName}
                    name="lastName"
                    placeholder="[[step3.form.field2.value]]"
                    onChange={handleChange}
                />

                <br />
                <span className={'classes generic Input Labels By Marc ' + styleTelephoneFieldLabel}> [[step3.form.field3.label]]</span>
                <input
                    className={'classes generic Input By Marc ' + styleTelephoneField}
                    value={propsFormData.telephone}
                    name="telephone"
                    placeholder="[[step3.form.field3.value]]"
                    onChange={handleChange}
                />

                <br />
                <span className={'classes generic Input Labels By Marc ' + styleDateOfBirthFieldLabel}> [[step3.form.field4.label]]</span>

                <DatePicker
                    name="bsn"
                    className={'classes generic Input By Marc ' + styleDateOfBirthField}
                    dateFormat="dd/MM/YYYY"
                    selected={dateOfBirth}
                    showYearDropdown
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    onChange={changeDate}
                />

                <br />
                <span className={'classes generic Input Labels By Marc ' + styleBsnFieldLabel}> [[step3.form.field5.label]]</span>
                <input
                    className={'classes generic Input By Marc ' + styleBsnField}
                    value={propsFormData.bsn}
                    name="bsn"
                    placeholder="[[step3.form.field5.value]]"
                    onChange={handleChange}
                />
            </p>


            <div className='row'>
                <div className="col flex-center">

                    <div className="button buttonTellMeMore" onClick={(e) => props.emitChangeSection("step2", e)}>
                        [[button.back]]
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.875 13.6969L7.875 -4.86836e-07L10.125 -3.7865e-07L10.125 13.6969L16.425 7.39688L18 9L9 18L-3.57639e-07 9L1.575 7.39688L7.875 13.6969Z" fill="currentcolor"></path>
                        </svg>
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