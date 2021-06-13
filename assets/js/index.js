// element = document.querySelector(Selector); return element within the document 

const box = document.querySelectorAll(".box"); //querySelectorAll:all elements matching the selector
const gameBox = document.querySelector(".game-box");
const x = 'cross'; //variable decleratation
const y = 'circle';
const target = document.getElementById('txt');
let temp;


const winCondition = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

function placemarker(currentClass, currentCell) {
	currentCell.classList.add(currentClass);
}

function swapturns() {
	temp = !temp; //reverse change position
}

function showHoverEffect(currentClass) {
	gameBox.classList.remove(x);
	gameBox.classList.remove(y);
	if (temp) {
		gameBox.classList.add(y)
	} else {
		gameBox.classList.add(x)
	}


}

//check winner
function checkwin(currentClass){
	return winCondition.some(item => {
		return item.every(index =>{
			return box[index].classList.contains(currentClass);
		})
	})
}

function mainfunc(e) {
	console.log("clicked");

	currentClass = temp ? 'circle' : 'cross';
	placemarker(currentClass, e.target);
	if(checkwin(currentClass)){
		endgame(true);
	}else if(drawGame()){
		endgame(false);
		console.log("draw")

	}
	
	swapturns()
	showHoverEffect(currentClass);
}
function endgame(value){
	let txt;
	if(value){
		txt = temp?'0 win!' :'x win!'

	}else{
		txt='draw';

	}
	target.innerText=txt;
}

//check draw
function drawGame(){
	return [...box].every(cell =>{
		return cell.classList.contains(x) || cell.classList.contains(y);
	})
}

function startGame() {
	temp = false;
	showHoverEffect();
	//main function
	box.forEach(cell => {
		cell.addEventListener('click', mainfunc, {
			once: true
		});
		//element.addEventListener(event,function,useCapture)
		//forEach : call element only once

	})
}

startGame();