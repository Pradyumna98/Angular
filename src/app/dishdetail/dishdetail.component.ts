import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  @ViewChild('cform') commentFormDirective;
  commentForm:FormGroup;
  comment:Comment;

  formErrors={
    'author':'',
    'comment':'',
  }
  validatonMessages={
    'author':{
      'required':'Name is required',
      'minlength':'Author name must be 2 character long'
    },
    'comment':{
      'required':'Comment is required'
    }
  }


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder) {
         this.createForm();
     }


     createForm(){
      this.commentForm=this.fb.group({
        author:['',[Validators.required,Validators.minLength(2),Validators]],
        rating:5,
        comment:['',Validators.required]
      });
      this.commentForm.valueChanges.subscribe(data=>this.onValueChanged(data));
      this.onValueChanged();
    }
  
    onValueChanged(data?:any){
      
      if(!this.commentForm) {return;}
      const form =this.commentForm;
      for(const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)){
          this.formErrors[field]='';
          const control=form.get(field);
          
          if(control && control.dirty && !control.valid){
            const messages=this.validatonMessages[field];
  
            for(const key in control.errors){
              console.log(key);
              
              control.errors.hasOwnProperty(key);
              this.formErrors[field]+=messages[key]+' ';
              console.log(messages[key]);
              
            }
          }
        }
      }
    }
  
    onSubmit(){
      this.comment=this.commentForm.value;
      this.comment.date = new Date().toISOString();
      console.log(this.comment);
      this.dish.comments.push(this.comment);
      this.commentFormDirective.resetForm();
      this.commentForm.reset({
        author:'',
        rating:5,
        comment:''
      });
     }


    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }
  
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
  
    goBack(): void {
      this.location.back();
    }

    
}

