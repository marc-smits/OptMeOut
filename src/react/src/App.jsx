import { useEffect, useState } from 'react'


import './style/App.scss'
import Header from "./components/Header/Header.jsx";

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
  const [currentSection, setCurrentSection] = useState("step2")
  const [currentStep, setCurrentStep] = useState("step1")
  const [formData, setFormData] = useState({
    nameOfGp: '',
    checkAddressOfGp: false,
    addressOfGp: '',
    firstName: '',
    lastName: '',
    telephone: '',
    dateOfBirth: '',
    bsn: '',
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
      nameOfGp: field == 'nameOfGp' ? value : formData.nameOfGp,
      checkAddressOfGp: field == 'checkAddressOfGp' ? value : formData.checkAddressOfGp,
      addressOfGp: field == 'addressOfGp' ? value : formData.addressOfGp,
      firstName: field == 'firstName' ? value : formData.firstName,
      lastName: field == 'lastName' ? value : formData.lastName,
      telephone: field == 'telephone' ? value : formData.telephone,
      dateOfBirth: field == 'dateOfBirth' ? value : formData.dateOfBirth,
      bsn: field == 'bsn' ? value : formData.bsn,
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

        {/* Step 2 name of general practitioner */}
        {currentSection == "step2" &&
          <Step2
            formData={formData}
            emitChangeSection={changeSection}
            emitUpdateFormdata={updateFormdata}
          />
        }

        {/* Step3 */}
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
     <div style={{ "clear": "both"}}> </div>
      <pre style={{ "overflow": "auto" }}>
        currentSection: {currentSection} current step: {currentStep}  <br/>
        FormData:  <br/> 
        nameOfGp: {formData.nameOfGp}  &nbsp;
        checkAddressOfGp {formData.checkAddressOfGp ? "checked" : "unchecked"} &nbsp;
        addressOfGp {formData.addressOfGp} <br/>
        firstName : {formData.firstName}  &nbsp;
        lastName : {formData.lastName}  &nbsp;
        telephone : {formData.telephone} &nbsp;
        date of birth : {formData.dateOfBirth}&nbsp;
        bsn : {formData.bsn} 
      </pre>
    </>
  )
}

export default App
