/**/
let tabPeople = null;
let peopleList = null;
let estHTML = null;
let allPerson = [];
let personFilter = [];
let btnPesquisar = null;
let inputName = null;

window.addEventListener('load', () => {
  tabPeople = document.querySelector('#tabPeople');
  peopleList = document.querySelector('#peopleList');
  estHTML = document.querySelector('#estHTML');
  btnPesquisar = document.getElementById('btnPesquisar');
  inputName = document.getElementById('inputName');

  loadApi();
  render();
});

async function loadApi() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  // console.log(json);

  allPerson = json.results.map((person) => {
    const { id, name, login, gender, dob, picture } = person;
    return {
      id: id,
      name: name,
      login: login,
      gender: gender,
      dob: dob,
      picture: picture,
    };
  });
  // console.log(allPerson);
  render();
}

function render() {
  estHTML.innerHTML = '<h5>Lista de usuários filtrados</h5>';
  personList();
  doSearch();
}

function personList() {
  let peopleHTML = '<div>';
  let i = 0;

  allPerson.forEach((person) => {
    const { id, name, login, gender, dob, picture } = person;

    // console.log(person);

    const personHTML = `
      <div class='person'>
       <!--  <div>
          <a id="${i}" class="waves-effect waves-light btn">+</a>
        </div> -->
        <div>
          <img src="${picture.medium}" alt="${picture.medium}">
          ${name.first + ' ' + name.last + ',' + dob.age}
       </div>
      <!--  <div>
           <li>${name.first + ' ' + name.last + ',' + dob.age}</li>
        </div>
        <div>
          <ul>
          
            <li>${gender}</li>
            <li>${dob.age}</li>
          </ul>
        </div> -->
      </div>  
    `;

    peopleHTML += personHTML;

    i++;
  });

  peopleHTML += '</div>';
  // console.log(peopleHTML);
  tabPeople.innerHTML = peopleHTML;
}

function doSearch(event) {
  btnPesquisar.addEventListener('click', handleTyping);
  inputName.focus();
}

function handleTyping(event) {
  let name = inputName.value;

  filterPerson(name);
  inputName.value = null;
}

function filterPerson(name) {
  // console.log('nome digitado: ' + name);
  let peopleHTML = '<div>';
  let i = 0;
  // const personFilter = allPerson.filter((person) => person.name.first === name);

  /* const personFilter = allPerson.filter(
    (person) => person.name.first.toLowerCase().indexOf(name.toLowerCase()) > -1
  );*/
  sm = null; //qtde sexo masculino
  sf = null; //qtde sexo feminino
  si = null; //soma da idade
  mi = null; //media da idade

  acumulador = null;
  //pesquisa por nome
  const personFilter = allPerson
    .map((item) => {
      const { name, age, dob, picture, gender } = allPerson;

      return {
        name: item.name.first + ' ' + item.name.last,
        age: item.age,
        dob: item.dob,
        picture: item.picture,
        gender: item.gender,
      };
    })
    .filter(
      (person) => person.name.toLowerCase().indexOf(name.toLowerCase()) > -1
    );
  // console.log(newPersonFilter[0].name);
  /*
  const personFilter = allPerson.filter(
    (person) => person.name.first.toLowerCase().indexOf(name.toLowerCase()) > -1
  );
*/
  //pesquisa por sobrenome
  /*const personFilterS = allPerson.filter(
    (person) => person.name.last.toLowerCase().indexOf(name.toLowerCase()) > -1
  );*/

  if (personFilter.length === 0) {
    peopleList.innerHTML = '<h5>Nengum resultado encontrado</h5>';
  } else {
    personFilter.forEach((person) => {
      const { id, name, login, gender, dob, picture, age } = person;
      si += dob.age;
      acumulador++;

      if (gender === 'male') {
        sm++;
      } else {
        sf++;
      }

      const personHTML = `
      <div class='peopleList'>
        <div>
          <img src="${picture.medium}" alt="${picture.medium}">
          ${name + ',' + dob.age}
       </div>
      <!--  <div>
           <li>${name + ',' + dob.age}</li>
        </div>
        <div>
          <ul>
          
            <li>${gender}</li>
            <li>${dob.age}</li>
          </ul>
        </div> -->
      </div>  
    `;

      peopleHTML += personHTML;

      i++;
    });

    peopleHTML += '</div>';
    //console.log(peopleHTML);

    peopleList.innerHTML = '<h5>Lista de usuários filtrados</h5>' + peopleHTML;

    if (sm === null) {
      sm = 0;
    }
    if (sf === null) {
      sf = 0;
    }

    const estatisticaHTML = `
    <div class='estHTML'>
    <p>Sexo Masculino:${sm}
        <p>Sexo Feminino:${sf}
        <p> Soma das idades:${si}
        <p> Média das idadades:${Math.round(si / acumulador)}
    </div>  
  `;

    estHTML.innerHTML = '<h5>Estatística' + estatisticaHTML;
  }
}
