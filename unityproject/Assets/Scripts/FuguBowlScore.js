#pragma strict

class FuguBowlScore{
	
	var ball1 : int;
	var ball2 : int;
	var ball3 : int;
	var total : int;
	
	
	function Clear() {
		
		 ball1 = -1;
		 ball2 = -1;
	     ball3 = -1;
		 total = -1;
	}

	function Spare():boolean {
		return  (Strike() && (ball1+ball2 == 10));

	}
		
	function Strike():boolean {
		return (ball1 == 10);

	}
	
}
