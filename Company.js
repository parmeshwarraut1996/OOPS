var fs = require('fs');

class Company {
    constructor(shareName, noOfShares, price) {
        this.shareName = shareName;
        this.noOfShares = noOfShares;
        this.price = price;
    }

    buy(sname,numberOfShares,sPrice){
        shareName=sname;
        noOfShares=noOfShares+numberOfShares;
        price=price+sPrice;
        var total=noOfShares*price;
        console.log("Total = "+total);
        
    }
    sell(sname, numberOfShares, sPrice) {
        shareName = sname;
        noOfShares = noOfShares - numberOfShares;
        price = price - sPrice;
        var total = noOfShares * price;
        console.log("Total = " + total);

    }
    display(){
    /**
     * display Company details 
     */
        var read = fs.readFileSync('Company.json');
        var stockDetails = JSON.parse(read);
        console.log(stockDetails);
    }
    noOfCompanies(){
    /**
     * display stock report to user
     */
        var read = fs.readFileSync('Company.json');
        var stockDetails = JSON.parse(read);
        var len=stockDetails.length;
        console.log("Number of Comapnies = "+len);
    }
   




}
module.exports = {
    Company
}