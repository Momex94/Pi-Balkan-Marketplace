import React from "react";

function PiPaymentButton() {
  const makePayment = async () => {
    const paymentData = {
      amount: 0.001, // minimalna količina za test
      memo: "Test payment",
      metadata: { type: "test-payment" },
      to: "username_tvoje_aplikacije", // OBAVEZNO promeni u svoj Pi username
    };

    try {
      const payment = window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Payment ready for server approval", paymentId);
          // opcionalno: pošalji na svoj backend radi validacije
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready for server completion", paymentId, txid);
          // opcionalno: potvrdi serverom
        },
        onCancel: (paymentId) => {
          console.log("Payment cancelled", paymentId);
        },
        onError: (error, paymentId) => {
          console.error("Payment failed", error, paymentId);
        },
      });

      console.log("Payment initiated", payment);
    } catch (err) {
      console.error("Error starting payment", err);
    }
  };

  return <button onClick={makePayment}>Pay 0.001 Pi</button>;
}

export default PiPaymentButton;
