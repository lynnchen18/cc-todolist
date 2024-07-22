<script setup lang="ts">
import { db } from "../configs/firebaseConfig";
import {
  collection,
  doc
} from "firebase/firestore";
import { computed, onBeforeUnmount } from "vue";
import { Magnetar } from '@magnetarjs/core'
import { CreatePlugin as PluginFirestore } from '@magnetarjs/plugin-firestore'
import { CreatePlugin as PluginVue3 } from '@magnetarjs/plugin-vue3'
import { logger } from '@magnetarjs/utils'
import TodoList from "./TodoList.vue";

type Item = { title: string; id: string; isDone: boolean };

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

const taskItems = computed(() => {
    return [...tasksModule.data.values()]
})

const tasksModule = magnetar.collection<Item>('tasks')

tasksModule.stream((data: any) => {})

onBeforeUnmount(() => {
    tasksModule.closeStream();
});

async function createTask(task: Item) {
  tasksModule.insert(task)
}

async function updateTask(task: Item) {
  const docTask = tasksModule.doc(task.id)
  docTask.replace(task)
}

async function deleteTask(task: Item) {
  tasksModule.delete(task.id)
}
</script>

<template>
  <TodoList
    :items="taskItems"
    @add="createTask"
    @edit="updateTask"
    @delete="deleteTask"
    />
</template>