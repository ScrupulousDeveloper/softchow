const transactionList = document.getElementById("txCardContainer");

function reformatDate(dateStr) {
  // Split the input string into parts
  const [dayOfWeek, month, day, year, , time] = dateStr.split(" ");

  // Combine the parts in the desired format
  return `${dayOfWeek} ${month} ${day} ${time} ${year}`;
}

const useTransBase = localStorage.getItem("transactionBase");
const jsonData = JSON.parse(useTransBase);

function createTransactionCard(txkey, cafe, timestamp, cost) {
  // Create the outermost div
  const cardNode = document.createElement("div");
  cardNode.classList.add("pr-3.5", "pl-3.5", "pt-2.5");

  // Create the button div
  const buttonDiv = document.createElement("div");
  buttonDiv.id = "tx-${txkey}";
  buttonDiv.setAttribute("role", "button");
  buttonDiv.classList.add(
    "btn-0",
    "h-20",
    "bg-gray-100",
    "rounded-lg",
    "w-full"
  );
  cardNode.appendChild(buttonDiv);

  // Add event listener to the button
  buttonDiv.addEventListener("click", () => {
    console.log(`Transaction ${txkey} clicked`);
    localStorage.setItem("usedRefID", jsonData[txkey].refID);
    localStorage.setItem("usedDate", jsonData[txkey].dateAtYear);
    localStorage.setItem("usedCafe", jsonData[txkey].venue);
    localStorage.setItem("usedAmt", jsonData[txkey].amount);

    window.parent.location.href = "./used.html";
  });

  // Create the inner grid div
  const gridDiv = document.createElement("div");
  gridDiv.classList.add(
    "h-20",
    "grid",
    "grid-flow-col",
    "auto-cols-max",
    "py-2.5"
  );
  buttonDiv.appendChild(gridDiv);

  // Create the icon div
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("row-span-3", "ml-2.5");
  gridDiv.appendChild(iconDiv);

  // Create the img element
  const img = document.createElement("img");
  img.classList.add("txv-cafe-icon", "rounded-full");
  img.src = "../../dome.sources/cafe.svg";
  iconDiv.appendChild(img);

  // Create the inner content div
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("pl-2.5");
  gridDiv.appendChild(contentDiv);

  // Create the cafe div
  const cafeDiv = document.createElement("div");
  cafeDiv.classList.add("col-span-2", "w-40", "mt-2");
  contentDiv.appendChild(cafeDiv);

  // Create the h6 element
  const h6 = document.createElement("h6");
  h6.id = "location";
  h6.classList.add("_font", "text-excess", "font-medium", "text-lg");
  cafeDiv.appendChild(h6);
  h6.textContent = cafe;

  // Create the date & time div
  const dateTimeDiv = document.createElement("div");
  dateTimeDiv.classList.add("row-span-2", "col-span-2", "mb-2");
  contentDiv.appendChild(dateTimeDiv);

  // Create the p element
  const p = document.createElement("p");
  p.id = "txtime";
  p.classList.add("_font", "font-medium", "text-xs");
  dateTimeDiv.appendChild(p);
  p.textContent = timestamp;

  // Create the price div
  const priceDiv = document.createElement("div");
  priceDiv.classList.add("row-span-3", "mt-4");
  gridDiv.appendChild(priceDiv);

  // Create the absolute positioned div
  const absoluteDiv = document.createElement("div");
  absoluteDiv.classList.add("absolute", "right-6");
  priceDiv.appendChild(absoluteDiv);

  // Create the h5 element
  const h5 = document.createElement("h5");
  h5.id = "chopprice";
  h5.classList.add(
    "_font",
    "font-bold",
    "text-right",
    "pr-0.5",
    "pt-0.5",
    "text-xl",
    "hyper-text"
  );
  absoluteDiv.appendChild(h5);
  h5.innerHTML = "&#8358;" + cost;

  return cardNode;
}

function generateTransactionCards() {
  if (!transactionList) {
    console.error("Transaction list element not found");
    return;
  }

  const transactionCount = jsonData.length;
  console.log(transactionCount);

  if (transactionCount > 14) {
    const showAllTransactions = document.getElementById("load_tx");
    if (showAllTransactions) {
      showAllTransactions.classList.remove("hidden");
    }
  }

  for (let i = 0; i < transactionCount; i++) {
    const { venue, dateAtYear, amount } = jsonData[i];
    const card = createTransactionCard(
      i,
      venue,
      reformatDate(dateAtYear),
      amount
    );
    transactionList.appendChild(card);
  }
}

const contentContainer = document.getElementById("deliveryContainer");
let isPulling = false;
let startY = null;

contentContainer.addEventListener("touchstart", (event) => {
  startY = event.touches[0].pageY;
});

contentContainer.addEventListener("touchmove", (event) => {
  if (!isPulling && startY) {
    const currentY = event.touches[0].pageY;
    const deltaY = currentY - startY;
    if (deltaY > 50) {
      // Threshold for pull distance
      isPulling = true;
      contentContainer.classList.add("pulling"); // Add CSS class for visual feedback
    }
  }
});

contentContainer.addEventListener("touchend", () => {
  function getRefreshContent() {
    setTimeout(() => {
      document.getElementById("deliveryContainer").classList.remove("hidden");
      document.getElementById("suspenseContainer").classList.add("hidden");
    }, 2000);
  }

  if (isPulling) {
    isPulling = false;
    contentContainer.classList.remove("pulling");
    // Simulate fetching new content (replace with your AJAX call)
    setTimeout(() => {
      document.getElementById("deliveryContainer").classList.add("hidden");
      document.getElementById("suspenseContainer").classList.remove("hidden");

      getRefreshContent();
    }, 1000); // Simulate delay
  }
  startY = null;
});

// Example usage
generateTransactionCards(); // Generates and appends transaction cards
