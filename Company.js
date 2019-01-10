
/**
 * class module Company define constructor to store details of company shares
 */
class Company {
    constructor(Companyname, numberofshares, priceofshare) {
        this.Companyname = Companyname;
        this.numberofshares = numberofshares;
        this.priceofshare = priceofshare;
    }
}
/**
 * export module to access property of it
 */
module.exports = {
    Company
}