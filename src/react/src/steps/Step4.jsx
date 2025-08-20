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
<pre>
                step4.months.january : [[step4.months.january]] <br/> 
                step4.months.february : [[step4.months.february]] <br/> 
                step4.months.march: [[step4.months.march]] <br/> 
                step4.months.april: [[step4.months.april]] <br/> 
                step4.months.may: [[step4.months.may]] <br/> 
                step4.months.june: [[step4.months.june]] <br/> 
                step4.months.july: [[step4.months.july]] <br/> 
                step4.months.august: [[step4.months.august]] <br/> 
                step4.months.september: [[step4.months.september]] <br/> 
                step4.months.october: [[step4.months.october]] <br/> 
                step4.months.november: [[step4.months.november]] <br/> 
                step4.months.december: [[step4.months.december]] <br/> 
                step4.receive_a_copy.title : [[step4.receive_a_copy.title]] <br/> 
                step4.receive_a_copy.text: [[step4.receive_a_copy.text]] <br/> 
                step4.receive_a_copy.email_place_holder: [[step4.receive_a_copy.email_place_holder]] <br/> 
                step4.opt_out_letter.title: [[step4.opt_out_letter.title]] <br/> 
                step4.opt_out_letter.saluation: [[step4.opt_out_letter.saluation]] <br/> 
                step4.opt_out_letter.content: [[step4.opt_out_letter.content]] <br/> 
                step4.donate.title: [[step4.donate.title]] <br/> 
                step4.donate.text: [[step4.donate.text]] <br/> 
                step4.donate.payment_options.1: [[step4.donate.payment_options.1]] <br/> 
                step4.donate.payment_options.2: [[step4.donate.payment_options.2]] <br/> 
                step4.donate.payment_options.3: [[step4.donate.payment_options.3]] <br/> 
                step4.donate.payment_options.4: [[step4.donate.payment_options.4]] <br/> 
                 button.send: [[button.send]] <br/> 
</pre>
  
               
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
