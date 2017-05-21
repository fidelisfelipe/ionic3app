import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  btnSubmit: Object = {title:''};
  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';

constructor(public navCtrl: NavController, public auth:Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {}

  ionViewDidLoad() {
    
    this.btnSubmit = {title: "Sign In"};
    console.log('ionViewDidLoad LoginPage');
  }
  
  goHome(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage);
  }
  doLogin() {
	    if(this.showLogin) {
	      console.log('process login');

	      if(this.email === '' || this.password === '') {
	        let alert = this.alertCtrl.create({
	          title:'Register Error', 
	          subTitle:'All fields are rquired',
	          buttons:['OK']
	        });
	        alert.present();
	        return;
	      }     

	      let loader = this.loadingCtrl.create({
	        content: "Logging in..."
	      });
	      loader.present();
	      
	      this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
	        console.log('ok i guess?');
	        loader.dismissAll();
	        this.navCtrl.setRoot(HomePage);        
	      }, (err) => {
	        loader.dismissAll();
	        console.log(err.message);

	        let errors = '';
	        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
	        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

	        let alert = this.alertCtrl.create({
	          title:'Login Error', 
	          subTitle:errors,
	          buttons:['OK']
	        });
	        alert.present();
	      });
	    } else {
	      this.showLogin = true;
	    }
	  }

	  doRegister() {
	    if(!this.showLogin) {
	      console.log('process register');

	      /*
	      do our own initial validation
	      */
	      if(this.name === '' || this.email === '' || this.password === '') {
	        let alert = this.alertCtrl.create({
	          title:'Register Error', 
	          subTitle:'All fields are rquired',
	          buttons:['OK']
	        });
	        alert.present();
	        return;
	      }

	      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
	      console.log(details);
	      
	      let loader = this.loadingCtrl.create({
	        content: "Registering your account..."
	      });
	      loader.present();

	      this.auth.signup(details).then(() => {
	        console.log('ok signup');
	        this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
	          loader.dismissAll();
	          this.navCtrl.setRoot(HomePage);
	        });

	      }, (err:IDetailedError<string[]>) => {
	        loader.dismissAll();
	        let errors = '';
	        for(let e of err.details) {
	          console.log(e);
	          if(e === 'required_email') errors += 'Email is required.<br/>';
	          if(e === 'required_password') errors += 'Password is required.<br/>';
	          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
	          //don't need to worry about conflict_username
	          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
	        }
	        let alert = this.alertCtrl.create({
	          title:'Register Error', 
	          subTitle:errors,
	          buttons:['OK']
	        });
	        alert.present();
	      });
	     
	    } else {
	      this.showLogin = false;
	    }
	  }

	}