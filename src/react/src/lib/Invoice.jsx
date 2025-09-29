/**
 * A class to manage invoices
 */

class Invoice {

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
}
export default Invoice;