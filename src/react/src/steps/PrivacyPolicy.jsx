/**
 *
 * Section PrivacyPolicy
 *
 */
import PropTypes from 'prop-types';

function PrivacyPolicy(props) {

        return (
                <div class="row">
                        <div class="col">
                                <div className="step" id="privacyPolicy">
                                        <div
                                                className='buttonClose'
                                                onClick={(e) => props.emitChangeSection("closeSection", e)}
                                        >
                                                &nbsp;
                                        </div>
                                       [[STEP_4_PRIVACY_POLICY]]
                                </div>
                        </div>
                </div>

        )
}

PrivacyPolicy.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default PrivacyPolicy
