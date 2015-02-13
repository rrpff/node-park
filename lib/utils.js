exports.getSubObjectParent = function(obj, keys){
	var parent = obj;

	if(keys.length === 1)
		return obj[keys[0]];

	for(var i = 0; i < keys.length; i++){
		var key = keys[i],
			last = i === keys.length - 1;

		if(last)
			return parent;
		else if(parent.hasOwnProperty(key))
			parent = parent[key];
		else
			parent = parent[key] = {};
	}

	return obj;
}

exports.getSubObject = function(obj, sub){
	var keys = sub.split(".");

	if(keys.length === 1)
		return obj[keys[0]];

	var parent = exports.getSubObjectParent(obj, keys),
		last = keys.pop();

	return parent[last];
}

exports.setSubObject = function(obj, sub, val){
	var keys = sub.split(".");

	if(keys.length > 1){
		var parent = exports.getSubObjectParent(obj, keys),
			last = keys.pop();

		if(parent !== Object(parent)) parent = {};
		parent[last] = val;
	} else {
		obj[keys[0]] = val;
	}

	console.log(obj);

	return obj;
}