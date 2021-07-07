import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '@map/models';

@Component({
  selector: 'app-user-search-input-view',
  templateUrl: './user-search-input-view.component.html',
  styleUrls: ['./user-search-input-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchInputViewComponent implements OnInit {
  @Input() searchResults?: User[] | null;
  @Input() showIcon = true;
  @Input() placeholder = 'Search for user';
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
