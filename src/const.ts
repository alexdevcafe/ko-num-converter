import { Errors } from './interfaces';

export const errors: Errors = {
  empty: 'Input must not be empty.',
  wrongFormat: 'Wrong input format.',
  maxNumber: 'Input number is too big.'
}

export const maxNumber: number = 10000000000000 as const;
