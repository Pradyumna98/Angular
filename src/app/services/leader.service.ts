import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from  '../shared/leaders'


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getleaders(): Promise<leader[]> {
    return new Promise(resolve=> {    
      setTimeout(() => resolve(LEADERS), 2000);
  });
}

  getleader(id: string): Promise<leader> {
    return new Promise(resolve=> {    
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
  });
}

  getFeaturedleader(): Promise<leader> {
    return new Promise(resolve=> {    
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
  });
}
  
}

