
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Navigation/X3DViewpointNode",
	"cobweb/Bits/X3DConstants",
	"standard/Math/Geometry/Camera",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewpointNode, 
          X3DConstants,
          Camera,
          Vector2,
          Vector3,
          Matrix4)
{
	with (Fields)
	{
		function OrthoViewpoint (executionContext)
		{
			X3DViewpointNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .OrthoViewpoint);

			this .projectionMatrix = new Matrix4 ();
		}

		OrthoViewpoint .prototype = $.extend (Object .create (X3DViewpointNode .prototype),
		{
			constructor: OrthoViewpoint,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new SFNode ()),
				new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new SFBool ()),
				new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new SFString ("")),
				new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new SFVec3f (0, 0, 10)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new SFRotation (0, 0, 1, 0)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new SFVec3f (0, 0, 0)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new MFFloat ([ -1, -1, 1, 1 ])),
				new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new SFBool (false)),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new SFBool ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new SFTime ()),
			]),
			getTypeName: function ()
			{
				return "OrthoViewpoint";
			},
			getComponentName: function ()
			{
				return "Navigation";
			},
			getContainerField: function ()
			{
				return "children";
			},
			getMinimumX: function ()
			{
				return (this .fieldOfView_ .length > 0 ? this .fieldOfView_ [0] : -1.0) * this .fieldOfViewScale_ .getValue ();
			},
			getMinimumY: function ()
			{
				return (this .fieldOfView_ .length > 1 ? this .fieldOfView_ [1] : -1.0) * this .fieldOfViewScale_ .getValue ();
			},
			getMaximumX: function ()
			{
				return (this .fieldOfView_ .length > 2 ? this .fieldOfView_ [2] : 1.0) * this .fieldOfViewScale_ .getValue ();
			},
			getMaximumY: function ()
			{
				return (this .fieldOfView_ .length > 3 ? this .fieldOfView_ [3] : 1.0) * this .fieldOfViewScale_ .getValue ();
			},
			getSizeX: function ()
			{
				return this .getMaximumX () - this .getMinimumX ();
			},
			getSizeY: function ()
			{
				return this .getMaximumY () - this .getMinimumY ();
			},
			getScreenScale: function (distance, viewport)
			{
				var
					width  = viewport [2],
					height = viewport [3],
					sizeX  = this .getSizeX (),
					sizeY  = this .getSizeY (),
					aspect = width / height;

				if (aspect > sizeX / sizeY)
				{
					var s = this .getSizeY () / height;

					return new Vector3 (s, s, s);
				}

				var s = this .getSizeX () / width;

				return new Vector3 (s, s, s);
			},
			getViewportSize: function (viewport)
			{
				var
					width  = viewport [2],
					height = viewport [3],
					sizeX  = this .getSizeX (),
					sizeY  = this .getSizeY (),
					aspect = width / height;

				if (aspect > sizeX / sizeY)
					return new Vector2 (this .getSizeY () * aspect, this .getSizeY ());

				return new Vector2 (this .getSizeX (), this .getSizeX () / aspect);
			},
			getLookAtDistance: function (bbox)
			{
				return bbox .size .abs () / 2 + 10;
			},
			getProjectionMatrix: function (zNear, zFar, viewport)
			{
				var
					width  = viewport [2],
					height = viewport [3],
					aspect = width / height;

				if (aspect > this .getSizeX () / this .getSizeY ())
				{
					var
						center  = (this .getMinimumX () + this .getMaximumX ()) / 2,
						size1_2 = (this .getSizeY () * aspect) / 2;

					return Camera .ortho (center - size1_2, center + size1_2, this .getMinimumY (), this .getMaximumY (), zNear, zFar, this .projectionMatrix);
				}

				var
					center  = (this .getMinimumY () + this .getMaximumY ()) / 2,
					size1_2 = (this .getSizeX () / aspect) / 2;

				return Camera .ortho (this .getMinimumX (), this .getMaximumX (), center - size1_2, center + size1_2, zNear, zFar, this .projectionMatrix);
			},
		});

		return OrthoViewpoint;
	}
});

