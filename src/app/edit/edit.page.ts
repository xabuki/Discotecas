import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscotecadbService } from '../core/discotecadbservice.service';
import {DiscocrudService} from '../core/discocrud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IDiscoteca } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  discoteca: IDiscoteca;
  discotecaForm: FormGroup;
  discoService:DiscocrudService;
  discos: any;
  discoName: string;
  discoCover: string;
  discoDescription: string;
  
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discotecadbService: DiscotecadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
     this.discos =this.discoService.select_Disco(this.id);
    
        
    this.discotecaForm = new FormGroup({
      name: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });

    this.discoService.read_Discos().subscribe(data => {
      data.map(e => {
        if (e.payload.doc.id == this.id) {
            this.discotecaForm.get('name').setValue(e.payload.doc.data()['name']);
            this.discotecaForm.get('cover').setValue(e.payload.doc.data()['cover']);
            this.discotecaForm.get('description').setValue(e.payload.doc.data()['description']);         
        }
      })
    });

  }
  async onSubmit(disco) {
    const toast = await this.toastController.create({
      header: 'Guardar discoteca',
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
    //this.discotecadbService.remove(this.id);
    //this.discoteca = this.discotecaForm.value;
    //let nextKey = this.discoteca.name.trim();
    //this.discoteca.id = nextKey;
    //this.discotecadbService.setItem(nextKey, this.discoteca);
    //console.warn(this.discotecaForm.value);
    
      let record = this.discotecaForm.value;
      this.discoService.update_Disco(this.id,record);
    
      
     
  }
}
