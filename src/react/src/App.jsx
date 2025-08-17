import { useEffect, useState } from 'react'

import './style/App.scss'
import Header from "./components/Header.jsx";
import About from "./steps/About.jsx";
import Splash from "./steps/Splash.jsx";
import CountrySelect from "./steps/CountrySelect.jsx";
import Step1 from "./steps/Step1.jsx";
import Step2 from "./steps/Step2.jsx";
import Step3 from "./steps/Step3.jsx";
import PrivacyPolicy from "./steps/PrivacyPolicy.jsx";
import Step4 from "./steps/Step4.jsx";
import Summary from "./steps/Summary.jsx";
import Thankyou from "./steps/Thankyou.jsx";

function App() {
  const [currentSection, setCurrentSection] = useState("step3")
  /* temporarily change to step youre developing, or use
    http://localhost:5173/?section=splash
    http://localhost:5173/?section=step1
  */

  const [currentStep, setCurrentStep] = useState("step2")
  const [formData, setFormData] = useState({
    optOut1: true,
    optOut2: true,
    recipientName: '',
    customRecipient: false,
    recipientAddress1: '',
    recipientAddress1: '',
    recipientCity: '',
    senderFirstName: '',
    senderLastName: '',
    senderPhone: '',
    senderBirthDate: '',
    senderId: '',
    senderEmail: ''
//    stayInformed: '' --> separate form? May be no need to store it.
  })

  const [sectionFromQueryParamsSet, setSectionFromQueryParamsSet] = useState(false)

  useEffect(() => {
    // show required section from query string if exists
    // example: http://localhost:5173/?section=splash
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('section') && !sectionFromQueryParamsSet) {
      let section = queryParams.get('section');
      changeSection(section)
      setSectionFromQueryParamsSet(true)
    }
  });

  //
  // Change visible section
  //
  const changeSection = (section, e) => {

    if (section.startsWith("step")) {
      setCurrentStep(section);
    }
    if (section == "closeSection") {
      section = currentStep;
    }
    setCurrentSection(section);
  }

  //
  // update form data
  //
  const updateFormdata = (field, value, e) => {

    setFormData({
      recipientName: field == 'recipientName' ? value : formData.recipientName,
      customRecipient: field == 'customRecipient' ? value : formData.customRecipient,
      recipientAddress1: field == 'recipientAddress1' ? value : formData.recipientAddress1,
      recipientAddress2: field == 'recipientAddress2' ? value : formData.recipientAddress2,
      senderFirstName: field == 'senderFirstName' ? value : formData.senderFirstName,
      senderLastName: field == 'senderLastName' ? value : formData.senderLastName,
      senderPhone: field == 'senderPhone' ? value : formData.senderPhone,
      senderBirthDate: field == 'senderBirthDate' ? value : formData.senderBirthDate,
      senderId: field == 'bsn' ? value : formData.senderId,
    });
  }

  return (
    <>
      {currentSection != "selectCountry" &&
        <header>
          <Header
            emitChangeSection={changeSection}
            currentSection={currentSection}
          />
        </header>
      }

      <div id="mainContent">
        {/* splash  */}
        {currentSection == "splash" &&
          <Splash
            emitChangeSection={changeSection}
          />
        }

        {/* Select Country */}
        {currentSection == "selectCountry" &&
          <CountrySelect
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}

          />
        }

        {/* About section */}
        {currentSection == "about" &&
          <About
            emitChangeSection={changeSection}
          />
        }

        {/* Step 1 Introduction*/}
        {currentSection == "step1" &&
          <Step1
            emitChangeSection={changeSection}
          />
        }

        {/* Step 2 Recipient */}
        {currentSection == "step2" &&
          <Step2
            formData={formData}
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}
          />
        }

        {/* Step3 Sender */}
        {currentSection == "step3" &&
          <Step3
            formData={formData}
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}
          />
        }

        {/* Privacy policy */}
        {currentSection == "privacyPolicy" &&
          <PrivacyPolicy
            emitChangeSection={changeSection}
          />
        }

        {/* Step4 */}
        {currentSection == "step4" &&
          <Step4
            emitChangeSection={changeSection}
          />
        }

        {/* Summary */}
        {currentSection == "summary" &&
          <Summary
            formData={formData}
            emitChangeSection={changeSection}
          />
        }

        {/* Thankyou */}
        {currentSection == "thankyou" &&
          <Thankyou
          />
        }
      </div>


    {/* ==============   Debug data ================ */}
      <div style={{ "fontFamily": "monospace" }}>
        CurrentSection: {currentSection} &nbsp;|&nbsp;
        Current step: {currentStep} <br />
        FormData:<br/>
        recipientName: {formData.recipientName}  &nbsp;|&nbsp;
        customRecipient: {formData.customRecipient ? "checked" : "unchecked"} &nbsp;|&nbsp;
        recipientAddress1: {formData.recipientAddress1} &nbsp;|&nbsp;
        recipientAddress2: {formData.recipientAddress2} &nbsp;|&nbsp;
        senderFirstName: {formData.senderFirstName}  &nbsp;|&nbsp;
        senderLastName: {formData.senderLastName}  &nbsp;|&nbsp;
        senderPhone: {formData.senderPhone} &nbsp;|&nbsp;
        senderBirthDate: {formData.senderDateOfBirth} &nbsp;|&nbsp;
        senderId: {formData.senderId}
      </div>
    </>
  )
}

export default App
