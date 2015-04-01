
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Rendering/X3DGeometryNode",
	"cobweb/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Triangle3,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
	with (Fields)
	{
		function Extrusion (executionContext)
		{
			X3DGeometryNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .Extrusion);
		}

		Extrusion .prototype = $.extend (new X3DGeometryNode (),
		{
			constructor: Extrusion,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new SFNode ()),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "beginCap",     new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "endCap",       new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",        new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",          new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "convex",       new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",  new SFFloat ()),
				new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSection", new MFVec2f (new Vector2 (1, 1), new Vector2 (1, -1), new Vector2 (-1, -1), new Vector2 (-1, 1), new Vector2 (1, 1))),
				new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",  new MFRotation (new Rotation4 ())),
				new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",        new MFVec2f (new Vector2 (1, 1))),
				new X3DFieldDefinition (X3DConstants .inputOutput,    "spine",        new MFVec3f (new Vector3 (0, 0, 0), new Vector3 (0, 1, 0))),
			]),
			getTypeName: function ()
			{
				return "Extrusion";
			},
			getComponentName: function ()
			{
				return "Geometry3D";
			},
			getContainerField: function ()
			{
				return "geometry";
			},
			createPoints: function (hasCaps)
			{
				var
					crossSection = this .crossSection_. getValue (),
					orientation  = this .orientation_. getValue (),
					scale        = this .scale_. getValue (),
					spine        = this .spine_. getValue (),
					points       = [ ];

				// calculate SCP rotations

				var rotations = this .createRotations ();

				// calculate vertices.
				
				var matrix = new Matrix4 ();

				for (var i = 0, length = spine .length; i < length; ++ i)
				{
					matrix .identity ();
					matrix .translate (spine [i] .getValue ());

					if (orientation .length)
						matrix .rotate (orientation [Math .min (i, orientation .length - 1)] .getValue ());

					matrix .multLeft (rotations [i]);

					if (scale .length)
					{
						var s = scale [Math .min (i, scale .length - 1)] .getValue ();
						matrix .scale (new Vector3 (s .x, 1, s .y));
					}

					for (var cs = 0, csLength = crossSection .length; cs < csLength; ++ cs)
					{
						var vector = crossSection [cs] .getValue ();
						points .push (matrix .multVecMatrix (new Vector3 (vector .x, 0, vector .y)));
					}
				}

				// Copy points for caps

				if (hasCaps)
				{
					if (this .beginCap_ .getValue ())
					{
						for (var i = 0, length = crossSection .length; i < length; ++ i)
							points .push (points [i]);
					}

					if (this .endCap_ .getValue ())
					{
						var
							i      = points .length - crossSection .length,
							length = points .length;

						for (; i < length; ++ i)
							points .push (points [i]);
					}
				}

				return points;
			},
			createRotations: function ()
			{
				var rotations = [ ];

				// calculate SCP rotations

				var
					spine       = this .spine_ .getValue (),
					firstSpine  = spine [0] .getValue (),
					lastSpine   = spine [spine .length - 1] .getValue (),
					closedSpine = firstSpine .equals (lastSpine);

				var
					SCPxAxis,
					SCPyAxis,
					SCPzAxis;

				// SCP for the first point:
				if (closedSpine)
				{
					SCPyAxis = Vector3 .subtract (spine [1] .getValue (), spine [spine .length - 2] .getValue ()) .normalize ();
					SCPzAxis = Vector3 .subtract (spine [1] .getValue (), spine [0] .getValue ())
					           .cross (Vector3 .subtract (spine [spine .length - 2] .getValue (), spine [0] .getValue ()))
					           .normalize ();
				}
				else
				{
					SCPyAxis = Vector3 .subtract (spine [1] .getValue (), spine [0] .getValue ()) .normalize ();

					// Find first defined Z-axis.
					for (var i = 1, length = spine .length - 1; i < length; ++ i)
					{
						SCPzAxis = Vector3 .subtract (spine [i + 1] .getValue (), spine [i] .getValue ())
						           .cross (Vector3 .subtract (spine [i - 1] .getValue (), spine [i] .getValue ()))
						           .normalize ();

						if (! SCPzAxis .equals (Vector3 .Zero))
							break;
					}
				}

				// The entire spine is collinear:
				if (SCPzAxis .equals (Vector3 .Zero))
					SCPzAxis = new Rotation4 (new Vector3 (0, 1, 0), SCPyAxis) .multVecRot (new Vector3 (0, 0, 1));

				// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
				SCPxAxis = Vector3 .cross (SCPyAxis, SCPzAxis);

				rotations .push (new Matrix4 (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
				                              SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
				                              SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
				                              0,           0,           0,           1));

				// For all points other than the first or last:

				var SCPzAxisPrevious = SCPzAxis;

				for (var i = 1, length = spine .length - 1; i < length; ++ i)
				{
					SCPyAxis = Vector3 .subtract (spine [i + 1] .getValue (), spine [i - 1] .getValue ()) .normalize ();
					SCPzAxis = Vector3 .subtract (spine [i + 1] .getValue (), spine [i] .getValue ())
					           .cross (Vector3 .subtract (spine [i - 1] .getValue (), spine [i] .getValue ()))
					           .normalize ();

					// g.
					if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
						SCPzAxis .negate ();

					// The three points used in computing the Z-axis are collinear.
					if (SCPzAxis .equals (Vector3 .Zero))
						SCPzAxis = SCPzAxisPrevious;
					else
						SCPzAxisPrevious = SCPzAxis;

					// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
					SCPxAxis = Vector3 .cross (SCPyAxis, SCPzAxis);

					rotations .push (new Matrix4 (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
					                              SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
					                              SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
					                              0,           0,           0,           1));
				}

				// SCP for the last point
				if (closedSpine)
				{
					// The SCP for the first and last points is the same.
					rotations .push (rotations [0]);
				}
				else
				{
					SCPyAxis = Vector3 .subtract (spine [spine .length - 1] .getValue (), spine [spine .length - 2] .getValue ()) .normalize ();
					
					if (spine .length > 2)
						SCPzAxis = Vector3 .subtract (spine [spine .length - 1] .getValue (), spine [spine .length - 2] .getValue ())
						           .cross (Vector3 .subtract (spine [spine .length - 3] .getValue (), spine [spine .length - 2] .getValue ()))
						           .normalize ();

					// g.
					if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
						SCPzAxis .negate ();

					// The three points used in computing the Z-axis are collinear.
					if (SCPzAxis .equals (Vector3 .Zero))
						SCPzAxis = SCPzAxisPrevious;

					// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
					SCPxAxis = Vector3 .cross (SCPyAxis, SCPzAxis);

					rotations .push (new Matrix4 (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
					                              SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
					                              SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
					                              0,           0,           0,           1));
				}

				return rotations;
			},
			build: function ()
			{
				var
					crossSection = this .crossSection_. getValue (),
					spine        = this .spine_. getValue (),
					texCoords    = [ ];

				if (spine .length < 2 || crossSection .length < 2)
					return;

				this .getTexCoords () .push (texCoords);

				var crossSectionSize = crossSection .length; // This one is used only in the INDEX macro.

				function INDEX (n, k) { return n * crossSectionSize + k; }

				var
					firstSpine  = spine [0] .getValue (),
					lastSpine   = spine [spine .length - 1] .getValue (),
					closedSpine = firstSpine .equals (lastSpine);

				var
					firstCrossSection  = crossSection [0] .getValue (),
					lastCrossSection   = crossSection [crossSection .length - 1] .getValue (),
					closedCrossSection = firstCrossSection .equals (lastCrossSection);

				// For caps calculation

				var
					min = crossSection [0] .getValue () .copy ();
					max = crossSection [0] .getValue () .copy ();

				for (var k = 1, length = crossSection .length; k < length; ++ k)
				{
					min .min (crossSection [k] .getValue ());
					max .max (crossSection [k] .getValue ());
				}

				var
					capSize      = Vector2 .subtract (max, min),
					capMax       = Math .max (capSize .x, capSize .y),
					numCapPoints = closedCrossSection ? crossSection .length - 1 : crossSection .length;

				// Create

				var
					normalIndex = [ ],
				   normals     = [ ],
					points      = this .createPoints (capMax);

				// Build body.

				var
					cw                = ! this .ccw_ .getValue (),
					numCrossSection_1 = crossSection .length - 1,
					numSpine_1        = spine .length - 1;

				for (var n = 0; n < numSpine_1; ++ n)
				{
					for (var k = 0; k < numCrossSection_1; ++ k)
					{
						var
							n1 = closedSpine && n == spine .length - 2 ? 0 : n + 1;
							k1 = closedCrossSection && k == crossSection .length - 2 ? 0 : k + 1;

						// k      k+1
						//
						// p4 ----- p3   n+1
						//  |     / |
						//  |   /   |
						//  | /     |
						// p1 ----- p2   n

						var
							p1 = INDEX (n,  k),
							p2 = INDEX (n,  k1),
							p3 = INDEX (n1, k1),
							p4 = INDEX (n1, k);
						
						if (! normalIndex [p1])
							normalIndex [p1] = [ ];

						if (! normalIndex [p2])
							normalIndex [p2] = [ ];

						if (! normalIndex [p3])
							normalIndex [p3] = [ ];

						if (! normalIndex [p4])
							normalIndex [p4] = [ ];

						// Use quad normal calculation as it makes nicer normals.

						var
							normal1 = Triangle3 .normal (points [p1], points [p2], points [p3]),
							normal2 = Triangle3 .normal (points [p1], points [p3], points [p4]);

						if (cw)
						{
							normal1 .negate ();
							normal2 .negate ();
						}

						// p1
						texCoords .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
						normalIndex [p1] .push (normals .length);
						normals .push (normal1);
						this .addVertex (points [p1]);

						// p2
						texCoords .push ((k + 1) / numCrossSection_1, n / numSpine_1, 0, 1);
						normalIndex [p2] .push (normals .length);
						normals .push (normal1);
						this .addVertex (points [p2]);

						// p3
						texCoords .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
						normalIndex [p3] .push (normals .length);
						normals .push (normal1);
						this .addVertex (points [p3]);

						// p1
						texCoords .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
						normalIndex [p1] .push (normals .length);
						normals .push (normal2);
						this .addVertex (points [p1]);

						// p3
						texCoords .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
						normalIndex [p3] .push (normals .length);
						normals .push (normal2);
						this .addVertex (points [p3]);

						// p4
						texCoords .push (k / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
						normalIndex [p4] .push (normals .length);
						normals .push (normal2);
						this .addVertex (points [p4]);
					}
				}

				// Refine normals and add them.

				normals = this .refineNormals (normalIndex, normals, this .creaseAngle_ .getValue ());

				for (var i = 0; i < normals .length; ++ i)
					this .addNormal (normals [i]);

/*
				// Build caps

				if (capMax)
				{
					if (beginCap ())
					{
						const size_t j = spine () .size ();

						if (convex ())
						{
							Vector3f normal = math::normal (points [INDEX (j, 2)],
							                                points [INDEX (j, 1)],
							                                points [INDEX (j, 0)]);

							if (not ccw ())
								normal .negate ();

							for (size_t k = 0; k < numCapPoints; ++ k)
							{
								const Vector2f t = (crossSection () [numCapPoints - 1 - k] - min) / capMax;
								getTexCoords () [0] .emplace_back (t .x (), t .y (), 0, 1);
								getNormals () .emplace_back (normal);
								getVertices () .emplace_back (points [INDEX (j, numCapPoints - 1 - k)]);
							}

							addElements (getVertexMode (numCapPoints), numCapPoints);
						}
						else
						{
							Tessellator tessellator;
							tessellator .begin_polygon ();
							tessellator .begin_contour ();

							for (size_t k = 0; k < numCapPoints; ++ k)
								tessellator .add_vertex (points [INDEX (j, numCapPoints - 1 - k)], INDEX (j, numCapPoints - 1 - k), numCapPoints - 1 - k);

							tessellator .end_contour ();
							tessellator .end_polygon ();

							tessellateCap (tessellator, points, min, capMax);
						}
					}

					if (endCap ())
					{
						const size_t j = spine () .size () + beginCap ();

						if (convex ())
						{
							Vector3f normal = math::normal (points [INDEX (j, 0)],
							                                points [INDEX (j, 1)],
							                                points [INDEX (j, 2)]);

							if (not ccw ())
								normal .negate ();

							for (size_t k = 0; k < numCapPoints; ++ k)
							{
								Vector2f t = (crossSection () [k] - min) / capMax;
								getTexCoords () [0] .emplace_back (t .x (), t .y (), 0, 1);
								getNormals () .emplace_back (normal);
								getVertices () .emplace_back (points [INDEX (j, k)]);
							}

							addElements (getVertexMode (numCapPoints), numCapPoints);
						}
						else
						{
							Tessellator tessellator;
							tessellator .begin_polygon ();
							tessellator .begin_contour ();

							for (size_t k = 0; k < numCapPoints; ++ k)
								tessellator .add_vertex (points [INDEX (j, k)], INDEX (j, k), k);

							tessellator .end_contour ();
							tessellator .end_polygon ();

							tessellateCap (tessellator, points, min, capMax);
						}
					}
				}

				setSolid (solid ());
				setCCW (ccw ());
				setTextureCoordinate (nullptr);

				#undef INDEX
			*/

				this .setSolid (this .solid_ .getValue ());
				this .setCCW (this .ccw_ .getValue ());
				this .setCurrentTexCoord (null);
			},
		});

		return Extrusion;
	}
});

