/*
Copyright (c) 2013 Technicat, LLC. All Rights Reserved. MIT License
http://learnunity4.com/
*/

// bowling game controller

#pragma strict
#pragma downcast

var pin:GameObject; // pin prefab to instantiate
var pinPos:Vector3 = Vector3(0,1,20); // position to place rack of pins
var pinDistance = 1.5; // initial distance between pins
var pinRows = 4; // number of pin rows

var ball:GameObject; // the bowling ball
var sunkHeight:float = -10.0; // fall below this y position and we have a gutterball
static var player : FugoBowlPlayer = null; // initializing an instance of our class.

private var pins:Array;
private var pinBodies: GameObject[];

private var roll : Roll;
private var frame : int;
private var state : String;

enum Roll{
	
	Ball1,
	Ball2,
	Ball3
}

function Awake () {
	player = new FugoBowlPlayer();
	CreatePins();
}

function Start(){

	state = "StateNewGame";
	while(true){
		Debug.Log("State: " + state);
		yield StartCoroutine(state);
		yield; //Empty yield == wait for a frame.
	}
}

function StateNewGame(){

	player.ClearScore();
	frame = 0;
	state = "StateBall1";
}

function StateBall1(){
	
	ResetEverything();
	roll = Roll.Ball1;
	state = "StateRolling";
	
}

function StateBall2(){
	
	ResetBall();
	ResetCamera();
	if(GetPinsDown == 10)
		ResetPins();
	else
		RemovePinsDown();
		
		roll = Roll.Ball2;
		state = "StateRolling";
}

function StateBall3(){
	
	ResetBall();
	ResetCamera();
	if(GetPinsDown == 10)
		ResetPins();
	else
		RemovePinsDown();
		
		roll = Roll.Ball3;
		state = "StateRolling";
	
}

function StateRolling(){

	while(true){
		
		if(ball.transform.position.z > pinPos.z){
			
			state = "StateRolledPast";
			return;
		}
		if(ball.transform.position.y < sunkHeight)
		{
			state = "StateGutterBall";
			return;
		}
		yield;
	}
}

function StateRolledPast(){
	
	var follow:Behaviour = Camera.main.GetComponent("SmoothFollow");
	if(follow != null)
		follow.enabled = false;
		
	ball.GetComponent(FuguForce).enabled = false;
	yield WaitForSeconds(3);
	state = "StateRollOver";
	
}

function CreatePins() {
	pins = new Array();
	var offset = Vector3.zero;
	for (var row=0; row<pinRows; ++row) {
		offset.z+=pinDistance;
		offset.x=-pinDistance*row/2;
		for (var n=0; n<=row; ++n) {
			pins.push(Instantiate(pin, pinPos+offset, Quaternion.identity)); // create a pin and store it in "pins"
			offset.x+=pinDistance;
		}
	}
		
	pinBodies = GameObject.FindGameObjectsWithTag("Pin");
}

function GetPinsDown() : int{
	
	var pinsDown : int = 0;
	for(var pin : GameObject in pinBodies){
		if(pin.GetComponent(FuguPinStatus).isKnockedOver()) // Calls a function from another script.
		pinsDown++;
	}
	
	return pinsDown;
}

function RemovePinsDown(){
	
	var pinsDown : int = 0;
	for(var pin : GameObject in pinBodies){
		if(pin.GetComponent(FuguPinStatus).isKnockedOver()){ // Calls a function from another script.
						
			yield WaitForSeconds(2); // waits / skipps frames for 'n' seconds
			pin.SetActive(false); // dissables knocked pins

		}
	}
}
function Update() { // reset if ball falls off.
	if (ball.transform.position.y<sunkHeight) {
		ResetEverything();
	}
	//RemovePinsDown();
	//Debug.Log("No of pins down: " + GetPinsDown());
}

function ResetBall() {
ball.GetComponent(FuguForce).enabled = true;
	ball.SendMessage("ResetPosition");
}

function ResetPins() {
	for (var pin:GameObject in pins) {
		pin.BroadcastMessage("ResetPosition");
	}
}

function ResetCamera() {
	
	var follow:Behaviour = Camera.main.GetComponent("SmoothFollow");
	if(follow != null)
		follow.enabled = true;
	Camera.main.SendMessage("ResetPosition");
}

function ResetEverything() {
	ResetBall();
	ResetPins();
	ResetCamera();
}

