function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id==="dash") renderDashboard();
}

const foodDB = {
  idly:{cal:58, protein:2},
  vada:{cal:140, protein:3}
};

function processEntry(){
  const text = inputBox.value.toLowerCase();
  const date = today();

  if(text.includes("kg") || text.includes("weight")){
    const w = text.match(/(\d+(\.\d+)?)/);
    if(w) entries.push({date,type:"WEIGHT",value:parseFloat(w[0])});
  }
  else if(text.includes("water")){
    entries.push({date,type:"WATER",liters:0.25});
  }
  else if(text.includes("min") || text.includes("badminton") || text.includes("gym")){
    entries.push({date,type:"WORKOUT",burn:200});
  }
  else{
    entries.push({date,type:"FOOD",raw:text});
  }

  saveData();
  inputBox.value="";
  renderHistory();
  renderDashboard();
}

function renderHistory(){
  historyBox.innerHTML = entries.map(e =>
    `${e.date} - ${e.type} - ${e.raw || e.value || e.liters+"L"}`
  ).join("<br>");
}

function renderDashboard(){
  let calIn=0, protein=0, water=0, burn=0, weight="--";

  entries.forEach(e=>{
    if(e.date!==today()) return;

    if(e.type==="FOOD"){
      Object.keys(foodDB).forEach(f=>{
        if(e.raw.includes(f)){
          const qty = e.raw.match(/(\d+)/);
          const q = qty ? parseInt(qty[0]) : 1;
          calIn += foodDB[f].cal * q;
          protein += foodDB[f].protein * q;
        }
      });
    }

    if(e.type==="WATER") water += e.liters;
    if(e.type==="WORKOUT") burn += e.burn;
    if(e.type==="WEIGHT") weight = e.value;
  });

  calInEl.innerText = calIn;
  calBurnEl.innerText = burn;
  netCalEl.innerText = calIn - burn;
  proteinEl.innerText = protein;
  waterEl.innerText = water.toFixed(1);
  weightEl.innerText = weight;
  discEl.innerText = calIn>0 ? "70%" : "--";
}

renderHistory();
renderDashboard();
