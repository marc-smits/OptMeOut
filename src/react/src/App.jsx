import { useEffect, useState } from 'react'
import Order from './lib/Order.jsx';
import './style/App.scss'
import Header from "./components/Header.jsx";
import About from "./steps/About.jsx";
import Error from "./steps/Error.jsx";
import Splash from "./steps/Splash.jsx";
import CountrySelect from "./steps/CountrySelect.jsx";
import Step1 from "./steps/Step1.jsx";
import Step2 from "./steps/Step2.jsx";
import Step3 from "./steps/Step3.jsx";
import PrivacyPolicy from "./steps/PrivacyPolicy.jsx";
import Step4 from "./steps/Step4.jsx";
import Step5 from "./steps/Step5.jsx";
import Step6 from "./steps/Step6.jsx";

function App() {
  const [currentSection, setCurrentSection] = useState("step1")
  /* temporarily change to step youre developing, or use
    http://localhost:5173/?section=splash
    http://localhost:5173/?section=step1
  */

    /**
     * Get the locale form url 
     * 
     * It can be in formats
     * 
     * no locale:                           https://optmeout.eu
     * with locale                          https://optmeout.eu/nl_NL
     * no locale but with query string:     https://optmeout.eu?section=splash
     * with locale and  with query string:  https://optmeout.eu/nl_NL?section=splash
     */
    const setLocaleFromUrl= (e) => {
      let url = document.URL;
      let parts = url.split('/');
      let lastPart = parts[parts.length -1];
      parts = lastPart.split('?');
      lastPart = parts[0];
      lastPart = lastPart.replace('_' , '-');
      return lastPart != ''? lastPart : 'en-GB';

  }
  
  const [currentStep, setCurrentStep] = useState("step1")
  const [formData, setFormData] = useState({
    optOut1: true,
    optOut2: true,
    recipientOrganization: '',
    recipientTitle: '',
    recipientFirstName: '',
    recipientLastName: '',
    customRecipient: true,
    recipientAddress1: '',
    recipientAddress2: '',
    recipientCity: '',
    recipientCountry: '',
    senderFirstName: '',
    senderLastName: '',
    senderAddress1: '',
    senderAddress2: '',
    senderCity: '',
    senderCountry: '',
    senderPhone: '',
    senderBirthDate: '',
    senderId: '',
    senderEmail: '',
    senderReverseEmail: '',
    senderId: '',
    stayInformed: false,
    paymentChoice: '',
    orderNumber: '',
    hasPaid: false,
    paymentToken: '',
    locale: setLocaleFromUrl()
  })

  const [sectionFromQueryParamsSet, setSectionFromQueryParamsSet] = useState(false)
  const [cookiesRead, setCookiesRead] = useState(false)

  useEffect(() => {
    // show required section from query string if exists
    // example: http://localhost:5173/?section=splash
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('section') && !sectionFromQueryParamsSet) {
      let section = queryParams.get('section');
      changeSection(section)
      setSectionFromQueryParamsSet(true);
    }
    readCookies();
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
  // 1) You can set invidual fields by sending the field name and value.
  // Example :  updateFormdata('recipientOrganization', 'Huisartspraktijk Kastelenbuurt')
  //
  // 2) Update several fields by an object:
  // Example: 
  //  updateFormdata(
  //      '_OBJECT_',
  //       { 
  //          'recipientOrganization': 'Huisartspraktijk Kastelenbuurt'
  //          'recipientFirstName': 'mevr. Yara Bos',
  //          'recipientAddress1': 'Stadshaven 23',
  //          'recipientAddress2': '1234 AB',
  //          'recipientCity': 'Zwolle'
  //      }
  // )
  //
  const updateFormdata = (field, value, e) => {

    let values = Object.assign({});
    Object.keys(formData).map((innerAttr, key) => {
      values[innerAttr] = formData[innerAttr]
    });

    if (field == '_OBJECT_') {
      Object.keys(value).map((innerAttr, key) => {
        values[innerAttr] = value[innerAttr]
      });
    } else {
      values[field] = value;
    }
    setFormData(values);
    Order.saveFormDataToCookies(values);
  }


  //
  // Read cookies
  //
  const readCookies = (e) => {

    if (!cookiesRead) {
      setCookiesRead(true);
      let data = Order.getFormDataFromCookies();
      if (data) {
        updateFormdata('_OBJECT_', data);
      }
    }
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

        {/* Step 2 -- Recipient */}
        {currentSection == "step2" &&
          <Step2
            formData={formData}
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}
          />
        }

        {/* Step3 -- Sender */}
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

        {/* Step4 -- Your Opt Out | payment */}
        {currentSection == "step4" &&
          <Step4
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}
            formData={formData}
          />
        }

        {/* Step5 -- What happens now | newsletter */}
        {currentSection == "step5" &&
          <Step5
            formData={formData}
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}
          />
        }

        {/* Step6 -- Thankyou */}
        {currentSection == "step6" &&
          <Step6
          />
        }

         {/* Error section */}
        {currentSection == "error" &&
          <Error
            formData={formData}
            emitChangeSection={changeSection}
          />
        }
      </div>


      {/* ==============   Debug data ================ */}
      <div style={{ "fontFamily": "monospace" }}>
        CurrentSection: {currentSection} &nbsp;|&nbsp;
        Current step: {currentStep} <br />
        FormData:<br />

        recipientOrganization: {formData.recipientOrganization}  &nbsp;|&nbsp;
        recipientTitle: {formData.recipientTitle}  &nbsp;|&nbsp;
        recipientFirstName: {formData.recipientFirstName}  &nbsp;|&nbsp;
        recipientLastName: {formData.recipientLastName}  &nbsp;|&nbsp;
        customRecipient: {formData.customRecipient ? "checked" : "unchecked"} &nbsp;|&nbsp;
        recipientAddress1: {formData.recipientAddress1} &nbsp;|&nbsp;
        recipientAddress2: {formData.recipientAddress2} &nbsp;|&nbsp;
        recipientCity: {formData.recipientCity} &nbsp;|&nbsp;
        recipientCountry: {formData.recipientCountry} &nbsp;|&nbsp;
        senderFirstName: {formData.senderFirstName}  &nbsp;|&nbsp;
        senderLastName: {formData.senderLastName}  &nbsp;|&nbsp;
        senderAddress1: {formData.senderAddress1} &nbsp;|&nbsp;
        senderAddress2: {formData.senderAddress2} &nbsp;|&nbsp;
        senderCity: {formData.senderCity} &nbsp;|&nbsp;
        senderCountry: {formData.senderCountry} &nbsp;|&nbsp;
        senderPhone: {formData.senderPhone} &nbsp;|&nbsp;
        senderBirthDate: {formData.senderBirthDate} &nbsp;|&nbsp;
        senderId: {formData.senderId} &nbsp;|&nbsp;
        senderBankId: &nbsp;|&nbsp; <br />
        senderEmail: {formData.senderEmail} &nbsp;|&nbsp;
        senderReverseEmail: {formData.senderReverseEmail} &nbsp;|&nbsp;
        paymentChoice: {formData.paymentChoice} &nbsp;|&nbsp;
        orderNumber: {formData.orderNumber} &nbsp;|&nbsp;
        stayInformed:  {formData.stayInformed ? "checked" : "unchecked"} &nbsp;|&nbsp;
        locale: {formData.locale} &nbsp;|&nbsp;
        hasPaid:{formData.hasPaid ? "true" : "false"} &nbsp;|&nbsp;
        paymentToken: {formData.paymentToken}
      </div>
    </>
  )
}

export default App
