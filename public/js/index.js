const saudação = "Bem vindo ao Nikel by Erik Santos";
    console.log(saudação);

const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById ("email-input").value;
    const password = document.getElementById ("password-input").value;
    const checksession = document.getElementById ("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Verifique o email e a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Verifique o email e a senha.");
            return;
        }

        saveSession(email, checksession);

        window:location.href = "home.html";
    }
})

//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById ("email-create-input").value;
    const password = document.getElementById ("password-create-input").value;

    if(email.length < 10) {
       alert("Preencha o campo com um e-mail válido ")
       console.log("O usuário forneceu um email inválido")
       return;
    }

    if(password.length < 8) {
       alert("A senha deve ter no mínimo 8 caracteres")
       console.log("O usuário forneceu uma senha inválida")
       return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    e.target.reset();
    myModal.hide();

    alert ("CONTA CRIADA COM SUCESSO!")
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }

}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}