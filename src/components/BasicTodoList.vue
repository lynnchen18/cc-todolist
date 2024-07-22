<script setup lang="ts">
import { db } from "../configs/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { reactive } from "vue";
import TodoList from "./TodoList.vue";

type Item = { title: string; id: string; isDone: boolean };

const taskItems = reactive<Item[]>([]);

async function readTasks() {
  try {
    const docRef = await getDocs(collection(db, "tasks"));
    while (taskItems.length) {
      taskItems.pop();
    }
    docRef.forEach((doc) => {
      const item: Item = {
        title: doc.data().title,
        id: doc.id,
        isDone: doc.data().isDone,
      };
      taskItems.push(item);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

async function createTask(data: any) {
  try {
    await addDoc(collection(db, "tasks"), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
  readTasks();
}

async function updateTask(data: any) {
  try {
    const docRef = doc(db, "tasks", data.id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
  readTasks();
}

async function deleteTask(data: any) {
  try {
    const docRef = doc(db, "tasks", data.id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
  readTasks();
}

readTasks();
</script>

<template>
  <TodoList
    :items="taskItems"
    @add="createTask"
    @edit="updateTask"
    @delete="deleteTask"
  />
</template>