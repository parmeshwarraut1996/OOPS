/******************************************************************************
 *  Execution       :   1. default node         cmd> node Inventory.js 
 *                      2. if nodemon installed cmd> nodemon Inventory.js
 * 
 *  Purpose         : Create a JSON file having Inventory Details for Rice, Pulses and Wheats ith
 *                    properties name, weight, price per kg.
 * 
 *  @description    
 * 
 *  @file           : Inventory.js
 *  @overview       : Inventory module to create a JSON file having Inventory Details for Rice, Pulses and Wheats ith
 *                    properties name, weight, price per kg.
 *  @module         : Inventory - This is optional if expeclictly its an npm or local package
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
 * fs module provides file stream for reading or writing file
 */
var fs = require('fs');
var readData = fs.readFileSync('inventory.json', 'utf8');
/**
 * Give user chioces to enter inventory details grains
 */
console.log("1).Enter details of rice ");
console.log("2).Enter details of wheats ");
console.log("3).Enter details of pulses ");

/**
 * take choice from user
 */

userInput.question("Enter choice = ", (choice) => {
      input(choice);
      
      
});
function input(ch){
    if(ch==1)
    {
        rice();
       
    }
    else if(ch==2)
    {
        wheats();
      
    }
    else if(ch==3)
    {
        pulses();
       
    }
    else{
        console.log("!!!! Enter proper choice !!!! ");
       
            }
}
       
    

function rice() {
    userInput.question("Enter name of rice = ", (name) => {
        userInput.question("Enter wieght of rice = ", (weight) => {
            userInput.question("Enter price per kg = ", (price) => {
                readData = fs.readFileSync("inventory.json", "utf8");
               var inventory = JSON.parse(readData);
                inventory.rice.push({
                    name: name,
                    weight: weight,
                    price: price

                });
                var writeData = fs.writeFileSync("inventory.json", JSON.stringify(inventory));
                console.log("Data write successfully");

            });
        });
  
       
     });
   
}


function wheats() {
    userInput.question("Enter name of wheats = ", (name) => {
        userInput.question("Enter wieght of wheats = ", (weight) => {
            userInput.question("Enter price per kg = ", (price) => {
                readData = fs.readFileSync("inventory.json", "utf8");
                var inventory = JSON.parse(readData);
                inventory.wheats.push({
                    name: name,
                    weight: weight,
                    price: price

                });
                var writeData = fs.writeFileSync("inventory.json", JSON.stringify(inventory));
                console.log("Data write successfully");

            });
        })
        
    });
}


function pulses() {
    userInput.question("Enter name of pulses = ", (name) => {
        userInput.question("Enter wieght of pulses = ", (weight) => {
            userInput.question("Enter price per kg = ", (price) => {
                readData = fs.readFileSync("inventory.json", "utf8");
                var inventory = JSON.parse(readData);
                inventory.pulses.push({
                    name: name,
                    weight: weight,
                    price: price

                    
                });
                var writeData = fs.writeFileSync("inventory.json", JSON.stringify(inventory));
                console.log("Data write successfully");

            });
        });
       
    });
    
}


