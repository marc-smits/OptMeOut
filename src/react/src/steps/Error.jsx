/**
 *
 * Section Error
 *
 */
import PropTypes from 'prop-types';

function Error(props) {

        return (
                <div class="row">
                        <div class="col">
                                <div className="step" id="Error">
                                        <div
                                                className='buttonClose'
                                                onClick={(e) => props.emitChangeSection("closeSection", e)}
                                        >
                                                &nbsp;
                                        </div>
                                        [[error.message]]
                                        {props.formData.hasPaid &&
                                                <div>
                                                        [[error.contact1]]
                                                        {props.formData.senderEmail}
                                                       
                                                </div>
                                        }
                                        <div> [[error.contact2]]        </div>

                                </div>
                        </div>
                </div>


        )
}

Error.propTypes = {
        formData: PropTypes.object,
        emitChangeSection: PropTypes.func,  // Change step
};
export default Error
