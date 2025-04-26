
const profileHeader = document.getElementById("hd_profile");

let firstName = localStorage.getItem("usrFirstName");
let lastName = localStorage.getItem("usrLastName");

profileHeader.innerHTML = firstName + " " + lastName;