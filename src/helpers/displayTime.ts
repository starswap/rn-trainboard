export function displayTime(time: Date): string {
  //return `${time.getHours()}:${time.getMinutes()}`;
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
