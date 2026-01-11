let entries = JSON.parse(localStorage.getItem("entries") || "[]");

function saveData(){
  localStorage.setItem("entries", JSON.stringify(entries));
}

function today(){
  return new Date().toISOString().slice(0,10);
}
