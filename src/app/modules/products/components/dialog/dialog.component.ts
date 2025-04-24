import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input()
  public message: string = ''

  @Input()
  public visible?: boolean;

  @Output()
  public onAccept = new EventEmitter<void>();

  @Output()
  public onReject = new EventEmitter<void>();


  public accept(): void {
    this.onAccept.emit()
  }

  public reject(): void {
    this.onReject.emit()

  }

}
