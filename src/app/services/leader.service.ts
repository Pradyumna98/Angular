import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from  '../shared/leaders'


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getleaders(): Promise<leader[]> {
    return Promise.resolve(LEADERS);
  }

  getleader(id: string): Promise<leader> {
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedleader(): Promise<leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
  
}

