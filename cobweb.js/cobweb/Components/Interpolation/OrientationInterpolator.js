
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Interpolation/X3DInterpolatorNode",
	"cobweb/Bits/X3DConstants",
	"standard/Math/Numbers/Rotation4"
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode, 
          X3DConstants,
          Rotation4)
{
	with (Fields)
	{
		function OrientationInterpolator (executionContext)
		{
			X3DInterpolatorNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .OrientationInterpolator);
		}

		OrientationInterpolator .prototype = $.extend (new X3DInterpolatorNode (),
		{
			constructor: OrientationInterpolator,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new SFNode ()),
				new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new SFFloat ()),
				new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new MFFloat ()),
				new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new MFRotation ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new SFRotation ()),
			]),
			getTypeName: function ()
			{
				return "OrientationInterpolator";
			},
			getComponentName: function ()
			{
				return "Interpolation";
			},
			getContainerField: function ()
			{
				return "children";
			},
			initialize: function ()
			{
				X3DInterpolatorNode .prototype .initialize .call (this);

				this .keyValue_ .addInterest (this, "set_keyValue__");
			},
			set_keyValue__: function ()
			{
				if (this .keyValue_ .length < this .key_ .length)
					this .keyValue_ .resize (this .key_ .length, this .keyValue_ .length ? this .keyValue_ [this .keyValue_ .length - 1] : new SFRotation ());
			},
			interpolate: function (index0, index1, weight)
			{
				try
				{
					this .value_changed_ = Rotation4 .slerp (this .keyValue_ [index0] .getValue (), this .keyValue_ [index1] .getValue (), weight);
				}
				catch (error)
				{ }
			},
		});

		return OrientationInterpolator;
	}
});
