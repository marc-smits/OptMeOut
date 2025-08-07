/**
*
* Section MyDocument
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


function EmailPdf(props) {

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.section}>
          <Text>Name of general practitioner: {props.formData.nameOfGp} </Text>
          {props.formData.addressOfGp != '' &&
            <Text>Address of general practitioner: {props.formData.addressOfGp} </Text>
          }
          <Text>First name: {props.formData.firstName} </Text>
          <Text>Last name: {props.formData.lastName} </Text>
          <Text>Telephone: {props.formData.telephone} </Text>
          <Text>Date Of Birth: {props.formData.dateOfBirth} </Text>
          <Text>Bsn: {props.formData.bsn} </Text>
        </View>
      </Page>
    </Document>
  )
}

EmailPdf.propTypes = {
  formData: PropTypes.object
};
export default EmailPdf