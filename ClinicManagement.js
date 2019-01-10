/******************************************************************************
 *  Execution       :   1. default node         cmd> node ClinicManagement.js 
 *                      2. if nodemon installed cmd> nodemon ClinicManagement.js
 * 
 *  Purpose         : This module is used to manage a list of Doctors associated with the
 *                    Clinique.This also manages the list of patients who use the clinique.
 *                    The programs allows patients to take appointment with the doctor.
 * 
 *  @description    
 * 
 *  @file           : ClinicManagement.js
 *  @overview       : ClinicManagement module to manage a list of Doctors associated with the
 *                    Clinique.This also manages the list of patients who use the clinique.
 *                    The programs allows patients to take appointment with the doctor.
 *  @module         : ClinicManagement - This is optional if expeclictly its an npm or local package
 *  @author         : Parmeshwar Raut
 *  @version        : 1.0
 *  @since          : 10-01-2019
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
var pReadData = fs.readFileSync('Patient.json', 'utf8');
var dReadData = fs.readFileSync('Doctor.json', 'utf8');


/**
 * class Doctor module holds it's attribute
 */

class Doctor {

    constructor(dId, dName, specialization, time) {
        var t=time;
        this.dId = dId;
        this.dName = dName;
        this.specialization = specialization;
        this.time = t;

    }
    dOperation() {
        console.log("!!!! Doctor Operation !!!!");
        console.log("1) Add doctor ");
        console.log("2) List of Doctor ");
        console.log("3) Availability of doctor");
        userInput.question("Enter your choice = ", (dChoice) => {
            objDoctor.doctorOperation(dChoice);
        });

    }
    doctorOperation(dChoice) {
        /**
         * if choice is then get doctor data from user input
         */
        if (dChoice == 1) {
            userInput.question("Enter Doctor id = ", (dId) => {
                userInput.question("Enter Doctor name = ", (dName) => {
                    userInput.question("Enter specialization = ", (specialization) => {
                        userInput.question("Enter availability time = ", (time) => {
                            
                                var doctorData = new Doctor(dId, dName, specialization, time);
                                console.log(doctorData.dId);
                                
                            /**
                             * read Doctor.json file to write data  
                             */
                            var dReadData = fs.readFileSync('./Doctor.json', 'utf8');
                            var detail = JSON.parse(dReadData);
                            /**
                             * push doctor data  
                             */
                            detail.Doctor.push(doctorData);
                            /**
                             * write doctor data in Doctor.json file
                             */
                            fs.writeFileSync('Doctor.json', JSON.stringify(detail));
                            var dReadData = fs.readFileSync('Doctor.json', 'utf8');
                            var detail = JSON.parse(dReadData);
                            console.log(detail);
                            
                            console.log("Successfully data write");
                            objClinic.input();

                        });
                    });
                });
            });
        }
        else if (dChoice == 2) {
            /**
             * read Doctor.json file to display list doctors  
             */
            var dReadData = fs.readFileSync('Doctor.json', 'utf8');
            var detail = JSON.parse(dReadData);
            console.log("List of Doctors");
            console.log(detail);
            objClinic.input();
        }
        else if (dChoice == 3) {
            userInput.close();
        }
        else {
            console.log("Enter proper choice");
            objDoctor.dOperation();

        }
    }
}

/**
 * class Patient module holds it's attribute 
 */
