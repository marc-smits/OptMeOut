/**
 *
 * Section Step5 - What happens now? (newsletter signup)
 *
 */

/* TODO 24/08
 *  - handleChange() does not work. props.emitUpdateFormdata needs to be loaded from somewhere
 *  - state of checkbox is stored in temp variable, needs to be in props.formData
 *  - check if validation works when handleChange()
 *  - Do we rund handleChange() from handleCheckBoxClick()?
 * 
 */
import PropTypes from 'prop-types';
import {useState} from 'react'

/* Forms */
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation, required_validation } from '../utils/inputValidations'

function Step5(props) {
    let propsFormData = props.formData;

    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
      console.log(data)
      //(e) => props.emitChangeSection("Step6", e)
    })
    const handleChange = (e) => {
      props.emitUpdateFormdata(e.target.name, e.target.value);
    };

    /* Handle change of a check box */
    //TODO store status in props object
    const [tempCheck, setTempCheck ] = useState(false);
    const handleCheckBoxClick = (e) => {
      //   props.emitUpdateFormdata(e.target.name, !props.formData.stayInformed);
      setTempCheck(!tempCheck);
    }

    return (
        <div className="step" id="step5">

            {/* Headline & Intro */}
            <div className='row'>
              <div className="col col-10">
                <h1 className="headline">[[step5.title]]</h1>
              </div>
            </div>
            <div className='row'>
              <div className="col col-8">
                <p className="intro">[[step5.intro]] [[step4.letter.title]] ObjectRecipientName</p>
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
                      // value={props.formData.senderEmail}
                      type="text"
                      name="senderEmail"
                      handleChange={(e) => handleChange(e)}
                      validation={{
                          ...(tempCheck ? required_validation : {}),
                          ...email_validation
                        }}
                    />

                    <input
                      type="checkbox"
                      name="stayInformed"
                      // checked={propsCheckStayInformed}
                      value={props.formData.stayInformed}
                      onChange={handleCheckBoxClick}
                    />
                    <span>[[step5.form.stayInformed.label]]</span>

                  </form>
                </FormProvider>

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
    formData: PropTypes.object

};

export default Step5
