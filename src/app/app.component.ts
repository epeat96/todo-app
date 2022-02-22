import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { Todo, TodoContainer } from './interface';

const DARK_BACKGROUND_COLOR: string = '#181824';
const CLEAR_BACKGROUND_COLOR: string = '#FAFAFA';
const DARK_BACKGROUND_DESKTOP_IMAGE: string = '../assets/images/bg-desktop-dark.jpg';
const CLEAR_BACKGROUND_DESKTOP_IMAGE: string = '../assets/images/bg-desktop-light.jpg';
const DARK = true;
const CLEAR = false;
const DESKTOP = true;
const MOBILE = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  todoList: Todo[] = [];
  deviceType: Boolean = DESKTOP;
  colorScheme: Boolean = DARK;

  todoContainer: TodoContainer = {
    backgroundColor: DARK_BACKGROUND_COLOR,
    backgroundImage: DARK_BACKGROUND_DESKTOP_IMAGE
  }

  public innerWidth: any;
  public innerHeight: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.innerHeight >= this.innerWidth) {
      this.deviceType = true;
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

    if (this.innerHeight >= this.innerWidth) {
      this.deviceType = true;
      return
    }

    this.deviceType = false;

  }

  changeColorScheme() {
    this.changeBackgroundColor();
    this.changeBackgroundImage();
  }

  changeBackgroundColor() {

    if (this.todoContainer.backgroundColor !== CLEAR_BACKGROUND_COLOR) {
      this.todoContainer.backgroundColor = CLEAR_BACKGROUND_COLOR;
      return
    }
    this.todoContainer.backgroundColor = DARK_BACKGROUND_COLOR;
  }

  changeBackgroundImage() {

    if (this.todoContainer.backgroundImage !== CLEAR_BACKGROUND_DESKTOP_IMAGE && this.deviceType === DESKTOP) {
      this.todoContainer.backgroundImage = CLEAR_BACKGROUND_DESKTOP_IMAGE;
      return;
    } else {
      this.todoContainer.backgroundImage = DARK_BACKGROUND_DESKTOP_IMAGE;
    }

  }

}
