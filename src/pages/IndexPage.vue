<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
    <p>App Version: {{ appVersion }}</p>
    <button @click="calculate">Calculate 2 + 3</button>
    <p>Calculation Result: {{ calcResult }}</p>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

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
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});

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
