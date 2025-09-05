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
import { useState, useEffect, prevState } from 'react';
import MoreSvg from '../partials/MoreSvg.jsx';
import ButtonMore from '../partials/ButtonMore.jsx';

function Step1(props) {

        let optOuts = [[STEP_1_OPT_OUTS]];


        const [initialized, setInitialized] = useState(false);
        
        //
        // Variables to control the visibility of the sections
        //
        const [tellMeMore, setTellMeMore] = useState(false);
        const [optOut, setOptOut] = useState({'selected' : {}});
        const [disableNextStep, setDisableNextStep ] = useState(false);
      
        // ReadMore button(s)
         const [readMore, setReadMore] = useState({'selected' : {}});
        useEffect(() => { initialize(); });

      // Update Tell More visibility
      const toggleTellMore = (e) => {
        let status = tellMeMore ? false : true;
        setTellMeMore(status);
      };

        //
        // Update Read More visibility
        //
        const toggleReadMore = (e) => {
          let tellMeMore = (readMore['selected'][e])
          let status = tellMeMore ? false : true;
          setReadMore(prevState => {
            let selected = Object.assign({});
            Object.keys(readMore.selected).forEach(function (key, index) {
              selected[key] = readMore['selected'][key]
            });
            selected[e] = status
            return { selected };
          })
        };
     
        //
        // Update Toggle OptOut
        //
        const toggleOptOut = (e) => {
         updateNextstep(true);
          setOptOut(prevState => {
            let selected = Object.assign({});  
            Object.keys(optOut.selected).forEach(function (key, index) {
              selected[key] = optOut['selected'][key]
            });
            if (selected[e] == undefined) {
                 selected[e] = 'checked'  
            } else {
              delete  selected[e];
             updateNextstep(false);
            }
            return { selected };                           
          })
        };


      //
      // initialize the slider to status checked
      //
      const initialize = (e) => {
        if (initialized) {
          return
        }
        setInitialized(true)
        updateNextstep(true);
        setOptOut(prevState => {
          let selected = Object.assign({});
          Object.keys(optOuts).map((innerAttr, key) => {
            selected[key] = 'checked'
          });
          return { selected };
        })

        setReadMore(prevState => {
          let selected = Object.assign({});
          Object.keys(optOuts).map((innerAttr, key) => {
            selected[key] = false
          });
          return { selected };
        })
      }

        //Update OptMeOut -- make unselectable if no opt-out is selected
        const updateNextstep = (e) => {
            setDisableNextStep( !e);
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
                  <div className={"checkBox " + (optOut.selected[data.index])} onClick={() => { toggleOptOut(data.index) }}>
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

                <div className={readMore['selected'][data.index] ? 'readMore show' : 'readMore'}>
                  {data.data.readmore}
                </div>
                <div className='flex-end'>
                  <ButtonMore readMore={readMore['selected'][data.index]} toggleReadMore ={() => { toggleReadMore(data.index) }} />
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
                                <Readmore data={optOuts[innerAttr]} index={index} />
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
