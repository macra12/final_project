// src/lib/utils/date.ts

/**
 * Format date to local string with custom options
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string => {
    const dateObj = new Date(date);
  
    if (format === 'relative') {
      return getRelativeTimeString(dateObj);
    }
  
    const options: Intl.DateTimeFormatOptions = format === 'long' 
      ? { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      : {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };
  
    return dateObj.toLocaleDateString('en-US', options);
  };
  
  /**
   * Get relative time string (e.g., "2 hours ago", "in 3 days")
   */
  export const getRelativeTimeString = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInSeconds < 60) {
      return 'just now';
    }
  
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
  
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
  
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  
    return formatDate(date, 'short');
  };
  
  /**
   * Calculate remaining time until a date
   */
  export const getRemainingTime = (endDate: Date | string): {
    days: number;
    hours: number;
    minutes: number;
    isExpired: boolean;
  } => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const diff = end - now;
  
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        isExpired: true
      };
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
    return {
      days,
      hours,
      minutes,
      isExpired: false
    };
  };
  
  /**
   * Format duration in a human-readable way
   */
  export const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ${
        remainingMinutes ? `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}` : ''
      }`.trim();
    }
  
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
  
    return `${days} day${days !== 1 ? 's' : ''} ${
      remainingHours ? `${remainingHours} hour${remainingHours !== 1 ? 's' : ''}` : ''
    }`.trim();
  };
  
  /**
   * Get next occurrence of a recurring date
   */
  export const getNextOccurrence = (
    startDate: Date,
    frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  ): Date => {
    const date = new Date(startDate);
    const today = new Date();
  
    while (date <= today) {
      switch (frequency) {
        case 'weekly':
          date.setDate(date.getDate() + 7);
          break;
        case 'monthly':
          date.setMonth(date.getMonth() + 1);
          break;
        case 'quarterly':
          date.setMonth(date.getMonth() + 3);
          break;
        case 'yearly':
          date.setFullYear(date.getFullYear() + 1);
          break;
      }
    }
  
    return date;
  };
  
  /**
   * Check if a date is between two dates
   */
  export const isDateBetween = (date: Date, startDate: Date, endDate: Date): boolean => {
    const checkDate = new Date(date).getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
  
    return checkDate >= start && checkDate <= end;
  };
  
  /**
   * Format a date range
   */
  export const formatDateRange = (startDate: Date, endDate: Date): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start.getFullYear() === end.getFullYear()) {
      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()}-${end.getDate()} ${start.toLocaleString('default', { month: 'short' })} ${start.getFullYear()}`;
      }
      return `${start.toLocaleString('default', { month: 'short' })} ${start.getDate()} - ${end.toLocaleString('default', { month: 'short' })} ${end.getDate()}, ${start.getFullYear()}`;
    }
  
    return `${formatDate(start)} - ${formatDate(end)}`;
  };
  
  /**
   * Get calendar weeks for a month
   */
  export const getCalendarWeeks = (year: number, month: number): Date[][] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
  
    // Add days from previous month to fill first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      currentWeek.push(date);
    }
  
    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push(date);
  
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
  
    // Add days from next month to fill last week
    if (currentWeek.length > 0) {
      const remainingDays = 7 - currentWeek.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i);
        currentWeek.push(date);
      }
      weeks.push(currentWeek);
    }
  
    return weeks;
  };