/**
*
* RecipientSearch
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import axios from 'axios';
import AjaxSpinner from './AjaxSpinner.jsx'
function RecipientSearch(props) {

  const [searchField, setSearchField] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showAjaxSpinner, setShowAjaxSpinner] = useState(false);
  const [typeDelay, setTypeDelay]= useState(undefined);

  /** 
   * Use Effect 
   * 
   *  Do search if search field is updated
   * */
  useEffect(() => {
    
    if (searchField == undefined || searchField != props.searchField) {
      // wait for 2s after the last keypress before searching
      setTypeDelay(clearTimeout(typeDelay));
      setTypeDelay(setTimeout(searchByField, 1000));
      setSearchField(props.searchField);
    }
  });

  const searchByField = (e) => {
     let value = props.searchField
      if (value.length > 3) {
        searchByOrganizationName(value, props.locale);
        
      } else {
        setSearchResults([])
      }
  }


  /**
   * searchByOrganizationName
   * 
   */
  const searchByOrganizationName = (searchTerm, locale) => {
    locale = locale.replace('-', '_');
    let url = '/api/search.php?term=' + searchTerm + '&locale=' + locale;
    setShowAjaxSpinner(true);
    axios.get(url)
      .then(res => {
        setSearchResults(res.data);
        setShowAjaxSpinner(false);
      })
  }

  /*
   *  Handle select 
   */
  const handleSelect = (address) => {

    let values = {
      'recipientOrganization': address['organization'],
      'recipientTitle': address['title'],
      'recipientFirstName': address['name'],
      'recipientLastName': address['surname'],
      'recipientAddress1': address['street'] + ' ' + address['number'],
      'recipientAddress2': address['postalCode'],
      'recipientCity': address['city'],
      'recipientCountry': address['country'],
      'customRecipient' : false,
    }

    let inputs = document.getElementsByTagName('input');
    for(let index =1; index < inputs.length; index++) {
      inputs[index].focus();
    }
    props.emitHandleChange(
      {
        "target": {
          "name": '_OBJECT_',
          "value": values
        }
      }
    );

  };

  return (
    <>
     {showAjaxSpinner &&
          <AjaxSpinner/>
       }
      <div style={{ "height": "200px", "width": "100%", "overflow": "auto" }} >
        <table>
          <tbody>
            {Object.keys(searchResults).map((innerAttr, index) => {
              let address = searchResults[index];

              return (
                <tr
                  key={index}
                  style={{ "cursor": "pointer" }}
                  onClick={(e) => handleSelect(address)}
                >
                  <td>
                    [[step2.recipient_search.select]]
                  </td>
                  <td>{address.organization}</td>
                  <td>{address.title} {address.name} {address.surname}</td>
                  <td>{address.street}  {address.number}</td>
                  <td>{address.postalCode}</td>
                  <td>{address.city}</td>
                </tr>

              )

            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
RecipientSearch.propTypes = {
  searchField: PropTypes.string,
  locale: PropTypes.string,
  emitHandleChange: PropTypes.func,
};

export default RecipientSearch
