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


    return (
      <div class="row">
        <div class="col">
          <div className="step" id="countrySelect">

              <h1>[[splash.countries.h1]]</h1>

              {/* left column*/}
              <div class="flex-start">
                <div className="listCountries">
                    <ul>
                        {Object.keys(countries).map((innerAttr, index) => {
                            if (index <= Object.keys(countries).length / 2) {

                                return (
                                    <li
                                        key={"country" + index}
                                        onClick={(e) => changeCountry(innerAttr)}
                                    >
                                        {countries[innerAttr]}
                                    </li>
                                )
                            }
                        })
                        }

                        <li class="active">TEST country</li>
                        <li>TEST country</li>
                        <li>TEST country</li>
                        <li>TEST country</li>
                        <li class="active">TEST country</li>
                        <li class="active">TEST country</li>
                        <li>TEST country</li>
                        <li>TEST country</li>
                        <li class="active">TEST country</li>

                    </ul>
                </div>

                {/* right column*/}
                <div className="listCountries">
                    <ul>
                    <li>TEST country</li>
                    <li>TEST country</li>
                    <li>TEST country</li>
                    <li>TEST country</li>
                    <li>TEST country</li>
                    <li class="active">TEST country</li>
                    <li>TEST country</li>
                    <li>TEST country</li>
                    <li class="active">TEST country</li>

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
