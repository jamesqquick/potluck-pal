export type ReturnValue<T> = { data: T } | { error: string };

export enum RsvpStatus {
  NOT_RESPONDED = 'NOT_RESPONDED',
  GOING = 'GOING',
  NOT_GOING = 'NOT_GOING',
  MAYBE = 'MAYBE',
}
