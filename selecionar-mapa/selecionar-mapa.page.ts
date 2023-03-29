import { Component } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
selector: 'app-selecionar-mapa',
templateUrl: './selecionar-mapa.page.html',
styleUrls: ['./selecionar-mapa.page.scss'],
})
export class SelecionarMapaPage {

constructor(private camera: CameraService) {}

async startScan() {
  this.camera.startScan()
}

ionViewWillLeave(){
  this.camera.stopScan()
}

}