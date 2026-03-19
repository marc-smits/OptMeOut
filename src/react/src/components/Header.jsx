/**
 *
 * Component to render the header
 *
 */
import PropTypes from 'prop-types';
import { useState } from 'react';

function Header(props) {

  return (
    <>
        {(props.currentSection).slice(0,5) == "step1" &&
            <div className="menu">
                <div className="button" id="headerLanguageSelect"
                    onClick={(e) => props.emitChangeSection("selectCountry", e)}>
                    [[menu.locale]]
                </div>
                <div
                    className="button"
                    id="headerAbout"
                    onClick={(e) => props.emitChangeSection("about", e)}
                >
                    [[menu.about]]
                </div>
            </div>
        }
    </>
  )
}

Header.propTypes = {
        emitChangeSection: PropTypes.func,
        currentSection: PropTypes.string,
};
export default Header
