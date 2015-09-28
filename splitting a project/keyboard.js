var keyboard = function ()
{
	var self = this;
	
	window.addEventListener('keydown', 
	function(evt) { self.onkeydown(evt); }, false);
	
	window.addEventListener('keyup',
	function(evt) { self.onkeyUp(evt); }, false);			

	this.keylisteners = new Array();
	this.keys = new Array();
	
	
	this.key_space = 32;
	this.key_left = 37;
	this.key_up = 38;
	this.key_right = 39;
	this.key_down = 40;
	
	this.key_a = 65;
	this.key_d = 68;
	this.key_w = 83;
	this.key_s = 87;
	this.key_shift = 16;
}

keyboard.prototype.onkeydown = function(evt)
{
	this.keys[evt.keyCode] = true;
};

keyboard.prototype.onkeyUp = function(evt)
{
	this.keys[evt.keyCode] = false;
};

keyboard.prototype.iskeyDown = function(keyCode)
{
	return this.keys[keyCode];
};

