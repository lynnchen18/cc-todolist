<script setup lang="ts">
import { db } from "../configs/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
    reactive,
    onBeforeUnmount,
} from "vue";
import TodoList from "./TodoList.vue";

type Item = { title: string; id: string; isDone: boolean };

const taskItems = reactive<Item[]>([]);

const q = query(collection(db, "tasks"), where("title", "!=", null));
const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
  while (taskItems.length) {
    taskItems.pop();
  }
  querySnapshot.forEach((doc) => {
    const item: Item = {
      title: doc.data().title,
      id: doc.id,
      isDone: doc.data().isDone,
    };
    taskItems.push(item);
  });
});

onBeforeUnmount(() => {
  unsubscribeTasks();
});

async function createTask(data: any) {
  try {
    await addDoc(collection(db, "tasks"), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function updateTask(data: any) {
  try {
    const docRef = doc(db, "tasks", data.id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}

async function deleteTask(data: any) {
  try {
    const docRef = doc(db, "tasks", data.id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
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