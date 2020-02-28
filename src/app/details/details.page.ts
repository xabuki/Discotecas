import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscosdbService } from '../core/discosdb.service';
import { IDiscoteca } from '../share/interfaces';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public id: string;
  public discoteca: IDiscoteca;
  tieneDiscos=false;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discodbService: DiscosdbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params._id;

    this.discodbService.read_discosById(this.id).subscribe(
      (data: any) =>{ 
        this.discoteca = data.result
      this.tieneDiscos=true
      }
    );



  }

  editRecord(discoteca) {
    this.router.navigate(['edit', discoteca._id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.discodbService.delete_discos(this.id).subscribe();
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
}