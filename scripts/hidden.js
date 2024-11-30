// Alternar entre Login e Registro
function showRegisterForm() {
    document.querySelector(".container").classList.add("register-active");
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
}
  
function showLoginForm() {
    document.querySelector(".container").classList.remove("register-active");
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}