import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.btnSubmit = {title: "Sign In"};
    console.log('ionViewDidLoad LoginPage');
  }
  
  itemTapped(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage);
  }

}
