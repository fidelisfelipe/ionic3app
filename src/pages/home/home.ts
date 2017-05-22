import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	title: string;
	constructor(public navCtrl: NavController, public user:User, public alertCtrl: AlertController, public auth:Auth) {
		console.log(user);
		this.title='IonicApp';
    }
	isAuth() {
		 return this.auth.isAuthenticated();
	  }
	notAuth() {
		return !this.auth.isAuthenticated();
	}
	save() {
		this.user.save();
		
		let alert = this.alertCtrl.create({
	      title:'Update Complete!', 
	      buttons:['OK']
	   });
	   alert.present();
	}
}
