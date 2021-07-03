import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@map/models';

@Component({
  selector: 'app-user-search-input-view',
  templateUrl: './user-search-input-view.component.html',
  styleUrls: ['./user-search-input-view.component.scss'],
})
export class UserSearchInputViewComponent implements OnInit {
  @Input() searchResults?: User[] | null;
  @Output() search = new EventEmitter<string>();
  @Output() selectUser = new EventEmitter<User>();

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  onSelect(user: User): void {
    this.selectUser.emit(user);
  }
}
