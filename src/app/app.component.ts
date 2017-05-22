import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DebugPage } from '../pages/debug/debug';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;

  pages: Array<{title: string, component: any, hidden: boolean}>;
  
  title: string;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth:Auth) {
    this.initializeApp();
    //title default app
	this.title = 'Ionic APP';
	
	
	
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage, hidden: this.isAuth()},
      { title: 'Home', component: HomePage , hidden: this.notAuth()},
      { title: 'List', component: ListPage , hidden: this.notAuth()},
      { title: 'Debug', component: DebugPage , hidden: this.notAuth() }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      if(this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
	this.auth.logout();
	this.nav.setRoot(LoginPage);
  }
  isAuth() {
	 return this.auth.isAuthenticated();
  }
  notAuth() {
	return !this.auth.isAuthenticated();
  }
}
