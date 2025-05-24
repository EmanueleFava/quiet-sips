import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-avatar-profile',
  standalone: false,
  templateUrl: './avatar-profile.component.html',
  styleUrl: './avatar-profile.component.scss',
})
export class AvatarProfileComponent {
  @Input() user: User | null = null;
}
