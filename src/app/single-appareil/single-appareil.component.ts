import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {
  name : string ='Appareil';
  status : string ='status';

  //ActivatedRoute pour recuperer l'id de la route
  constructor(private appareilService: AppareilService, private route:ActivatedRoute) { }

  ngOnInit() {
    //on recupere id avec params
    const id = this.route.snapshot.params['id'];
//
    this.name = this.appareilService.getAppareilByid(+id).name;
    this.status = this.appareilService.getAppareilByid(+id).status;
  }

}
