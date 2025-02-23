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
<main>
   <h3>Inscrição confirmada!</h3>

   <p>
      Convide mais pessoas e concorra a prêmios! <br/>
      Compartilhe o link e acompanhe as inscrições:
   </p>

   <div class="input-group">
      <label for="link"></label> 
      <img src="link.svg" alt="Link icon">
      <input type="text" id="link" value="https://evento.com?ref=${
        userData.ref
      }" disabled>
   </div>
</main>

<section class="stats">
   <h4>
      ${getTotalSubscribers(userData)}
   </h4>
   <p>
      Inscrições feitas
   </p>
</section>
   `;
   updateImageLinks()
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
   <main>
      <section class="about">
         <div class="section-header">
            <h2>
               Sobre o evento
            </h2>
            <span class="badge">AO VIVO</span>
         </div>
         
         <p>
            Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
            <br/><br/>
            Dias 15 a 17 de março | Das 18h às 21h | Online &amp; Gratuito 


         </p>

      </section>

      <section class="registration">
         <h2>Iscrição</h2>

         <form id="form">
            <div class="input-wrapper">
               <div class="input-group">
                  <label for="email">
                     <img src="mail.svg" alt="Email icon">
                  </label>
                  <input type="email" id="email" name="email" placeholder="E-mail">
               </div>

               <div class="input-group">
                  <label for="phone">
                     <img src="phone.svg" alt="Phone icon">
                  </label>
                  <input type="text" id="phone" name="phone" placeholder="Telefone">
               </div>
            </div>

            <button>
               Confirmar
               <img src="arrow.svg" alt="Arrow right">
            </button>
         </form>
      </section>
   </main>
   `;

  app.innerHTML = content; //innerHTML> saber o que tem dentro ou atribuir outro valor lá para dentro

  updateImageLinks();
  formAction();
};

startApp(); //executada assim que o app começar - comentou para construir o html

document.getElementById("logo").onclick = () => startApp();
