//capturar o envio dos dados do formulário

const app = document.getElementById("app");

const formAction = () => {
  const form = document.getElementById("form");
  //ordem de eventos
  form.onsubmit = (event) => {
    event.preventDefault(); //preventDefault> não faça o padrão> nesse caso era enviar o formulário quando clicasse em confirmar porque dá erro(não está configurado ainda)

    const formData = new FormData(form)
    //criando um objeto
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone")
    }
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
