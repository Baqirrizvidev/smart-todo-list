import { ref, computed, watch } from 'vue';

export function usePriorityEngine() {
  // Load from local storage or default to empty array
  const savedTasks = JSON.parse(localStorage.getItem('smart-todo-tasks')) || [];
  const tasks = ref(savedTasks);
  const filterStatus = ref('all'); // 'all', 'pending', 'completed'

  // Persistence: Watch for changes and save to LocalStorage
  watch(tasks, (newTasks) => {
    localStorage.setItem('smart-todo-tasks', JSON.stringify(newTasks));
  }, { deep: true });

  // Priority Weight Mapping
  const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1
  };

  // Action: Add Task
  const addTask = (title, priority) => {
    tasks.value.push({
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    });
  };

  // Action: Delete Task
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id);
  };

  // Action: Toggle Completion
  const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id);
    if (task) task.completed = !task.completed;
  };

  // The "Engine": Sorts by Pending > Priority Weight > Date
  const sortedTasks = computed(() => {
    let filtered = tasks.value;

    // 1. Filter
    if (filterStatus.value === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (filterStatus.value === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // 2. Sort
    return [...filtered].sort((a, b) => {
      // Completed tasks sink to bottom
      if (a.completed !== b.completed) return a.completed ? 1 : -1;

      // Higher priority floats to top
      if (priorityWeight[b.priority] !== priorityWeight[a.priority]) {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }

      // Newest first as tie-breaker
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  });

  return {
    tasks,
    filterStatus,
    sortedTasks,
    addTask,
    deleteTask,
    toggleTask
  };
}