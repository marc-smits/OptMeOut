/**
*
* RecipientSearch
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

function RecipientSearch(props) {

  const [searchField, setSearchField] = useState("")
  const [searchResults, setSearchResults] = useState([])
  let addresses = [[ADDRESSES_LIST]];

  /** 
   * Use Effect 
   * 
   *  Do search if search field is updated
   * */
  useEffect(() => {
    if (searchField == undefined || searchField != props.searchField) {
      let value = props.searchField
      if (value.length > 3) {
        searchByOrganizationName(value);
      } else {
        setSearchResults([])
      }
      setSearchField(props.searchField);
    }
  });

  /**
   * searchByOrganizationName
   * 
   */
  const searchByOrganizationName = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase(searchTerm);
    let items = [];

    for (let index = 1; index < addresses.length; index++) {
      let organization = addresses[index]['organization'];
      organization = organization.toLowerCase(organization);

      let name = addresses[index]['title'] + ' ' +
        addresses[index]['name'] + ' ' +
        addresses[index]['surname']
      name = name.toLowerCase(name);


      if (organization.includes(searchTerm) || name.includes(searchTerm)) {
        items.push(addresses[index]);
      }
      if (items.length > 100) {
        // too much search results
        setSearchResults([]);
        return;
      }
    }
    setSearchResults(items);
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
  emitHandleChange: PropTypes.func,
};

export default RecipientSearch
