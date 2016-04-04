Array.prototype.uniq = function() {
	var 
		hash = {};

	for (var i=0; i < this.length; i++) {
		hash[this[i]] = 1; 
	}

	return Object.keys(hash);

}