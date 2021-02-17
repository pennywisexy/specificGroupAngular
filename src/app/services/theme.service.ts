import { Injectable } from '@angular/core';

export const darkTheme = {
  '--base-bg-color': '#121212',
  '--base-text-color': '#ffffffde',
  '--base-border-color': '#ccc',
  '--base-invalid-color': 'red',
  '--base-valid-color': 'greenyellow',
  '--base-bg-notification': 'rgb(6, 104, 42)',
  '--btn-bg-color': '#215a93',
  '--btn-text-color': '#a1bcd6',
  '--contact-text-color': '#215A93',
  '--dropdown-bg-color': '#121212',
  '--base-bg-footer': '#121212',
  '--base-bg-header': '#215a93',
  '--header-text-color': '#a1bcd6',
  '--base-bg-hover': '#215a93',
  '--base-text-hover': '#ccc',
  '--white-bg-color': 'black',
  '--base-shadow-color': '#000000',
  '--base-devider-color': 'white',
  '--base-opasity': '.7'
};

export const lightTheme = {
  '--base-bg-color': '#f6fafd',
  '--base-text-color': '#000',
  '--base-border-color': '#ccc',
  '--base-invalid-color': 'red',
  '--base-valid-color': 'greenyellow',
  '--base-bg-notification': 'rgb(6, 104, 42)',
  '--btn-bg-color': '#215a93',
  '--btn-text-color': '#a1bcd6',
  '--contact-text-color': '#215A93',
  '--dropdown-bg-color': '#f9f9f9',
  '--base-bg-footer': '#f6fafd',
  '--base-bg-header': '#215a93',
  '--header-text-color': '#a1bcd6',
  '--base-bg-hover': '#215a93',
  '--base-text-hover': '#ccc',
  '--white-bg-color': 'white',
  '--base-shadow-color': '#000000',
  '--base-devider-color': '#e7e7e7',
  '--base-opasity': '1'
};

@Injectable({providedIn: 'root'})
export class ThemeService {
  toggleDark(): void {
    this.setTheme(darkTheme);
  }

  toggleLight(): void {
    this.setTheme(lightTheme);
  }
  setTheme(theme): void {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`${k}`, theme[k])
    );
  }
}