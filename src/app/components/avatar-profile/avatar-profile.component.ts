import { Component, Inject, Input } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-avatar-profile',
  standalone: false,
  templateUrl: './avatar-profile.component.html',
  styleUrl: './avatar-profile.component.scss',
})
export class AvatarProfileComponent {
  @Input() user: User | null = null;

  constructor(@Inject(UserService) private userService: UserService) {}

  showAvatarModal = false;
  showUsernameModal = false;

  openAvatarModal(): void {
    this.showAvatarModal = true;
  }

  closeAvatarModal(): void {
    this.showAvatarModal = false;
  }

  openUsernameModal(): void {
    this.showUsernameModal = true;
  }

  closeUsernameModal(): void {
    this.showUsernameModal = false;
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updateAvatar(e.target.result);
        this.closeAvatarModal();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  updateAvatar(avatarUrl: string): void {
    if (this.user) {
      this.user.imgUrl = avatarUrl;
      if (this.user.id) {
        this.userService
          .updateUser(this.user, this.user.id)
          .subscribe((data) => console.log(data));
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    }
  }

  updateUserName(newName: string): void {
    if (this.user) {
      this.user.username = newName;
      if (this.user.id) {
        this.userService
          .updateUser(this.user, this.user.id)
          .subscribe((data) => console.log(data));
        localStorage.setItem('user', JSON.stringify(this.user));
      }

      this.closeUsernameModal();
    }
  }
}