class Patient {
    constructor(pId, pName, pMobile_Number, pAge) {
        this.pId = pId;
        this.pName = pName;
        this.pMobile_Number = pMobile_Number;
        this.pAge = pAge;

    }
    pOperation() {
        console.log("!!!! Patient Operation !!!! ");
        console.log("1) Add patient ");
        console.log("2) Take Appointment  ");
        console.log("3) Search doctor by Specialization ");
        console.log("4) Search doctor by Availabilty time ");
        console.log("5) Display patient list");
        console.log("6) Exit");
        userInput.question("Enter your choice = ", (pChoice) => {
            objPatient.patientOperation(pChoice);
        });

    }
    patientOperation(pChoice) {
        if (pChoice == 1) {
            userInput.question("Enter patient id = ", (pId) => {
                userInput.question("Enter patient name = ", (pName) => {
                    userInput.question("Enter contact number = ", (pMobile_Number) => {
                        userInput.question("Enter age of patient = ", (pAge) => {
                            var patientData = new Patient(pId, pName, pMobile_Number, pAge);
                            /**
                             * read patien.json file to write data  
                             */
                            var pReadData = fs.readFileSync('Patient.json', 'utf8');
                            var detail = JSON.parse(pReadData);
                            /**
                             * push doctor data  
                             */
                            detail.Patients.push(patientData);
                            /**
                             * write doctor data in Doctor.json file
                             */
                            fs.writeFileSync('Patient.json', JSON.stringify(detail));
                            console.log("Successfully data write");
                            objClinic.input();
                        });
                    });
                });
            });

        }
        else if (pChoice == 2) {
            userInput.question("Enter doctor name = ", (dName) => {
                userInput.question("Enter patient name = ", (pName) => {
                    userInput.question("Enter age of patient = ", (pAge) => {
                        userInput.question("Enter appointment time = ", (time) => {
                            objClinic.appointment(dName, pName, pAge, time);
                        });
                    });
                });
            });

        }
        else if (pChoice == 3) {
            var count = 0;
            userInput.question("Enter doctor speciality = ", (specialization) => {
                var dReadData = fs.readFileSync('Doctor.json', 'utf8');
                var detail = JSON.parse(dReadData);
                var d = detail.Doctor;
                d.forEach(function (doct) {
                    if (specialization == doct.specialization) {
                        console.log(" Available Doctors are ");
                        console.log(doct);
                        console.log();
                        count++;
                        objClinic.input();



                    }

                });
                if (count == 0) {
                    console.log("Enter proper input");

                }

            });
        }
        else if (pChoice == 4) {
            var count = 0;
            userInput.question("Enter time to see avilability of doctor = ", (t) => {
                var dReadData = fs.readFileSync('Doctor.json', 'utf8');
                var detail = JSON.parse(dReadData);
                var d = detail.Doctor;
                d.forEach(function (doct) {
                    if (t == doct.time) {
                        console.log("Availability time of doctor ");
                        console.log("You can take appointment of below doctors");
                        console.log(doct);
                        count++;
                        objClinic.input();

                    }
                });
                if (count == 0) {
                    console.log("Enter proper time ");
                    objPatient.pOperation();

                }
            });
        }
        else if (pChoice == 5) {
            var pReadData = fs.readFileSync('Patient.json', 'utf8');
            var detail = JSON.parse(pReadData);
            console.log("List of Patient");
            console.log(detail);
            objClinic.input();

        }
        else if (pChoice == 6) {
            userInput.close();

        }
        else {
            console.log("Enter proper choice");
            objPatient.pOperation();

        }

    }



}
class Appointment{
    constructor(dName, pName, pAge, time){
        this.dName=dName;
        this.pName=pName;
        this.pAge=pAge;
        this.time=time

    }
}


/**
 * class ClinicManage module defines all operation of class module Patient AND Doctor
 */

class ClinicManage {
    input() {
        console.log("!!!! Clinic Management !!!!");
        console.log("1) Doctor Operation ");
        console.log("2) Patient Operation ");
        console.log("3) Exit ");

        userInput.question("Enter your choice = ", (ch) => {
           objClinic.getChoice(ch);

        });
    }
    getChoice(ch) {
        if (ch == 1) {
            objDoctor.dOperation();
        }
        else if (ch == 2) {
            objPatient.pOperation();
        }
        else {
            userInput.close();
        }
    }
    appointment(dName, pName, pAge, time) {
        var found = 0;
        var dReadData = fs.readFileSync('Doctor.json', 'utf8');
        var json = JSON.parse(dReadData);
        var users = json.Doctor;
        users.forEach(function (user) {
            if (dName == user.dName && time == user.time) {
               objClinic.addAppointment(dName, pName, pAge,time);
                found++;
                objClinic.input();

            }




        });
        if (found === 0) {
            console.log('please enter proper information');
            console.log();
            objPatient.pOperation();
        }



    }
    addAppointment(dName, pName, pAge, time) {
        var count = 0;
        var appointmentData = fs.readFileSync("Appointment.json", 'utf8');
        var json = JSON.parse(appointmentData);
        var users = json.Appointment;
        users.forEach(function (user) {
            if (dName == user.dName) {
                count++;

            }
            else {
                count = 0;
            }

        });

        if (count < 5) {
            var appointmentData=fs.readFileSync("Appointment.json",'utf8');
            var appoint = new Appointment(dName, pName, pAge, time)
            let appinfo = JSON.parse(appointmentData);
            appinfo.Appointment.push(appoint);
            fs.writeFileSync('Appointment.json', JSON.stringify(appinfo));

            console.log(" Your appointment is confim");

            console.log(appinfo);
            objClinic.input();
        }
        else {
            console.log("Doctor's appointment list is full ");
            //objClinic.input();

        }
    }
}
var objPatient = new Patient();
var objDoctor = new Doctor();
var objClinic = new ClinicManage();
var objAppointment=new Appointment();
objClinic.input();
module.exports={
    
    ClinicManage
  
}
module.exports={
    Doctor
}
module.exports = {

    Patient

}
module.exports = {

    Appointment

}