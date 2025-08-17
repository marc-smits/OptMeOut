/**
 *
 * Section Step4 - Your opt out | PDF, OK & payment
 *
 */
import PropTypes from 'prop-types';
import BackSvg from '../partials/BackSvg.jsx';

import { PDFViewer } from '@react-pdf/renderer';
import EmailPdf from '../components/EmailPdf.jsx';

function Step4(props) {

    return (

        <div className="step" id="step4">
            <h1 className="headline">[[step4.title]] Your opt out</h1>
            <div className="progress bar2" >&nbsp;</div>
            <p className="intro">[[step4.intro]]</p>

            <PDFViewer>
                <EmailPdf formData={props.formData} />
            </PDFViewer>

            <div className='row'>
                <div className="col flex-center">
                    <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step3", e)}>
                      <BackSvg/>
                      [[button.back]]
                    </div>

                    <div className="button buttonOptMeOut" onClick={(e) => props.emitChangeSection("step4", e)}>
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
