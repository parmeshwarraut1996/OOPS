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

//var objCustomer = require('./Customer.js');
//var objCompany = require('./Company.js');
var fs = require('fs');
var companyData = fs.readFileSync('./company.json', 'utf8');
var customerData = fs.readFileSync('./userdetail.json', 'utf8');
//var objCust = new objCustomer.Customer();
//var objComp = new objCompany.Company();

class Customer {
    constructor(uname, shares, amount) {
        this.uname = uname;
        this.shares = shares;
        this.amount = amount;
    }
   
}




class StockAccount extends Customer{
 input() {
    console.log('1.comapany oprerations :-  ');
    console.log('2. user operations  ');
    userInput.question('enter your choice', (a) => {
        objStock.operation(a);
    })
}
    operation(a) {
        if (a == 1) {
            console.log('company operations\n');
            console.log('1. add company');
            console.log('2. list of comapnies');
            userInput.question('enter your choice', (coop) => {
               objStock.companyOperation(coop);
            });




        }

        if (a == 2) {
            console.log('user oprations\n');
            console.log('1. add user :');
            console.log('2 sign in:');
            //console.log('3 sell shares:');
            console.log('4. search user details\n:  ');
            userInput.question('enter your choice:-  ', (userop) => {
               objStock.userOperation(userop);
            })



        }
    }
    companyOperation(coop) {
        if (coop == 1) {
            userInput.question('enter company name:-  ', (cname) => {
                userInput.question('enter number of shares:-  ', (shares) => {
                    userInput.question('enter price of each share:-  ', (sprice) => {
                        var company = new companyobj.Company(cname, shares, sprice);
                        let detail = JSON.parse(companydata);
                        detail.company.push(company);
                        fs.writeFileSync('company.json', JSON.stringify(detail));



                        console.log("success");

                        console.log(detail);
                        console.log('updated succesfully\n')
                        objStock.input();

                    });
                });
            });
        }
        if (coop == 2) {
            let detail = JSON.parse(fs.readFileSync('./company.json'));
            console.log('list');
            console.log(detail);
           objStock.input();
        }
    }
    userOperation(userop) {
        /**
         * add new user.
         */
        if (userop == 1) {
            userInput.question('enter user name:-  ', (uname) => {
                userInput.question('enter number of shares:-  ', (ushares) => {
                    userInput.question('enter amount of user:-  ', (amount) => {
                        var user = new userobj.User(uname, ushares, amount);
                        let detail = JSON.parse(userdata);
                        detail.user.push(user);
                        fs.writeFileSync('user.json', JSON.stringify(detail));



                        console.log("success");

                        //console.log(detail);
                        console.log('updated succesfully\n')
                       objStock.input();

                    });
                });
            });
        }
        /**
         * see details of a particular user.
         */
        if (userop == 4) {
            userInput.question('enter user name to see details:-   ', (uname) => {
                var json = JSON.parse(userdata);
                var users = json.user;
                users.forEach(function (user) {
                    if (uname == user.uname) {
                        console.log(user);
                        // count ++;
                        return;
                    } else {
                        console.log('no record found');

                    }
                });
            });
        }
        /**
         * for login
         */
        if (userop == 2) {
            var found = 0;
            userInput.question('enter username to login:-  ', (uname) => {
                var json = JSON.parse(userdata);
                var users = json.user;
                users.forEach(function (user) {
                    if (uname == user.uname) {
                        console.log(user);
                        objStock.buyosell(uname);
                        found++;


                    }
                });
                if (found == 0)
                    console.log('no record found');
                console.log();
                //input();
                return null;


            });


        }
        /**
         * company details display.
         */
        if (userop == 3) {
            let detail = JSON.parse(fs.readFileSync('./company.json'));
            console.log('list');
            console.log(detail);
            userInput.question('enter name of company to buy shares:-  ', (cname) => {
                userInput.question('enter number of shares to buy:-  ', (snumber) => {
                   objStock.sellshare(cname, snumber);
                });
            });

        }

    }

    buyosell(uname) {
        console.log('1.buy share  ');
        console.log('2.sell share');
        userInput.question('enter your choice:-  ', (bs) => {
           objStock.way(bs, uname);
        })
    }

    way(bs, uname) {
        if (bs == 1) {
           objStock.buy(uname);
        }
        if (bs == 2) {
           objStock.sell(uname);
        }
    }

