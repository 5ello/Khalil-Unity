#pragma strict

var fly : boolean = false;
function Start () {

	

}

function Update () {
	
	var step =  0.5 * Time.time;
	//*
	if(transform.position == Vector3(0, 0.5, 0))
	{
		fly = true;
	}
			
	if(fly == true)
		transform.Translate(Vector3.up* Time.time);	
	else 
		transform.position = Vector3.MoveTowards(transform.position, Vector3(0, 0.5, 0), step); //*/
		
		
		//transform.Translate(Vector3.forward * step);
		//transform.Rotate(Vector3.up * step);	


}