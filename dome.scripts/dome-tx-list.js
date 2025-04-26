
const prevRefID = document.getElementById("used-txid");
const prevDate = document.getElementById("used-date");
const prevCafe = document.getElementById("used-cafe");
const prevCost = document.getElementById("used-cost");


prevRefID.textContent = localStorage.getItem("usedRefID");
prevDate.textContent = localStorage.getItem("usedDate");
prevCafe.textContent = localStorage.getItem("usedCafe");
prevCost.textContent = localStorage.getItem("usedAmt");