import { create } from "zustand";

export const useReminderStore = create((set) => ({
  taskName: "",
  reminderTime: null,
  second: 0, // New field to store the number of seconds

  // Function to set the task name
  setTaskNamee: (newTaskName) => set({ taskName: newTaskName }),

  // Function to set the reminder time
  setReminderTime: (newTime) => set({ reminderTime: newTime }),

  // Function to set the number of seconds
  setSecond: (newSecond) => set({ second: newSecond }),

  // Reset both values
  resetReminder: () => set({ taskName: "", reminderTime: null, second: 0 }),
}));
