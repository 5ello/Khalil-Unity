#pragma strict

var pin : GameObject;
var pinPos: Vector3 = Vector3(0, 1, 5);

var pinDistance : float = 1.5;
var pinRows = 4;

var ball : GameObject;

private var pins:Array;

function Awake(){
	
	CreatePins();
		
}

function CreatePins(){
	
	pins = new Array();
	var offset = Vector3.zero;
	
	for(var row = 0; row < pinRows; row++){
		
		offset.z += pinDistance;
		offset.x = -pinDistance * row/2;
		
		for(var n = 0; n <= row; n++){
			
			pins.push(Instantiate(pin, pinPos + offset, Quaternion.identity));
			offset.x += pinDistance;
			
		}
	}
}

function Start () {

}

function ResetBall(){

	ball.SendMessage("ResetPosition");
}

function ResetPins(){
	
	for(var pin:GameObject in pins)
		pin.BroadcastMessage("ResetPosition");
}

function ResetCamera(){
	
	Camera.main.SendMessage("ResetPosition");
}

function RES(){

	ResetBall();
	ResetPins();
	ResetCamera();
	
}

function Update () {

	if(ball.transform.position.y < -10){
		ResetBall();
		ResetPins();
	}

}