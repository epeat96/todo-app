import { AfterViewInit, Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { CheckBox, Todo, BackgroundContainer, TodoContainer, Title, InputContainer, TitleContainer } from './interface';

// dark colorscheme configuration

const DARK_BACKGROUND_COLOR: string = '#181824';
const DARK_BACKGROUND_DESKTOP_IMAGE: string = '../assets/images/bg-desktop-dark.jpg';
const DARK_CHECKBOX_BACKGROUND_COLOR: string = '#25273C';
const DARK_BORDER_COLOR: string = '1px solid #37394E';
const DARK_FONT_COLOR: string = '#C8CCE4';

// clear colorscheme configuration

const CLEAR_BACKGROUND_COLOR: string = '#FAFAFA';
const CLEAR_BACKGROUND_DESKTOP_IMAGE: string = '../assets/images/bg-desktop-light.jpg';
const CLEAR_CHECKBOX_BACKGROUND_COLOR: string = '#FFFFFF';
const CLEAR_BORDER_COLOR: string = '1px solid #E7E6EA';
const CLEAR_FONT_COLOR: string = '#4F4E5E';

// desktop layout configurations
const DESKTOP_SIDE_MARGIN: string = '31.25vw';
const DESKTOP_TOP_MARGIN: string = '9.75vh';
const DESKTOP_CHECKBOX_HEIGHT: string = '7.9vh';
const DESKTOP_TITLE_LETTER_SPACING: string = '1.46vw';
const DESKTOP_INPUT_CONTAINER_MARGIN: string = '3vh';
const DESKTOP_TITLE_BOTTOM_MARGIN: string = '6.25vh';

// mobile layour configurations


// control flag values
const DARK: boolean = true;
const CLEAR: boolean = false;
const DESKTOP: boolean = true;
const MOBILE: boolean = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = DARK_BACKGROUND_COLOR;
  }

  title = 'todo-app';
  todoList: Todo[] = [{'id':0,'todo':'Example Task 1', 'checked':false}, {'id':1, 'todo': 'Example Task 2', 'checked':true}];
  deviceType: boolean = DESKTOP;
  colorScheme: boolean = DARK;

  checkbox: CheckBox = {
    backgroundColor: DARK_CHECKBOX_BACKGROUND_COLOR,
    borderColor: DARK_BORDER_COLOR,
    fontColor: DARK_FONT_COLOR,
    height: DESKTOP_CHECKBOX_HEIGHT 
  }

  todoTitle: Title = {
    letterSpacing: DESKTOP_TITLE_LETTER_SPACING
  }

  backgroundContainer: BackgroundContainer = {
    backgroundImage: DARK_BACKGROUND_DESKTOP_IMAGE
  }

  todoContainer: TodoContainer = {
    sideMargin: DESKTOP_SIDE_MARGIN,
    topMargin: DESKTOP_TOP_MARGIN 
  }

  inputContainer: InputContainer = {
    margin : DESKTOP_INPUT_CONTAINER_MARGIN
  }

  titleContainer: TitleContainer = {
    margin:DESKTOP_TITLE_BOTTOM_MARGIN 
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

    this.setDesktopOrMobile();

  }

  setDesktopOrMobile(){
    return "TODO"
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
        event.target.value = '';
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

    this.setDesktopOrMobile();

  }

  changeColorScheme() {

    if (this.colorScheme === DARK) {
      this.colorScheme = CLEAR;
    }
    else {
      this.colorScheme = DARK;
    }

    this.changeBackgroundColor(this.colorScheme);
    this.changeBorderColor(this.colorScheme);
    this.changeFontColor(this.colorScheme);
    this.changeBackgroundImage(this.colorScheme, this.deviceType)

  }

  changeBorderColor(colorScheme: boolean) {
    if (colorScheme === DARK) {
      this.checkbox.borderColor = DARK_BORDER_COLOR;
      return
    }
    this.checkbox.borderColor = CLEAR_BORDER_COLOR;
  }

  changeBackgroundColor(colorScheme: boolean) {
    if (colorScheme === DARK) {
      // this.backgroundContainer.backgroundColor = DARK_BACKGROUND_COLOR;
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = DARK_BACKGROUND_COLOR;
      this.checkbox.backgroundColor = DARK_CHECKBOX_BACKGROUND_COLOR;
      return
    }
    //this.backgroundContainer.backgroundColor = CLEAR_BACKGROUND_COLOR;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = CLEAR_BACKGROUND_COLOR;
    this.checkbox.backgroundColor = CLEAR_CHECKBOX_BACKGROUND_COLOR;

  }
  
  changeFontColor(colorScheme:boolean){

    if( colorScheme === DARK){
      this.checkbox.fontColor = DARK_FONT_COLOR;
      return
    }

    this.checkbox.fontColor = CLEAR_FONT_COLOR;

  }

  changeBackgroundImage(colorScheme: boolean, deviceType: boolean) {

    if (colorScheme === CLEAR && deviceType === DESKTOP) {
      this.backgroundContainer.backgroundImage = CLEAR_BACKGROUND_DESKTOP_IMAGE;
      return;
    } else {
      this.backgroundContainer.backgroundImage = DARK_BACKGROUND_DESKTOP_IMAGE;
    }

  }

  isItRounded(itemId : number ){

    if (itemId === 0){
      return "5px 5px 0 0";
    }
    return "";
  }

}
