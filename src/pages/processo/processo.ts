import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Processo } from '../../model/processo';
import { ProcessoService } from '../../service/processo.service';


@IonicPage()
@Component({
  selector: 'page-processo',
  templateUrl: 'processo.html',
})
export class ProcessoPage {
  
  processosPage : Processo[] = [];
  processos : Processo[];
  page : number = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public service : ProcessoService,
              public loading: LoadingController) {
  }

  ionViewDidLoad() {
    this.getProcessos();
  }
  getProcessos() {
    this.service.getProcesso()
    .subscribe( response => {
      this.processos = response;
      this.addPage();
    });
  }

  addPage(){
    for (var i = 0; i < 5; i++){
      this.processosPage.push(this.processos[this.page]);
      this.page++;
    }
    console.log(this.processosPage);
  }

  doRefresh(refresher) {
    
    this.processosPage = [];

    setTimeout(() => {
      this.getProcessos();
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    

    setTimeout(() => {

      this.addPage();
      infiniteScroll.complete();
    }, 5000);
  }

}
