import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input()
  public label: string;

  @Input()
  public items: Array<string>;

  @Input()
  public disabled: boolean = false;

  @Input()
  public value: string;

  @Output()
  public select: EventEmitter<string> = new EventEmitter();

  public onChange(value: string): void {
    this.select.emit(value);
  }
}
