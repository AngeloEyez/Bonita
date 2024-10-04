<template>
  <div
    class="drag-drop-area"
    @dragover.prevent
    @dragenter.prevent
    @dragleave="isDragging = false"
    @drop.prevent="handleDrop"
    @dragenter="isDragging = true"
  >
    <p v-if="isDragging">
      Release to upload files
    </p>
    <p v-else>
      Drag and drop .xls or .xlsx files here
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import log from 'app/bonita/utils/logger';
log.log('dragdroparea')

const isDragging = ref(false);
const emit = defineEmits(['files-dropped']);

// 處理檔案放下時的事件
const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;

  if (files && files.length > 0) {
    const validFiles = Array.from(files).filter(file =>
      ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)
    );
    if (validFiles.length > 0) {
      emit('files-dropped', validFiles);
    } else {
      log.log('wrong file');
    }
  }
};
</script>

<style scoped>
.drag-drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.drag-drop-area:hover {
  background-color: #f0f0f0;
}

.drag-drop-area p {
  font-size: 18px;
  color: #888;
}
</style>
