/**
 *
 * Section Step4
 *
 */
import PropTypes from 'prop-types';


// Todo for Marc, move classes .formFieldLabelError and .formFieldError  to your place
import './step2.scss'
import BackSvg from '../partials/BackSvg.jsx';
function Step4(props) {

    return (

        <div className="step" id="Step4">
            <h1 className="headline">step4 will be here</h1>
            <div className="progress bar2" >&nbsp;</div>
            <p className="intro">[[step4.intro]]</p>

            <div className='row'>
                <div className="col flex-center">

                    <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step3", e)}>
                      <BackSvg/>
                      [[button.back]]
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
