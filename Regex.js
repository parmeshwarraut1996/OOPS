/******************************************************************************
 *  Execution       :   1. default node         cmd> node Regex.js 
 *                      2. if nodemon installed cmd> nodemon Regex.js
 * 
 *  Purpose         :   Read in the following message: Hello <<name>>, We have your full name as<<fullname>>
 *                      in our system. your contact number is 91­xxxxxxxxxx.
 * 
 *  @description    
 * 
 *  @file           : Regex.js
 *  @overview       : Regex module to read in the following message: Hello <<name>>, We have your full name as<<fullname>>
 *                    in our system.your contact number is 91­xxxxxxxxxx.
 *                      
 *  @module         : Regex -This is optional if expeclictly its an npm or local package
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
var message = "Hello <<name>>, We have your full name as <<full name>> in our system.your contact number is 91­xxxxxxxxxx.Please,let us know in case of any clarification Thank you BridgeLabz 01/01/2016.";
var pattern1 = "<<name>>";
var pattern2 = "<<full name>>";
var pattern3 = "xxxxxxxxxx";
var pattern4 = "01/01/2016";

userInput.question("Enter name = ", (name) => {                            //Get name of user from user input 
    userInput.question("Enter full name = ", (fullName) => {               //Get full name of user from user input
        userInput.question("Enter mobile number = ", (mobileNumber) => {   //Get mobile number from user
            compare(name, fullName, mobileNumber);                        // pass user input to comapre() for matching pattern  
            userInput.close();
        });
    });
});

function date() {
    var d = new Date;
    var date = d.getDate();            //Get current date 
    var month = d.getMonth() + 1;     //Get current month 
    var year = d.getFullYear();      //Get current year 

    var day = date + "/" + month + "/" + year;  // print date in dd/mm/yyyy format
    return day;
}


function compare(name, fullName, mobileNumber) {
    var day1 = date();
/**
 * validation of user input
 */
    if (name.match(/^[a-zA-z\s]/) && fullName.match(/^[A-Za-z]+$/), mobileNumber.match(/[789]{1}[0-9]{9}/)) {
/**
 *  replace name,full name, Mobile#, and Date with proper value.
 */
        message = message.replace(pattern1, name);
        message = message.replace(pattern2, fullName);
        message = message.replace(pattern3, mobileNumber);
        message = message.replace(pattern4, day1);
        console.log(message);   //display message to user

    }
    else{
    console.log("Enter valid data");
    
    }
}
