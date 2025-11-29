<script setup>
import { Trash2, AlertCircle, Clock, CheckCircle2 } from 'lucide-vue-next';

const props = defineProps({
  task: Object
});

const emit = defineEmits(['delete', 'toggle']);

const priorityColors = {
  high: 'text-red-600 bg-red-50 border-red-100',
  medium: 'text-amber-600 bg-amber-50 border-amber-100',
  low: 'text-blue-600 bg-blue-50 border-blue-100'
};

const priorityIcons = {
  high: AlertCircle,
  medium: Clock,
  low: CheckCircle2
};
</script>

<template>
  <div 
    class="group flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm transition-all hover:shadow-md"
    :class="[task.completed ? 'opacity-60 bg-slate-50' : 'border-slate-100']"
  >
    <div class="flex items-center gap-4 flex-1">
      <button 
        @click="emit('toggle', task.id)"
        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
        :class="task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 hover:border-indigo-500'"
      >
        <span v-if="task.completed" class="text-white text-xs">✓</span>
      </button>

      <div class="flex flex-col">
        <span 
          class="font-medium text-slate-700 transition-all"
          :class="{ 'line-through text-slate-400': task.completed }"
        >
          {{ task.title }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div 
        class="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border"
        :class="priorityColors[task.priority]"
      >
        <component :is="priorityIcons[task.priority]" class="w-3 h-3" />
        <span class="capitalize">{{ task.priority }}</span>
      </div>

      <button 
        @click="emit('delete', task.id)"
        class="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
      >
        <Trash2 class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>