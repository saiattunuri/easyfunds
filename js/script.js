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
