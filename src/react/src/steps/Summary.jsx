/**
 * 
 * Section Summary
 * 
 */
import PropTypes from 'prop-types';
import { PDFViewer } from '@react-pdf/renderer';
import EmailPdf from './../components/EmailPdf.jsx';
function Summary(props) {

    return (

        <div className="step" id="Summary">

            {/* Intro */}
            <h1 className="headline">Summary will be here</h1>

            <div className='row'>
                <div className="col flex-center">

                    <div className="button buttonTellMeMore" onClick={(e) => props.emitChangeSection("step4", e)}>
                        [[button.back]]
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.875 13.6969L7.875 -4.86836e-07L10.125 -3.7865e-07L10.125 13.6969L16.425 7.39688L18 9L9 18L-3.57639e-07 9L1.575 7.39688L7.875 13.6969Z" fill="currentcolor"></path>
                        </svg>
                    </div>

                    <div className="button buttonOptMeOut" onClick={(e) => props.emitChangeSection("thankyou", e)}>
                        [[button.finish]]
                    </div>
                </div>{/*col*/}
            </div>{/*row*/}

            <PDFViewer>
                <EmailPdf formData={props.formData} />
            </PDFViewer>
        </div>

    )
}

Summary.propTypes = {
    emitChangeSection: PropTypes.func,
    formData: PropTypes.object

};

export default Summary