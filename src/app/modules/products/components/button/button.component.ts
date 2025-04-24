import { Component, EventEmitter, Input, Output } from '@angular/core';
export type Severity = 'primary' | 'info'
export type TypeButton = 'submit' | 'button'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input()
  public labelButton: string = '';
  @Input()
  public severity!: Severity;
  @Output()
  public clicked = new EventEmitter<void>();
  @Input()
  public disabled?: boolean;
  @Input()
  public typeInput?: TypeButton;

  ngOnInit(): void {
    if (this.typeInput === undefined) this.typeInput = 'button'
  }

  onClick() {
    this.clicked.emit();
  }

}
