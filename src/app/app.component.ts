import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { CheckBox, Todo, TodoContainer } from './interface';

const DARK_BACKGROUND_COLOR: string = '#181824';
const CLEAR_BACKGROUND_COLOR: string = '#FAFAFA';
const DARK_BACKGROUND_DESKTOP_IMAGE: string = '../assets/images/bg-desktop-dark.jpg';
const CLEAR_BACKGROUND_DESKTOP_IMAGE: string = '../assets/images/bg-desktop-light.jpg';
const DARK_CHECKBOX_BACKGROUND_COLOR: string = '#25273C';
const CLEAR_CHECKBOX_BACKGROUND_COLOR: string = '#FFFFFF';

const DARK: boolean = true;
const CLEAR: boolean = false;
const DESKTOP: boolean = true;
const MOBILE: boolean = false;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = DARK_BACKGROUND_COLOR;
  }

  title = 'todo-app';
  todoList: Todo[] = [];
  deviceType: boolean = DESKTOP;
  colorScheme: boolean = DARK;

  checkbox: CheckBox = {
    backgroundColor: DARK_CHECKBOX_BACKGROUND_COLOR
  }

  todoContainer: TodoContainer = {
    backgroundImage: DARK_BACKGROUND_DESKTOP_IMAGE
  }

  public innerWidth: any;
  public innerHeight: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.innerHeight >= this.innerWidth) {
      this.deviceType = MOBILE;
    } else {
      this.deviceType = DESKTOP
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
      this.deviceType = DESKTOP;
      return
    }

    this.deviceType = MOBILE;

  }

  changeColorScheme() {

    if (this.colorScheme === DARK) {
      this.colorScheme = CLEAR;
    }
    else {
      this.colorScheme = DARK;
    }

    this.changeBackgroundColor(this.colorScheme);
    this.changeBackgroundImage(this.colorScheme, this.deviceType)

  }

  changeBackgroundColor(colorScheme: boolean) {
    if (colorScheme === DARK) {
      // this.todoContainer.backgroundColor = DARK_BACKGROUND_COLOR;
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = DARK_BACKGROUND_COLOR;
      this.checkbox.backgroundColor = DARK_CHECKBOX_BACKGROUND_COLOR;
      return
    }
    //this.todoContainer.backgroundColor = CLEAR_BACKGROUND_COLOR;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = CLEAR_BACKGROUND_COLOR;
    this.checkbox.backgroundColor = CLEAR_CHECKBOX_BACKGROUND_COLOR;

  }

  changeBackgroundImage(colorScheme: boolean, deviceType: boolean) {

    if (colorScheme === CLEAR && deviceType === DESKTOP) {
      this.todoContainer.backgroundImage = CLEAR_BACKGROUND_DESKTOP_IMAGE;
      return;
    } else {
      this.todoContainer.backgroundImage = DARK_BACKGROUND_DESKTOP_IMAGE;
    }

  }

}
