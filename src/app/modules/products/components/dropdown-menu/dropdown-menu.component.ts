import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  private elementRef = inject(ElementRef);

  @Input() menuItems: { label: string, action: () => void }[] = [];
  @Output() itemSelected = new EventEmitter<string>();

  public isOpen = signal(false);

  public toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  selectItem(item: { label: string, action: () => void }) {
    item.action();
    this.itemSelected.emit(item.label);
    this.isOpen.set(false);
  }
}
