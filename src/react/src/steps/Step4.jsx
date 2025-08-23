/**
 *
 * Section Step4 - Your opt out | PDF, OK & payment
 *
 */
import PropTypes from 'prop-types';
import { useState } from 'react';

import BackSvg from '../partials/BackSvg.jsx';
import ButtonMore from '../partials/ButtonMore.jsx';
import LocalDate from '../partials/LocalDate.jsx';

// TODO later: get this from user data
const localeCode = 'en-IE';

/* Forms */
import { Input } from '../components/Input.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation } from '../utils/inputValidations'

/* PDF viewer */
import { PDFViewer } from '@react-pdf/renderer';
import EmailPdf from '../components/EmailPdf.jsx';

function Step4(props) {
    const selectDonation = (e) => {
        console.log("button");
    };

    // ReadMore button(s)
    const [readMore1, setReadMore1] = useState(false);
    const toggleReadMore1 = () => setReadMore1(prev => !prev);

    //Forms
    const handleChange = (e) => {
      // props.emitUpdateFormdata(e.target.name, e.target.value);
    };
    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
      //(e) => props.emitChangeSection("step5", e)
      console.log(data)
    })

    return (
        <div className="step" id="step4">
            <h1 className="headline">[[step4.title]] Your opt out</h1>
            <div className="progress bar3" >&nbsp;</div>
            <p className="intro">[[step4.intro]]</p>

            <div className='row'>
                <div className="col">
                  <div className="letter">
                    <div className="letterAddress">
                      <div className="recipient">
                        <p>
                          Some organisation<br />
                          Somename laladada<br />
                          Somestreetsomewherelong 22<br />
                          POSTAL CODE<br />
                          City with a stupidly long name<br />
                          Country
                        </p>
                      </div>
                      <div className="sender">
                        <p>
                          <strong>From:</strong><br />
                          First name VeryLong Lastname
                        </p>
                        <p>
                          Date of Birth: sender.birthdate<br />
                          Identification (ends with): sender.Id<br />
                          phone: 12039812038<br />
                          email: <br />
                        </p>
                      </div>
                    </div>
                    <div className="letterMeta">
                      <p>
                        <strong>Date: </strong><LocalDate localeCode={localeCode} /><br />
                        <strong>Subject: </strong>We are doing something awesome!
                      </p>
                    </div>
                    <div className={readMore1 ? 'letterBody fadeIn' : 'letterBody readLess'}>
                      <p>
                      Dear Mr, Ms, Somename,
                      </p>
                      <p>
Cat ipsum dolor sit amet, only use one corner of the litter box. Milk the cow sleep nap, for disappear for four days and return home with an expensive injury; bite the vet pet me pet me don't pet me for attack feet hate dogs. Make meme, make cute face chase ball of string for poop in the plant pot walk on car leaving trail of paw prints on hood and windshield. Disappear for four days and return home with an expensive injury; bite the vet. Sleep over your phone and make cute snoring noises ask to be pet then attack owners hand and lick left leg for ninety minutes, still dirty for cat fur is the new black . Meeeeouw claw drapes stare at the wall, play with food and get confused by dust and claw at curtains stretch and yawn nibble on tuna ignore human bite human hand. Grass smells good. Carrying out surveillance on the neighbour's dog caticus cuteicus. Slap kitten brother with paw i dreamt about fish yum! to pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly. Swat turds around the house catasstrophe and pet me pet me pet me pet me, bite, scratch, why are you petting me sleep in the bathroom sink hopped up on catnip human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken! i'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?!
                      </p>
                      <p>
leap into the air in greatest offense!. Hide when guests come over sugar, my siamese, stalks me (in a good way), day and night sit in a box for hours or lick arm hair, yet find a way to fit in tiny box or stand in front of the computer screen. Lay on arms while you're using the keyboard cats are fats i like to pets them they like to meow back, licks paws for grass smells good meow for food, then when human fills food dish, take a few bites of food and continue meowing mouse, or no, you can't close the door, i haven't decided whether or not i wanna go out. Jump off balcony, onto stranger's head cats secretly make all the worlds muffins yet poop on couch yet attack like a vicious monster for mark territory stare at the wall, play with food and get confused by dust attack the child. Attack the dog then pretend like nothing happened scratch at the door then walk away cry louder at reflection or kick up litter. Poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree cat slap dog in face so lie in the sink all day playing with balls of wool sitting in a box step on your keyboard while you're gaming and then turn in a circle . Love to play with owner's hair tie humans,humans, humans oh how much they love us felines we are the center of attention they feed, they clean burrow under covers, or chew the plant yet in the middle of the night i crawl onto your chest and purr gently to help you sleep, sitting in a box yet decide to want nothing to do with my owner today. Under the bed then cats take over the world purr for no reason yet poop on grasses hack up furballs.
                      </p>
                      <p>
                      Meow Meow,
                      </p>
                      <p>
                      First name VeryLong Lastname
                      </p>
                    </div>{/*letterbo*/}

                    <ButtonMore readMore={readMore1} toggleReadMore={toggleReadMore1} />

                  </div>{/*letter*/}
                </div>{/*col*/}
            </div>{/*row*/}

            <div className='row'>
                <div className="col-8">
                    <FormProvider {...methods}>
                      <form
                        onSubmit={e => e.preventDefault()}
                        noValidate
                        className="container"
                      >
                        <Input
                          // label="[[step4.form.senderEmail.label]]"
                          label="[[step4.receive_a_copy.title]]"
                          placeholder="[[step4.form.senderEmail.placeholder]]"
                          // value={props.formData.senderEmail}
                          type="text"
                          name="senderEmail"
                          handleChange={(e) => handleChange(e)}
                          validation={{...email_validation}}
                        />
                      </form>
                    </FormProvider>
                    <p>[[step4.receive_a_copy.text]]</p>
                </div>{/*col*/}
            </div>{/*row*/}

            <div className='row'>
                <div className="col col-8">
                  <h3>[[step4.donate.title]]</h3>
                  <p className="mb-30">[[step4.donate.text]]</p>

                  <div className="donate flex-center">
                    <div className="donateOption">
                      <div className="button buttonDonate" onClick={selectDonation}>&euro;0,01</div>
                      <div className="donateLabel">Feel free, if you can’t afford more</div>
                    </div>
                    <div className="donateOption">
                      <div className="button buttonDonate" onClick={selectDonation}>&euro;2</div>
                      <div className="donateLabel">Pay for your own</div>
                    </div>
                    <div className="donateOption" data-selected="true">
                      <div className="button buttonDonate" onClick={selectDonation}>&euro;4</div>
                      <div className="donateLabel">Pay it forward. Donate a letter</div>
                    </div>
                    <div className="donateOption">
                      <div className="button buttonDonate" onClick={selectDonation}>&euro;10</div>
                      <div className="donateLabel">Support this app. We work non-profit!</div>
                    </div>
                  </div>

                </div>{/*col*/}
            </div>
{/*
            <PDFViewer>
                <EmailPdf formData={props.formData} />
            </PDFViewer>
*/}

            <div className='row'>
                <div className="col flex-center">
                    <div className="button buttonBack" onClick={(e) => props.emitChangeSection("step3", e)}>
                      <BackSvg/>
                      [[button.back]]
                    </div>

                    <div className="button buttonOptMeOut" onClick={onSubmit}>
                        [[button.send]]
                    </div>
                </div>{/*col*/}
            </div>{/*row*/}

            <pre>
                            step4.months.january : [[step4.months.january]] <br/>
                            step4.months.february : [[step4.months.february]] <br/>
                            step4.months.march: [[step4.months.march]] <br/>
                            step4.months.april: [[step4.months.april]] <br/>
                            step4.months.may: [[step4.months.may]] <br/>
                            step4.months.june: [[step4.months.june]] <br/>
                            step4.months.july: [[step4.months.july]] <br/>
                            step4.months.august: [[step4.months.august]] <br/>
                            step4.months.september: [[step4.months.september]] <br/>
                            step4.months.october: [[step4.months.october]] <br/>
                            step4.months.november: [[step4.months.november]] <br/>
                            step4.months.december: [[step4.months.december]] <br/>
                            step4.receive_a_copy.title : [[step4.receive_a_copy.title]] <br/>
                            step4.receive_a_copy.text: [[step4.receive_a_copy.text]] <br/>
                            step4.receive_a_copy.email_place_holder: [[step4.receive_a_copy.email_place_holder]] <br/>
                            step4.opt_out_letter.title: [[step4.opt_out_letter.title]] <br/>
                            step4.opt_out_letter.saluation: [[step4.opt_out_letter.saluation]] <br/>
                            step4.opt_out_letter.content: [[step4.opt_out_letter.content]] <br/>
                            step4.donate.title: [[step4.donate.title]] <br/>
                            step4.donate.text: [[step4.donate.text]] <br/>
                            step4.donate.payment_options.1: [[step4.donate.payment_options.1]] <br/>
                            step4.donate.payment_options.2: [[step4.donate.payment_options.2]] <br/>
                            step4.donate.payment_options.3: [[step4.donate.payment_options.3]] <br/>
                            step4.donate.payment_options.4: [[step4.donate.payment_options.4]] <br/>
                             button.send: [[button.send]] <br/>
            </pre>


        </div>

    )
}


Step4.propTypes = {
    emitChangeSection: PropTypes.func,
};

export default Step4
