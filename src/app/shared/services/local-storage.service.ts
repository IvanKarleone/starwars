import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorageService implements Storage {
  readonly length = localStorage.length;

  key(index: number): string | null {
    return localStorage.key(index);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
