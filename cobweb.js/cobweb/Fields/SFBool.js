
define ([
	"jquery",
	"cobweb/Basic/X3DField",
	"cobweb/Bits/X3DConstants",
],
function ($, X3DField, X3DConstants)
{
	function SFBool (value)
	{
		X3DField .call (this, Boolean (value));
	}

	SFBool .prototype = $.extend (Object .create (X3DField .prototype),
	{
		constructor: SFBool,
		copy: function ()
		{
			return new SFBool (this .getValue ());
		},
		set: function (value)
		{
			X3DField .prototype .set .call (this, Boolean (value));
		},
		valueOf: function ()
		{
			return this .getValue ();
		},
		getTypeName: function ()
		{
			return "SFBool";
		},
		getType: function ()
		{
			return X3DConstants .SFBool;
		},
		valueOf: X3DField .prototype .getValue,
		toString: function ()
		{
			return this .getValue () ? "TRUE" : "FALSE";
		},
	});

	return SFBool;
});
