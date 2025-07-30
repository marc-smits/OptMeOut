/**
 *
 * Component to render the header
 *
 */
import PropTypes from 'prop-types';
import { useState } from 'react';

import '/src/components/Header/Header.scss'


function Header(props) {
        return (
                <>
                    <div class="menu">
                        <div class="button" id="headerLanguageSelect"
                        onClick={(e) => props.emitChangeSection("selectCountry", e)}>
                               [[menu.locale]]
                        </div>
                        <div
                                class="button"
                                id="headerAbout"
                                onClick={(e) => props.emitChangeSection("about", e)}
                        >
                                [[menu.about]]
                        </div>
                    </div>
                </>

        )
}

Header.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default Header
