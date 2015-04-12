
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Followers/X3DChaserNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChaserNode, 
          X3DConstants)
{
	with (Fields)
	{
		function TexCoordChaser2D (executionContext)
		{
			X3DChaserNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .TexCoordChaser2D);
		}

		TexCoordChaser2D .prototype = $.extend (new X3DChaserNode (),
		{
			constructor: TexCoordChaser2D,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new SFNode ()),
				new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new MFVec2f ()),
				new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new MFVec2f ()),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new MFVec2f ()),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new MFVec2f ()),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new SFTime (1)),
				new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new SFBool ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new MFVec2f ()),
			]),
			getTypeName: function ()
			{
				return "TexCoordChaser2D";
			},
			getComponentName: function ()
			{
				return "Followers";
			},
			getContainerField: function ()
			{
				return "children";
			},
		});

		return TexCoordChaser2D;
	}
});
