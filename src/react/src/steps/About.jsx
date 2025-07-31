/**
 *
 * Section About
 *
 */
import PropTypes from 'prop-types';

function About(props) {

        return (
              <div class="row">
                <div class="col">
                    <div className="step" id="about">
                        <div
                                className='buttonClose'
                                onClick={(e) => props.emitChangeSection("closeSection", e)}
                        >
                                &nbsp;
                        </div>
                        <div>[[PAGE_ABOUT_PARAGRAPHS]]</div>
                    </div>
                </div>
              </div>

        )
}

About.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default About
