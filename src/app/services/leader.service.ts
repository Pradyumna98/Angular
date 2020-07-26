import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from  '../shared/leaders'


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getleaders(): leader[] {
    return LEADERS;
  }

  getleader(id: string): leader {
    return LEADERS.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedleader(): leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }
  
}

