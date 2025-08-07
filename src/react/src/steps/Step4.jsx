/**
 * 
 * Section Step4
 * 
 */
import PropTypes from 'prop-types';


// Todo for Marc, move classes .formFieldLabelError and .formFieldError  to your place
import './step2.scss'
import BackSvg from './partials/BackSvg.jsx';
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
                        <BackSvg/>
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