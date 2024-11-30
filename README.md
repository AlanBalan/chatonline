Documentação de Execução do Projeto

Este tutorial fornece um passo a passo para executar o projeto, explicando suas funcionalidades principais, como o registro e autenticação de usuário, envio de mensagens privadas, exibição de status de presença, responsividade e suporte a múltiplas plataformas.

1. Requisitos do Projeto
a. Desenvolvimento
Editor de Código: Qualquer editor de código como VS Code.
Navegador: Google Chrome, Firefox, ou qualquer navegador para acessar a aplicação.
Servidor Local: Não é necessário um servidor local para este projeto, pois o Firebase cuida da hospedagem e do backend.
b. Firebase
Este projeto utiliza o Firebase para autenticação e banco de dados em tempo real (Firestore). É necessário ter uma conta no Firebase e configurar um projeto.
Criar um Projeto no Firebase:
Vá até o Firebase Console.
Crie um novo projeto.
Ative o Firebase Authentication e o Firestore Database.
Obter Credenciais do Firebase:
Acesse as configurações do projeto Firebase.
Na aba "Configurações do Firebase", copie o código de configuração do Firebase.
Substitua o código de configuração no seu projeto pelo código obtido.
c. Bibliotecas
Firebase: Para autenticação e gerenciamento de dados.
CSS Flexbox e Media Queries: Para a responsividade do layout.

2. Execução do Projeto
a. Estrutura de Arquivos
/project-root
|-- /assets
|-- /css
|   |-- style.css
|-- /js
|   |-- main.js
|   |-- hidden.js
|   |-- chat.js
|-- index.html
|-- chat.html

b. Configuração do Firebase
Importe o SDK do Firebase no arquivo index.html e chat.html:
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>

No arquivo main.js ou firebase.js, inicialize o Firebase com o código de configuração.
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

c. Rodando o Projeto
Abra o arquivo index.html em seu navegador. O usuário poderá se registrar ou fazer login usando o email e senha.
Após o login, o usuário será redirecionado para chat.html, onde poderá interagir com outros usuários.

3. Funcionalidades do Projeto
a. Registro e Autenticação de Usuário
O projeto permite que os usuários se registrem e façam login usando o Firebase Authentication com email e senha.
Registro: O formulário de registro coleta o nome, email e senha. Quando o usuário se registra, seus dados são salvos no Firestore.
Login: O formulário de login verifica o email e a senha no Firebase Authentication.
Código de exemplo para registro:
auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    // Salva nome e email do usuário no Firestore
    db.collection("users").doc(user.uid).set({
      name: name,
      email: email,
      status: "offline"
    });
  })
  .catch((error) => {
    console.error("Erro ao registrar: ", error);
  });

b. Envio de Mensagem Privada
As mensagens privadas são enviadas entre os usuários com criptografia. Cada mensagem é salva no Firestore com uma chave gerada, e as mensagens são criptografadas antes de serem enviadas.

c. Exibição de Status de Presença
O status de presença dos usuários (online ou offline) é salvo no Firestore e exibido na interface. O Firebase Realtime Database ou Firestore pode ser usado para atualizar em tempo real o status de cada usuário.
Online: O status é alterado quando o usuário está conectado.
Offline: O status é atualizado quando o usuário sai ou perde a conexão.
Exemplo de código para alterar o status:
db.collection("users").doc(userId).update({
  status: "online"
});

d. Responsividade e Suporte a Múltiplas Plataformas
O layout foi projetado para ser responsivo, adaptando-se bem a telas de dispositivos móveis, tablets e desktops. Usamos media queries e Flexbox para garantir que a interface seja visualmente agradável em diferentes tamanhos de tela.
Principais ajustes responsivos:
Telas pequenas (mobile): O formulário e a lista de usuários se ajustam para melhor visualização em dispositivos pequenos.
Telas médias (tablets): O layout ajusta a largura e o padding dos componentes para caber melhor em telas maiores.

4. Requisitos para Execução no Navegador
Navegador moderno: O projeto pode ser executado diretamente em qualquer navegador moderno, como Chrome, Firefox ou Edge.
Internet: A aplicação depende do Firebase, portanto, a internet precisa estar disponível para autenticação e comunicação em tempo real.

5. Considerações Finais
Este projeto oferece uma solução simples de chat privado com autenticação e criptografia usando Firebase. Ele pode ser expandido para incluir outras funcionalidades, como envio de arquivos, chamadas de vídeo ou suporte a múltiplos chats em grupo. Para executar o projeto, basta configurar o Firebase e garantir que a biblioteca necessária (Firebase) esteja sendo carregada corretamente. Assegure-se de que o Firestore esteja configurado com as regras de segurança adequadas para proteger os dados dos usuários.

