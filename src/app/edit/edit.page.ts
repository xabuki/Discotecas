import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscosdbService } from '../core/discosdb.service';
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

  discoForm: FormGroup;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discodbService: DiscosdbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params._id;

    this.discoForm = new FormGroup({
      name: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });

    this.discodbService.read_discosById(this.id)
      .subscribe(
        (data: any) => this.displayDiscoteca(data),
      );
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
            this.UpdateRecord();
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

  UpdateRecord() {
    let record = this.discoForm.value as (IDiscoteca);
    this.discodbService.update_discos(record, this.id).subscribe();
  }

  displayDiscoteca(data: any){
    this.discoteca = data.result;
    this.discoForm.get('name').setValue(this.discoteca.name);
    this.discoForm.get('cover').setValue(this.discoteca.cover);
    this.discoForm.get('description').setValue(this.discoteca.description);
  }



}
