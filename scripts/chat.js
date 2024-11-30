// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAO7vpFpZA5U6YR0tkV6AdJL4HVQUcS_ys",
    authDomain: "guat-chat.firebaseapp.com",
    projectId: "guat-chat",
    storageBucket: "guat-chat.firebasestorage.app",
    messagingSenderId: "839223361818",
    appId: "1:839223361818:web:c1dacc5d3c14e04d6e2ca3",
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Referências ao DOM
const welcomeMessage = document.getElementById("welcome-message");
const userNameSpan = document.getElementById("user-name");
const userStatus = document.getElementById("user-status");
const userList = document.getElementById("users");
const chatArea = document.getElementById("chat-area");
const chatWith = document.getElementById("chat-with");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");

let currentUser;
let currentChatUser;

// Verificar usuário autenticado
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    const userDocRef = db.collection('users').doc(user.uid);

    // Obter dados do usuário autenticado
    userDocRef.get().then(doc => {
      if (doc.exists) {
        const userData = doc.data();
        userNameSpan.textContent = userData.name;
        userStatus.textContent = userData.status;
      }
    });

    // Atualizar status para "online"
    userDocRef.update({ status: "online" });

    // Carregar lista de usuários
    loadUsers();

    // Detectar quando o usuário sai
    window.addEventListener("beforeunload", () => {
      userDocRef.update({ status: "offline" });
    });
  } else {
    window.location.href = "index.html";
  }
});


// Carregar lista de usuários (incluindo offline)
function loadUsers() {
    console.log("Carregando usuários...");
    db.collection('users').get().then(snapshot => {
      if (snapshot.empty) {
        console.log("Nenhum usuário encontrado!");
        return;
      }
  
      userList.innerHTML = ''; // Limpar lista antes de carregar
      snapshot.forEach(doc => {
        const user = doc.data();
        console.log("Usuário encontrado:", user); // Log de depuração
  
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${user.name} (${user.status || 'offline'})</span>
          <button onclick="openChat('${doc.id}', '${user.name}')">Chat</button>
        `;
        
        // Garantir que o usuário atual não aparece na lista
        if (user.email !== currentUser.email) {
          userList.appendChild(li);
        }
      });
    }).catch(error => {
      console.error("Erro ao carregar usuários:", error);
    });
  }
  
  

// Abrir chat com usuário
function openChat(userId, userName) {
  currentChatUser = userId;
  chatWith.textContent = `Chat com ${userName}`;
  chatArea.classList.remove('hidden');
  loadMessages(userId);
}

// Carregar mensagens do chat
function loadMessages(userId) {
  db.collection('messages')
    .where('users', 'array-contains', currentUser.uid)
    .orderBy('timestamp')
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const message = doc.data();
        const div = document.createElement('div');
        div.textContent = `${message.sender === currentUser.uid ? 'Você' : userId}: ${message.text}`;
        messagesDiv.appendChild(div);
      });
    });
}

// Enviar mensagem
function sendMessage() {
    const text = messageInput.value;
    if (text && currentChatUser) {
      db.collection('messages').add({
        users: [currentUser.uid, currentChatUser],
        text: text,
        sender: currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      messageInput.value = '';
    }
  }

// Logout
function logout() {
  db.collection('users').doc(currentUser.uid).update({ status: "offline" }).then(() => {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  });
}


 

 
  
