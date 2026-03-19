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
          <Text>Name of general practitioner: {props.formData.recipientFirstName} </Text>
          {props.formData.recipientFirstName != '' &&
          /*
            @Tuulia Please note:

            This condition always evaluates to TRUE.

            In Step 2 the Address comes from:
              -- A search in the address list based on the name (ToDo)
              -- A manually entered address (Done)
          */
            <Text>Address of general practitioner: {props.formData.recipientAddress1} </Text>
          }
          /*
          *   We have 2 addresslines:
          *   - props.formData.recipientAddress1
          *   - props.formData.recipientAddress1
          *
          */

          <Text>First name: {props.formData.senderFirstName} </Text>
          <Text>Last name: {props.formData.senderLastName} </Text>
          <Text>Telephone: {props.formData.senderPhone} </Text>
          <Text>Date Of Birth: {props.formData.senderBirthDate} </Text>
          <Text>Bsn: {props.formData.senderId} </Text>
        </View>
      </Page>
    </Document>
  )
}

EmailPdf.propTypes = {
  formData: PropTypes.object
};
export default EmailPdf
