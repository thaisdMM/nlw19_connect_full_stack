//capturar o envio dos dados do formulário
//O que está dentro da chaves só existe dentro das chaves

const app = document.getElementById("app");
//array, vertor, lista (armazena qualquer valor)
const users = [
  {
    email: "test@test.com",
    phone: "9999999999",
    ref: 100,
    refBy: null,
  },
  {
    email: "tust@tust.com",
    phone: "9999999999",
    ref: 200,
    refBy: 100,
  },
  {
    email: "tost@tost.com",
    phone: "9999999999",
    ref: 300,
    refBy: 200,
  },
];

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email;
  });
};

const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref;
  });
  return subs.length;
};

const showInvite = (userData) => {
  app.innerHTML = `
   <input type="text" id="link" value="https://evento.com?ref=${
     userData.ref
   }" disabled>

<div id="stats">
   <h4>
      ${getTotalSubscribers(userData)}
   </h4>
   <p>
      Inscrições feitas
   </p>
</div>
   `;
};

const saveUser = (userData) => {
  const newUser = {
    ...userData, //spread- já pega os dados que estão em userData
    ref: Math.round(Math.random() * 4000),
    refBy: 100, //isso teria que ser dinâmico, mas vai passar a referencia por causa do tempo e objetivo do curso
  };
  users.push(newUser);
  console.log(users);
  return newUser;
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
    //encontrou o usuário - ir para pagina de convite
    if (user) {
      showInvite(user);

      //nao encontrou o usuário - criar um novo usário e depois ir para página de convite
    } else {
      const newUser = saveUser(userData);
      showInvite(newUser);
    }
  };
};

const updateImageLinks = () => {
  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http")) {
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
    }
  });
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

  updateImageLinks();
  formAction();
};

//startApp(); //executada assim que o app começar - comentou para construir o html

document.getElementById("logo").onclick = () => startApp();
