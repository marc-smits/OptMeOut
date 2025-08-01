/**
 *
 * Splash
 *
 * splash
 *
 */
import PropTypes from 'prop-types';

function Splash(props) {

        return (
                <div className="step" id="Splash">
                        <h1>[[page.fallback.header]]</h1>
                        <p1>[[page.fallback.intro]]</p1>

                        {/* Buttons */}
                        <div className='buttonsRow'>
                                <div
                                        className="buttonDefault"
                                        onClick={(e) => props.emitChangeSection("about", e)}
                                >
                                        [[menu.about]]
                                </div>
                                <div
                                        className="buttonDefault"
                                        onClick={(e) => props.emitChangeSection("selectCountry", e)}
                                >
                                        [[page.fallback.button]]
                                </div>
                        </div>

                </div>

        )
}


Splash.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};

export default Splash
