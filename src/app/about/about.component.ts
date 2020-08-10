import { Component, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';




@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  LEADERS: leader[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {

    this.leaderService.getleaders()
      .subscribe(leaders => this.LEADERS = leaders);

  }

}


