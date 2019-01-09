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

/**
 * import require files
 */
var companyobj = require('./Company.js');
var fs = require('fs');
var companyData = fs.readFileSync('./company.json', 'utf8');
var customerData = fs.readFileSync('./userdetail.json', 'utf8');
/**
 * class User module add define it,s name, number of shares and amount of each share
 */

class User {
    constructor(uname, shares, amount) {
        this.uname = uname;
        this.shares = shares;
        this.amount = amount;
    }

}


/**
 * class StockAccount inherite property of User class.
 * class StockAccount defines all operation of customer and company
 * 
 */

class StockAccount extends User {
    /**
     * Give chioces to user for user operation and company operation
     */
    input() {
        console.log("!!!! Commercial Data Processing !!!! ");
        console.log('1).Comapany oprerations   ');
        console.log('2). User operations  ');
        console.log("3).Exit");
        
        userInput.question('Enter your choice = ', (a) => {
            objStock.operation(a);
        })
    }

    operation(a) {
        /**
         * if choice == 1 then perform company Operation
         */
        if (a == 1) {
            console.log('Company Operations \n');
            console.log('1). Add company ');
            console.log('2). List of comapnies ');
            userInput.question('Enter your choice = ', (coop) => {
                objStock.companyOperation(coop);
            });
        }

        if (a == 2) {
            /**
             * if choice==2 then perform user opeartion 
             */
            console.log('User oprations\n');
            console.log('1). Add user  ');
            console.log('2). Sign in  ');
            console.log('3). Search user details \n  ');
            userInput.question('enter your choice:-  ', (userop) => {
                objStock.userOperation(userop);
            })



        }
        if(a==3){
            userInput.close();
        }
    }
    companyOperation(coop) {
        /**
         * Add company details with it's name,number of shares and price
         */
        if (coop == 1) {
            userInput.question('Enter company name =  ', (cname) => {
                userInput.question('Enter number of shares =   ', (shares) => {
                    userInput.question('Enter price of each share =  ', (sprice) => {
                        /**
                         * conpany detail pass to company class object
                         */
                        var company = new companyobj.Company(cname, shares, sprice);
                        /**
                         * read company.json file for add company details into file
                         */
                        var companyData = fs.readFileSync('./company.json', 'utf8');

                        let detail = JSON.parse(companyData);
                        detail.company.push(company);
                        /**
                         * write company data in company.json file
                         */
                        fs.writeFileSync('company.json', JSON.stringify(detail));

                        console.log("Successsully data write in file ");
                        console.log(detail);
                        console.log('Successfully file updated after data insert\n')
                        objStock.input();

                    });
                });
            });
        }
        if (coop == 2) {
            /**
             * display list of companies 
             */
            let detail = JSON.parse(fs.readFileSync('./company.json'));
            console.log('List');
            console.log(detail);
            objStock.input();
        }
    }
    userOperation(userop) {
        /**
         * Add new user in userdetail.json file.
         */
        if (userop == 1) {
            userInput.question('Enter user name =  ', (uname) => {
                userInput.question('Enter number of shares =  ', (ushares) => {
                    userInput.question('Enter amount of user =  ', (amount) => {
                        /**
                         * pass user detail to user class 
                         */
                        var user = new User(uname, ushares, amount);
                        var customerData = fs.readFileSync('./userdetail.json', 'utf8');
                        let detail = JSON.parse(customerData);
                        detail.user.push(user);
                        /**
                         * write user data in userdetails.json
                         */
                        fs.writeFileSync('userdetail.json', JSON.stringify(detail));
                        console.log("Successfully write user data ");
                        console.log('Updated succesfully\n');
                        objStock.input();

                    });
                });
            });
        }
        /**
         * see details of a particular user.
         */
        if (userop == 4) {
            /** */
            userInput.question('Enter user name to see details =   ', (uname) => {
                var customerData = fs.readFileSync('./userdetail.json', 'utf8');
                var json = JSON.parse(customerData);
                var users = json.user;
                users.forEach(function (user) {
                    if (uname == user.uname) {
                        console.log(uname);
                        return;
                    }
                    else {
                        console.log('No record found');

                    }
                });
            });
        }
        /**
         * User login
         */
        if (userop == 2) {
            var found = 0;
            userInput.question('Enter username to login =  ', (uname) => {
                var customerData = fs.readFileSync('./userdetail.json', 'utf8');
                var json = JSON.parse(customerData);
                var users = json.user;
                users.forEach(function (user) {
                    if (uname == user.uname) {
                        console.log(user);
                        objStock.buyosell(uname);
                        found++;
                    }
                });
                /**
                 * if User not found
                 */
                if (found == 0) {
                    console.log('no record found');
                    return null;
                }

            });


        }
        /**
         *  Display company details.
         */
        if (userop == 3) {
            let detail = JSON.parse(fs.readFileSync('./company.json'));
            console.log('List');
            console.log(detail);
            userInput.question('Enter name of company to buy shares =   ', (cname) => {
                userInput.question('enter number of shares to buy =   ', (snumber) => {
                    objStock.sellshare(cname, snumber);
                });
            });

        }

    }

