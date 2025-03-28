export interface WorkScheduleInput {
  cityId: string
  departmentId: string
  employeeId: string
  teamId: string
  shiftId: string
}

export interface WorkSchedule extends WorkScheduleInput {
  id: string
}
