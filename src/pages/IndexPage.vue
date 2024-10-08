<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    />
    <p>App Version: {{ appVersion }}</p>
    <button @click="calculate">
      Calculate 2 + 3
    </button>
    <p>Calculation Result: {{ calcResult }}</p>

    <h4>Excel File Uploader</h4>
    <drag-drop-area @files-dropped="handleFilesDropped" />
    <div v-if="fileNames.length">
      <h3>Uploaded Files:</h3>
      <ul>
        <li
          v-for="(fileName, index) in fileNames"
          :key="index"
        >
          {{ fileName }}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import DragDropArea from 'components/DragDropArea.vue';

import { ipc } from 'app/bonita/ipc/ipc-api';


defineOptions({
  name: 'IndexPage',
});

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});


const fileNames = ref<string[]>([]);

// 處理使用者拖放的檔案
const handleFilesDropped = (files: File[]) => {
  fileNames.value = files.map(file => file.name);
};


const appVersion = ref<string>('');
const calcResult = ref<number | null>(null);

const fetchAppVersion = async () => {
  try {
    const version = await ipc.send('get-app-version', undefined);
    appVersion.value = version.content;
  } catch (error) {
    console.error('Error fetching app version:', error);
  }
};

const calculate = async () => {
  try {
    const result = await ipc.send('perform-calculation', { a: 2, b: 3 });
    calcResult.value = result.content;
  } catch (error) {
    console.error('Error performing calculation:', error);
  }
};

fetchAppVersion();
</script>
