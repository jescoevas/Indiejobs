import { Component, OnInit } from '@angular/core';
import { ReseñaService } from 'src/app/services/reseña.service';
import { Reseña } from 'src/app/models/reseña';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ultimas-resenas',
  templateUrl: './ultimas-resenas.page.html',
  styleUrls: ['./ultimas-resenas.page.scss'],
})
export class UltimasResenasPage implements OnInit {

  resenas:Reseña[] = []

  constructor(private resenaService:ReseñaService, private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({});
    await loading.present();
    this.resenas = await this.resenaService.getUltimasResenas()
    await loading.dismiss()
  }

}
