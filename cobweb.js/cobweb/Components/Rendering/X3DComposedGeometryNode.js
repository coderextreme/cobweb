
define ([
	"jquery",
	"cobweb/Components/Rendering/X3DGeometryNode",
	"cobweb/Bits/X3DCast",
	"cobweb/Bits/X3DConstants",
],
function ($,
          X3DGeometryNode,
          X3DCast,
          X3DConstants)
{
	function X3DComposedGeometryNode (browser, executionContext)
	{
		X3DGeometryNode .call (this, browser, executionContext);

		this .addType (X3DConstants .X3DComposedGeometryNode);

		this .attribNodes  = [ ];
		this .colorNode    = null;
		this .texCoordNode = null;
		this .normalNode   = null;
		this .coordNode    = null;
	}

	X3DComposedGeometryNode .prototype = $.extend (new X3DGeometryNode (),
	{
		constructor: X3DComposedGeometryNode,
		initialize: function ()
		{
			X3DGeometryNode .prototype .initialize .call (this);

			this .attrib_   .addInterest (this, "set_attrib__");
			this .color_    .addInterest (this, "set_color__");
			this .texCoord_ .addInterest (this, "set_texCoord__");
			this .normal_   .addInterest (this, "set_normal__");
			this .coord_    .addInterest (this, "set_coord__");

			this .set_attrib__ ();
			this .set_color__ ();
			this .set_texCoord__ ();
			this .set_normal__ ();
			this .set_coord__ ();
		},
		getAttrib: function ()
		{
			return this .attribNodes;
		},
		getColor: function ()
		{
			return this .colorNode;
		},
		getTexCoord: function ()
		{
			return this .texCoordNode;
		},
		getNormal: function ()
		{
			return this .normalNode;
		},
		getCoord: function ()
		{
			return this .coordNode;
		},
		set_attrib__: function ()
		{
			for (var i = 0; i < this .attribNodes .length; ++ i)
				this .attribNodes [i] .removeInterest (this, "addNodeEvent");

			this .attribNodes .length = 0;

			for (var i = 0, length = this .attrib_ .length; i < length; ++ i)
			{
				var attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, this .attrib_ [i]);

				if (attribNode)
					this .attribNodes .push (attribNode);
			}

			for (var i = 0; i < this .attribNodes .length; ++ i)
				this .attribNodes [i] .addInterest (this, "addNodeEvent");
		},
		set_color__: function ()
		{
			if (this .colorNode)
			{
				this .colorNode .removeInterest (this, "addNodeEvent");
				this .colorNode .removeInterest (this, "set_transparent__");
			}

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
			{
				this .colorNode .addInterest (this, "addNodeEvent");
				this .colorNode .addInterest (this, "set_transparent__");

				this .set_transparent__ ();
			}
			else
				this .transparent_ = false;
		},
		set_transparent__: function ()
		{
			this .transparent_ = this .colorNode .isTransparent ();
		},
		set_texCoord__: function ()
		{
			if (this .texCoordNode)
				this .texCoordNode .removeInterest (this, "addNodeEvent");

			this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoord_);

			if (this .texCoordNode)
				this .texCoordNode .addInterest (this, "addNodeEvent");
		},
		set_normal__: function ()
		{
			if (this .normalNode)
				this .normalNode .removeInterest (this, "addNodeEvent");

			this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this .normal_);

			if (this .normalNode)
				this .normalNode .addInterest (this, "addNodeEvent");
		},
		set_coord__: function ()
		{
			if (this .coordNode)
				this .coordNode .removeInterest (this, "addNodeEvent");

			this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .coord_);

			if (this .coordNode)
				this .coordNode .addInterest (this, "addNodeEvent");
		},
	});

	return X3DComposedGeometryNode;
});
