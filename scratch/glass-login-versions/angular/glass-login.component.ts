import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-glass-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LottieComponent],
  templateUrl: './glass-login.component.html',
})
export class GlassLoginComponent {
  logoUrl = 'https://via.placeholder.com/180x60?text=LOGO';
  username = '';
  password = '';
  rememberMe = true;
  showPassword = false;
  darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  lottieOptions: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json',
    loop: true,
    autoplay: true,
  };

  particles = Array.from({ length: 10 }, (_, index) => ({
    left: `${8 + index * 9}%`,
    delay: `${index * 0.7}s`,
    size: `${6 + (index % 4) * 3}px`,
  }));

  @HostBinding('class.dark')
  get isDark() {
    return this.darkMode;
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  login() {
    // Hook your auth service here.
  }
}

