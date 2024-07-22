<script setup lang="ts">
import { db } from "../configs/firebaseConfig";
import {
  collection,
  doc
} from "firebase/firestore";
import { reactive } from "vue";
import { Magnetar } from '@magnetarjs/core'
import { CreatePlugin as PluginFirestore } from '@magnetarjs/plugin-firestore'
import { CreatePlugin as PluginVue3 } from '@magnetarjs/plugin-vue3'
import { logger } from '@magnetarjs/utils'
import TodoList from "./TodoList.vue";

type Item = { title: string; id: string; isDone: boolean };

const taskItems = reactive<Item[]>([]);

function generateRandomId () { return doc(collection(db, 'random')).id }

const remote = PluginFirestore({ db })

const cache = PluginVue3({ generateRandomId })

const magnetar = Magnetar({
  stores: { cache, remote },
  executionOrder: {
    read: ['cache', 'remote'],
    write: ['cache', 'remote'],
    delete: ['cache', 'remote'],
  },
  on: { success: logger }, // disable this on production builds
})

const tasksModule = magnetar.collection('tasks')

async function fetchTasks() {
  const docRef = await tasksModule.fetch()
  while (taskItems.length) {
      taskItems.pop();
    }
    docRef.forEach((value:any, key:any) => {
      const item: Item = {
        title: value.title,
        id: key,
        isDone: value.isDone,
      };
      taskItems.push(item);
    });
} 

async function createTask(task: Item) {
  tasksModule.insert(task)
  fetchTasks()
}

async function updateTask(task: Item) {
  const docTask = tasksModule.doc(task.id)
  docTask.replace(task)
  fetchTasks()
}

async function deleteTask(task: Item) {
  tasksModule.delete(task.id)
  fetchTasks()
}

fetchTasks()
</script>

<template>
  <TodoList
    :items="taskItems"
    @add="createTask"
    @edit="updateTask"
    @delete="deleteTask"
    />
</template>