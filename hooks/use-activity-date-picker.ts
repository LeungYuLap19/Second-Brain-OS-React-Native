import { useState } from 'react';
import { dateStringToDate, dateToDateString, dateToTimeString, timeStringToDate } from '@/lib/utils/date-utils';
import type { ActivityForm, PickerType } from '@/types';

export function useActivityDatePicker(form: ActivityForm, updateField: <K extends keyof ActivityForm>(key: K, value: ActivityForm[K]) => void) {
  const [activePicker, setActivePicker] = useState<PickerType>(null);

  const handleDateChange = (selected?: Date) => {
    if (!selected) return;
    
    if (activePicker === 'date') {
      updateField('date', dateToDateString(selected));
    } else if (activePicker === 'start') {
      const start = dateToTimeString(selected);
      updateField('startTime', start);
      if (!form.endTime) {
        const end = new Date(selected);
        end.setHours(end.getHours() + 1);
        updateField('endTime', dateToTimeString(end));
      }
    } else if (activePicker === 'end') {
      const end = dateToTimeString(selected);
      updateField('endTime', end);
      if (!form.startTime) {
        const start = new Date(selected);
        start.setHours(start.getHours() - 1);
        updateField('startTime', dateToTimeString(start));
      }
    }
  };

  const getPickerValue = () => {
    if (activePicker === 'date') return dateStringToDate(form.date);
    if (activePicker === 'start') return timeStringToDate(form.startTime) ?? new Date();
    if (activePicker === 'end') return timeStringToDate(form.endTime) ?? new Date();
    return new Date();
  };

  return {
    activePicker,
    setActivePicker,
    handleDateChange,
    getPickerValue,
  };
}
