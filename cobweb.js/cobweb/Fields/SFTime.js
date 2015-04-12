
define ([
	"jquery",
	"cobweb/Basic/X3DField",
	"cobweb/Bits/X3DConstants",
],
function ($, X3DField, X3DConstants)
{
	function SFTime (value)
	{
		X3DField .call (this, arguments .length ? +value : 0);
	}

	SFTime .prototype = $.extend (new X3DField (),
	{
		constructor: SFTime,
		copy: function ()
		{
			return new SFTime (this .getValue ());
		},
		getTypeName: function ()
		{
			return "SFTime";
		},
		getType: function ()
		{
			return X3DConstants .SFTime;
		},
		set: function (value)
		{
			X3DField .prototype .set .call (this, +value);
		},
		valueOf: X3DField .prototype .getValue,
		toString: function ()
		{
			return String (this .getValue ());
		},
	});

	return SFTime;
});