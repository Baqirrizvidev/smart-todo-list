<script setup>
import TaskItem from './TaskItem.vue';

defineProps({
  tasks: Array,
  currentFilter: String
});

const emit = defineEmits(['delete', 'toggle', 'update-filter']);

const filters = ['all', 'pending', 'completed'];
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 pb-2 border-b border-slate-100">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="emit('update-filter', filter)"
        class="px-3 py-1.5 text-sm rounded-md transition-colors capitalize"
        :class="currentFilter === filter 
          ? 'bg-slate-800 text-white font-medium' 
          : 'text-slate-500 hover:bg-slate-100'"
      >
        {{ filter }}
      </button>
    </div>

    <div v-if="tasks.length > 0" class="space-y-2">
      <TransitionGroup name="list">
        <TaskItem 
          v-for="task in tasks" 
          :key="task.id" 
          :task="task"
          @toggle="emit('toggle', $event)"
          @delete="emit('delete', $event)"
        />
      </TransitionGroup>
    </div>

    <div v-else class="text-center py-10 text-slate-400">
      <p>No tasks found in this view.</p>
    </div>
  </div>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>