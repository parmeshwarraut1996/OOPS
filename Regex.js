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
var pattern1="<<name>>";
var pattern2="<<full name>>";
var pattern3="xxxxxxxxxx";
var pattern4="01/01/2016";

userInput.question("Enter name = ",(name)=>{
    userInput.question("Enter full name = ",(fullName)=>{
        userInput.question("Enter mobile number = ",(mobileNumber)=>{
            compare(name,fullName,mobileNumber);    
            userInput.close();        
        });
    });
});

function date(){
    var d=new Date;
    var date=d.getDate();
    var month=d.getMonth()+1;
    var year=d.getFullYear();

    var day=date+"/"+month+"/"+year;
    return day;
}


function compare(name,fullName,mobileNumber){
  var day1=date();
    
    if (name.match(/^[A-Za-z]+$/) && fullName.match(/^[A-Za-z]+$/),mobileNumber.match(/[789]{1}[0-9]{9}/)){
        message=message.replace(pattern1,name);
        message=message.replace(pattern2,fullName);
        message=message.replace(pattern3,mobileNumber);
        message=message.replace(pattern4,day1);
        console.log(message);
        
    }
}
