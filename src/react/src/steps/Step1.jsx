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
                        <h1>[[step1.title]]</h1>
                        <p className="intro">
                                [[step1.intro]]
                        </p>

                        {/* Tell me more */}
                        {tellMeMore &&
                                <div className='tellMeMore'>

                                        {/* Tell me more 1*/}
                                        <div className='introHeader'>
                                                <img src={yes} className="checkBoxSlider" />
                                                <h1 className='intro'>[[step1.optout1.h1]]</h1>
                                        </div>
                                        <div className='clearBoth'></div>
                                        <p>[[step1.optout1.p]]</p>


                                        {/* Read more 1 */}
                                        {!readMore1 &&
                                                <div className='readMore'>
                                                        <div className='moreButton' onClick={changeReadMore1} >
                                                                [[button.readmore.more]]
                                                        </div>
                                                </div>

                                        }
                                        {readMore1 &&
                                                <div className='readMore'>
                                                        <div className='lessButton' onClick={changeReadMore1} >
                                                                [[button.readmore.less]]
                                                        </div>
                                                        <div className='clearBoth'></div>
                                                        <p>[[step1.optout1.readmore]]</p>
                                                </div>
                                        }

                                        {/* Tell me more 2*/}
                                        <div className='introHeader'>
                                                <img src={yes} className="checkBoxSlider" />
                                                <h1 className='intro'>[[step1.optout2.h1]]</h1>
                                        </div>
                                        <div className='clearBoth'></div>
                                        <p>[[step1.optout2.p]]</p>

                                        {/* Read more 2 */}
                                        {!readMore2 &&
                                                <div className='readMore'>
                                                        <div className='moreButton' onClick={changeReadMore2} >
                                                                [[button.readmore.more]]
                                                        </div>
                                                </div>

                                        }
                                        {readMore2 &&
                                                <div className='readMore'>
                                                        <div className='lessButton' onClick={changeReadMore2} >
                                                                [[button.readmore.less]]
                                                        </div>
                                                        <div className='clearBoth'></div>
                                                        <p>[[step1.optout2.readmore]]</p>sada
                                                </div>
                                        }

                                </div>
                        }

                        {/* Tell me more  and Opt Me Out buttons */}
                        <div className='buttonsRow'>
                                {!tellMeMore &&
                                        <div className="tellMeMoreButton" onClick={tellMore}>
                                                [[button.tellmemore]]
                                        </div>
                                }
                                <div className="buttonActive"
                                        onClick={(e) => props.emitChangeSection("step2", e)}
                                >
                                        [[button.OptMeOut]]
                                </div>
                        </div>

                        {/* Please note section */}
                        <div className='clearBoth'></div>
                        {tellMeMore &&
                                <p className='pleaseNote'>
                                        <h1>[[step1.disclaimer.h1]]</h1>
                                        <p>[[step1.disclaimer.p]]</p>
                                </p>
                        }
                </div>

        )
}


Step1.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default Step1