    buy(uname) {
        var foundc = 0;
        let det = JSON.parse(fs.readFileSync('./company.json'));
        console.log('list');
        console.log(det);
        userInput.question('enter name of company to buy shares:-  ', (cname) => {
            userInput.question('enter number of shares to buy:-  ', (snumber) => {
                var json = JSON.parse(companydata);
                var users = json.company;
                users.forEach(function (user) {
                    if (cname == user.Companyname && snumber <= user.numberofshares) {

                        objStock.buyshare(cname, snumber, uname);
                        foundc++
                    }
                });
                if (foundc == 0) {
                    console.log('enter valid company name or shares to buy');
                }
            });
        });
    }
    buyshare(cname, snumber, uname) {
        var number = parseInt(snumber);
        var json = JSON.parse(companydata);
        var users = json.company;
        users.forEach(function (user) {



            if (cname == user.Companyname) {
                var shareu = Number(user.numberofshares)
                var share = shareu - snumber;
                user.numberofshares = share;
                this.value = parseInt(user.priceofshare);
            }
        });

        fs.writeFileSync('company.json', JSON.stringify(json));
        var newdata = fs.readFileSync('company.json', 'utf8')
        let det = JSON.parse(newdata);
        console.log(det);
        console.log(' updated');

        console.log();





        var json = JSON.parse(userdata);
        var users = json.user;
        users.forEach(function (user) {
            if (uname == user.uname) {
                var share = parseInt(user.shares);
                var sharep = this.value;
                var add = share + number;
                user.shares = add;
                var abc = sharep * number
                var usera = Number(user.amount);
                var uamo = usera - abc;
                user.amount = uamo;

            }
        });
        fs.writeFileSync('userdetail.json', JSON.stringify(json));
        var newdata = fs.readFileSync('userdetail.json', 'utf8')
        let detail = JSON.parse(newdata);
        console.log(detail);
        console.log(' updated');
        console.log();
        objStock.input();


    }

    sell(uname) {
        //var number=parseInt(snumber);
        var found = 0;
        var foundc = 0;
        let detail = JSON.parse(fs.readFileSync('./company.json'));
        console.log('list');
        console.log(detail);
        userInput.question('enter name of company to sell shares:-  ', (cname) => {
            userInput.question('enter number of shares to sell-  ', (snumber) => {
                userInput.question('enter price of each share', (eprice) => {
                    var json = JSON.parse(userdata);
                    var users = json.user;
                    users.forEach(function (user) {
                        if (uname == user.uname && user.share <= snumber) {
                            found++;
                        }

                    });
                    var json = JSON.parse(companydata);
                    var users = json.company;
                    users.forEach(function (user) {
                        if (user.Companyname = cname);
                        foundc++;

                    });
                    if (found === 0 && foundc === 0) {
                        console.log('enter valid data');

                    } else {
                        objStock.sellshare(cname, snumber, uname, eprice);

                    }
                });
            });
        });
    } 


    sellshare(cname, snumber, uname, eprice) {
        var price = parseInt(eprice);
        var number = parseInt(snumber);
        var add = number * price;
        var value = parseInt(add);
        var json = JSON.parse(companydata);
        var users = json.company;
        users.forEach(function (user, index) {



            if (cname == user.Companyname) {
                var ns = parseInt(user.numberofshares);
                var add = ns + number;
                user.numberofshares = add;
                var value = user.priceofshare;
                fs.writeFileSync('company.json', JSON.stringify(json));
                var newdata = fs.readFileSync('company.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log(' updated');

                console.log();
            }
        });
        var json = JSON.parse(userdata);
        var users = json.user;
        users.forEach(function (user, index) {
            if (uname == user.uname) {
                let shareofuser = Number(user.share);
                let minus = shareofuser - snumber;
                user.shares = minus;
                var uamo = parseInt(user.amount);
                var amou = add + uamo;
                user.amount = amou;

            }
        });
        fs.writeFileSync('userdetail.json', JSON.stringify(json));
        var newdata = fs.readFileSync('userdetail.json', 'utf8')
        let detail = JSON.parse(newdata);
        console.log(detail);
        console.log();
        objStock.input();


    }





}
var objStock=new StockAccount();
objStock.input();
module.exports={
    StockAccount
}





