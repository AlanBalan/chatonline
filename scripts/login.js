// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAO7vpFpZA5U6YR0tkV6AdJL4HVQUcS_ys",
  authDomain: "guat-chat.firebaseapp.com",
  projectId: "guat-chat",
  storageBucket: "guat-chat.firebasestorage.app",
  messagingSenderId: "839223361818",
  appId: "1:839223361818:web:c1dacc5d3c14e04d6e2ca3",
};

  // Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

  // Referências
const nameInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');
const loginDiv = document.getElementById('login-form');
const chatDiv = document.getElementById('chat');
const messagesDiv = document.getElementById('messages');
const emailInputRegister = document.getElementById('register-email');
const passwordInputRegister = document.getElementById('register-password');

  // Funções de autenticação
  function login() {
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Redirecionar para a página do chat
            window.location.href = "chat.html";
        })
        .catch(error => {
            console.error("Erro no login:", error);
            alert(`Erro ao fazer login: ${error.message}`);
        });
}

function register() {
  const name = nameInput.value; 
  const email = emailInputRegister.value; 
  const password = passwordInputRegister.value; 

  if (!name || !email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
  }

  if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
  }

  auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          const user = userCredential.user;

          // Salvar no Firestore
          return db.collection('users').doc(user.uid).set({
              name: name,
              email: email,
              status: "online",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
      })
      .then(() => {
          // Redirecionar para a página do chat
          window.location.href = "chat.html";
      })
      .catch(error => {
          console.error("Erro no registro:", error);
          alert(`Erro ao registrar: ${error.message}`);
      });
}

function logout() {
    auth.signOut().then(() => {
      chatDiv.classList.add('hidden');
      loginDiv.classList.remove('hidden');
    });
}

  // Funções de chat
function listenMessages() {
    db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
      messagesDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const message = doc.data();
        const div = document.createElement('div');
        div.textContent = `${message.user}: ${message.text}`;
        messagesDiv.appendChild(div);
      });
    });
}

function sendMessage() {
    const text = messageInput.value;
    const user = auth.currentUser.email;
    db.collection('messages').add({
      user,
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = '';
}