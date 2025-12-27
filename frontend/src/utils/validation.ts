import type { TicketFormData, FormErrors } from '../types';

export const validateTicketForm = (data: TicketFormData): FormErrors => {
  const errors: FormErrors = {};

  // Title validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  // Reporter name validation
  if (!data.reporterName.trim()) {
    errors.reporterName = 'Reporter name is required';
  }

  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};
