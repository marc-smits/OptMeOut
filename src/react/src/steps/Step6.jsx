/**
 *
 * Section Step 6 | Thank you
 *
 */
import PropTypes from 'prop-types';
import BackSvg from '../partials/BackSvg.jsx';
import { MuskSvg, EmailSvg, LinkSvg } from '../partials/socialSvg.jsx';

function Step6(props) {
    return (
      <div className="step" id="step3">
          <div className='row'>
            <div className="col">
                  <h1 className="headline">[[step6.title]] Thankyou page will be here</h1>
                  <p className="intro">[[step6.intro]] processed your opt-out and will take the necessary steps. </p>

                  <div className="notification">
                      <h2>[[step6.notification.h2]] Help others with their privacy too!</h2>
                      <p>[[step6.notification.p1]] If you found this service useful, please share our website with your
friends family or anyone who might benefit from it.</p>
                  </div>

                  <div className="social flex-center">
                    <div className="social-inner">
                    <h3>Share with:</h3>
                      <ul>
                        <a href="https://social.link">
                          <li>
                            <div className="socialIcon"><MuskSvg /></div>
                            <div className="socialName">Musk</div>
                          </li>
                        </a>
                        <a href="https://social.link">
                          <li>
                            <div className="socialIcon"><BackSvg /></div>
                            <div className="socialName">Network name</div>
                          </li>
                        </a>
                        <a href="https://social.link">
                          <li>
                            <div className="socialIcon"><EmailSvg /></div>
                            <div className="socialName">e-mail</div>
                          </li>
                        </a>
                        <a href="https://social.link">
                          <li>
                            <div className="socialIcon"><LinkSvg /></div>
                            <div className="socialName">Copy link</div>
                          </li>
                        </a>
                      </ul>
                    </div>
                  </div>
            </div>{/*col*/}
          </div>{/*row*/}
      </div>
    )
}
export default Step6
