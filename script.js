// =======================================

// Torn Souls GC
// script.js (Part 1)
// =======================================
alert("Script is running!");

// ---------- Firebase Imports ----------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getDatabase,

ref,

push,

onChildAdded

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// =======================================
// Firebase Config
// Replace ONLY this object
// =======================================

const firebaseConfig = {
  apiKey: "AIzaSyCwCdHJyakIOFDMdZftgvf9IIctZAyAFG0",
  authDomain: "torn-souls-gc.firebaseapp.com",
  databaseURL: "https://torn-souls-gc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "torn-souls-gc",
  storageBucket: "torn-souls-gc.firebasestorage.app",
  messagingSenderId: "483834372453",
  appId: "1:483834372453:web:cff6555ffe4521d8ab418c"
};



// =======================================
// Initialize Firebase
// =======================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const chatRef = ref(db,"messages");


// =======================================
// HTML Elements
// =======================================

const messages = document.getElementById("messages");

const input = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");


// =======================================
// Nickname
// =======================================

let nickname = localStorage.getItem("nickname");

if(!nickname){

nickname = prompt("Enter your nickname");

if(!nickname || nickname.trim()===""){

nickname = "Anonymous";

}

nickname = nickname.trim();

localStorage.setItem("nickname",nickname);

}


// =======================================
// Send Message
// =======================================

async function sendMessage(){

const text = input.value.trim();

if(text==="") return;

const now = new Date();

const time = now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

await push(chatRef,{

name:nickname,

text:text,

time:time

});

input.value="";

input.focus();

}


// =======================================
// Button
// =======================================

sendBtn.addEventListener("click",sendMessage);


// =======================================
// Enter Key
// =======================================

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

sendMessage();

}

});


// =======================================
// Part 2 continues...
// =======================================

// =======================================
// Torn Souls GC
// script.js (Part 1)
// =======================================



// =======================================
// Part 2 continues...
// =======================================

// =======================================
// Receive Messages
// =======================================

onChildAdded(chatRef,(snapshot)=>{

const data = snapshot.val();

const bubble = document.createElement("div");

bubble.className = "message";

bubble.innerHTML = `

<div class="sender">${data.name}</div>

<div class="text">${data.text}</div>

<div class="time">${data.time}</div>

`;

messages.appendChild(bubble);

// Auto Scroll

messages.scrollTop = messages.scrollHeight;

});


// =======================================
// Focus Input When Page Loads
// =======================================

window.addEventListener("load",()=>{

input.focus();

});


// =======================================
// Small Quality of Life
// =======================================

window.addEventListener("keydown",(e)=>{

if(e.key==="/" && document.activeElement!==input){

e.preventDefault();

input.focus();

}

});


// =======================================
// End of script.js
// =======================================