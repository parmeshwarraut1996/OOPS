/******************************************************************************
 *  Execution       :   1. default node         cmd> node AddressBook.js 
 *                      2. if nodemon installed cmd> nodemon AddressBook.js
 * 
 *  Purpose         : Create Object Oriented Analysis and Design of a simple Address Book Problem.
 * 
 *  @description    
 * 
 *  @file           : AddressBook.js
 *  @overview       : AddressBook module to Create Object Oriented Analysis and Design of a simple Address Book Problem.
 *  @module         : AddressBook - This is optional if expeclictly its an npm or local package
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

var fs = require('fs');
var data = fs.readFileSync('AddressBook.json','utf8');

/**
 * Give user chioces to enter CRUD operation.
 */
class AddressBook {

    constructor(fname, lname, address, city, state, zip, contactNumber) {
        this.fname = fname;
        this.lname = lname;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.contactNumber = contactNumber;
    }

    display() {
        console.log(this.fname);
    }

    input() {
        console.log("1).Add person");
        console.log("2).Update peson detail");
        console.log("3).Remove person");
        console.log("4).Search person");
        console.log("5).Display person");
        console.log("6).Exit");
        userInput.question("Enter your choice = ", (choice) => {
            objAdd.getChoice(choice);
        });

    }
    getChoice(choice) {
        /**
         * if choice is 1 then add person in file
         */
        if (choice == 1) {
            userInput.question("Enter first name =  ", (fname) => {
               userInput.question("Enter last name = ", (lname) => {
                   userInput.question("Enter address = ", (address) => {
                       userInput.question("Enter city = ", (city) => {
                           userInput.question("Enter state = ", (state) => {
                               userInput.question("Enter zip code = ", (zip) => {
                                   userInput.question("Enter contact number =  ", (number) => {
                                    /**
                                     * check if mobile number is 10 digit  */    
                                    if (isNaN(number) && number.length == 10) {
                                            console.log("Enter digits only");
                                        } else {
                                            /**
                                            * person details pass to AddressBook() class
                                            */
                                            let personData = new AddressBook(fname, lname, address, city, state, zip, number);
                                            /**
                                             * read AddressBook.json file
                                             */
                                            let detail = JSON.parse(fs.readFileSync('./AddressBook.json'));
                                            /**
                                             * push data in person object of AddressBook.json file  
                                             */
                                            detail.person.push(personData);
                                            /**
                                             * write person data in AddressBook.json file
                                             */
                                            fs.writeFileSync('AddressBook.json', JSON.stringify(detail));
                                            console.log("Successfully write data");
                                            console.log(detail);
                                            console.log('Succesfully Updated \n')
                                            objAdd.input();//call user choice
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });

        }

        /**
         * if choice is 2 then update user/person details
         */

        if (choice == 2) {
            var found = 0;
            userInput.question('Enter firstname of person to edit  =   ', (fname) => {
                /**
                 * Get person data in json object
                 */
                var json = JSON.parse(data);
                /**
                 * pass json.person object to users variable
                 */
                var users = json.person;
                users.forEach(function (user) {
                    /**
                     * check if user entered input is right
                     */
                    if (fname == user.fname) {
                        objAdd.editDetails(fname);
                        found++;

                    }
                });
                if (found === 0) {
                    console.log('No record found');
                    console.log();
                    objAdd.input();
                    return null;
                }

            });
        }
        /**
         * if choice is 3 then delete person detail from file
         */

        if (choice == 3) {

            var count = 0;
            userInput.question("Enter fisrt name to delete person = ", (fname) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname == user.fname) {
                        del(fname);
                        count = 0;
                    }
                    else {
                        count++;
                    }
                });
                if (count = 0) {
                    console.log('No record found ');
                }
            });
        }
        /**
         * if choice is 4 then search person in file
         */
        if (choice == 4) {
            var count = 0;
            userInput.question("Enter Fisrt name to search person = ", (fname) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname == user.fname) {
                        console.log("Person is found");
                        console.log(user);
                        count++;
                    }
                });
                if (count === 0) {
                    console.log("No record found\n");
                    objAdd.input();
                    return null;
                }
                else {
                    console.log();
                    objAdd.input();
                }
            });
        }

        if (choice == 5) {
            let detail = JSON.parse(fs.readFileSync('./AddressBook.json'));
            console.log("List of person's");
            console.log(detail);
            objAdd.input();
        }
        if (choice == 6) {
            userInput.close();

        }
    }
    del(fname) {
        var removeUser = fname;
        var json = JSON.parse(data);
        var users = json.person;
        users.forEach(function (user) {
            if (fname === user.fname) {

                json.person = users.filter((user) => {
                    return user.fname !== removeUser;
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8');
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log();
                objAdd.input();


            }
        });


    }
    editDetails(fname) {

        console.log('1) Alter lastname ');
        console.log('2) Alter address ');
        console.log('3) Alter city ');
        console.log('4) Alter state ');
        console.log('5) Alter zip code');
        console.log('6) Alter mobile number');

        userInput.question('Enter your choice\n', (a) => {

            objAdd.edit(a, fname);


        });


    }
    edit(a, fname) {
        if (a == 1) {
            userInput.question('Enter last name to change = ', (lastname) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        user.lname = lastname;
                        // console.log(lastname);
                    }
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log();
                objAdd.input();

            });
        }
        /**
         * if choice is 2 then change address of person
         */
        if (a == 2) {
            userInput.question('Enter address to change = ', (address) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        user.address = address;
                    }
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log('Address  is updated');
                console.log();
                objAdd.input();

            });

        }
        /**
         * if choice is 3 then change city of person
         */
        if (a == 3) {
            userInput.question('Enter city to change = ', (city) => {

                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        user.city = city;
                    }
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log(' City is updated');
                console.log();
                objAdd.input();



            });
        }
        /**
         * if choice is 4 then chane the state of person
         */

        if (a == 4) {
            userInput.question('Enter state to change =  ', (state) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        user.state = state;
                    }
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log('State is updated');
                console.log();
                objAdd.input();

            });
        }
        /**
         *  if choice is 5 then To change zip code
         */
        if (a == 5) {
            prompts.question('Enter zip code =  ', (zip) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        user.zip = zip;
                    }
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log('Zip-code is updated');
                console.log();
                objAdd.input();

            });

        }
        /**
         * edit number
         */
        if (a == 6) {
            userInput.question('Enter contact number to change = ', (number) => {
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        user.contactNumber = number;
                    }
                });
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                console.log(detail);
                console.log(' Mobile_number is updated');
                console.log();
                objAdd.input();


            });
        }
    }
}
var objAdd = new AddressBook();
objAdd.input();
module.exports = {
    AddressBook
}