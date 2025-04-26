const bbOption = document.getElementById("cafe-bb");
const tvcOption = document.getElementById("cafe-tvc");
const yckOption = document.getElementById("cafe-yck");
const tdOption = document.getElementById("cafe-td");
const crfOption = document.getElementById("cafe-crf");
const mgkOption = document.getElementById("cafe-mgk");
const mrcOption = document.getElementById("cafe-epp");
const cifOption = document.getElementById("cafe-cif");

const chowBalance = document.getElementById("chow-bal");

function addCommas(val) {
  x = parseInt(val);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener("DOMContentLoaded", function () {
  useChowBal = localStorage.getItem("myChowBal");
  formatChowBal = addCommas(useChowBal) + ".00";
  chowBalance.innerHTML = formatChowBal;
});

bbOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Burger & Bread");
  window.parent.location.href = "../order.html";
});

tvcOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Tasty Vine Kitchen");
  window.parent.location.href = "../order.html";
});

yckOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Your Choice Kitchen");
  window.parent.location.href = "../order.html";
});

tdOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Tasty Delight");
  window.parent.location.href = "../order.html";
});

crfOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Cresta");
  window.parent.location.href = "../order.html";
});

mgkOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Marigold Kitchen");
  window.parent.location.href = "../order.html";
});

mrcOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Eat and Play Palace");
  window.parent.location.href = "../order.html";
});

cifOption.addEventListener("click", () => {
  localStorage.setItem("usrCafeOption", "Citrus Food");
  window.parent.location.href = "../order.html";
});
