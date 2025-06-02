document.getElementById("loginBtn").addEventListener("click", async () => {
  const scopes = ['username', 'payments'];
  try {
    const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log('Pi user authenticated:', result);
    document.getElementById("output").innerText = `Korisnik: ${result.user.username}`;
  } catch (error) {
    console.error('Autentifikacija nije uspela:', error);
  }
});

function onIncompletePaymentFound(payment) {
  console.log('Nedovršena uplata:', payment);
}
