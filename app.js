function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function processEntry(){
  const text = inputBox.value.toLowerCase();
  const date = new Date().toISOString().slice(0,10);

  if(text.includes("kg") || text.includes("weight")){
    const w = text.match(/(\d+(\.\d+)?)/);
    if(w) entries.push({date,type:"WEIGHT",value:parseFloat(w[0])});
  }
  else if(text.includes("water")){
    entries.push({date,type:"WATER",raw:text});
  }
  else if(text.includes("min") || text.includes("badminton") || text.includes("gym")){
    entries.push({date,type:"WORKOUT",raw:text});
  }
  else{
    entries.push({date,type:"FOOD",raw:text});
  }

  saveData();
  inputBox.value="";
  renderHistory();
}

function renderHistory(){
  historyBox.innerHTML = entries.map(e=>`${e.date} - ${e.type} - ${e.raw||e.value}`).join("<br>");
}

renderHistory();