    buyosell(uname) {
        /**
         * Give user choice to buy or sell
         */
        console.log('1)Buy share  ');
        console.log('2.Sell share');
        userInput.question('Enter your choice =  ', (bs) => {
            objStock.way(bs, uname);
        })
    }

    way(bs, uname) {
        /**
         * if choice is 1 then buy shares of company
         */
        if (bs == 1) {
            objStock.buy(uname);
        }
        if (bs == 2) {
            /**
             * if chioce is 2 then sell share
             */
            objStock.sell(uname);
        }
    }
    /**
     * 
     * Get name of company to buy shares 
     */

    buy(uname) {
        var foundc = 0;
        let det = JSON.parse(fs.readFileSync('./company.json'));
        console.log('list');
        console.log(det);
        userInput.question('Enter name of company to buy shares =  ', (cname) => {
        userInput.question('Enter number of shares to buy =  ', (snumber) => {
            var json = JSON.parse(companyData);
                var users = json.company;
                users.forEach(function (user) {
                    if (cname == user.Companyname && snumber <= user.numberofshares) {

                       objStock.buyshare(cname, snumber, uname);
                        foundc++;
                    }
                });
                if (foundc == 0) {
                    console.log('Enter valid data');
                }
            });
        });
    }
    //buy share of company
    buyshare(cname, snumber, uname) {
        var value;
        var number = parseInt(snumber);//convert string data into integer
        var companyData = fs.readFileSync('company.json', 'utf8');
        var json = JSON.parse(companyData);
        var users = json.company;
        users.forEach(function (user) {
            /**
             * check if user entered company name is equal to existing company name 
             */
            if (cname == user.Companyname) {
                var shareu = parseInt(user.numberofshares)
                var share = shareu - snumber; //substract company shares by user's buy share 
                user.numberofshares = share;
                value = parseInt(user.priceofshare);
            }
        });
        /**
         * write changes in company.json file
         */
        fs.writeFileSync('company.json', JSON.stringify(json));
        var newdata = fs.readFileSync('company.json', 'utf8')
        let det = JSON.parse(newdata);
        console.log(det);
        console.log('Successfully Updated');
        console.log();
        /**
         * parse user data
         * 
         */
        var customerData = fs.readFileSync('userdetail.json', 'utf8')
        var json = JSON.parse(customerData);
        var users = json.user;
        users.forEach(function (user) {
            if (uname == user.uname) {
                var share = parseInt(user.shares);
                var sharep = value;
                var add = share + number;//add shares in user shares
                user.shares = add;
                var abc = sharep * number;//calculate share price
                var usera = Number(user.amount);
                var uamo = usera - abc;
                user.amount = uamo;

            }
        });
        /**
         * write changes in userdetail.json file
         */
        fs.writeFileSync('userdetail.json', JSON.stringify(json));
        /**
         * read file after update
         */
        var newdata = fs.readFileSync('userdetail.json', 'utf8')
        let detail = JSON.parse(newdata);
        /**
         * display updated file
         */
        console.log(detail);
        console.log('Successfully updated');
        console.log();
        // objStock.input();


    }
    /**
     * sell share by company
     *  
     */
    sell(uname) {

        var found = 0;
        var foundc = 0;
        /**
         * read company.json file
         */
        let detail = JSON.parse(fs.readFileSync('./company.json'));
        console.log('List');
        /**
         * display list of cmpanies 
         */
        console.log(detail);
        /**
         * read user input to sell share
         */
        userInput.question('Enter name of company to sell shares =  ', (cname) => {
            userInput.question('Enter number of shares to sell =  ', (snumber) => {
                userInput.question('Enter price of each share = ', (eprice) => {
                    var json = JSON.parse(customerData);
                    var users = json.user;
                    users.forEach(function (user) {
                        /**
                         * if entered input is match to existing user then sell share
                         */
                        if (uname == user.uname && user.share <= snumber) {
                            found++;
                        }

                    });
                    /**
                     * read company data from company.json file
                     */
                    var json = JSON.parse(companyData);
                    var users = json.company;
                    users.forEach(function (user) {
                        /**
                         * check if comapny name is match with existing company in company.json file
                         */
                        if (user.Companyname = cname);
                        foundc++;

                    });
                    /**
                     * chech if record not found or user input is not valid
                     * then print enter valid data
                     */
                    if (found === 0 && foundc === 0) {
                        console.log('Enter valid data');

                    } else {
                        /**
                         * else sell share
                         */
                        objStock.sellshare(cname, snumber, uname, eprice);

                    }//close else
                });
            });
        });// close user input
    }//close function

