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
      if(input.files[0].name.endsWith('.csv')){
        console.log('im CSV TEIL');
      const csv = reader.result.replaceAll("\r","");
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
        console.log("immernoch im CSV Teil");
      }
      
      const jsonData = JSON.stringify(result, null, 6);
    
      renderTable(JSON.parse(jsonData));
      console.log(jsonData.replace("\r",""));
      return jsonData;}
      else{
        const jsonData = reader.result;
        renderTable(JSON.parse(jsonData));
        return jsonData;
      }
    }

  } catch (error) {
    alert('Bitte CSV Datei öffnen!');
    console.error(error);
  }
};

  
const renderTable = async (data)=>{

    let html = `<table id="my-table">
    <thead class="sticky-thead">
        <tr>
            <td class="row-num">#</td>
            <td class="fonds-head">Fonds</td>
            <td class="startup-head">Startup</td>
            <td class="country-head">Land</td>
            <td class="person-titel">Anrede</td>
            <td class="first-name">Vorname</td>
            <td class="last-name">Nachname</td>
            <td class="search-linked-in">LinkedIn</td>
            <td class="message">Message</td>
            <td class="copy-message">Copy</td>
            <td class="done">Done</td>
        </tr>
    </thead>
    <tbody>`;


    for(let i = 0;i<data.length;i++){
        //console.log(j);
        if(data[i].Nachname != isEmpty){
        const correctMessage = await genMessage(textGenArea.value,data[i].Anrede,data[i].Vorname,data[i].Nachname,data[i].Fonds,data[i].Startup,data[i].Land);
        html+=`<tr id="tr${j}">
            <td>${j}</td>
            <td>${data[i].Fonds}</td>
            <td>${data[i].Startup}</td>
            <td>${data[i].Land}</td>
            <td>${data[i].Anrede}
            <td>${data[i].Vorname}</td>
            <td>${data[i].Nachname}</td>
            <td class="linkedin-field"><button class="search-btn" onclick="searchLinkedin('${data[i].Vorname}','${data[i].Nachname}')"><img src="img/linkedin.png" class="linkedin-icon"></button></td>
            <td class="message-content" id="td${i}">${correctMessage}</td>
            <td class="copy-container"><button class="copy-btn" id="copy-btn${j}" onclick="copyMessage('${correctMessage}','${data[i].Nachname}')"><img class="copy-icon" src="./img/copy.svg"/></button>
            <span id="tooltip" class="tooltiptext">${data[i].Nachname} copied, yay!</span>
            </td>
            <td><input type="checkbox" id="myCheckbox${i}" onclick="changeBackground(this)" /></td>
        </tr>`

                j+=1;
    }


    
    //console.log(data[i].Vorname);  

    }
    html += `</tbody></table>`;
    tabelle.innerHTML = html;
    j=0;

    for(let i = 0;i<data.length;i++){
      if(data[i].Erledigt){
        //document.getElementById(`tr${i}`).style.backgroundColor = 'green';
        document.getElementById(`myCheckbox${i}`).checked = true;
        document.getElementById(`tr${i}`).style.backgroundColor = 'lightgreen';
        console.log('in For Loop Abfrage');
      }
    }
}


const genMessage = (messageVal,Anrede,Vorname,Nachname,Fonds,Startup,Land)=>{
    let anrede = 'Sehr geehrte Frau';
    let message = ''

    if(Land!=('Deutschland') && Land!=('Österreich') && Land!=('Schweiz')&& Anrede!=("Frau")){
        message = `Dear Mr. ${Nachname} As we are invested in ${Startup} through the fund ${Fonds}, I would be very happy to connect on Linkedin. Sincerely Mato Krahl`

    }
    else if(Land!=('Deutschland') && Land!=('Österreich') && Land!=('Schweiz')&& Anrede=="Frau"){
      message = `Dear Mrs. ${Nachname} As we are invested in ${Startup} through the fund ${Fonds}, I would be very happy to connect on Linkedin. Sincerely Mato Krahl`
      
    }
    else{

    if(Anrede!== 'Frau' ){
        anrede = 'Sehr geehrter Herr';
    }
      message = messageVal.replaceAll('[Geschlecht]',anrede).replaceAll('[Nachname]',Nachname).replaceAll('[Fonds]',Fonds).replaceAll('[Startup]',Startup);
    }
    //console.log(message);
    return message;
}

const copyMessage = (message,name) =>{
    navigator.clipboard.writeText(message);

  
    setTimeout(function(){
      document.getElementById("tooltip").style.visibility = "hidden";
    },2000)
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
    if((country !== 'Deutschland')&&(country !== 'Österreich')&&(country != 'Schweiz')){
        return translateText(message);
    }else{
    return message;

    }
}

  
  textSelect.addEventListener('change',()=>{
    message1 = '[Geschlecht] [Nachname]. Da wir bei [Startup] über den Fonds [Fonds] beteiligt sind, würde ich mich sehr über eine Vernetzung auf Linkedin freuen. Herzlichst Mato Krahl';
    
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


      function changeBackground(checkbox) {
        var tr = checkbox.parentNode.parentNode;
        if (checkbox.checked == true) {
          tr.style.backgroundColor = "lightgreen";
        } else {
          tr.style.backgroundColor = "white";
        }
      }



      function saveData() {
        var table = document.getElementById("my-table");
        var data = [];
        for (let i = 1; i < table.rows.length; i++) {
          let row = table.rows[i];
          for(let j=0;j<table.rows.length;j++){
          var rowData = {
            "Fonds": row.cells[1].innerHTML,
            "Startup": row.cells[2].innerHTML,
            "Land": row.cells[3].innerHTML,
            "Anrede": row.cells[4].innerHTML.substring(0,4),
            "Vorname": row.cells[5].innerHTML,
            "Nachname": row.cells[6].innerHTML,
            "Message": row.cells[8].innerHTML,
            "Erledigt": row.cells[10].getElementsByTagName("input")[0].checked,
          };    
        }
          data.push(rowData);
        }
        var jsonData = JSON.stringify(data);
        var file = new Blob([jsonData], {type: "application/json"});
        var a = document.createElement("a");
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = "MKdata.json";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
        }, 0);
      }

