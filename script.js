//capturar o envio dos dados do formulário

const app = document.getElementById("app")

//arrow function
const startApp = () => {
  const content = `
   <form>
      <input type="email" name="email" placeholder="E-mail" />
      <input type="text" name="phone" placeholder="Telefone" />
      <button>
         Confirmar
      </button>
   </form>
   `

   app.innerHTML = content //innerHTML> saber o que tem dentro ou atribuir outro valor lá para dentro
};
startApp(); //executada assim que o app começar
