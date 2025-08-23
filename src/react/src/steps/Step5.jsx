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
            {/* Headline & Intro */}
            <div className='row'>
              <div className="col col-10">
                <h1 className="headline">[[step5.title]]</h1>
              </div>
            </div>
            <div className='row'>
              <div className="col col-8">
                <p className="intro">[[step5.intro]]</p>
              </div>
            </div>
            
            <div className='row'>
              <div className="col col-8">
                <p>newsletter signup</p>
              </div>
            </div>

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
