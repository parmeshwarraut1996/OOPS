var fs = require('fs');
var readData = fs.readFileSync('Customer.json', 'utf8');
var readData2 = fs.readFileSync('Company.json', 'utf8');
var objStock = require('./StockAccount.js');
var objStock2 = require('./Company.js');
var objSt = new objStock.StockAccount();

class Customer {
    constructor(shareName, noOfShares, price) {
        this.shareName = shareName;
        this.noOfShares = noOfShares;
        this.price = price;
    }
    add(id, customerName) {
        this.id = id;
        this.customerName = customerName;

        readData = fs.readFileSync("Customer.json", "utf8");
        /**
         * parse customer id and name details to object in json file
         */
        var writeData = JSON.parse(readData);
        writeData.customer.push(id, customerName);
        /**
         * write customer id and name details in json file
         */
        var write = fs.writeFileSync("Customer.json", JSON.stringify(writeData));
        console.log("Successfully write stock data");
        console.log(writeData);
        

    }
    check(id) {
        var count=0;
        var writeData = JSON.parse(readData);
        var user = writeData.customer;
        user.forEach(function (customer) {
            if (id == customer.id) {
                console.log(customer);
               objSt.buyOrsell(id);
                count++;

            }
        });
        if (count == 0) {
            console.log("No user found");

        }

    }


    buyShares(sname, numberOfShares, sPrice) {
        var no_Of_Shares = parseInt(numberOfShares);
        var writeData = JSON.parse(readData2);
        var users = writeData.Company
        users.forEach(function (user) {
            if (sname == user.CompanyName) {
                var shares = Number(user.noOfShares);
                var share = shares - numberOfShares;
                user.noOfShares = share;
                this.value = parseInt(user.priceOfShares);
            }
        });
        fs.writeFileSync('Company.json', JSON.stringify(writeData));
        var newdata = fs.readFileSync('Company.json', 'utf8')
        let d = JSON.parse(newdata);
        console.log(d);
        console.log('Successfull Updated');

        console.log();

        var writeData = JSON.parse(readData);
        var users = writeData.user;
        users.forEach(function (user) {
            if (uname == user.userName) {
                var share = parseInt(user.shares);
                var sharep = this.value;
                var add = share + no_Of_Shares;
                user.shares = add;
                var total = sharep * no_Of_Shares
                var usera = Number(user.amount);
                var uamount = usera - total;
                user.amount = uamount;

            }
        });

        fs.writeFileSync('Customer.json', JSON.stringify(writeData));
        var newdata = fs.readFileSync('Customer.json', 'utf8')
        let detail = JSON.parse(newdata);
        console.log(detail);
        console.log(' Customer details successfully updated');
        console.log();
        


    }
 sellShare(cname, snumber, uname, eprice) {
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

    }
    display() {
        /**
         * display Company details 
         */
        var read = fs.readFileSync('Customer.json');
        var stockDetails = JSON.parse(read);
        console.log(stockDetails);
    }
    noOfUsers() {
        /**
         * display stock report to user
         */
        var read = fs.readFileSync('Customer.json');
        var stockDetails = JSON.parse(read);
        var len = stockDetails.length;
        console.log("Number of Comapnies = " + len);
    }



}
module.exports = {
    Customer
}