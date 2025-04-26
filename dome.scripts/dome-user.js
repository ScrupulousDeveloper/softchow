
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

const usrProfileName = document.getElementById("profile-user");
const usrMatricID = document.getElementById("profile-matric");
const logoutButton = document.getElementById("btn_logout");
const dockFirstName = document.getElementById("usr_firstname");
const dockLastName = document.getElementById("usr_lastname");
const dockMiddleName = document.getElementById("usr_othername");
const dockEmail = document.getElementById("usr_email");
const dockNextDate = document.getElementById("usr_nextdate");
const resetPINButton = document.getElementById("btn_resetpin");

const deleteButton = document.getElementById("btn_delete");
const updateButton = document.getElementById("btn_update");
const userPicButton = document.getElementById("btn_userpic");

let firstName = localStorage.getItem("usrFirstName");
let lastName = localStorage.getItem("usrLastName");
let middleName = localStorage.getItem("usrMiddleName");
let matricNo = localStorage.getItem("usrMatricNo");
let email = localStorage.getItem("usrEmail");
let fundingDate = localStorage.getItem("usrFundingDate");

usrProfileName.innerHTML = firstName + " " + lastName;
usrMatricID.innerHTML = matricNo;
dockFirstName.value = firstName;
dockLastName.value = lastName;
dockMiddleName.value = middleName;
dockEmail.value = email;
dockNextDate.value = fundingDate;

deleteButton.addEventListener("click", () => {
    useModalState("Delete Account","Contact the admin for user removals!");
});

updateButton.addEventListener("click", () => {
    useModalState("Access Denied","Admin authorization is required!");
});

userPicButton.addEventListener("click", () => {
    useModalState("Permission Denied","No access to media content!")
});

logoutButton.addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.removeItem("usrFirstName");
    localStorage.removeItem("usrLastName");
    localStorage.removeItem("usrMiddleName");
    localStorage.removeItem("usrMatricNo");
    localStorage.removeItem("usrFundingDate");

    localStorage.setItem("usrOrderAmt", "");
    localStorage.setItem("usrCafeOption", "");
    localStorage.setItem("usrOrderRef", "");
    localStorage.setItem("usrOrderDT", "");
    console.log("Your have been signed out!");
    window.location.href = "../index.html";
});

resetPINButton.addEventListener("click", () => {
    window.location.href = "./profile/resetpin.html";
});