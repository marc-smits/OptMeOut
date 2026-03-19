/**
 * A class to manage invoices
 */

import Cookie from "./Cookie.jsx";
class Order {

    /**
     * Cookie name fpr this application
     */
    static #cookieName = 'OptMeOutFormData';

    /**
     * Create invoice number
     * 
     * @returns string 
     */
    static createNumber() {
        let time = Date.now().toString();
        var number = time.substring(time.length - 10);
        return number;
    }


    static saveFormDataToCookies(formData) {
        Cookie.setArrayCookie(this.#cookieName, formData);
    }

    static getFormDataFromCookies(formData) {
        let cookieFormData = Cookie.getArrayCookie(this.#cookieName);
        
        //  reset the payment values
        if (typeof(cookieFormData) == 'object') {
            cookieFormData.orderNumber = '';
            cookieFormData.hasPaid = false;
            cookieFormData.paymentToken ='';
            cookieFormData.paymentChoice = '';

        }
        Cookie.eraseCookie(this.#cookieName);
        return cookieFormData;

    }

    static deleteFormDataCookies(){
          Cookie.eraseCookie(this.#cookieName);
    }
}
export default Order;