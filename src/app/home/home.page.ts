import { Component, OnInit } from '@angular/core';
import { IDiscoteca } from '../share/interfaces';
import {DiscotecaService} from '../share/discoteca.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public discotecas: IDiscoteca[];
 
  constructor(private discotecaService: DiscotecaService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.discotecas !== undefined) {
      this.discotecas.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
   // if (this.discotecaService.empty()) {
      //this.discotecasinit.forEach(discoteca => {
      // this.discotecaService.setItem(discoteca.id, discoteca);
   //   });
    //}
  }
  retrieveValues() {
    // Retrieve values
    this.discotecaService.getDiscotecas().subscribe(
      data => {
        this.discotecas = data
      }
    );
  }
  discotecaTapped(discoteca) {
    this.route.navigate(['details', discoteca.id]);
  }
}
