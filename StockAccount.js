/******************************************************************************
 *  Execution       :   1. default node         cmd> node StockAccount.js 
 *                      2. if nodemon installed cmd> nodemon StockAccount.js
 * 
 *  Purpose         : Commercial data processing -StockAccount.js implements a data type that might be
 *                    used by a financial institution to keep track of customer information.
 * 
 *  @description    
 * 
 *  @file           : StockAccount.js
 *  @overview       : Commercial data processing -StockAccount.js implements a data type that might be
 *                    used by a financial institution to keep track of customer information.
 *  @module         : Inventory - This is optional if expeclictly its an npm or local package
 *  @author         : Parmeshwar Raut
 *  @version        : 1.0
 *  @since          : 07-01-2019
 *
 ******************************************************************************/
/** 
*readline module provides an interface for reading data from readable stream one line

*/
var readline = require('readline');
var userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var objCustomer = require('./Customer.js');
var objCompany = require('./Company.js');
var fs = require('fs');
var companyData = fs.readFileSync('Company.json', 'utf8');
var customerData = fs.readFileSync('Customer.json', 'utf8');
var objCust = new objCustomer.Customer();
var objComp = new objCompany.Company();

class StockAccount {
    // constructor(shareName, noOfShares, price) {
    //     this.shareName = shareName;
    //     this.noOfShares = noOfShares;
    //     this.price = price;
    // }

    getChoice() {
        console.log("!!!! Commercial Data Processing !!!!");
        console.log("1). Customer Operation ");
        console.log("2). Company Operation ");
        console.log("3). Exit");

        userInput.question("Enter your choice = \n", (choice) => {
            objStock.input(choice)
        });
    }

    input(choice) {
        if (choice == 1) {
            console.log("1). New Customer  ");
            console.log("2). Registered ");
            console.log("3). Exit ");
            userInput.question("Enter your choice = ", (customerChoice) => {
                objStock.customerChoiceInput(customerChoice);
            });

        }
        else if (choice == 2) {

            console.log('Company operations\n');
            console.log('1). Add company');
            console.log('2). List of comapnies');
            userInput.question('Enter your choice = ', (companyChoice) => {
                objStock.companyOperation(companyChoice);
            });


        }
    }
    companyOperation(companyChoice) {
        if (companyChoice == 1) {
            userInput.question("Enter company name = ", (cname) => {
                userInput.question("Enter number of shares = ", (shares) => {
                    userInput.question("Enter price of each share = ", (sprice) => {
                        var writeData = new objCompany.Company(cname, shares, sprice);
                        var detail = JSON.parse(companyData);
                        detail.Company.push(writeData);
                        fs.writeFileSync('Company.json', JSON.stringify(detail));
                        console.log(detail);
                        console.log('Successfully Updated \n')


                    });
                });
            });
        }
        else if (companyChoice == 2) {
            let detail = JSON.parse(fs.readFileSync('./Company.json'));
            console.log("List of Companies = ");
            console.log(detail);
            console.log("\n");

            objStock.getChoice();
        }
        else {
            console.log("!!!!Enter proper choice!!!!");

        }

    }
    customerChoiceInput(customerChoice) {
        if (customerChoice == 1) {
            userInput.question("Enter customer id = ", (id) => {
                userInput.question("Enter customer Name = ", (customerName) => {
                    objCust.add(id, customerName);

                });

            });
        }
        if (customerChoice == 2) {
            userInput.question("Enter id = ", (custId) => {
                objCust.check(custId);
            });
        }
    }


    buyOrsell(id) {
        console.log("1). Buy shares  ");
        console.log("2) .Sell shares ");
        console.log("3). Exit ");
        userInput.question("Enter your choice = ", (ch) => {
            objStock.buyInput(ch);
        });
    }
    buyInput(ch) {
        if (ch == 1) {
            objStock.buy(id);
        }
        else if (ch == 2) {
            objStock.sell(id);
        }
        else {
            console.log("Enter proper choice ");

        }


    }
    buy(id) {
        var count = 0;
        var readData = JSON.parse(fs.readFileSync('Comapny.json'));
        console.log(readData);
        userInput.question("Enter company name = ", (companyName) => {
            userInput.question("Enter numbers of shares to buy = ", (noOfShares) => {
                var writedata = JSON.parse(companyData);
                var users = writedata.customer;
                users.forEach(function (user) {
                    if (companyName == user.companyName && noOfShares > numOfShares) {
                        objCust.buyShares(companyName, noOfShares, id);
                        count++;

                    }

                });
                if (count == 0) {
                    console.log(" No record found");


                }


            });
        });


    }
    shell(id){

    }
}
//var objStock = new StockAccount();
//objStock.getChoice();
module.exports = {
    StockAccount
}



