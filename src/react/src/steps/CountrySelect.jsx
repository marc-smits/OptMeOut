/**
 *
 * Section CountrySelect
 *
 */
import PropTypes from 'prop-types';


function CountrySelect(props) {

    let countries = [[COUNTRIES_LIST]];

    //
    // Change country
    //
    const changeCountry = (country, e) => {
        let url = '/' + country
        window.location.href = url
    };


    /**
     * Render country li
     */
    const CountryLi = ({ index, country, locale }) => {

        let className = locale != '' ? 'active' : '';
        if (locale != '') {
            return (
                <li
                    key={"country" + index}
                    onClick={(e) => changeCountry(locale)}
                    class={className}
                >
                    {country}
                </li>
            );
        } else {
            return (
                <li
                    key={"country" + index}
                    class={className}
                >
                    {country}
                </li>
            );
        }
    };


    return (
        <div class="row">
           
            <div class="col">
                <div className="step" id="countrySelect">
                    <div
                        className='buttonClose'
                        onClick={(e) => props.emitChangeSection("closeSection", e)}
                    >
                        &nbsp;
                    </div>
                    <h1>[[splash.countries.h1]]</h1>

                    {/* left column*/}
                    <div class="flex-start">
                        <div className="listCountries">
                            <ul>
                                {Object.keys(countries).map((innerAttr, index) => {
                                    if (index <= Object.keys(countries).length / 2) {
                                        return (
                                            <CountryLi index={index} country={innerAttr} locale={countries[innerAttr]} />
                                        )
                                    }
                                })
                                }
                            </ul>
                        </div>

                        {/* right column*/}
                        <div className="listCountries">
                            <ul>
                                {Object.keys(countries).map((innerAttr, index) => {
                                    if (index > Object.keys(countries).length / 2) {
                                        return (
                                            <CountryLi index={index} country={innerAttr} locale={countries[innerAttr]} />
                                        )
                                    }
                                })
                                }
                            </ul>
                        </div>{/*.listCountries*/}
                    </div>
                </div>{/*.col*/}
            </div>{/*.row*/}
        </div>
    )
}


CountrySelect.propTypes = {
    emitChangeSection: PropTypes.func,
    emitUpdateFormdata: PropTypes.func,
};
export default CountrySelect
