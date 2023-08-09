const inputs = document.querySelectorAll(".input_container input");
const billAmountInput = inputs[0];
const numOfGuestsInput = inputs[1];
const selectEl = document.getElementById("serviceQuality");
const calculateButton = document.querySelector(".btn");
const popUpBox = document.getElementById("popup-box");

const serviceQualityObj = {
  outstanding: 0.3,
  good: 0.2,
  "it was ok": 0.15,
  bad: 0.1,
  terrible: 0.05,
};

function getInputedValues() {
  let billAmount;
  let numOfGuests;
  let tipPercentage;

  if (
    billAmountInput.value.trim() !== "" &&
    numOfGuestsInput.value.trim() !== "" &&
    selectEl.value.trim() !== ""
  ) {
    billAmount = +billAmountInput.value.trim();
    numOfGuests = +numOfGuestsInput.value.trim();
    let serviceQuality = selectEl.value.trim();
    tipPercentage = serviceQualityObj[serviceQuality];
  } else {
    if (billAmount < numOfGuests) {
      alert("Please enter the invalid numbers");
    }
    alert("Please fulfill the all fields");
    return;
  }

  billAmountInput.value = "";
  numOfGuestsInput.value = "";
  selectEl.value = "";

  return [billAmount, numOfGuests, tipPercentage];
}

function calculateBill() {
  let [billAmount, numOfGuests, tipPercentage] = getInputedValues();

  let tipPerPerson = (billAmount * tipPercentage) / numOfGuests;
  let totalPerPerson = (billAmount * (1 + tipPercentage)) / numOfGuests;

  popUpBox.innerHTML = `<p>Tip for Each Person: ${tipPerPerson.toPrecision(
    3
  )}$</p>
    <p>Total(Bill + Tip) for Each Person: ${totalPerPerson.toPrecision(
      3
    )}$</p>`;
}

calculateButton.addEventListener("click", () => {
  calculateBill();

  popUpBox.classList.add("pop_up");

  setTimeout(() => {
    popUpBox.classList.remove("pop_up");
    popUpBox.innerText = '';
  }, 5000);
});
