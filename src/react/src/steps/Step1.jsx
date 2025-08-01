/**
 *
 * Step 1
 *
 */
import PropTypes from 'prop-types';
import { useState } from 'react';

import './steps.scss'
import './step1.scss'

import yes from '/src/assets/img/yes.png';
function Step1(props) {

        //
        // Variables to control the visibility of the sections
        //
        const [tellMeMore, setTellMeMore] = useState(false);
        const [readMore1, setReadMore1] = useState(false);
        const [readMore2, setReadMore2] = useState(false);

        //
        // Update Tell More visibility
        //
        const tellMore = (e) => {
                let status = tellMeMore ? false : true;
                setTellMeMore(status);
        };

        //
        // Update Read More 1 visibility
        //
        const changeReadMore1 = (e) => {
                let status = readMore1 ? false : true;
                setReadMore1(status);
        };

        //
        // Update Read More 2 visibility
        //
        const changeReadMore2 = (e) => {
                let status = readMore2 ? false : true;
                setReadMore2(status);
        };

        return (
                <div className="step" id="step1">

                        {/* Intro */}
                        <h1 className="headline">[[step1.title]]</h1>
                        <p className="intro">
                                [[step1.intro]]
                        </p>

                        {/* Tell me more */}
                        {tellMeMore &&

                                <div className='tellMeMore'>
                                  {/* Tell me more 1*/}

                                  <div className='row'>
                                    <div className="col">
                                        <div className='optOutToggle'>

                                          {/* @Tuuria: Toggle 'checked' class in JS to switch between "yes" and "no" */}
                                          <div id="test" className="checkBox checked">
                                            <div className="checkBoxSlider"></div>
                                          </div>
                                          <h2>[[step1.optout1.h1]]</h2>
                                        </div>
                                        <p>[[step1.optout1.p]]</p>
                                        <div class="readMore">[[step1.optout1.readmore]]</div>

                                        {/* @Tuuria
                                              Please note: Some partners might need more than one paragraph in the readmore section

                                              When buttonMore is clicked:
                                              1. toggle 'show' class in the readMore div
                                              2. toggle 'less' class in buttonMore div

                                              The content "more" & "less" is handled by CSS ::before statement ;-)
                                        */}

                                        {/* Read more 1 */}
                                        {!readMore1 &&
                                            <div className='flex-end'>
                                                    <div className='button buttonMore' onClick={changeReadMore1} >
                                                      [[button.readmore.more]]
                                                    </div>
                                            </div>

                                        }
                                    </div>
                                  </div>

                                  {/* Tell me more 2*/}
                                  <div className='row'>
                                    <div className="col">
                                        <div className='optOutToggle'>
                                          <div className="checkBox checked">
                                            <div className="checkBoxSlider"></div>
                                          </div>
                                          <h2>[[step1.optout2.h1]]</h2>
                                        </div>
                                        <p>[[step1.optout2.p]]</p>
                                        <div class="readMore">[[step1.optout2.readmore]]</div>

                                        {/* Read more 2 */}
                                        {!readMore2 &&
                                                <div className='flex-end'>
                                                        <div className='button buttonMore' onClick={changeReadMore2} >
                                                                [[button.readmore.more]]
                                                        </div>
                                                </div>

                                        }
                                    </div>{/*col*/}
                                  </div>{/*row*/}
                                </div>
                        }

                        {/* Tell me more and Opt Me Out buttons */}
                        <div className='row'>
                          <div className="col flex-center">
                                {!tellMeMore &&
                                  <div className="button buttonTellMeMore" onClick={tellMore}>
                                          [[button.tellmemore]]
                                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M7.875 13.6969L7.875 -4.86836e-07L10.125 -3.7865e-07L10.125 13.6969L16.425 7.39688L18 9L9 18L-3.57639e-07 9L1.575 7.39688L7.875 13.6969Z" fill="currentcolor"></path>
                                          </svg>
                                  </div>
                                }
                                  <div className="button buttonOptMeOut" onClick={(e) => props.emitChangeSection("step2", e)}>
                                          [[button.OptMeOut]]
                                  </div>
                          </div>{/*col*/}
                        </div>{/*row*/}

                        {/* Please note section */}
                        {tellMeMore &&
                          <div className='row'>
                            <div className="col">
                                <div className='pleaseNote'>
                                        <h2>[[step1.disclaimer.h1]]</h2>
                                        <p>[[step1.disclaimer.p]]</p>
                                </div>
                            </div>
                          </div>
                        }
                </div>

        )
}


Step1.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default Step1
