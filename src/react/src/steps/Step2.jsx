/**
 * 
 * Section Step2
 * 
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react'

// Todo for Marc, move classes .formFieldLabelError and .formFieldError  to your place
import './step2.scss'

function Step2(props) {

    let propsFormData = props.formData;
    let propsCheckAddressOfGp = props.formData.checkAddressOfGp;
    
    const [styleNameField, setStyleNameField] = useState('')
    const [styleNameFieldLabel, setStyleNameFieldLabel] = useState('')
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
    *  Handle change of a check box
    * 
    */
    const handleCheckBoxClick = (e) => {
        props.emitUpdateFormdata(e.target.name, !propsCheckAddressOfGp);
    }

    /*
    *
    *  Handle change of a text field
    * 
    */
    const validateForm = (e) => {

        if (propsFormData.nameOfGp != '') {
            setStyleNameField('');
            setStyleNameFieldLabel('');
            setFormIsValid(true);
            props.emitChangeSection("step3", e);
        } else {
            setStyleNameField('formFieldError');
            setStyleNameFieldLabel('formFieldLabelError');
            setFormIsValid(false);
        }
    };



    return (

        <div className="step" id="Step2">
            {/* Todo for Marc, make a class for this */}
            <div style={{
                textAlign: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: "url(" + "/src/assets/img/step1.svg    " + ")",
                width: '229px',
                margin: 'auto'
            }}
            >&nbsp;</div>

            {/* Intro */}
            <h1 className="headline">[[step2.title]]</h1>

            <p className="intro">
                [[step2.intro]]
            </p>
            <p className="intro">
                <p style={{ color: 'red' }}>
                    {formIsValid ? "" : "[[global.form.error]]"}
                </p> 
                <span className={'classes generic Input Labels By Marc ' + styleNameFieldLabel}> [[step2.form.field.label]]</span>
                <input
                    className={'classes generic Input By Marc ' + styleNameField}
                    value={propsFormData.nameOfGp}
                    name="nameOfGp"
                    placeholder="[[step2.form.field.value]]"
                    onChange={handleChange}
                />
                <br />
                { (propsFormData.addressOfGp == '') &&
                    <>
                        <span>[[step2.form.check.label]]</span>
                        <input
                            type="checkbox"
                            name="checkAddressOfGp"
                            checked={propsCheckAddressOfGp}
                            onChange={handleCheckBoxClick}
                        />
                    </>
                }
                
                <br />
                {(propsCheckAddressOfGp || propsFormData.addressOfGp != '') &&
                    <input
                        className={'classes generic Input By Marc ' + styleNameField}
                        value={propsFormData.addressOfGp}
                        name="addressOfGp"
                        onChange={handleChange}
                    />
                }

            </p>


            <div className='row'>
                <div className="col flex-center">

                    <div className="button buttonTellMeMore" onClick={(e) => props.emitChangeSection("step1", e)}>
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


Step2.propTypes = {
    formData: PropTypes.object,
    emitChangeSection: PropTypes.func,
    emitUpdateFormdata: PropTypes.func,
};
export default Step2