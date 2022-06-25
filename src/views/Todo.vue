<template>
    <div class="m-todo">
        <div class="title has-text-centered">
            M todo
        </div>
        <form @submit.prevent="addTodo">
            <div class="field is-grouped mb-5">
                <p class="control is-expanded">
                    <input class="input" type="text" v-model="newTodoContent" placeholder="Add todo">
                </p>
                <p class="control">
                    <button class="button is-info" :disabled="!newTodoContent">
                        Add
                    </button>
                </p>
            </div>
        </form>
        <div class="card mb-5" v-for="todo in todos" :class="{'has-background-success-light': todo.done}">
            <div class="card-content">
                <div class="content">
                    {{ todo.content }}
                    <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" @click="toggleDone(todo.id, todo.done)">Done</a>
                <a class="card-footer-item" @click="deleteTodo(todo.id)">Delete</a>
            </footer>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { collection, query, doc, updateDoc, addDoc, onSnapshot, orderBy, deleteDoc } from "firebase/firestore";
import {db} from "@/firebase";

const newTodoContent = ref('');
const todos = ref([]);
const todosCollectionRef = collection(db, 'todos')
const todosCollectionQuery = query(todosCollectionRef, orderBy ('date','desc'))
const addTodo = async () => {
    const newTodo = {content: newTodoContent.value, done: false, date: Date.now()}
    const docRef = await addDoc(collection(db, "todos"), newTodo)
    console.log("Document written with ID: ", docRef.id);

    newTodoContent.value = ''
}

const deleteTodo = async (id) => {
    await deleteDoc(doc(collection(db, "todos"), id));
}

const toggleDone = async (id, done) => {

// Set the "capital" field of the city 'DC'
    await updateDoc(doc(collection(db, "todos"), id), {
        done: !done
    });

}

onMounted(async () => {
    const unsubscribe = onSnapshot(todosCollectionQuery, (querySnapshot) => {
        const fbTodos = [];
        querySnapshot.forEach((doc) => {
            const todo = {id: doc.id, content: doc.data().content, done: doc.data().done, date: doc.data().date}
            fbTodos.push(todo);
        });
        todos.value = fbTodos;
    });

})
</script>
<style lang="scss">
@import 'bulma/css/bulma.min.css';

.m-todo {
    max-width: 500px;
    padding: 20px;
    margin: 0 auto;
}
</style>
