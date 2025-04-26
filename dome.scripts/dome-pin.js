
// Initialize the iOS modal units
const cupertinoModal = document.getElementById("cupertinoModalMain");
const cupertinoDialog = document.getElementById("cupertinoDialog");
const cupertinoTitle = document.getElementById("cupertinoTitle");
const cupertinoContent = document.getElementById("cupertinoContent");
const cupertinoAlertBtn = document.getElementById("cupertinoModalBtn");

// Initialize the Android modal units
const materialModal = document.getElementById("materialModalMain");
const materialDialog = document.getElementById("materialDialog");
const materialTitle = document.getElementById("materialTitle");
const materialContent = document.getElementById("materialContent");
const materialAlertBtn = document.getElementById("materialModalBtn");

/* HEADER - Modal Code */
function openiOSDialog() {
    const cupertinoModal = document.getElementById("cupertinoModalMain");
    const cupertinoDialog = document.getElementById("cupertinoDialog");
  
    cupertinoModal.classList.add('animate-fadeInBackground');
    cupertinoDialog.classList.add('animate-fadeIn');
    cupertinoModal.classList.remove('hidden');
  
    setTimeout(function() {
      cupertinoModal.classList.remove('animate-fadeInBackground');
      cupertinoDialog.classList.remove('animate-fadeIn');
    }, 1000);
  }
  
  function closeiOSDialog() {
    const cupertinoModal = document.getElementById("cupertinoModalMain");
    const cupertinoDialog = document.getElementById("cupertinoDialog");
    
    cupertinoModal.classList.add('animate-fadeOutBackground');
    cupertinoDialog.classList.add('animate-fadeOut');
  
    setTimeout(function() {
      cupertinoModal.classList.remove('animate-fadeOutBackground');
      cupertinoDialog.classList.remove('animate-fadeOut');
      cupertinoModal.classList.add('hidden');
    }, 100);
  }
  
  function openAndroidDialog() {
    const materialModal = document.getElementById("materialModalMain");
    const materialDialog = document.getElementById("materialDialog");
  
    materialModal.classList.remove('hidden');
  }
  
  function closeAndroidDialog() {
    const materialModal = document.getElementById("materialModalMain");
    const materialDialog = document.getElementById("materialDialog");
    
    materialModal.classList.add('animate-fadeOutBackground');
    materialDialog.classList.add('animate-fadeOut');
  
    setTimeout(function() {
      materialModal.classList.remove('animate-fadeOutBackground');
      materialDialog.classList.remove('animate-fadeOut');
      materialModal.classList.add('hidden');
    }, 100);
  }
  
  cupertinoAlertBtn.addEventListener("click", () => {
    closeiOSDialog();
  });
  
  materialAlertBtn.addEventListener("click", () => {
    closeAndroidDialog();
  });
  
  function useModalState(title, content) {
    // Initialize necessary variables
    let devicePlatform = localStorage.getItem("appPlatform");
  
    if (devicePlatform === "iOS") {
      cupertinoTitle.innerHTML = title;
      cupertinoContent.innerHTML = content;
      openiOSDialog();
  
    } else if (devicePlatform === "AndroidOS") {
      materialTitle.innerHTML = title;
      materialContent.innerHTML = content;
      openAndroidDialog();
    }
    else {
      console.log("No modal to show!");
    }
  }
/* FOOTER - Modal Code */

const resetOTPButton = document.getElementById("pin_reset");
const currentOTPNode = document.getElementById("usr_currentpin");
const newOTPNode = document.getElementById("usr_newpin");
const confirmOTPNode = document.getElementById("usr_confirmpin");

// Function to restrict input to 4 digits
function enforceFourDigitLimit(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4); // Limit to 4 characters
    }
}

// Add input event listeners to enforce 4-digit limit
currentOTPNode.addEventListener("input", enforceFourDigitLimit);
newOTPNode.addEventListener("input", enforceFourDigitLimit);
confirmOTPNode.addEventListener("input", enforceFourDigitLimit);

resetOTPButton.addEventListener("click", () => {
    const authCurrentOTP = localStorage.getItem("baseUserOTP");
    const usrCurrentOTP = currentOTPNode.value;
    const usrNewOTP = newOTPNode.value;
    const usrConfirmOTP = confirmOTPNode.value;

    if (usrCurrentOTP !== authCurrentOTP) {
        useModalState("Error","Unable to reset user PIN!");
        console.error("Current OTP is incorrect");
        currentOTPNode.value = "";
    } else if (usrNewOTP !== usrConfirmOTP) {
        useModalState("Error","Please ensure your new pins match!");
        console.error("New OTP and confirm OTP do not match");
        newOTPNode.value = "";
        confirmOTPNode.value = "";
    } else {
        localStorage.setItem("baseUserOTP", usrNewOTP);
        localStorage.setItem("currentPINConfig", "active");
        console.log("PIN reset successful");
        useModalState("Success","Your user PIN has been reset!");

        currentOTPNode.value = '';
        newOTPNode.value = '';
        confirmOTPNode.value = '';
    }
});
