/**
 * A class to manage invoices
 */

import Cookie from "./Cookie.jsx";
class Invoice {

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


    static saveInvoiceDataToCookies(formData) {
        Cookie.setArrayCookie(this.#cookieName, formData);
    }

    static getInvoiceDataFromCookies(formData) {
        let cookiefFormData = Cookie.getArrayCookie(this.#cookieName);
        alert(cookiefFormData);

    }
}
export default Invoice;