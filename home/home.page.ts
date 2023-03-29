import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CameraService } from '../services/camera.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  public list_is_open = false

  public listamapas = this.database.arraymapas

  public image_path =  '' // armazena local do arquivo da imagem

  // opções para dar zoom a imagem no slide
  sliderOpt = {
    zoom: {
      maxRatio: 3.5,
    }
  } 
  
  constructor(
    private camera : CameraService,
    private database : DatabaseService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    var id: any = String(this.route.snapshot.paramMap.get('id'))
    this.image_path = `assets/map-shopping/entry-${id}/entry${id}-inicio-${id}.png`
  }

  routeSelect(loja: string){
    // coleta o id da pagina e monstra a imagem da rota até o setor

    var id: any = String(this.route.snapshot.paramMap.get('id'))
    this.image_path = `assets/map-shopping/entry-${id}/entry${id}-${loja}.png`

    this.list_is_open = false
  }

  checar_lista(){
    if (this.list_is_open){
      this.list_is_open = false
    }
    else{
      this.list_is_open = true
    }
  }

  async startScanner() {
    this.camera.startScan()
  }

  pesquisar_lojas(event: any){
    const resul1 = event.target.value.toLowerCase()
  
    if (resul1 != ''){
      this.listamapas = this.listamapas.filter(item => item.nomeloja.toLowerCase().indexOf(resul1) > -1)
    }
  
    else {
      this.listamapas = this.database.arraymapas
    }
  
  }
 
  ionViewWillLeave() { 
    this.camera.stopScan()
  }
}
