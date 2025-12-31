function applyLoan(event) {
    event.preventDefault();
    document.getElementById("loanStatus").innerText =
        "Loan application submitted. Our team will contact you shortly.";
}

function sendMessage(event) {
    event.preventDefault();
    document.getElementById("supportStatus").innerText =
        "Thank you for contacting EasyFunds support.";
}

function openLauncher() {
  //Genesys("command", "Launcher.show");
   Genesys(
    'command',
    'Messenger.open',
    {},
    () => {
     /*fulfilled callback*/
     console.log('Messenger opened');
    },
    (error) => {
     /*rejected callback*/
     console.log("Couldn't open messenger.", error);
    }
  );

}

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('chatLauncherBtn');
  if (btn) {
    btn.addEventListener('click', openLauncher);
  }
});