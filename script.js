//capturar o envio dos dados do formulário

const app = document.getElementById("app");
//array, vertor (armazena qualquer valor)
const users = [
  {
    email: "teste@teste.com",
    phone: "9999999999",
    ref: 100,
    refBy: null,
  },
  {
    email: "thais@thais.com",
    phone: "9999999999",
    ref: 200,
    refBy: 100,
  },
];

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email;
  });
};

const formAction = () => {
  const form = document.getElementById("form");
  //ordem de eventos
  form.onsubmit = (event) => {
    event.preventDefault(); //preventDefault> não faça o padrão> nesse caso era enviar o formulário quando clicasse em confirmar porque dá erro(não está configurado ainda)

    const formData = new FormData(form);
    //criando um objeto
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const user = getUser(userData);
    console.log(user)
  };
};

//arrow function
const startApp = () => {
  const content = `
   <form id="form">
      <input type="email" name="email" placeholder="E-mail" />
      <input type="text" name="phone" placeholder="Telefone" />
      <button>
         Confirmar
      </button>
   </form>
   `;

  app.innerHTML = content; //innerHTML> saber o que tem dentro ou atribuir outro valor lá para dentro

  formAction();
};

startApp(); //executada assim que o app começar
