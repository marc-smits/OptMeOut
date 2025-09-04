/**
 *
 * Step 1
 *
 */

/* TODO 24/08
 *  - Store opt-out choices in props
 *  - Store recipientCountry in props
 *
*/
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import MoreSvg from '../partials/MoreSvg.jsx';
import ButtonMore from '../partials/ButtonMore.jsx';

function Step1(props) {

        let optOuts = [[STEP_1_OPT_OUTS]];

        //
        // Variables to control the visibility of the sections
        //
        const [tellMeMore, setTellMeMore] = useState(false);
        const [optOut1, setOptOut1] = useState('checked');
        const [optOut2, setOptOut2] = useState('checked');
         const [optOut, setOptOut] = useState({});
        const [disableNextStep, setDisableNextStep ] = useState(false);

        useEffect(() => { updateNextstep(); }, [optOut1, optOut2]);

        // Update Tell More visibility
        const toggleTellMore = (e) => {
                let status = tellMeMore ? false : true;
                setTellMeMore(status);
        };

        // ReadMore button(s)
        const [readMore1, setReadMore1] = useState(false);
        const toggleReadMore1 = () => setReadMore1(prev => !prev);
        const [readMore2, setReadMore2] = useState(false);
        const toggleReadMore2 = () => setReadMore2(prev => !prev);

        // Update Toggle OptOut1
        const toggleOptOut = (e) => {
              alert(e)
                let status = (optOut1 === '') ? 'checked' : '';
                setOptOut1(status);
        };

       

        //Update OptMeOut -- make unselectable if no opt-out is selected
        const updateNextstep = (e) => {
            let status = ([optOut1, optOut2].includes('checked'));
            // console.log('disable buttonOptMeOut? ' + !status);

            setDisableNextStep(!status);
        }

      /**
       * Read more
       */
      const Readmore = (data) => {

        return (
          <>
            <div className='row'>
              <div className="col col-10">
                <div className='optOutToggle'>
                  <div className={"checkBox " + (optOut1)} onClick={() => { toggleOptOut(data.index) }}>
                    <div className="checkBoxSlider"></div>
                  </div>
                  <h2>{data.data.h}</h2>
                </div>

                {Object.keys(data.data.p).map((innerAttr, index) => {
                  return (
                    <p>{data.data.p[innerAttr]}</p>
                  )
                  })
                }

                <div className={readMore1 ? 'readMore show' : 'readMore'}>{data.data.readmore}</div>
                <div className='flex-end'>
                  <ButtonMore readMore={readMore1} toggleReadMore={toggleReadMore1} />
                </div>
              </div>
            </div>
          </>
        );
      };


        return (
                <div className="step" id="step1">

                        {/* Headline & Intro */}
                        <div className='row mb-30'>
                          <div className="col col-10">
                            <h1 className="headline">[[step1.title]]</h1>
                          </div>
                        </div>

                        <div className='row'>
                          <div className="col col-8">
                            <p className="intro mb-20">[[step1.intro]]</p>
                          </div>
                        </div>

                        {/* Tell me more */}
                        {
                          <div className={tellMeMore ? 'readMore show' : 'readMore'}>
                            {/* Tell me more*/}

                            {Object.keys(optOuts).map((innerAttr, index) => {
                              return (
                                <Readmore data={optOuts[innerAttr]} index={index}  />
                              )
                            })
                            }
                          </div>
                        }

                        {/* Tell me more and Opt Me Out buttons */}
                        <div className='row'>
                          <div className="col flex-center">
                                {!tellMeMore &&
                                  <div className="button buttonTellMeMore" onClick={toggleTellMore}>
                                          [[button.tellmemore]]
                                          <MoreSvg/>
                                  </div>
                                }
                                  <div className="button buttonOptMeOut" disabled={disableNextStep} onClick={!disableNextStep ? (e) => props.emitChangeSection("step2", e) : void(0)}>
                                          [[button.OptMeOut]]
                                  </div>
                          </div>{/*col*/}
                        </div>{/*row*/}

                        {/* Please note section */}
                        {tellMeMore &&
                          <div className='row'>
                            <div className="col-10">
                                <div className='pleaseNote'>
                                    <h2>[[step1.disclaimer.h1]]</h2>
                                    <p>[[step1.disclaimer.p]]</p>
                                </div>
                            </div>
                          </div>
                        }
                        setOptOut :{setOptOut}
                </div>

        )
}


Step1.propTypes = {
        emitChangeSection: PropTypes.func,  // Change step
};
export default Step1