    /**
     * 
     * @param {company name} cname 
     * @param {nuber of shares} snumber 
     * @param {user name} uname 
     * @param {price of shares} eprice 
     */
    sellshare(cname, snumber, uname, eprice) {
        var price = parseInt(eprice);//type conversion
        var number = parseInt(snumber);//type conversion
        var add = number * price;       //multiply number of shares by it's price
        var value = parseInt(add);
        /**
         * read company file
         */
        var json = JSON.parse(companyData);
        var users = json.company;
        users.forEach(function (user, index) {
            if (cname == user.Companyname) {
                /**
                 * check if entered company name is match with existing company name in company.json file
                 */
                var ns = parseInt(user.numberofshares);
                var add = ns + number;      //add number of shares with buy shares
                user.numberofshares = add;
                var value = user.priceofshare;
                /**
                 * write updated data in company.json file
                 */
                fs.writeFileSync('company.json', JSON.stringify(json));
                var newdata = fs.readFileSync('company.json', 'utf8')
                let detail = JSON.parse(newdata);
                /**
                 * display company details
                 */
                console.log(detail);
                console.log('Successfully updated');
                console.log();
            }
        });
        /**
         * read userdetail file
         */
        var json = JSON.parse(customerData);
        var users = json.user; //get user object in userdetail file
        users.forEach(function (user, index) {
            /**
             * check entered user name is existing in file or not 
             */
            if (uname == user.uname) {
                //get user's number's of shares
                let shareofuser = Number(user.share);
                //after selling to company user shares will be minus
                let minus = shareofuser - snumber;
                // Remaining shares are updated
                user.shares = minus;
                var uamo = parseInt(user.amount);
                //add sell shares amount to user's shares amount 
                var amou = add + uamo;
                //updated price is pass to user shares price 
                user.amount = amou;

            }
        });
        /**
         * write updated changes in userdetail.json file
         */
        fs.writeFileSync('userdetail.json', JSON.stringify(json));
        /**
         * read userdetail.json file 
         */
        var newdata = fs.readFileSync('userdetail.json', 'utf8');
        /**
         * get userdetail object and parse in string
         */
        let detail = JSON.parse(newdata);
        /**
         * Display userdetail file
         */
        console.log(detail);
        console.log();
        //call to user's choice
        objStock.input()


    }

}
/**
 * create object of StockAccount class to call methods 
 */
var objStock = new StockAccount();
objStock.input();
/**
 * create object of  User class 
 */
var userobj = new User();
/**
 * export StockAccount class 
 */
module.exports = {
    StockAccount
}