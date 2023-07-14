export function displayTime(time: Date): string {
  return `${time.getHours().toString().padStart(2, '0')}:${time
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}
