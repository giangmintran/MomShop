import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'src/directive/modal.directive';

@Component({
  selector: 'app-user-vote',
  templateUrl: './app-user-vote.component.html',
  styleUrls: ['./app-user-vote.component.scss']
})
export class AppUserVoteComponent {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  active: boolean = false;
  saving: boolean = false;
  show() {
    this.modal.show();
  }
  close(){
  this.modal.hide();
  }
  save(){
    
  }
  changeColorIconStar(number?) {
    // this.input.pointEvaluate = number;
    // if (number < 3) {
    //     this.evaluateVisiable = true;
    // }
    // else this.evaluateVisiable = false;
     var star = document.getElementsByClassName('icon-vote');
    for (var i = 0; i < star.length; i++) {
        star[i].classList.remove('active');
        if (i < number) {
            star[i].classList.add('active');
        }
    };
}
}
