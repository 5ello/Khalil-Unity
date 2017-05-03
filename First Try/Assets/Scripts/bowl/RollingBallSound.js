/*#pragma strict

var minSpeed : float = 1.0;
private var sqrMinSpeed : float = 0;

function Start () {

}

function Awake () {
	sqrMinSpeed = minSpeed * minSpeed;
}

function OnCollisionStay(col : Collision){

	if(col.gameObject.tag == "Floor"){
		if(Rigidbody.velocity.sqrMagnitude > sqrMinSpeed){
			if(!GetComponent.<AudioSource>().isPlaying)
				GetComponent.<AudioSource>().Play();
			else{
				if(Audio.isPlaying)
					GetComponent.<AudioSource>().Stop();
			}
		}
	}
}

function OnCollisionExit(col : Collision){
		
		if(col.gameObject.tag == "Floor"){
			if(Audio.isPlaying)
				GetComponent.<AudioSource>().Stop();
		}
}

function Update () {

}*/