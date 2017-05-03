#pragma strict

private var startPos: Vector3;
private var startRot: Vector3;

function Start () {
	
	startPos = transform.localPosition;
	startRot = transform.localEulerAngles;
}

function ResetPosition(){
	
	transform.localPosition = startPos;
	transform.localEulerAngles = startRot;
	
	if(GetComponent.<Rigidbody>() != null){
		GetComponent.<Rigidbody>().velocity = Vector3.zero;
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	}
}

function Update () {

}