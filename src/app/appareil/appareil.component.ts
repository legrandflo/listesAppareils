import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  //utiliser au depart pour interpolation
  //appareilName = "Machine à laver";

  //creation input pour la variable appareilname
  //defini dans la balise app-appareil:
  //soit directement dedans ex: appareilName="Machine à laver"
  //soit avec variable appareilOne...defini dans app.component.ts
  @Input() appareilName: string;

  //idem avec appareilSatus, defini dans app.component.html/appareil-view.component.html
  //appareilStatus = "éteint"
  @Input() appareilStatus: string;
//creation d'une variable avec input pour la recuperer du app.component.html
  @Input() indexOfAppareil : number;
//recuperation de Id de appareil (appareilId) defini dans appareil-view.component.html
  @Input() appareilId : number;

  constructor(private appareilService : AppareilService) { }

  ngOnInit() {
  }
  getStatus() {
    return this.appareilStatus;
  }
  getColor() {
    if (this.appareilStatus === "allumé") {
      return 'green';
    } else if (this.appareilStatus === "éteint") {
      return 'red';
    }
  }
//2 methodes qui recupere switchOnOne et switchOffOne dans service et indexOfAppareil passé par input
  onSwitchOn(){
    this.appareilService.switchOnOne(this.indexOfAppareil);
  }
  onSwitchOff(){
    this.appareilService.switchOffOne(this.indexOfAppareil);
  }
}
