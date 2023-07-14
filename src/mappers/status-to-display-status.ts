import { Status, DisplayStatus } from '../models/status';
import { displayTime } from '../helpers/displayTime';

export function statusToDisplayStatus(
  status: Status,
  realTime: Date,
): DisplayStatus {
  switch (status) {
    case 'normal':
      return { message: 'On Time', color: '#33DA00' };
    case 'delayed':
      return {
        message: `Delayed: ${displayTime(realTime)}`,
        color: '#FA7D00',
      };
    case 'cancelled':
      return { message: 'Cancelled', color: '#E81C1C' };
    case 'fully_reserved':
      return { message: 'Fully Booked', color: '#DB10E9' };
  }
}
