let tabelle = document.querySelector('.table-container');
const isEmpty = "";
const apiKey = "88b5e183-9fe6-4872-d47c-8a505acdc665:fx";
const authKey = '88b5e183-9fe6-4872-d47c-8a505acdc665:fx';
const targetLang = 'EN';
const messageArray = [];
let j = 0;

let copyBtn = document.querySelectorAll('.copy-btn');


const showData = () => {
    try {
      const input = document.getElementById("csvFile");
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
  
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
    } catch (error) {
      console.error(error);
    }
  };
  
const renderTable = async (data)=>{

    let html = `<table>
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

        console.log(j);

        if(data[i].firstName1 != isEmpty){

        const correctMessage = await displayMessage(genMessage(data[i].Nachname,data[i].Startup,data[i].Fonds,data[i].Titel,data[i].Geschlecht),data[i].Land)
        html+=`<tr id="tr${j}">
            <td>${data[i].Fonds}</td>
            <td>${data[i].Startup}</td>
            <td>${data[i].Land}</td>
            <td>${data[i].Titel}
            <td>${data[i].Vorname}</td>
            <td>${data[i].Nachname}</td>
            <td class="linkedin-field"><button class="search-btn" onclick="searchLinkedin('${data[i].firstName1}','${data[i].lastName1}')"><img src="img/linkedin.png" class="linkedin-icon"></button></td>
            <td class="message-content" id="td${i}">${correctMessage}</td>
            <td><button class="copy-btn" id="copy-btn${j}" onclick="copyMessage('${correctMessage}')">Kopieren</button></td>
        </tr>`
                j+=1;
    }
        
    console.log(data[i].firstName1);    
   
    }
    html += `</tbody></table>`;
    tabelle.innerHTML = html;
    j=0;
}


const genMessage = (fname,startup,fonds)=>{
    let message = `Hallo ${fname} ! Da wir bei ${startup} über den Fonds ${fonds} beteiligt sind, würde ich mich sehr über eine Vernetzung freuen. Herzlichst Mato Krahl`
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



const translateText = (msg) => {
    return new Promise((resolve, reject) => {
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
    });
};



const displayMessage=(message,country) => {

    console.log(country);

    /*if((country !== 'Deutschland')&&(country !== 'Oesterreich')&&(country != 'Schweiz')){
        return translateText(message);
    }else{*/
    return message;
    //}

}

