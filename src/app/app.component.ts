import { Component, HostListener } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  todoList: Todo[] = [];

  mobile: Boolean = false;

  public innerWidth: any;
  public innerHeight: any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.innerHeight >= this.innerWidth){
      this.mobile = true;
    }
  }

  setCheck(event: any) {
    this.todoList[event.source.id].checked = event.checked;
  }

  countNotChecked() {
    return this.todoList.filter(todo => !todo.checked).length;
  }

  keyFunc(event: any) {
    if (event.key === "Enter") {
      let text = event.target.value
      if (text.length > 0) {
        this.todoList.push(this.newTodo(this.todoList.length, event.target.value, false));
      }
    }
  }

  newTodo(id: number, todo: string, checked: boolean) {
    return { id: id, todo: todo, checked: checked }
  }

  isTodoListNotEmpty() {
    return this.todoList.length !== 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.innerHeight >= this.innerWidth){
      this.mobile = true;
      return
    }

    this.mobile = false;
    
  }

}
