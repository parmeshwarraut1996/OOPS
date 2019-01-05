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
getChoice();
function getChoice() {
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
}
function input(ch) {
    if (ch == 1)           // call to rice() function which gives inventory details of rice
    {
        rice();

    }
    else if (ch == 2)    // call to wheats() function which gives inventory details of wheat
    {
        wheats();

    }
    else if (ch == 3)  // call to pulses() function which gives inventory details of pulses     
    {
        pulses();

    }
    else {
        console.log("!!!! Enter proper choice !!!! ");
        getChoice();
    }
}



function rice() {
    userInput.question("Enter name of rice = ", (name) => {             //take rice name from user
        userInput.question("Enter weight of rice = ", (weight) => {     //take rice weight from user
            userInput.question("Enter price per kg = ", (price) => {    //take price per kg from user
                readData = fs.readFileSync("inventory.json", "utf8");   //read json file 
                var inventory = JSON.parse(readData);                   //parse user data into json object in inventory.json file 
                inventory.rice.push({                                   //push data in inventory.json file which hold by inventory variable
                    name: name,
                    weight: weight,
                    price: price

                });
                var writeData = fs.writeFileSync("inventory.json", JSON.stringify(inventory));//write data in inventory.json file
                console.log("Data write successfully");

            });
        });


    });

}


function wheats() {
    userInput.question("Enter name of wheats = ", (name) => {            //take wheat name from user
        userInput.question("Enter wieght of wheats = ", (weight) => {    //take wheat weight from user
            userInput.question("Enter price per kg = ", (price) => {     //take price per kg from user
                readData = fs.readFileSync("inventory.json", "utf8");    //read json file
                var inventory = JSON.parse(readData);                    //parse user data into json object in inventory.json file 
                inventory.wheats.push({                                  //push data in inventory.json file which hold by inventory variable
                    name: name,
                    weight: weight,
                    price: price

                });
                var writeData = fs.writeFileSync("inventory.json", JSON.stringify(inventory));//write data in inventory.json file
                console.log("Data write successfully");

            });
        })

    });
}


function pulses() {
    userInput.question("Enter name of pulses = ", (name) => {            //take wheat name from user
        userInput.question("Enter wieght of pulses = ", (weight) => {    //take wheat weight from user
            userInput.question("Enter price per kg = ", (price) => {     //take price per kg from user
                readData = fs.readFileSync("inventory.json", "utf8");    //read json file
                var inventory = JSON.parse(readData);                    //parse user data into json object in inventory.json file 
                inventory.pulses.push({                                  //push data in inventory.json file which hold by inventory variable
                    name: name,
                    weight: weight,
                    price: price


                });
                var writeData = fs.writeFileSync("inventory.json", JSON.stringify(inventory));  //write data in inventory.json file
                console.log("Data write successfully");

            });
        });

    });

}


