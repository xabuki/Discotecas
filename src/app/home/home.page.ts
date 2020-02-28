import { Component, OnInit } from '@angular/core';
import { DiscocrudService } from './../core/discocrud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  discos: any;
  discoName: string;
  discoCover: string;
  discoDescription: string;
  constructor(private discocrudService: DiscocrudService , private route:
    Router) { }
  ngOnInit() {
    this.discocrudService.read_Discos().subscribe(data => {
      this.discos = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          cover: e.payload.doc.data()['cover'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(this.discos);
    });
  }

  discotecaTapped(disco) {
    this.route.navigate(['details', disco.id]);
  }

}
