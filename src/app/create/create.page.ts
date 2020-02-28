import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {DiscocrudService} from '../core/discocrud.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IDiscoteca } from '../share/interfaces';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  discoteca: IDiscoteca;
 discotecaForm: FormGroup;
 discos: any;
 discoName: string;
 discoCover: string;
 discoDescription: string;
  constructor(
    private router: Router,
    private discotecaService: DiscocrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.discotecaForm = new FormGroup({
      name: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
  } async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveDiscoteca();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveDiscoteca() {
  //  this.discoteca = this.discotecaForm.value;
   // let nextKey = this.discoteca.name.trim();
   // this.discoteca.id = nextKey;
   // this.discotecadbService.setItem(nextKey, this.discoteca);
   // console.warn(this.discotecaForm.value);
   let record = this.discotecaForm.value;
 this.discotecaService.create_Disco(record) ;
  }
}
