import { useEffect,useState } from 'react'


import './style/App.scss'
import Header from "./components/Header/Header.jsx";

import About from "./steps/About.jsx";
import Step1 from "./steps/Step1.jsx";
import Splash from "./steps/Splash.jsx";
import CountrySelect from "./steps/CountrySelect.jsx";


function App() {
  const [currentSection, setCurrentSection] = useState("step1")
  const [currentStep, setCurrentStep] = useState("step1")
  const [formData, setFormData] = useState({ country: ''})
  const [sectionFromQueryParamsSet, setSectionFromQueryParamsSet] = useState(false)

  useEffect(() => {

    // show required section from query string if exists
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
      section  = currentStep;
    }
    setCurrentSection(section);
  }

  //
  // update form data
  //
  const updateFormdata = (field, value, e) => {
    let x = formData;
    x[field] =value
    setFormData(x)
  }




  return (
    <>

      <header>
        <Header
          emitChangeSection={changeSection}
        />
      </header>


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

        {/* Step 1 Introduction*/}
        {currentSection == "step2" &&
          <div>
            Step 2 will be here
        </div>
        }

      
      </div>



      
    {/* ==============   Debug data ================ */}
     <div style={{ "clear": "both"}}> </div>
      <pre>
        currentSection: {currentSection} current step: {currentStep} FormData:  Country: {formData.country}
      </pre>
    </>
  )
}

export default App
