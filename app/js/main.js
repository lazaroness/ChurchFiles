console.log("Arquivo para os script das aplicação");

var list = [
  {"description": "Entrada de teste", "value": "29.90", "type": "E", "date": "23/07/2017"},
  {"description": "Saida de teste", "value": "9.90", "type": "S", "date": "24/07/2017"},
  {"description": "Entrada de teste 2", "value": "1.90", "type": "E", "date": "24/07/2017"},
  {"description": "Saida de teste 2", "value": "2.50", "type": "S", "date": "24/07/2017"},
  {"description": "Saida de teste 3", "value": "0.30", "type": "S", "date": "24/07/2017"},
];

function getTotalEntrada(list){
  var total = 0;
  for(var key in list){
    if(list[key].type === "E"){
      total += parseFloat(list[key].value);
    }
  }
  document.getElementById('totalEntrada').innerHTML = formatValue(total);
  return parseFloat(total);
}

function getTotalSaida(list){
  var total = 0;
  for(var key in list){
    if(list[key].type === "S"){
      total += parseFloat(list[key].value);
    }
  }
  document.getElementById('totalSaida').innerHTML = formatValue(total);
  return parseFloat(total);
}

function getTotal(list){
  var total = getTotalEntrada(list) - getTotalSaida(list);
  document.getElementById('totalValue').innerHTML = formatValue(total);
  console.log(total);
}

function formatDesc(desc){
  var str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

function formatValue(value){
  var str = parseFloat(value).toFixed(2) + "";
  str = str.replace(".", ",");
  str = "R$ " + str;
  return str;
}

function formatDate(date){
  var date = date.split("-");
  return date[2] + "/" + date[1] + "/" + date[0];
}

function formatType(type){
  if(type === "E"){
    return "Entrada";
  } else {
    return "Saida";
  }
}

function setList(list){
  var table = '<thead><tr>';
  table += '<td style="text-align: center;"><strong>Descrição</strong></td>';
  table += '<td style="text-align: center;"><strong>Valor</strong></td>';
  table += '<td style="text-align: center;"><strong>Tipo</strong></td>';
  table += '<td style="text-align: center;"><strong>Data</strong></td>';
  table += '<td style="text-align: center;"><strong>Funções</strong></td>';
  table += '</tr></thead><tbody>';
  for(var key in list){
    table += '<tr>';
    table += '<td style="color: #4248f4;">'+ formatDesc(list[key].description) +'</td>';
    table += '<td style="text-align: center;">'+ formatValue(list[key].value) +'</td>';
    table += '<td style="text-align: center;color: #4248f4;">'+ formatType(list[key].type) +'</td>';
    table += '<td style="text-align: center;">'+ list[key].date +'</td>';
    table += '<td style="text-align: center;">';
    table += '<button class="btn btn-default" onclick="setUpdate(' + key + ');">Editar</button>';
    table += '&nbsp;'
    table += '<button class="btn btn-default" onclick="deleteData(' + key + ');">Apagar</button>';
    table += '</td>';
    table += '</tr>';
  }
  table += '</tody>';
  document.getElementById('listTable').innerHTML = table;
  getTotal(list);
  saveListStorage(list);
}

function resetForm(){
  document.getElementById('description').value = "";
  document.getElementById('value').value = "";
  document.getElementById('type').value = "";
  document.getElementById('date').value = "";
  document.getElementById('btnUpdate').style = 'display: none';
  document.getElementById('btnAdd').style = 'display: inline-block';
  document.getElementById('inputIdUpdate').innerHTML = "";
}

function addData(){
  var description = document.getElementById('description').value;
  var value       = document.getElementById('value').value;
  var type        = document.getElementById('type').value;
  var date        = document.getElementById('date').value;
  list.unshift({"description": description, "value": value, "type": type, "date": date});
  resetForm();
  setList(list);
}

function deleteList(){
  if(confirm("Apagar os lançamentos?")){
    list = [];
    setList(list);
  }
}

function setUpdate(key){
  alert("Função(setUpdate(" + key + ")) ainda não implementada.");
}

function deleteData(key){
  alert("Função(deleteData(" + key + ")) ainda não implementada.");
}

function saveListStorage(list){
  var jsonStr = JSON.stringify(list);
  localStorage.setItem("fonteEterna", jsonStr);
}

function initListStorage(){
  var testList = localStorage.getItem("fonteEterna");
  if(testList){
    list = JSON.parse(testList);
  }
  setList(list);
}

initListStorage();
