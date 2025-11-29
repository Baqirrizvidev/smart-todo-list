<script setup>
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';

const emit = defineEmits(['add']);
const title = ref('');
const priority = ref('medium');

const handleSubmit = () => {
  if (!title.value.trim()) return;
  emit('add', title.value, priority.value);
  title.value = ''; // Reset
  priority.value = 'medium'; // Reset
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex gap-2 mb-6">
    <div class="flex-1 relative">
      <input 
        v-model="title"
        type="text" 
        placeholder="What needs to be done?" 
        class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
      />
    </div>
    
    <select 
      v-model="priority"
      class="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button 
      type="submit"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
    >
      <Plus class="w-5 h-5" />
    </button>
  </form>
</template>