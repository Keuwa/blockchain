var time = 20;
var intervalID
var name = "Keuwa" // A supprimer quand le login sera OK
var bidData
var maxValue = 0
window.setInterval(getBids, 2000);



function printTimer() { //Affiche le timer restant dans le bouton et décrémente le time
  time-=1;
  if(time==0){
    timeOver()
  }
  else{
    $("#timer").text(time);
  }
}

function resetTimer() { //
  time = 20
  $("#timer").text(time);
  clearInterval(intervalID)
  setTimer()
}

function setTimer() {
  intervalID = window.setInterval(printTimer, 1000);
  $('#timer').prop('onclick',null).off('click');
}

function timeOver() {
    console.log("Alert")
    clearInterval(intervalID)
}

function bidSend() { //Envoie de l'enchere et ajout dans la liste
  var value = $('#bidValue').val()
  if(value<=maxValue){
    alert("C'est pas bien")
  }
  console.log($('#bidValue').text());
  $("#bidList").append('<li> '+name+' : '+value+' </li>'); //TODO A modifier par un ajout en BDD

  resetTimer()
}

function printBidData() { //Affichage et set Max value pour pas bid inferieur
  $('#bidList').empty()
  for(i in bidData){
    maxValue = maxValue<=bidData[i]?bidData[i]:maxValue //set max value here
    $("#bidList").append('<li> '+i+' : '+bidData[i]+' </li>');
  }
}

function getBids() { //Appel a la page server/index.php pour récup les donnés
  $.get("server/index.php", function(data, status){
      bidData = JSON.parse(data);
      console.log("Data: " + data + "\nStatus: " + status);
      printBidData()
    });
}
