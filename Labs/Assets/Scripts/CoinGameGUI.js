#pragma strict

var coin : GameObject;
var player : GameObject;
private var currentTime : int;
private var loc : Vector3;
private var currentDist : float;
private var lose : boolean;
private var win : boolean;
private var collected : int;
var style : GUISkin;

function Start () {
	
	currentTime = 0;
	generateLocation();
}

function Update () {
		
	if(!coin.active)
	{
		collected++;
	
		if(collected == 3)
			displayWin();
		else
			generateLocation();
	}
}

function generateLocation(){
	
	loc.x = Random.Range(-4, 4);
	loc.z = Random.Range(-4, 4);
	loc.y = 0.7;
	coin.SetActive(true);
	coin.transform.position = loc;
	
	currentDist = Vector3.Distance(coin.transform.position, player.transform.position);
	currentTime = 2*currentDist;
	startCountdown();
}

function startCountdown(){

	while(1){
		yield WaitForSeconds(1);
		currentTime--;
		if(currentTime <= 0){
			displayLose();
			break;
		}
	}
}

function displayLose(){
	
	lose = true;
}

function displayWin(){
	
	win = true;
}

function OnGUI(){
	
	GUI.skin = style;
	GUI.Label(Rect(Screen.width/2-50, 10, 200, 40), "Time Left: " + currentTime + "!!");
	
	if(lose){
		
		GUI.Label(Rect(Screen.width/2-50, Screen.height/2-50, 200, 40), "You lose!!");
		Time.timeScale = 0;
	}
	
	if(win){
		
		GUI.Label(Rect(Screen.width/2-50, Screen.height/2-50, 200, 40), "You win!!");
		Time.timeScale = 0;
	}
}