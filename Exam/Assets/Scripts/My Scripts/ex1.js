#pragma strict

var target : Transform;
var ourLight : Light;
var speed : float = 20;
function Start () {
		
	var test:GameObject = null;
		
}

function Update () {
	
	//transform.Rotate(Vector3.forward*20*Mathf.Sin(Time.deltaTime), Space.Self);
	transform.Translate(Vector3.forward*speed*Mathf.Sin(Time.deltaTime), Space.Self);
	
}