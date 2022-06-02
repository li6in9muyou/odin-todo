import { Component, OnInit } from '@angular/core';
import { remove } from 'lodash';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <!--    -->
    <h1>{{ this.title }}</h1>
    <ul>
      <li *ngFor="let todo of todos">
        <span>
          <button (click)="removeTodo(todo)">remove</button>
        </span>
        <span>{{ todo }}</span>
      </li>
    </ul>
    <form (ngSubmit)="addTodo()">
      <input type="text" [(ngModel)]="todoText" />
      <input type="submit" value="Add Todo" />
    </form>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'odin-todo';
  todos: string[] = [];
  todoText = '';

  constructor(private titleService: Title) {}

  addTodo() {
    this.todos.push(this.todoText);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoText = '';
  }

  removeTodo(todo: string) {
    remove(this.todos, (t) => t === todo);
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.todos = JSON.parse(localStorage.getItem('todos') ?? '[]');
  }
}
