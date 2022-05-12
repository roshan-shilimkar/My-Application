import { Component, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { GeneralFunctionsManager } from 'src/providers/generalFunctionsManager';
import { LoginData } from 'src/interfaces/WebApiSettings';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('pageSlider') pageSlider: IonSlides;
  @ViewChild('pageSlider1') pageSlider1: IonSlides;
  logindataarr: Array<LoginData> = [];
  otpgenerated: boolean = false;
  MobileNo: string = "";
  OTP: string = "";
  emailid: string = "";
  showotp = false;
  type = 'password';
  LoginDet: LoginData;
  constructor(public globalfunc: GeneralFunctionsManager, private sqlite: SQLite, public navctrl: NavController) {

  }

  ionViewWillEnter() {
    // Set lockSwipeToNext and lockSwipeToPrev = true so that user can't slide the slider.
    this.pageSlider.lockSwipeToNext(true);
    this.pageSlider.lockSwipeToPrev(true);
    // To auto play the slides. 
    this.pageSlider1.isBeginning().then(a => {
      this.pageSlider1.startAutoplay();
    })
  }

  showPassword() {
    // To Show OTP when click on eye button.
    this.showotp = !this.showotp;
    if (this.showotp) {
      this.type = 'text';
    }
    else {
      this.type = 'password';
    }
  }

  submit() {
    // check that mobile number input box is blank and not only contain space( ).
    if (this.MobileNo.trim() == "" || this.MobileNo == undefined) {
      this.globalfunc.presenterrortoast("Please Enter the Mobile Number.");
    }
    // check that user entered valid mobile number or not.
    else if ((this.MobileNo.trim().length < 10) || (parseInt(this.MobileNo)).toString().length < 10) {
      this.globalfunc.presenterrortoast("Please Enter the Valid Mobile Number.");
    }
    // check that OTP input box is blank and not only contain space( ).
    else if (this.otpgenerated == true && this.OTP.trim() == "") {
      this.globalfunc.presenterrortoast("Please Enter OTP.");
    }
    // check that user entered valid OTP or not.
    else if (this.otpgenerated == true && this.OTP.trim().length < 6 == true) {
      this.globalfunc.presenterrortoast("Please Enter valide OTP.");
    }
    else {
      // if otpgenerated = true that mean user get the otp and he/ she want to varify it.
      if (this.otpgenerated == true) {
        this.checkotp();
      }
      // if otpgenerated = false that mean user want otp to login.
      else {
        this.GetMobOtp()
      }
    }
  }

  GetMobOtp() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        // create table to save user data in sqlLite.
        db.executeSql('CREATE TABLE Logindetails(MobileNo VARCHAR(10), MobileOTP VARCHAR(6), EmailId VARCHAR(30))', [])
          .then(() => {
            // create table to save user data in sqlLite.
            this.checkmobileNumber();
          }).catch(e => {
            // this error come when table is already created and user try to re-create it.
            if (e.message == "sqlite3_prepare_v2 failure: table Logindetails already exists" && e.code == 5) {
              this.checkmobileNumber();
            }
            else {
              this.globalfunc.presenterrortoast(JSON.stringify(e));
            }
            this.globalfunc.presenterrortoast(JSON.stringify(e));
          });
      }).catch(e => this.globalfunc.presenterrortoast(JSON.stringify(e)));
  }




  checkmobileNumber() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        //check that entered mobile number is not saved in database.
        db.executeSql('SELECT * FROM Logindetails WHERE MobileNo=?', [this.MobileNo])
          .then(DATA => {
            //DATA.rows.length is 1 means mobile number is registred else mobile number is not registred.
            if (DATA.rows.length == 1) {
              this.globalfunc.presentToast("Mobile Number is already Registred with Us.");
            }
            else {
              this.insertMobAOtp();
            }
          }).catch(e => this.globalfunc.presenterrortoast(e));
      }).catch(e => this.globalfunc.presenterrortoast(e));
  }

  insertMobAOtp() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        // this code is to generate random OTP code.
        let otp: string = (Math.floor(100000 + Math.random() * 900000)).toString();
        // this code is to save OTP in sqlLite.
        db.executeSql('INSERT INTO Logindetails (MobileNo, MobileOTP, EmailId) VALUES(?,?,?)', [this.MobileNo, otp, ""])
          .then(() => {
            this.otpgenerated = true;
            this.globalfunc.presentToast("OTP for login in My Application is " + otp + ".");
            // this code is to auto fill OTP input . we can use third party service to get the OTP from Message and message reader to auto fill OTP.
            this.OTP = otp;
          }).catch(e => this.globalfunc.presenterrortoast(JSON.stringify(e)));
      }).catch(e => this.globalfunc.presenterrortoast(JSON.stringify(e)));
  }

  checkotp() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      // this code is to verify that OTP that user entered is correct or NOT.
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM Logindetails WHERE MobileNo=? AND MobileOTP=?', [this.MobileNo, this.OTP])
          .then(DATA => {
            // DATA.rows.length == 1 mean user entered correct OTP.
            if (DATA.rows.length == 1) {
              this.globalfunc.presentToast("Mobile Number Verification completed.");
              this.pageSlider.lockSwipeToNext(false);
              this.pageSlider.slideNext();
              this.pageSlider.lockSwipeToNext(true);
            }
            // DATA.rows.length != 1 mean user entered incorrect OTP.
            else {
              this.globalfunc.presenterrortoast("Mobile Verification Failed.");
            }
          }).catch(e => this.globalfunc.presenterrortoast(e));
      }).catch(e => this.globalfunc.presenterrortoast(e));
  }


  subemail() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE Logindetails SET EmailId=?  WHERE MobileNo=? AND MobileOTP=?', [this.emailid, this.MobileNo, this.OTP])
          .then(DATA => {
            this.globalfunc.presenterrortoast("Email ID Inserted.");
            this.navctrl.navigateForward(['/home']);
            // To save mobile number and email id in global variable.
            this.globalfunc.mobileno = this.MobileNo;
            this.globalfunc.emailid = this.emailid;
          }).catch(e => this.globalfunc.presenterrortoast(e));
      }).catch(e => this.globalfunc.presenterrortoast(e));
  }


  checkemailid() {
    // check that email id box is blank and not only contain space( ).
    if (this.emailid.trim() == "" || this.emailid == undefined) {
      this.globalfunc.presenterrortoast("Please enter the Email ID.");
    }
    // check that user entered valid email id or not.
    else if ((this.emailid.includes("@") == false && (this.emailid.includes("gmail.com") == false || this.emailid.includes("yahoo.com") == false || this.emailid.includes("outlook.com") == false)) == true) {
      this.globalfunc.presenterrortoast("Please enter the valid Email ID.");
    }
    else {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          // check that entered email id is not registred 
          db.executeSql('SELECT * FROM Logindetails WHERE EmailId=?', [this.emailid])
            .then(DATA => {
              // DATA.rows.length == 1 mean entered email id is already registred 
              if (DATA.rows.length == 1) {
                this.globalfunc.presentToast("This Email Id is already Registred with Us.");
              }
              // DATA.rows.length != 1 mean entered email id is not registred 
              else {
                this.subemail();
              }
            }).catch(e => this.globalfunc.presenterrortoast(e));
        }).catch(e => this.globalfunc.presenterrortoast(e));
    }
  }
}
