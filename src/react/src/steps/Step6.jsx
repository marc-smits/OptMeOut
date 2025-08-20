/**
 *
 * Section Step 6 | Thank you
 *
 */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import BackSvg from '../partials/BackSvg.jsx';
import { MuskSvg, EmailSvg, LinkSvg, LinkedInSvg, RedditSvg } from '../partials/socialSvg.jsx';

function Step6(props) {
    const message = "[[step1.title]]"
    const encodedMessage = message.replaceAll(' ', '%');

    /* handle copy link button  */
    const copyLinkText = 'Copy link';
    const [copyLink, setCopyLink] = useState(copyLinkText);
    const [dataCopied, setDataCopied] = useState(false);
    const baseUrl = window.location.origin;

    const handleCopyLink = (e) => {
      e.preventDefault();
      // setCopyLink((copyLink === 'Copy link') ? '...copied!' : copyLink);
      setDataCopied(true);
      setCopyLink('...copied');

      navigator.clipboard.writeText(baseUrl);
      // navigator.clipboard.readText()
      // .then((baseUrl) => console.log("Text from clipboard: ", baseUrl))
      // .catch((error) => console.error("Failed to read text from clipboard: ", error));

      setTimeout(() => {
        setDataCopied(false);
        setCopyLink(copyLinkText);
      }, 3000);
    }

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
                        <a href={`https://twitter.com/intent/tweet?url=&url=${baseUrl}&text=${encodedMessage}`}>
                          <li>
                            <div className="socialIcon"><MuskSvg /></div>
                            <div className="socialName">Musk</div>
                          </li>
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}&title=${encodedMessage}`}>
                          <li>
                            <div className="socialIcon"><LinkedInSvg /></div>
                            <div className="socialName">LinkedIn</div>
                          </li>
                        </a>
                        <a href={`http://www.reddit.com/submit?url=${baseUrl}&title=${encodedMessage}`}>
                          <li>
                            <div className="socialIcon"><RedditSvg /></div>
                            <div className="socialName">Reddit</div>
                          </li>
                        </a>
                        <a href={`mailto:email@adress.somewhere?subject=OptMeOut!&body=%0D%0A${message}%0D%0A%0D%0A${baseUrl}`}>
                          <li>
                            <div className="socialIcon"><EmailSvg /></div>
                            <div className="socialName">e-mail</div>
                          </li>
                        </a>
                        <a href="#" onClick={handleCopyLink}>
                          <li>
                            <div className="socialIcon"><LinkSvg /></div>
                            <div className="socialName" data-copied={dataCopied}>{copyLink}</div>
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
