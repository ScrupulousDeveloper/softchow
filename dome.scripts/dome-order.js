// Generate a unique transaction reference
const generateOrderRef = () => {
  const prefix = "#663";
  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  return prefix + genRanHex(21);
};

// Format current date and time
const formatOrderDate = () => {
  const now = new Date();

  const dateStr = now.toDateString();
  const hrs = now.getHours().toString().padStart(2, "0");
  const mins = now.getMinutes().toString().padStart(2, "0");
  const secs = now.getSeconds().toString().padStart(2, "0");
  const timeStr = `${hrs}:${mins}:${secs}`;

  return `${dateStr} at ${timeStr}`;
};

// iOS modal elements
const cupertinoModal = document.getElementById("cupertinoModalMain");
const cupertinoDialog = document.getElementById("cupertinoDialog");
const cupertinoTitle = document.getElementById("cupertinoTitle");
const cupertinoContent = document.getElementById("cupertinoContent");
const cupertinoAlertBtn = document.getElementById("cupertinoModalBtn");

// Android modal elements
const materialModal = document.getElementById("materialModalMain");
const materialDialog = document.getElementById("materialDialog");
const materialTitle = document.getElementById("materialTitle");
const materialContent = document.getElementById("materialContent");
const materialAlertBtn = document.getElementById("materialModalBtn");

function openiOSDialog() {
  cupertinoModal.classList.add("animate-fadeInBackground");
  cupertinoDialog.classList.add("animate-fadeIn");
  cupertinoModal.classList.remove("hidden");

  setTimeout(() => {
    cupertinoModal.classList.remove("animate-fadeInBackground");
    cupertinoDialog.classList.remove("animate-fadeIn");
  }, 1000);
}

function closeiOSDialog() {
  cupertinoModal.classList.add("animate-fadeOutBackground");
  cupertinoDialog.classList.add("animate-fadeOut");

  setTimeout(() => {
    cupertinoModal.classList.remove("animate-fadeOutBackground");
    cupertinoDialog.classList.remove("animate-fadeOut");
    cupertinoModal.classList.add("hidden");
  }, 100);
}

function openAndroidDialog() {
  materialModal.classList.remove("hidden");
}

function closeAndroidDialog() {
  materialModal.classList.add("animate-fadeOutBackground");
  materialDialog.classList.add("animate-fadeOut");

  setTimeout(() => {
    materialModal.classList.remove("animate-fadeOutBackground");
    materialDialog.classList.remove("animate-fadeOut");
    materialModal.classList.add("hidden");
  }, 100);
}

cupertinoAlertBtn.addEventListener("click", closeiOSDialog);
materialAlertBtn.addEventListener("click", closeAndroidDialog);

function useModalState(title, content) {
  const devicePlatform = localStorage.getItem("appPlatform");

  if (devicePlatform === "iOS") {
    cupertinoTitle.innerHTML = title;
    cupertinoContent.innerHTML = content;
    openiOSDialog();
  } else if (devicePlatform === "AndroidOS") {
    materialTitle.innerHTML = title;
    materialContent.innerHTML = content;
    openAndroidDialog();
  } else {
    console.log("No modal to show!");
  }
}

// Elements
const exitOrder = document.getElementById("cancelOrderProcess");
const scanQRButton = document.getElementById("order_scan");
const tapQRButton = document.getElementById("order_rescan");
const cancelQROperation = document.getElementById("order_cancel");
const closeOrder = document.getElementById("order_close");
const orderPayment = document.getElementById("order_pay");
const orderVenue = document.getElementById("order_venue");
const orderAmt = document.getElementById("order_amt");

const orderInput = document.getElementById("orderAmtInput");
const orderOTP = document.getElementById("order_otp");
const orderLastOTP = document.getElementById("last_otp");

// Input enforcement
function enforceFourDigitLimit(event) {
  const input = event.target;
  input.value = input.value.replace(/\D/g, ""); // Remove non-digits
  if (input.value.length > 4) {
    input.value = input.value.slice(0, 4);
  }
}

// Transaction handlers
function createTransaction(refID, dateAtYear, venue, amount) {
  return { refID, dateAtYear, venue, amount };
}

