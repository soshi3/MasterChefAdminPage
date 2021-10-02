import { networkErrorValue } from './calculate.util';

export function noneString(value: number): string {
  if (value === networkErrorValue) {
    return '---';
  }
  return value.toFixed(4);
}

export function titleCase(value: string): string {
  return value.replace(
    /\w\S*/g, (text: string) => {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }
  );
}
