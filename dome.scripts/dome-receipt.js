
const viewReceipt = document.getElementById("verify_success");
const validateReceipt = document.getElementById("vbtn");
const refID = document.getElementById("txid");
const verifyDate = document.getElementById("date");
const verifyCafe = document.getElementById("cafe");
const verifyAmt = document.getElementById("cost");

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

function showHome() {
    const listItem = document.getElementById("success");
    const homeView = document.getElementById("home");
    listItem.remove();
    homeView.classList.remove("hidden");

    window.location.hash = "#home";

    setTimeout(function(){
        const finalListItem = document.getElementById("receipt");
        finalListItem.remove();
    }, 500);
}

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
    setTimeout(function(){
        showHome();
    }, 100);
  });
  
  materialAlertBtn.addEventListener("click", () => {
    closeAndroidDialog();
    setTimeout(function(){
        showHome();
    }, 100);
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

/* HEADER - Spinner Code */
function cupertinoSpinner() {
    var spinnerBase = document.createElement("div");
    spinnerBase.className = "ispinner";
    spinnerBase.id = "cspin";
  
    for (var i = 0; i < 8; i++) {
        var spinnerBlade = document.createElement("div");
        spinnerBlade.className = "ispinner-blade";
        spinnerBase.appendChild(spinnerBlade);
    }

    return spinnerBase;
}

function materialSpinner() {
    var spinnerNode = document.createElement("span");
    spinnerNode.className = "main-spinner";
    spinnerNode.id = "cspin";

    return spinnerNode;
}

function useSpinner() {
// Initialize necessary variables
  let devicePlatform = localStorage.getItem("appPlatform");

  if (devicePlatform === "iOS") {
    return cupertinoSpinner();

  } else if (devicePlatform === "AndroidOS") {
    return materialSpinner();
  }
  else {
    useModalState("Error","This feature is not supported!")
  }
}

/* FOOTER - Spinner Code */

viewReceipt.addEventListener("click", () => {
    callHash = localStorage.getItem("usrOrderRef");
    callDate = localStorage.getItem("usrOrderDT");
    callCafe = localStorage.getItem("usrCafeOption");
    callAmt = localStorage.getItem("usrOrderAmt");

    refID.innerHTML = callHash;
    verifyDate.innerHTML = callDate;
    verifyCafe.innerHTML = callCafe;
    verifyAmt.innerHTML = "&#8358;" + callAmt;
});

validateReceipt.addEventListener("click", () => {
    validateReceipt.innerHTML = "";

    var handleSpinner = document.createElement("div");
    handleSpinner.className = "cupertino flex justify-center";

    handleSpinner.appendChild(useSpinner());
    validateReceipt.appendChild(handleSpinner);

    setTimeout(function(){
        useModalState("Success","The transaction receipt is valid.");
        validateReceipt.innerHTML = "Validate";
      }, 1000);
});

// TEST only - find a better way to point to success creen on load!
window.addEventListener("load", () => {
    // nada
});