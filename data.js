let entries = JSON.parse(localStorage.getItem("entries") || "[]");

function saveData(){
  localStorage.setItem("entries", JSON.stringify(entries));
}