function addTransaction(usrTransaction) {
  let useTXBase = JSON.parse(localStorage.getItem("transactionBase")) || [];
  if (useTXBase.length === 15) {
    useTXBase.pop();
  }
  useTXBase.unshift(usrTransaction);
  localStorage.setItem("transactionBase", JSON.stringify(useTXBase));
}

// Events
orderInput.addEventListener("input", enforceFourDigitLimit);

exitOrder.addEventListener("click", () => {
  window.location.href = "./dashboard.html";
  localStorage.setItem("usrOrderAmt", "");
  localStorage.setItem("usrCafeOption", "");
  localStorage.setItem("usrOrderRef", "");
  localStorage.setItem("usrOrderDT", "");
});

scanQRButton.addEventListener("click", () => {
  const usrAmount = parseInt(orderInput.value, 10);

  if (isNaN(usrAmount)) {
    useModalState("Invalid Entry", "Please enter a valid amount.");
    return;
  }

  if (usrAmount > 80000) {
    orderInput.value = "";
    useModalState("Attention", "You can only spend 80000 per transaction!");
  } else if (usrAmount < 10) {
    orderInput.value = "";
    useModalState("Attention", "Enter an amount greater than 10");
  } else {
    localStorage.setItem("usrOrderAmt", usrAmount.toString());
    window.location.hash = "#qrscan";
  }
});

cancelQROperation.addEventListener("click", () => {
  window.location.href = "./dashboard.html";
  localStorage.setItem("usrOrderAmt", "");
  localStorage.setItem("usrCafeOption", "");
  localStorage.setItem("usrOrderRef", "");
  localStorage.setItem("usrOrderDT", "");
});

closeOrder.addEventListener("click", () => {
  window.location.href = "./dashboard.html";
  localStorage.setItem("usrOrderAmt", "");
  localStorage.setItem("usrCafeOption", "");
  localStorage.setItem("usrOrderRef", "");
  localStorage.setItem("usrOrderDT", "");
});

tapQRButton.addEventListener("click", () => {
  const payAmt = localStorage.getItem("usrOrderAmt");
  const payVenue = localStorage.getItem("usrCafeOption");

  orderVenue.innerHTML = payVenue;
  orderAmt.innerHTML = payAmt;
  orderOTP.focus();
});

orderPayment.addEventListener("click", () => {
  const pinInputs = document.querySelectorAll(".pin-input");
  const pinDigits = [];

  if (pinInputs.length !== 4) {
    console.error("Expected exactly 4 pin input fields");
    return;
  }

  for (const input of pinInputs) {
    const val = input.value.trim();
    if (!val) {
      useModalState("Missing Input", "Please fill in all 4 PIN digits.");
      return;
    }
    pinDigits.push(val);
  }

  const completePin = pinDigits.join("");
  localStorage.setItem("liveUserOTP", completePin);

  const authUserPin = localStorage.getItem("baseUserOTP");

  if (completePin !== authUserPin) {
    useModalState("Attention", "Wrong Pin");
    orderLastOTP.focus();
    return;
  }

  const paidAmount = parseInt(localStorage.getItem("usrOrderAmt"), 10);
  const currentBalance = parseInt(localStorage.getItem("myChowBal"), 10);

  if (isNaN(paidAmount) || isNaN(currentBalance)) {
    useModalState("System Error", "Could not verify your balance.");
    return;
  }

  if (paidAmount > currentBalance) {
    useModalState(":(", "You do not have funds for this transaction.");
    setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 2000);
    return;
  }

  const newBalance = currentBalance - paidAmount;
  localStorage.setItem("myChowBal", newBalance.toString());

  const orderRef = generateOrderRef();
  const orderDate = formatOrderDate();
  localStorage.setItem("usrOrderRef", orderRef);
  localStorage.setItem("usrOrderDT", orderDate);

  addTransaction(
    createTransaction(
      orderRef,
      orderDate,
      localStorage.getItem("usrCafeOption"),
      paidAmount.toString()
    )
  );

  window.location.href = "./verify.html";
});

window.addEventListener("load", () => orderInput.focus());
