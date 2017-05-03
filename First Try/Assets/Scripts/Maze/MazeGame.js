#pragma strict

var startX: int = 0;
var startZ: int = 0;
var range: int = 25;

function Start () {
	
		
}


function Update () {
	
	if(Input.GetKey(KeyCode.UpArrow))
	{
		startX--;
		if(startX >= -range)
			transform.Rotate(1, 0, 0);
		else
			startX = -range;
	}
	else if(Input.GetKey(KeyCode.DownArrow))
	{
		startX++;
		if(startX <= range)
			transform.Rotate(-1, 0, 0);
		else
			startX = range;
	}
	else if(Input.GetKey(KeyCode.LeftArrow))
	{
		startZ--;
		if(startZ >= -range)
		transform.Rotate(0, 0, 1);
		else
			startZ = -range;
	}
	else if(Input.GetKey(KeyCode.RightArrow))
	{
		startZ++;
		if(startZ <= range)
			transform.Rotate(0, 0, -1);
		else
			startZ = range;
	}
		
}