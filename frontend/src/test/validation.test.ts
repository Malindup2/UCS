import { describe, it, expect } from 'vitest';
import { validateTicketForm, isFormValid } from '../utils/validation';
import type { TicketFormData } from '../types';

describe('validateTicketForm', () => {
  it('should return error when title is empty', () => {
    const data: TicketFormData = {
      title: '',
      description: 'This is a valid description with more than 20 characters',
      category: 'Bug',
      priority: 'Medium',
      reporterName: 'John Doe',
    };
    
    const errors = validateTicketForm(data);
    expect(errors.title).toBe('Title is required');
  });

  it('should return error when title is less than 5 characters', () => {
    const data: TicketFormData = {
      title: 'Test',
      description: 'This is a valid description with more than 20 characters',
      category: 'Bug',
      priority: 'Medium',
      reporterName: 'John Doe',
    };
    
    const errors = validateTicketForm(data);
    expect(errors.title).toBe('Title must be at least 5 characters');
  });

  it('should return error when description is empty', () => {
    const data: TicketFormData = {
      title: 'Valid Title',
      description: '',
      category: 'Bug',
      priority: 'Medium',
      reporterName: 'John Doe',
    };
    
    const errors = validateTicketForm(data);
    expect(errors.description).toBe('Description is required');
  });

  it('should return error when description is less than 20 characters', () => {
    const data: TicketFormData = {
      title: 'Valid Title',
      description: 'Short desc',
      category: 'Bug',
      priority: 'Medium',
      reporterName: 'John Doe',
    };
    
    const errors = validateTicketForm(data);
    expect(errors.description).toBe('Description must be at least 20 characters');
  });

  it('should return error when reporter name is empty', () => {
    const data: TicketFormData = {
      title: 'Valid Title',
      description: 'This is a valid description with more than 20 characters',
      category: 'Bug',
      priority: 'Medium',
      reporterName: '',
    };
    
    const errors = validateTicketForm(data);
    expect(errors.reporterName).toBe('Reporter name is required');
  });

  it('should return no errors for valid form data', () => {
    const data: TicketFormData = {
      title: 'Valid Title',
      description: 'This is a valid description with more than 20 characters',
      category: 'Bug',
      priority: 'Medium',
      reporterName: 'John Doe',
    };
    
    const errors = validateTicketForm(data);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('should trim whitespace when validating', () => {
    const data: TicketFormData = {
      title: '   ',
      description: '   ',
      category: 'Bug',
      priority: 'Medium',
      reporterName: '   ',
    };
    
    const errors = validateTicketForm(data);
    expect(errors.title).toBe('Title is required');
    expect(errors.description).toBe('Description is required');
    expect(errors.reporterName).toBe('Reporter name is required');
  });
});

describe('isFormValid', () => {
  it('should return true when no errors', () => {
    expect(isFormValid({})).toBe(true);
  });

  it('should return false when there are errors', () => {
    expect(isFormValid({ title: 'Title is required' })).toBe(false);
    expect(isFormValid({ title: 'Error', description: 'Error' })).toBe(false);
  });
});
