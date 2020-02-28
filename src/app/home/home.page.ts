import { Component, OnInit } from '@angular/core';
import { IDiscoteca } from '../share/interfaces';
import { DiscosdbService } from '../core/discosdb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public discotecas: IDiscoteca[];

  constructor(private discodbService: DiscosdbService, private route:
    Router) { }
  ngOnInit(): void {
    this.retrieveValues();
    
  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.discotecas !== undefined) {
      this.discotecas.splice(0);
    }
    this.retrieveValues();
  }

  retrieveValues(){
    this.discodbService.read_discos().subscribe(
      (data: IDiscoteca[]) => this.discotecas = data
    );
  }

  discotecaTapped(discoteca) {
    this.route.navigate(['details', discoteca._id]);
  }
}