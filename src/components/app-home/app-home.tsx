import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Ape Tools - Image Gorilla</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>



<ion-card >
  <ion-card-header>
    Ape Tools
  </ion-card-header>
  <ion-card-content>
  
  <img src="assets/img/logo.png" class="ape" />
   
    <h2>Don't Go Ape, Go Ape Tools.</h2>
              <p>Get apps done quicker.
              
              Create all the required sizes of Icons and Splashscreens for your app instantly for all major platforms.

              <p>
        <ion-button href="/tools/imagegorilla/">Generate Your Icons &amp; Splashscreens</ion-button>
        </p>
      </p>
  </ion-card-content>
</ion-card>
      
      



        <footer>
          <p>
            a <a href="http://webprofusion.com">webprofusion</a> creation © 2015 - 2018.
      <br /> Check out the code and submit issues on GitHub:
      <i class="fa fa-github fa-3x fa-fw" aria-hidden="true"></i>
            <a href="https://github.com/webprofusion/apetools">https://github.com/webprofusion/apetools</a>
          </p>
        </footer>
      </ion-content>
    ];
  }
}
