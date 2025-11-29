<script setup>
import { usePriorityEngine } from './composables/usePriorityEngine';
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';
import { CheckSquare } from 'lucide-vue-next';

// Initialize the logic engine
const { 
  sortedTasks, 
  filterStatus, 
  addTask, 
  deleteTask, 
  toggleTask 
} = usePriorityEngine();
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
    <div class="max-w-lg mx-auto">
      
      <div class="flex items-center gap-3 mb-8">
        <div class="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
          <CheckSquare class="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Priority Tasker</h1>
          <p class="text-slate-500 text-sm">Focus on what matters.</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
        <TaskInput @add="addTask" />
        
        <TaskList 
          :tasks="sortedTasks" 
          :current-filter="filterStatus"
          @update-filter="filterStatus = $event"
          @toggle="toggleTask" 
          @delete="deleteTask" 
        />
      </div>

      <div class="text-center mt-8 text-slate-400 text-xs">
        <p>Local Storage Enabled • Auto-Sorting by Priority</p>
      </div>

    </div>
  </div>
</template>