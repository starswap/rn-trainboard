export function displayTime(time: Date): string {
  return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
}
