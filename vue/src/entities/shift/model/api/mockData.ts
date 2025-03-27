import type { Shifts } from "../types";

export const mockShifts: Shifts = [
  { id: '1', name: 'Утренняя', startTime: '08:00', endTime: '16:00' },
  { id: '2', name: 'Вечерняя', startTime: '16:00', endTime: '00:00' },
  { id: '3', name: 'Ночная', startTime: '00:00', endTime: '08:00' },
  { id: '4', name: 'Смешанная', startTime: '10:00', endTime: '19:00'}
]
