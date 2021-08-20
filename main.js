var bill = document.querySelector(".bill");
var total = document.querySelector(".total");
var people_num = document.querySelector(".people-number");
var tips_percent = document.querySelectorAll(".unchange-percentage");
var customTip = document.querySelector(".custom-percentage");
var people_input = document.querySelector(".people");
var tipAmount = document.querySelector(".tip");
var resetBtn = document.querySelector(".reset");

// Calculate the tip amount and return output
function typeOfSelectTip() {
  let activeTip = document.querySelector(".active");
  let x = Number(bill.value) / Number(people_num.value);
  if (people_num.value > 0) {
    if (activeTip) {
      tipAmount.innerText = `$${parseFloat(
        (x * Number(activeTip.value)) / 100
      ).toFixed(2)}`;
    } else if (customTip.value !== "") {
      tipAmount.innerText = `$${parseFloat(
        (x * Number(customTip.value)) / 100
      ).toFixed(2)}`;
    } else {
      tipAmount.innerText = "$0.00";
    }
  }
}
// Calculate the total and return output
function caculateTotal() {
  let activeTip = document.querySelector(".active");
  let x = Number(bill.value) / Number(people_num.value);
  if (people_num.value > 0) {
    if (activeTip) {
      total.innerText = `$${parseFloat(
        x * (Number(activeTip.value) / 100 + 1)
      ).toFixed(2)}`;
    } else if (customTip.value !== "") {
      total.innerText = `$${parseFloat(
        x * (Number(customTip.value) / 100 + 1)
      ).toFixed(2)}`;
    } else {
      total.innerText = `$${parseFloat(x).toFixed(2)}`;
    }
  }
}
// Check the reset button active (change the color of reset Button)
function reset() {
  let activeTip = document.querySelector(".active");
  if (
    activeTip ||
    bill.value !== "" ||
    people_num.value !== "" ||
    customTip.value !== ""
  ) {
    resetBtn.classList.add("active-reset");
  } else {
    resetBtn.classList.remove("active-reset");
  }
}

function start() {
  // Check the bill input and return output
  bill.onkeyup = function () {
    typeOfSelectTip();
    caculateTotal();
    reset();
  };
  // Check the people-number input and return output
  people_num.onkeyup = function () {
    typeOfSelectTip();
    caculateTotal();
    reset();
    if (people_num.value === "" || people_num.value == 0) {
      people_input.classList.add("error");
    }
  };

  people_num.oninput = function () {
    people_input.classList.remove("error");
  };
  // Check the Select Tip input
  tips_percent.forEach(function (tip) {
    tip.onclick = function () {
      let activeTip = document.querySelector(".active");
      // Check the value of the custom input
      if (customTip.value !== "") {
        customTip.value = "";
      } else if (activeTip && activeTip !== tip) {
        activeTip.classList.remove("active");
      }
      tip.classList.toggle("active");
      typeOfSelectTip();
      caculateTotal();
      reset();
    };
  });

  // if user blur the custom input

  customTip.onkeyup = function () {
    let activeTip = document.querySelector(".active");
    if (activeTip && customTip.value !== "") {
      activeTip.classList.remove("active");
    }
    typeOfSelectTip();
    caculateTotal();
    reset();
  };

  // When user click on the reset Button
  resetBtn.onclick = function () {
    let activeReset = document.querySelector(".active-reset");
    let activeTip = document.querySelector(".active");
    if (activeReset) {
      if (activeTip) {
        activeTip.classList.remove("active");
      }
      bill.value = "";
      people_num.value = "";
      customTip.value = "";
      tipAmount.innerText = "$0.00";
      total.innerText = "$0.00";
      resetBtn.classList.remove("active-reset");
      people_input.classList.remove("error");
    }
  };
}
start();
