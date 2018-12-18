var money = 0,
	moneyGain = 1,
	autoGain = 100,
	text,
	purchaseLevel = 1,
	purchaseLevelTwo = 1,
	price,
	priceTwo,
	theInterval,
	clickCounter = 0;

//money = Number(localStorage.getItem('storedMoney'));

var element = {
	clicks     : document.getElementById("clicks"),
	clicker     : document.getElementById("clicker"),
	purchase    : document.getElementById("purchase"),
	purchaseTwo : document.getElementById("purchase-two"),
	money       : document.getElementById("money"),
}

updateMoney();
updatePurchase();
updatePurchaseTwo();

/*element.clicker.addEventListener("click", updateClickCounter);*/

element.clicker.onclick = function() { addMoney(); updateMoney(); };


function updateClickCounter() {
	clickCounter++;
	element.clicks.innerHTML = "Член мм: " + clickCounter;
}

function addMoney() {
	money = money + moneyGain;
	//localStorage.setItem('storedMoney', money);
}

function updatePurchase(){
	element.purchase.innerHTML = "віддай <b>" + price + " мм</b> члєна Богдана - отримай <b> x2 мм</b> за клік!";
}

function updatePurchaseTwo(){
	element.purchaseTwo.innerHTML = "<b>" + priceTwo + " мм чЛеНа ВоНо0аРа:" + "</b>" + " +5мм кожну секунду";
}

function updateMoney() {
	text = "Член мм: " + money;
	purchaseNotifier();
	element.money.innerHTML = text;
}

function purchaseNotifier() {
	price = moneyGain * 25 * purchaseLevel;
	priceTwo = 200 * purchaseLevelTwo;

	if(money >= price) {
		updatePurchase();
		element.purchase.onclick = multiplyMoneyGain;
		element.purchase.disabled = false;
	}

	if(money >= priceTwo) {
		updatePurchaseTwo();
		element.purchaseTwo.onclick = function() { autoMoney(purchaseLevelTwo); };
		element.purchaseTwo.disabled = false;
	}
}

function multiplyMoneyGain() {
	moneyGain = moneyGain * 2;
	purchaseLevel++;
	updateAndDisable("purchase", price);
}

function autoMoney(amount) {
	clearInterval(theInterval);
	theInterval = setInterval(function(){ money = money + autoGain; updateMoney(); }, 200 / amount);
	purchaseLevelTwo++;
	updateAndDisable("purchase-two", priceTwo);
}

function updateAndDisable(elementId, p) {
	money = money - p;
	updateMoney();

	if(elementId == "purchase") {
		updatePurchase();
	}

	else if( elementId == "purchase-two") {
		updatePurchaseTwo();
	}

	element.purchase.disabled = true;
	element.purchaseTwo.disabled = true;
	purchaseNotifier();
}