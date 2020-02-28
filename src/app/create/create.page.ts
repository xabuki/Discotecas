import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscosdbService } from '../core/discosdb.service';
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
  discoForm: FormGroup;
  constructor(
    private router: Router,
    private discodbService: DiscosdbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.discoForm = new FormGroup({
      name: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.CreateRecord();
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

  CreateRecord() {
    let record = this.discoForm.value as (IDiscoteca);
    this.discodbService.create_discos(record).subscribe();
  }

}

