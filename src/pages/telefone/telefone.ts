import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TelefoneService } from '../../service/telefone.service';
import { Telefone } from '../../model/telefone';


@IonicPage()
@Component({
  selector: 'page-telefone',
  templateUrl: 'telefone.html',
})
export class TelefonePage {

  telefonesPage: Telefone[] = [];
  telefones : Telefone[];
  page : number = 0;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public service : TelefoneService, 
              public loading: LoadingController) {
  }

ionViewDidLoad(){
  this.getTelefones();
}
  getTelefones() {
    this.service.getTelefone()
    .subscribe( response => {
        this.telefones = response;
        this.addPage();
    });
  }

  addPage(){
    for (var i = 0; i < 10; i++){
      this.telefonesPage.push(this.telefones[this.page]);
      this.page++;
    }
    console.log(this.telefonesPage);
  }

  doRefresh(refresher) {
    
    this.telefonesPage = [];

    setTimeout(() => {
      this.getTelefones();
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    

    setTimeout(() => {

      this.addPage();
      infiniteScroll.complete();
    }, 500);
  }

}
