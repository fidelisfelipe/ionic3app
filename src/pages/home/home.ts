import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	title: string;
	constructor(public navCtrl: NavController, public user:User, public auth:Auth) {
    console.log(user);
    this.title='IonicApp';
  }
  logout() {
	this.auth.logout();
	this.navCtrl.setRoot(LoginPage);
  }
}
