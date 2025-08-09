/**
 *
 * Section Step2
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
import React, { useState } from 'react'
import BackSvg from './partials/BackSvg.jsx';

function Step2(props) {

    let propsFormData = props.formData;
    let propsCheckRecipientAddress = props.formData.recipientAddress; //Can this be deleted?
    let propsCheckCustomRecipient = props.formData.customRecipient;

    const [styleNameField, setStyleNameField] = useState('')
    const [styleNameFieldLabel, setStyleNameFieldLabel] = useState('')
    const [formIsValid, setFormIsValid] = useState(true)

    /*
    *  Handle change of a text field
    */
    const handleChange = (e) => {
        props.emitUpdateFormdata(e.target.name, e.target.value);
    };

    /*
    *  Handle change of a check box
    */
    const handleCheckBoxClick = (e) => {
        props.emitUpdateFormdata(e.target.name, !props.formData.customRecipient);
        console.log("checkbox" + props.formData.customRecipient);
    }

    /*
    *  Handle change of a text field
    */
    const validateForm = (e) => {

        if (propsFormData.recipientName != '') {
            setStyleNameField('');
            setStyleNameFieldLabel('');
            setFormIsValid(true);
            props.emitChangeSection("step3", e);

            /*
            * TODO: check if recipientAddress & recipientCity are filled out
            */
        } else {
            setStyleNameField('formFieldError');
            setStyleNameFieldLabel('formFieldLabelError');
            setFormIsValid(false);
        }
    };

    return (

        <div className="step" id="Step2">
            {/* Intro */}
            <h1 className="headline">[[step2.title]]</h1>
            <div className="progress bar1" >&nbsp;</div>
            <p className="intro">[[step2.intro]]</p>

            <div className='formRow'>
              <div className="col">
                <fieldset>
                    <p class="formError">
                        {formIsValid ? "" : "[[global.form.error]]"}
                    </p>
                    <div>
                        <label className={styleNameFieldLabel}> [[step2.form.recipientName.label]]</label>
                        <input
                            value={propsFormData.recipientName}
                            name="recipientName"
                            placeholder="[[step2.form.field.value]]"
                            onChange={handleChange}

                            /*
                              TODO: search address if name is entered
                              TODO: disable search if checkbox = checked
                            */
                        />
                    </div>
                      {(propsCheckCustomRecipient) &&
                        /* TODO: CSS fade-in onLoad */
                        <>
                          <div disabled={(propsCheckCustomRecipient)}>
                            <label className={styleNameFieldLabel}>[[step2.form.recipientAddress1.label]]</label>
                            <input
                                //value={propsFormData.recipientAddress1.value}
                                placeholder="Address line 1"
                                name="recipientAddress1"
                                onChange={handleChange}
                            />
                            <input
                                //value={propsFormData.recipientAddress2.value}
                                placeholder="Address line 2"
                                name="recipientAddress2"
                                onChange={handleChange}
                            />
                            <label className={styleNameFieldLabel}>[[step2.form.recipientCity.label]]</label>
                            <input
                                //value={propsFormData.recipientCity.value}
                                placeholder="City"
                                name="recipientCity"
                                onChange={handleChange}
                            />
                        </div>
                      </>

                    }
                    <div>
                      <input
                          type="checkbox"
                          name="customRecipient"
                          checked={propsCheckCustomRecipient}
                          onChange={handleCheckBoxClick}
                      />
                      <span>[[step2.form.check.label]]</span>
                    </div>
                </fieldset>
              </div>{/*col*/}
            </div>{/*row*/}

            <div className='row'>
              <div className="col flex-center">

                    <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step1", e)}>
                      <BackSvg/> [[button.back]]
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
