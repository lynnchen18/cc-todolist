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
import { onMounted, ref } from "vue";
import TodoList from "./TodoList.vue";

type Item = { title: string; id: string; isDone: boolean };

const taskItems = ref<Item[]>([]);

onMounted(async () => {
  try {
    const docRef = await getDocs(collection(db, "tasks"));
    docRef.forEach((doc) => {
      const item: Item = {
        title: doc.data().title,
        id: doc.id,
        isDone: doc.data().isDone,
      };
      taskItems.value.push(item);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
});

async function createTask(data: Item) {
  try {
    await addDoc(collection(db, "tasks"), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function updateTask(data: Item) {
  try {
    const docRef = doc(db, "tasks", data.id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}

async function deleteTask(data: Item) {
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