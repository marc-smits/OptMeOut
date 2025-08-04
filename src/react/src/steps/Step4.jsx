/**
 * 
 * Section Step4
 * 
 */
import PropTypes from 'prop-types';


import './steps.scss'
// Todo for Marc, move classes .formFieldLabelError and .formFieldError  to your place
import './step2.scss'

function Step4(props) {

    return (

        <div className="step" id="Step4">
            {/* Todo for Marc, make a class for this */}
            <div style={{
                textAlign: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: "url(" + "/src/assets/img/step3.svg    " + ")",
                width: '229px',
                margin: 'auto'
            }}
            >&nbsp;</div>

            {/* Intro */}
            <h1 className="headline">step4 will be here</h1>

            <div className='row'>
                <div className="col flex-center">

                    <div className="button buttonTellMeMore" onClick={(e) => props.emitChangeSection("step3", e)}>
                        [[button.back]]
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.875 13.6969L7.875 -4.86836e-07L10.125 -3.7865e-07L10.125 13.6969L16.425 7.39688L18 9L9 18L-3.57639e-07 9L1.575 7.39688L7.875 13.6969Z" fill="currentcolor"></path>
                        </svg>
                    </div>

                    <div className="button buttonOptMeOut" onClick={(e) => props.emitChangeSection("summary", e)}>
                        [[button.send_it]]
                    </div>
                </div>{/*col*/}
            </div>{/*row*/}
        </div>

    )
}


Step4.propTypes = {
    emitChangeSection: PropTypes.func,
};

export default Step4