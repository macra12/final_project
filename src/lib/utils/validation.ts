// src/lib/utils/validation.ts

type ValidationValue = string | number | boolean | undefined | null;
type FormValues = Record<string, ValidationValue>;

/**
 * Email validation
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?([1-9]\d{1,14})$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Password validation with specific criteria
 */
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * URL validation
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Amount validation for donations
 */
export interface AmountValidation {
  isValid: boolean;
  error?: string;
}

export const validateAmount = (
  amount: number,
  minAmount: number = 1,
  maxAmount: number = 1000000
): AmountValidation => {
  if (isNaN(amount)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }
  if (amount < minAmount) {
    return { isValid: false, error: `Amount must be at least $${minAmount}` };
  }
  if (amount > maxAmount) {
    return { isValid: false, error: `Amount cannot exceed $${maxAmount}` };
  }
  return { isValid: true };
};

/**
 * Required field validation
 */
export const validateRequired = (value: ValidationValue, fieldName: string): string | null => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * String length validation
 */
export const validateLength = (
  value: string,
  fieldName: string,
  min?: number,
  max?: number
): string | null => {
  if (min && value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (max && value.length > max) {
    return `${fieldName} cannot exceed ${max} characters`;
  }
  return null;
};

/**
 * File validation
 */
export interface FileValidation {
  isValid: boolean;
  error?: string;
}

export const validateFile = (
  file: File,
  allowedTypes: string[],
  maxSizeInMB: number
): FileValidation => {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be: ${allowedTypes.join(', ')}`
    };
  }

  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > maxSizeInMB) {
    return {
      isValid: false,
      error: `File size cannot exceed ${maxSizeInMB}MB`
    };
  }

  return { isValid: true };
};

/**
 * Date validation
 */
export const validateDate = (
  date: Date,
  options?: {
    minDate?: Date;
    maxDate?: Date;
    futureOnly?: boolean;
    pastOnly?: boolean;
  }
): string | null => {
  const { minDate, maxDate, futureOnly, pastOnly } = options || {};

  if (minDate && date < minDate) {
    return `Date must be after ${minDate.toLocaleDateString()}`;
  }
  if (maxDate && date > maxDate) {
    return `Date must be before ${maxDate.toLocaleDateString()}`;
  }
  if (futureOnly && date < new Date()) {
    return 'Date must be in the future';
  }
  if (pastOnly && date > new Date()) {
    return 'Date must be in the past';
  }
  return null;
};

/**
 * Form validation helper
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: ValidationValue) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string | null;
}

export const validateForm = (
  values: FormValues,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const rule = rules[field];

    if (rule.required && !value) {
      errors[field] = `${field} is required`;
      return;
    }

    if (value) {
      if (typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = `${field} must be at least ${rule.minLength} characters`;
        }
        else if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = `${field} cannot exceed ${rule.maxLength} characters`;
        }
        else if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = `${field} is invalid`;
        }
      }
      
      if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) {
          errors[field] = customError;
        }
      }
    }
  });

  return errors;
};