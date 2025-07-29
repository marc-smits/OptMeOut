/**
 * 
 * Section About
 * 
 */
import PropTypes from 'prop-types';


import './steps.scss'
import './About.scss'


function About(props) {


        return (
                <div className="step" id="About">
                        <div
                                className='closeButton'
                                onClick={(e) => props.emitChangeSection("closeSection", e)}
                        >
                                &nbsp;
                        </div>
                        <div>[[PAGE_ABOUT_PARAGRAPHS]]</div>
                </div>

        )
}


About.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default About