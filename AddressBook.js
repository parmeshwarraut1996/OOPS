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
 *  @since          : 09-01-2019
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
var data = fs.readFileSync('AddressBook.json', 'utf8');

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
        console.log("1).Add person in file");
        console.log("2).Update person detail");
        console.log("3).Remove person from file");
        console.log("4).Search person in file");
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
                var data = fs.readFileSync('AddressBook.json', 'utf8');
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
                        /**
                         * if user is found then call editDetails method
                         */
                        objAdd.editDetails(fname);
                        /**
                         * if found then count will be increment
                         */
                        found++;

                    }
                });
                /**
                 * if count is zero means no user found
                 */
                if (found === 0) {
                    /**
                     * if count ==0 then no user record found
                     */
                    console.log('No user record found');
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
                /**
                 * read AddressBook.json file
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                /**
                 * Get object of json file and assign to users variable
                 * 
                 */
                var users = json.person;
                users.forEach(function (user) {
                    if (fname == user.fname) {
                        /**
                         * check if user name is exist in file 
                         * if found then call delete method
                         */
                        objAdd.del(fname);
                        count = 0;
                    }
                    else {
                        count++;
                    }
                });
                /**
                 * if count is zero then no user record found
                 */
                if (count = 0) {
                    console.log('No  user record found ');
                }
            });
        }
        /**
         * if choice is 4 then search person in file
         */
        if (choice == 4) {
            var count = 0;
            /**
             * Take user choice to search perticular person in file
             */
            userInput.question("Enter Fisrt name to search user in file = ", (fname) => {
                /**
                 * read addressBook.json file and get object key in file 
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                /**
                 * assign that object to variable 
                 */
                var users = json.person;
                users.forEach(function (user) {
                    if (fname == user.fname) {
                        /**
                         * check if user name is found  then display  message 
                         */
                        console.log("Person is found");
                        /**
                         * if found then display perticular user
                         */
                        console.log(user);
                        /**
                         * if found then count will be increment
                         */

                        count++;
                    }
                });
                if (count === 0) {
                    /**
                     * if count is zero then np user record found 
                     */
                    console.log("No person found\n");
                    /**
                     * call main menu
                     */
                    objAdd.input();
                    return null;
                }
                else {
                    console.log();
                    objAdd.input();
                }
            });
        }
        /**
         * Display list of person in file
         */
        if (choice == 5) {
            /**
             * read file AddressBook.json which hold list of persons
             */
            let detail = JSON.parse(fs.readFileSync('./AddressBook.json'));
            console.log("List of person's");
            /**
             * Display list of person in file 
             */
            console.log(detail);
            /**
             * call main menu
             */
            objAdd.input();
        }
        /**
         * if user want to exit program
         */
        if (choice == 6) {
            userInput.close();

        }
    }
    /**
     * 
     * @param {delete user } fname 
     */
    del(fname) {
        var removeUser = fname;
        /**
         * read AddressBook.json file  and Get object 
         */
        var data = fs.readFileSync('AddressBook.json', 'utf8');
        var json = JSON.parse(data);
        /**
         * pass that object to variable
         */
        var users = json.person;
        users.forEach(function (user) {
            /**
             * verify person name to delete person from file 
             */
            if (fname === user.fname) {

                json.person = users.filter((user) => {
                    /**
                     * filter is used to get perticular key in file
                     */
                    return user.fname !== removeUser;
                });
                /**
                 * after delete person write file or update file
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file 
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8');
                /**
                 * display updated file
                 */
                let detail = JSON.parse(newdata);
                console.log("Person is deleted");
                console.log("Updated file ");
                
                console.log(detail);
                console.log();
                /**
                 * call main menu
                 */
                objAdd.input();


            }
        });


    }
    /**
     * 
     * @param {Edit details of specified user} fname 
     */
    editDetails(fname) {
        /**
         * Give menu to user for change details
         */
        console.log('1) Alter lastname ');
        console.log('2) Alter address ');
        console.log('3) Alter city ');
        console.log('4) Alter state ');
        console.log('5) Alter zip code');
        console.log('6) Alter mobile number');

        userInput.question('Enter your choice\n', (a) => {
            /**
             * pass choice to edit method
             */
            objAdd.edit(a, fname);


        });


    }
    /**
     * 
     * @param {get choice} a 
     * @param {person name} fname 
     */
    edit(a, fname) {
        /**
         * if choice is 1 then change last name
         */
        if (a == 1) {
            /**
             * get last to update or change
             */
            userInput.question('Enter last name to change = ', (lastname) => {
                /**
                 * read file
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    /**
                     * check person name 
                     */
                    if (fname === user.fname) {
                        /**
                         * if choice is match then update last name of person
                         */
                        user.lname = lastname;
                        
                    }
                });
                /**
                 * write update changes in file 
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file to display updated changes
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8');
                /**
                 * get person object in variable
                 */
                let detail = JSON.parse(newdata);
                /**
                 * display updated changes
                 */
                console.log(detail);
                console.log();
                /**
                 * call main menu
                 */
                objAdd.input();


            });
        }
        /**
         * if choice is 2 then change address of person
         */
        if (a == 2) {
            userInput.question('Enter address to change = ', (address) => {
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        /**
                         * verify person name to change address if check output is right then change
                         */
                        user.address = address;
                    }
                });
                /**
                 * write updated change in file
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file to dispaly updated changes 
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                /**
                 * display updated file
                 */
                console.log(detail);
                console.log('Address  is updated');
                console.log();
                /**
                 * call main menu
                 */
                objAdd.input();

            });

        }
        /**
         * if choice is 3 then change city of person
         */
        if (a == 3) {
            userInput.question('Enter city to change = ', (city) => {
                /**
                 * read file to change city of person
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    /**
                     * verify person name if person found then change city of person
                     */
                    if (fname === user.fname) {
                        /**
                         * replace updated city
                         */
                        user.city = city;
                    }
                });
                /**
                 * write updated changes in file
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file to display updated change
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                /**
                 * display file with updated city of person 
                 */
                console.log(detail);
                console.log(' City is updated');
                console.log();
                /**
                 * call main menu
                 */
                objAdd.input();



            });
        }
        /**
         * if choice is 4 then chane the state of person
         */

        if (a == 4) {
            /**
             * get user input to change person state
             */
            userInput.question('Enter state to change =  ', (state) => {
                /**
                 * read file
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        /**
                         * verify person name is found in file if found then modify state of person
                         */
                        user.state = state;
                    }
                });
                /**
                 * write file with updated state
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file to display person details
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                /**
                 * display file  with updated state
                 */
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
            /**
             * Get user input to change zip code of city
             */
            userInput.question('Enter zip code =  ', (zip) => {
                /**
                 * read file to change zip code
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    /**
                     * verify person name to change zip code
                     */
                    if (fname === user.fname) {
                        /**
                         * if person name is match then change zip code
                         */
                        user.zip = zip;
                    }
                });
                /**
                 * write updated zip code in file
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file to display updated changes
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8');
                let detail = JSON.parse(newdata);
                 /**
                 * display updated file with new zip code
                 */
                console.log(detail);
                console.log('Zip-code is updated');
                console.log();
                /**
                 * call main menu
                 */
                objAdd.input();

            });

        }
        /**
         * edit mobile number of person
         */
        if (a == 6) {
            /**
             * Get user input to change mobile number of person
             */
            userInput.question('Enter mobile number to change = ', (number) => {
                /**
                 * read file to change contact number
                 */
                var data = fs.readFileSync('AddressBook.json', 'utf8');
                var json = JSON.parse(data);
                var users = json.person;
                users.forEach(function (user) {
                    if (fname === user.fname) {
                        /**
                         * verify person to change contact number 
                         */
                        user.contactNumber = number;
                    }
                });
                /**
                 * write updated changes in file 
                 */
                fs.writeFileSync('AddressBook.json', JSON.stringify(json));
                /**
                 * read file to display updated changes
                 */
                var newdata = fs.readFileSync('AddressBook.json', 'utf8')
                let detail = JSON.parse(newdata);
                /**
                 * display person data with new contact number
                 */
                console.log(detail);
                console.log(' Mobile_number is updated');
                console.log();
                /**
                 * call main menu
                 */
                objAdd.input();


            });
        }
    }
}
/**
 * create object of AddressBook to call methods 
 */
var objAdd = new AddressBook();
/**
 * Display main menu
 */
objAdd.input();
/**
 * export AddressBook class to access outside 
 */
module.exports = {
    AddressBook
}