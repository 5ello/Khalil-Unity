#pragma strict

var knockAngle : float = 45.0;
private var initAngle : Vector3;

function Awake () {
	initAngle = transform.localEulerAngles;
}	

function isKnockedOver() : boolean{
	
	return  Mathf.Abs(transform.localEulerAngles.x - initAngle.x) > knockAngle || 
			Mathf.Abs(transform.localEulerAngles.y - initAngle.y) > knockAngle ||
			Mathf.Abs(transform.localEulerAngles.z - initAngle.z) > knockAngle;

}