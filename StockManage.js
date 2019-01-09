/******************************************************************************
 *  Execution       :   1. default node         cmd> node StockManage.js 
 *                      2. if nodemon installed cmd> nodemon StockManage.js
 * 
 *  Purpose         : Write a program to read in Stock Names, Number of Share, Share Price.
                      Print a Stock Report with total value of each Stock and the total value of Stock.
 * 
 *  @description    
 * 
 *  @file           : StockManage.js
 *  @overview       : StockManage module to Write a program to read in Stock Names, Number of Share, Share Price.
                      Print a Stock Report with total value of each Stock and the total value of Stock.
 *  @module         : StockManage - This is optional if expeclictly its an npm or local package
 *  @author         : Parmeshwar Raut
 *  @version        : 1.0
 *  @since          : 04-01-2019
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
/**
 * fs module provides file stream for reading or writing file.
 */
var readStock = require('./StockPortfolio.js');
var fs = require('fs');
var readData = fs.readFileSync('Stock.json', 'utf8');
/**
 * Give user chioces to enter stock report.
 */
getChoice();
function getChoice() {
    console.log("1).Enter Stock ");
    console.log("2).Display stock ");
    console.log("3).Exit ");

    /**
     * take choice from user
     */

    userInput.question("Enter choice = ", (choice) => {
        input(choice);


    });
}
function input(choice) {
    /**
     * if choice is 1 then enter stock details
     */
    if (choice == 1) {
        stockDetails();
    }
    /**
     * if choice is 2 then display stock report
     */
    else if (choice == 2) {
        display();
    }
    /**
     * invalid input
     */
    else {

        userInput.close();
    }

}

function stockDetails() {
    /**
     * take stock detials from user
     */
    userInput.question("Enter stock name = ", (sname) => {
        userInput.question("Enter number of shares = ", (shares) => {
            userInput.question("Enter share price = ", (price) => {
                var total = shares * price;
                /**
                 * Company details pass to  class
                 */
                var s = new readStock.Stock(sname, shares, price, total);
                /**
                 * read stock.json file from user 
                 */
                readData = fs.readFileSync("Stock.json", "utf8");
                /**
                 * parse stock details to object in json file
                 */
                writeData = JSON.parse(readData);
                writeData.shares.push(s);
                /**
                 * write stock details in json file
                 */
                var write = fs.writeFileSync("Stock.json", JSON.stringify(writeData));
                console.log("Successfully write stock data");
                userInput.close();

            });
        });
    });

}
function display() {
    /**
     * display stock report to user
     */
    var read = fs.readFileSync('Stock.json');
    var stockDetails = JSON.parse(read);
    console.log(stockDetails);
    getChoice();


}
