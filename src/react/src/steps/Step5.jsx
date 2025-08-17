/**
 *
 * Section Step5 - What happens now? (newsletter signup)
 *
 */
import PropTypes from 'prop-types';

function Step5(props) {

    return (

        <div className="step" id="step5">

            {/* Intro */}
            <h1 className="headline">[[step5.title]] What happens now?</h1>

            <div className='row'>
                <div className="col flex-center">
                  <div className="button buttonOptMeOut" onClick={(e) => props.emitChangeSection("Step6", e)}>
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
