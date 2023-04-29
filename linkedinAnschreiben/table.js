let tabelle = document.querySelector('.table-container');
const isEmpty = "";
const apiKey = "88b5e183-9fe6-4872-d47c-8a505acdc665:fx";
const authKey = '88b5e183-9fe6-4872-d47c-8a505acdc665:fx';
const targetLang = 'EN';
const messageArray = [];
const textGenArea = document.querySelector('#textgenarea');
const fnameBtn = document.querySelector('#fname-btn');
const lnameBtn = document.querySelector('#lname-btn');
const fundBtn = document.querySelector('#fund-btn');
const startupBtn = document.querySelector('#startup-btn');
const textSelect = document.querySelector('#text-select');

const nameHeader = document.querySelector('#my-table th:nth-child(2)');
const tableBody = document.querySelector('#my-table tbody');

let j = 0;

let copyBtn = document.querySelectorAll('.copy-btn');
  

const showData = () => {
    try {
      const input = document.getElementById("csvFile");
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
  
      reader.onload = function () {
        const csv = reader.result.replace(";;",";").replace("\r","");
        const lines = csv.split("\n");
        const result = []; 
        const headers = lines[0].split(";");
        for (let i = 1; i < lines.length; i++) {
          const obj = {};
          const currentline = lines[i].replace("\r","").split(";");
          for (let j = 0; j < headers.length; j++) {
            if(headers[j]==isEmpty){
                obj[headers[j]]= isEmpty;
            }
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }
        const jsonData = JSON.stringify(result, null, 6);
  
        renderTable(JSON.parse(jsonData));
        console.log(jsonData.replace("\r",""));
        return jsonData;
      };

    } catch (error) {
      console.error(error);
    }
  };
  
const renderTable = async (data)=>{

    let html = `<table id="my-table">
    <thead>
        <tr>
            <td class="fonds-head">Fonds</td>
            <td class="startup-head">Startup</td>
            <td class="country-head">Land</td>
            <td class="person-titel">Titel</td>
            <td class="first-name">Vorname</td>
            <td class="last-name">Nachname</td>
            <td class="search-linked-in">LinkedIn</td>
            <td class="message">Message</td>
            <td class="copy-message">Nachricht Kopieren</td>
        </tr>
    </thead>
    <tbody>`;


    for(let i = 0;i<data.length;i++){
        //console.log(j);
        if(data[i].Nachname != isEmpty){
        const correctMessage = await genMessage(textGenArea.value,data[i].Geschlecht,data[i].Vorname,data[i].Nachname,data[i].Fonds,data[i].Startup,data[i].Land);
        html+=`<tr id="tr${j}">
            <td>${data[i].Fonds}</td>
            <td>${data[i].Startup}</td>
            <td>${data[i].Land}</td>
            <td>${data[i].Titel}
            <td>${data[i].Vorname}</td>
            <td>${data[i].Nachname}</td>
            <td class="linkedin-field"><button class="search-btn" onclick="searchLinkedin('${data[i].Vorname}','${data[i].Nachname}')"><img src="img/linkedin.png" class="linkedin-icon"></button></td>
            <td class="message-content" id="td${i}">${correctMessage}</td>
            <td><button class="copy-btn" id="copy-btn${j}" onclick="copyMessage('${correctMessage}')">Kopieren</button></td>
        </tr>`
                j+=1;
    }
        
    //console.log(data[i].Vorname);    
    }
    html += `</tbody></table>`;
    tabelle.innerHTML = html;
    j=0;
}


const genMessage = (messageVal,gender,Vorname,Nachname,Fonds,Startup,Land)=>{
    let anrede = 'Sehr geehrte Frau';
    let message = ''

    if(Land!=('Deutschland') && Land!=('Oesterreich') && Land!=('Schweiz')){
        message = `Dear Mr. ${Nachname} As we are involved in ${Startup} through the fund ${Fonds}, I would be very happy to network on Linkedin. Sincerely Mato Krahl`

    }
    else{

    if(gender!== 'Frau' ){
        anrede = 'Sehr geehrter Herr ';
    }
   
      message = messageVal.replace('[Geschlecht]',anrede).replace('[Nachname]',Nachname).replace('[Fonds]',Fonds).replace('[Startup]',Startup);
    }
    //console.log(message);
    return message;
}

const copyMessage = (message) =>{
    navigator.clipboard.writeText(message);
    console.log('copied yay!');
}

const searchLinkedin = (fname,lname) =>{
    let url = `https://www.linkedin.com/search/results/all/?keywords=${fname} ${lname}&origin=GLOBAL_SEARCH_HEADER`;
    window.open(url,"_blank");
}

const displayWord = (word) => {
    textGenArea.value += word;
    console.log('Word Displayed!');
  }




const translateText = (msg) => {

    /*return new Promise((resolve, reject) => {
        const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${encodeURIComponent(msg)}&target_lang=${targetLang}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const translatedText = data.translations[0].text;
                console.log(translatedText);
                resolve(translatedText);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    }); */    
};



const displayMessage=(message,country) => {

    console.log(country);
    country = 0;
    if((country !== 'Deutschland')&&(country !== 'Oesterreich')&&(country != 'Schweiz')){
        return translateText(message);
    }else{
    return message;

    }
}

const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = function () {
      const csv = reader.result;
      const lines = csv.split("\n");
      const result = [];
  
      const headers = lines[0].replace("\r", "").split(",");
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].replace("\r", "").split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
  
      const jsonData = JSON.stringify(result, null, 2);
  
      renderTable(JSON.parse(jsonData));
    };
  };
  
  textSelect.addEventListener('change',()=>{
    message1 = '[Geschlecht] [Nachname]. Da wir bei [Startup] über den Fonds [Fonds] beteiligt sind, würde ich mich sehr über eine Vernetzung freuen. Herzlichst Mato Krahl';
    
    textGenArea.value = message1;

})

    
    function downloadJSON(data) {
   
        var file = new Blob([data], {type: "application/json"});
        var a = document.createElement("a");
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = "data.json";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    
      nameHeader.addEventListener('click', () => {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
    
        rows.sort((rowA, rowB) => {
          const nameA = rowA.cells[1].innerText;
          const nameB = rowB.cells[1].innerText;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
    
        rows.forEach(row => {
          tableBody.appendChild(row);
        });
      });
