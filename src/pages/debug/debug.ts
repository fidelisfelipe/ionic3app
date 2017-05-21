import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
/**
 * Generated class for the DebugPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
})
export class DebugPage {
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  this.pages = [
            { title: 'Login', component: LoginPage },
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage },
            { title: 'Debug', component: DebugPage }
          ];
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPage');
  }

}
