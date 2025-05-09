async function fetchData() {
  try {
    const response = await fetch(
      "https://scrupulousdeveloper.github.io/softchow/dome.models/users.db.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Initialize Login Form Components
const loginButton = document.getElementById("login_btn");
const registerButton = document.getElementById("reg_btn");
const loginUsrInput = document.getElementById("login_usr");
const loginPwdInput = document.getElementById("login_pwd");

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

function openiOSDialog() {
  const cupertinoModal = document.getElementById("cupertinoModalMain");
  const cupertinoDialog = document.getElementById("cupertinoDialog");

  cupertinoModal.classList.add("animate-fadeInBackground");
  cupertinoDialog.classList.add("animate-fadeIn");
  cupertinoModal.classList.remove("hidden");

  setTimeout(function () {
    cupertinoModal.classList.remove("animate-fadeInBackground");
    cupertinoDialog.classList.remove("animate-fadeIn");
  }, 1000);
}

function closeiOSDialog() {
  const cupertinoModal = document.getElementById("cupertinoModalMain");
  const cupertinoDialog = document.getElementById("cupertinoDialog");

  cupertinoModal.classList.add("animate-fadeOutBackground");
  cupertinoDialog.classList.add("animate-fadeOut");

  setTimeout(function () {
    cupertinoModal.classList.remove("animate-fadeOutBackground");
    cupertinoDialog.classList.remove("animate-fadeOut");
    cupertinoModal.classList.add("hidden");
  }, 100);
}

function openAndroidDialog() {
  const materialModal = document.getElementById("materialModalMain");
  const materialDialog = document.getElementById("materialDialog");

  materialModal.classList.remove("hidden");
}

function closeAndroidDialog() {
  const materialModal = document.getElementById("materialModalMain");
  const materialDialog = document.getElementById("materialDialog");

  materialModal.classList.add("animate-fadeOutBackground");
  materialDialog.classList.add("animate-fadeOut");

  setTimeout(function () {
    materialModal.classList.remove("animate-fadeOutBackground");
    materialDialog.classList.remove("animate-fadeOut");
    materialModal.classList.add("hidden");
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
  } else {
    console.log("No modal to show!");
  }
}

function processUserPass(userPass) {
  const authPayload = atob(userPass);
  const fragments = authPayload.split(",");

  // Validate the bit integrity of the payload
  if (fragments.length !== 3) {
    throw new Error("The authentication payload is invalid!");
  }

  // Re-assign authentication fragments
  const authState = fragments[0];
  const authUsr = fragments[1];
  const authPwd = fragments[2];

  return {
    dbsAuth: fragments,
    dbsAuthState: authState,
    dbsAuthUsr: authUsr,
    dbsAuthPwd: authPwd,
  };
}
registerButton.addEventListener("click", () => {
  useModalState("Notice", "Please contact the service provider.");
});

loginButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const userUsr = loginUsrInput.value.trim();
  const userPwd = loginPwdInput.value.trim();

  // Validate username and password
  if (!userUsr && !userPwd) {
    loginUsrInput.value = "";
    useModalState("Error", "Please enter your login details to continue!");
    console.error("Username and password are required!");
    loginUsrInput.focus();
    return;
  } else if (!userUsr) {
    useModalState("Error", "A username is required to login!");
    console.error("Username is required!");
    loginUsrInput.focus();
    return;
  } else if (!userPwd) {
    useModalState("Error", "A password is required to login!");
    console.error("Password is required!");
    loginPwdInput.focus();
    return;
  }

  try {
    const data = await fetchData();
    if (data) {
      // Check if user data is fetched and available
      const userObject = data[userUsr];
      if (userObject) {
        const userName = userObject.authInfo.username;
        const userPass = userObject.authInfo.secureKey;

        const { dbsAuthState, dbsAuthUsr, dbsAuthPwd } =
          processUserPass(userPass);
        const addBalance = userObject.accVariables.chowBalance;
        const defaultOTP = userObject.accVariables.pin;

        const userFirstName = userObject.accInfo.firstName;
        const userLastName = userObject.accInfo.lastName;
        const userMiddleName = userObject.accInfo.middleName;
        const userMatricNo = userObject.accInfo.matricNo;
        const userEmailAddr = userObject.accInfo.emailAddr;
        const userNextFunding = userObject.accInfo.nxtFunding;

        // Ensure atomic check for all conditions
        if (
          dbsAuthState === "auth=0x" &&
          dbsAuthUsr === userName &&
          dbsAuthPwd === userPwd
        ) {
          console.log("Success, all authentication checks passed");
          sessionStorage.setItem("appAuthState", dbsAuthState);
          console.log("Authentication state saved to session storage");

          // Transactions Logic
          const transactionConfig = localStorage.getItem("useDummyList");
          if (transactionConfig === null) {
            // use list
            let txNodes = dummyTransactions;
            localStorage.setItem("transactionBase", JSON.stringify(txNodes));
            localStorage.setItem("useDummyList", "active");
          } else {
            // login in without inject.
            console.log("User has transactions available!");
          }

          // Dashboard Logic
          const chowBalConfig = localStorage.getItem("initChowBal");
          console.log(chowBalConfig);

          if (chowBalConfig === null) {
            localStorage.setItem("initChowBal", "active");
            localStorage.setItem("myChowBal", "100000");
          } else {
            // leave this for update feature
            console.log("Balance updates from the server is not available!");
          }
          window.location.href = "./dome.routes/dashboard.html";

          localStorage.setItem("usrFirstName", userFirstName);
          localStorage.setItem("usrLastName", userLastName);
          localStorage.setItem("usrMiddleName", userMiddleName);
          localStorage.setItem("usrMatricNo", userMatricNo);
          localStorage.setItem("usrEmail", userEmailAddr);
          localStorage.setItem("usrFundingDate", userNextFunding);

          const otpConfigState = localStorage.getItem("currentPINConfig");
          console.log(otpConfigState);

          if (otpConfigState === null) {
            localStorage.setItem("baseUserOTP", defaultOTP);
          } else {
            console.log("Default OTP will not be used");
          }
        } else {
          if (dbsAuthState !== "auth=0x") {
            console.error("Invalid authentication controller");
          }
          if (dbsAuthUsr !== userName) {
            console.error("Invalid authentication user payload!");
          }
          if (dbsAuthPwd !== userPwd) {
            loginPwdInput.value = "";
            useModalState("Error", "Failed to authenticate this user!");
            console.error("Invalid authentication key");
            loginPwdInput.focus();
          }
        }
      } else {
        loginUsrInput.value = "";
        useModalState("Error", "The user info provided does not exist!");
        console.error("Invalid username, user does not exist!");
        loginUsrInput.focus();
      }
    } else {
      useModalState("Error", "An error occurred connecting to the server");
      console.error(
        "An error occurred connecting to the server. Please try again later!"
      );
    }
  } catch (error) {
    console.error("Error handling data:", error);
  }

  // Clear input fields after processing
  loginUsrInput.value = "";
  loginPwdInput.value = "";
});
