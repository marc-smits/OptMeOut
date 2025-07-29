/**
 * 
 * Section CountrySelect
 * 
 */
import PropTypes from 'prop-types';


import './steps.scss'
import './CountrySelect.scss'


function CountrySelect(props) {

    let countries = [[COUNTRIES_LIST]];

    //
    // Change country
    //
    const changeCountry = (country, e) => {
        let url = '/' + country
        window.location.href = url
    };


    return (
        <div className="step" id="countrySelect">

            <h1>[[splash.countries.h1]]</h1>
            <div
                className='closeButton'
                onClick={(e) => props.emitChangeSection("closeSection", e)}
            >
                &nbsp;
            </div>

            {/* left column*/}
            <div className="navigation">
                <ul className='leftColumn'>
                    {Object.keys(countries).map((innerAttr, index) => {
                        if (index <= Object.keys(countries).length / 2) {

                            return (
                                <li className="intro"
                                    key={"country" + index}
                                    onClick={(e) => changeCountry(innerAttr)}
                                >
                                    {countries[innerAttr]}
                                </li>
                            )
                        }
                    })
                    }
                </ul>
            </div>

            {/* right column*/}
            <div className="navigation">
                <ul className='rightColumn'>
                    {Object.keys(countries).map((innerAttr, index) => {
                        if (index > Object.keys(countries).length / 2) {

                            return (
                                <li className="intro"
                                    key={"country" + index}
                                    onClick={(e) => changeCountry(innerAttr)}
                                >
                                    {countries[innerAttr]}
                                </li>
                            )
                        }
                    })
                    }
                </ul>
            </div>
        </div>

    )
}


CountrySelect.propTypes = {
    emitChangeSection: PropTypes.func,
    emitUpdateFormdata: PropTypes.func,
};
export default CountrySelect