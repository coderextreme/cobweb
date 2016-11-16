/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the Cobweb Project.
 *
 * Cobweb is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Cobweb is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Cobweb.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define (function ()
{
"use strict";

	var
		loadState = 0,
		fieldType = 0,
		nodeType  = 0;

	var X3DConstants =
	{
		// Load state

		NOT_STARTED_STATE: loadState ++,
		IN_PROGRESS_STATE: loadState ++,
		COMPLETE_STATE:    loadState ++,
		FAILED_STATE:      loadState ++,

		// Access type

		initializeOnly: parseInt ('001', 2),
		inputOnly:      parseInt ('010', 2),
		outputOnly:     parseInt ('100', 2),
		inputOutput:    parseInt ('111', 2),

		// X3DField

		SFBool:      fieldType ++,
		SFColor:     fieldType ++,
		SFColorRGBA: fieldType ++,
		SFDouble:    fieldType ++,
		SFFloat:     fieldType ++,
		SFImage:     fieldType ++,
		SFInt32:     fieldType ++,
		SFMatrix3d:  fieldType ++,
		SFMatrix3f:  fieldType ++,
		SFMatrix4d:  fieldType ++,
		SFMatrix4f:  fieldType ++,
		SFNode:      fieldType ++,
		SFRotation:  fieldType ++,
		SFString:    fieldType ++,
		SFTime:      fieldType ++,
		SFVec2d:     fieldType ++,
		SFVec2f:     fieldType ++,
		SFVec3d:     fieldType ++,
		SFVec3f:     fieldType ++,
		SFVec4d:     fieldType ++,
		SFVec4f:     fieldType ++,

		VrmlMatrix:  fieldType ++,

		// X3DArrayField

		MFBool:      fieldType ++,
		MFColor:     fieldType ++,
		MFColorRGBA: fieldType ++,
		MFDouble:    fieldType ++,
		MFFloat:     fieldType ++,
		MFImage:     fieldType ++,
		MFInt32:     fieldType ++,
		MFMatrix3d:  fieldType ++,
		MFMatrix3f:  fieldType ++,
		MFMatrix4d:  fieldType ++,
		MFMatrix4f:  fieldType ++,
		MFNode:      fieldType ++,
		MFRotation:  fieldType ++,
		MFString:    fieldType ++,
		MFTime:      fieldType ++,
		MFVec2d:     fieldType ++,
		MFVec2f:     fieldType ++,
		MFVec3d:     fieldType ++,
		MFVec3f:     fieldType ++,
		MFVec4d:     fieldType ++,
		MFVec4f:     fieldType ++,

		// X3DNode
		
		Anchor:                       nodeType ++,
		Appearance:                   nodeType ++,
		Arc2D:                        nodeType ++,
		ArcClose2D:                   nodeType ++,
		AudioClip:                    nodeType ++,
		Background:                   nodeType ++,
		BallJoint:                    nodeType ++,
		Billboard:                    nodeType ++,
		BooleanFilter:                nodeType ++,
		BooleanSequencer:             nodeType ++,
		BooleanToggle:                nodeType ++,
		BooleanTrigger:               nodeType ++,
		BoundedPhysicsModel:          nodeType ++,
		Box:                          nodeType ++,
		CADAssembly:                  nodeType ++,
		CADFace:                      nodeType ++,
		CADLayer:                     nodeType ++,
		CADPart:                      nodeType ++,
		Circle2D:                     nodeType ++,
		ClipPlane:                    nodeType ++,
		CollidableOffset:             nodeType ++,
		CollidableShape:              nodeType ++,
		Collision:                    nodeType ++,
		CollisionCollection:          nodeType ++,
		CollisionSensor:              nodeType ++,
		CollisionSpace:               nodeType ++,
		Color:                        nodeType ++,
		ColorChaser:                  nodeType ++,
		ColorDamper:                  nodeType ++,
		ColorInterpolator:            nodeType ++,
		ColorRGBA:                    nodeType ++,
		ComposedCubeMapTexture:       nodeType ++,
		ComposedShader:               nodeType ++,
		ComposedTexture3D:            nodeType ++,
		Cone:                         nodeType ++,
		ConeEmitter:                  nodeType ++,
		Contact:                      nodeType ++,
		Contour2D:                    nodeType ++,
		ContourPolyline2D:            nodeType ++,
		Coordinate:                   nodeType ++,
		CoordinateChaser:             nodeType ++,
		CoordinateDamper:             nodeType ++,
		CoordinateDouble:             nodeType ++,
		CoordinateInterpolator:       nodeType ++,
		CoordinateInterpolator2D:     nodeType ++,
		Cylinder:                     nodeType ++,
		CylinderSensor:               nodeType ++,
		DISEntityManager:             nodeType ++,
		DISEntityTypeMapping:         nodeType ++,
		DirectionalLight:             nodeType ++,
		Disk2D:                       nodeType ++,
		DoubleAxisHingeJoint:         nodeType ++,
		EaseInEaseOut:                nodeType ++,
		ElevationGrid:                nodeType ++,
		EspduTransform:               nodeType ++,
		ExplosionEmitter:             nodeType ++,
		Extrusion:                    nodeType ++,
		FillProperties:               nodeType ++,
		FloatVertexAttribute:         nodeType ++,
		Fog:                          nodeType ++,
		FogCoordinate:                nodeType ++,
		FontStyle:                    nodeType ++,
		ForcePhysicsModel:            nodeType ++,
		GeneratedCubeMapTexture:      nodeType ++,
		GeoCoordinate:                nodeType ++,
		GeoElevationGrid:             nodeType ++,
		GeoLOD:                       nodeType ++,
		GeoLocation:                  nodeType ++,
		GeoMetadata:                  nodeType ++,
		GeoOrigin:                    nodeType ++,
		GeoPositionInterpolator:      nodeType ++,
		GeoProximitySensor:           nodeType ++,
		GeoTouchSensor:               nodeType ++,
		GeoTransform:                 nodeType ++,
		GeoViewpoint:                 nodeType ++,
		Group:                        nodeType ++,
		HAnimDisplacer:               nodeType ++,
		HAnimHumanoid:                nodeType ++,
		HAnimJoint:                   nodeType ++,
		HAnimSegment:                 nodeType ++,
		HAnimSite:                    nodeType ++,
		ImageCubeMapTexture:          nodeType ++,
		ImageTexture:                 nodeType ++,
		ImageTexture3D:               nodeType ++,
		IndexedFaceSet:               nodeType ++,
		IndexedLineSet:               nodeType ++,
		IndexedQuadSet:               nodeType ++,
		IndexedTriangleFanSet:        nodeType ++,
		IndexedTriangleSet:           nodeType ++,
		IndexedTriangleStripSet:      nodeType ++,
		Inline:                       nodeType ++,
		IntegerSequencer:             nodeType ++,
		IntegerTrigger:               nodeType ++,
		KeySensor:                    nodeType ++,
		LOD:                          nodeType ++,
		Layer:                        nodeType ++,
		LayerSet:                     nodeType ++,
		Layout:                       nodeType ++,
		LayoutGroup:                  nodeType ++,
		LayoutLayer:                  nodeType ++,
		LinePickSensor:               nodeType ++,
		LineProperties:               nodeType ++,
		LineSet:                      nodeType ++,
		LoadSensor:                   nodeType ++,
		LocalFog:                     nodeType ++,
		Material:                     nodeType ++,
		Matrix3VertexAttribute:       nodeType ++,
		Matrix4VertexAttribute:       nodeType ++,
		MetadataBoolean:              nodeType ++,
		MetadataDouble:               nodeType ++,
		MetadataFloat:                nodeType ++,
		MetadataInteger:              nodeType ++,
		MetadataSet:                  nodeType ++,
		MetadataString:               nodeType ++,
		MotorJoint:                   nodeType ++,
		MovieTexture:                 nodeType ++,
		MultiTexture:                 nodeType ++,
		MultiTextureCoordinate:       nodeType ++,
		MultiTextureTransform:        nodeType ++,
		NavigationInfo:               nodeType ++,
		Normal:                       nodeType ++,
		NormalInterpolator:           nodeType ++,
		NurbsCurve:                   nodeType ++,
		NurbsCurve2D:                 nodeType ++,
		NurbsOrientationInterpolator: nodeType ++,
		NurbsPatchSurface:            nodeType ++,
		NurbsPositionInterpolator:    nodeType ++,
		NurbsSet:                     nodeType ++,
		NurbsSurfaceInterpolator:     nodeType ++,
		NurbsSweptSurface:            nodeType ++,
		NurbsSwungSurface:            nodeType ++,
		NurbsTextureCoordinate:       nodeType ++,
		NurbsTrimmedSurface:          nodeType ++,
		OrientationChaser:            nodeType ++,
		OrientationDamper:            nodeType ++,
		OrientationInterpolator:      nodeType ++,
		OrthoViewpoint:               nodeType ++,
		PackagedShader:               nodeType ++,
		ParticleSystem:               nodeType ++,
		PickableGroup:                nodeType ++,
		PixelTexture:                 nodeType ++,
		PixelTexture3D:               nodeType ++,
		PlaneSensor:                  nodeType ++,
		PointEmitter:                 nodeType ++,
		PointLight:                   nodeType ++,
		PointPickSensor:              nodeType ++,
		PointSet:                     nodeType ++,
		Polyline2D:                   nodeType ++,
		PolylineEmitter:              nodeType ++,
		Polypoint2D:                  nodeType ++,
		PositionChaser:               nodeType ++,
		PositionChaser2D:             nodeType ++,
		PositionDamper:               nodeType ++,
		PositionDamper2D:             nodeType ++,
		PositionInterpolator:         nodeType ++,
		PositionInterpolator2D:       nodeType ++,
		PrimitivePickSensor:          nodeType ++,
		ProgramShader:                nodeType ++,
		ProximitySensor:              nodeType ++,
		QuadSet:                      nodeType ++,
		ReceiverPdu:                  nodeType ++,
		Rectangle2D:                  nodeType ++,
		RigidBody:                    nodeType ++,
		RigidBodyCollection:          nodeType ++,
		ScalarChaser:                 nodeType ++,
		ScalarDamper:                 nodeType ++,
		ScalarInterpolator:           nodeType ++,
		ScreenFontStyle:              nodeType ++,
		ScreenGroup:                  nodeType ++,
		Script:                       nodeType ++,
		ShaderPart:                   nodeType ++,
		ShaderProgram:                nodeType ++,
		Shape:                        nodeType ++,
		SignalPdu:                    nodeType ++,
		SingleAxisHingeJoint:         nodeType ++,
		SliderJoint:                  nodeType ++,
		Sound:                        nodeType ++,
		Sphere:                       nodeType ++,
		SphereSensor:                 nodeType ++,
		SplinePositionInterpolator:   nodeType ++,
		SplinePositionInterpolator2D: nodeType ++,
		SplineScalarInterpolator:     nodeType ++,
		SpotLight:                    nodeType ++,
		SquadOrientationInterpolator: nodeType ++,
		StaticGroup:                  nodeType ++,
		StringSensor:                 nodeType ++,
		SurfaceEmitter:               nodeType ++,
		Switch:                       nodeType ++,
		TexCoordChaser2D:             nodeType ++,
		TexCoordDamper2D:             nodeType ++,
		Text:                         nodeType ++,
		TextureBackground:            nodeType ++,
		TextureCoordinate:            nodeType ++,
		TextureCoordinate3D:          nodeType ++,
		TextureCoordinate4D:          nodeType ++,
		TextureCoordinateGenerator:   nodeType ++,
		TextureProperties:            nodeType ++,
		TextureTransform:             nodeType ++,
		TextureTransform3D:           nodeType ++,
		TextureTransformMatrix3D:     nodeType ++,
		TimeSensor:                   nodeType ++,
		TimeTrigger:                  nodeType ++,
		TouchGroup:                   nodeType ++,
		TouchSensor:                  nodeType ++,
		Transform:                    nodeType ++,
		TransformSensor:              nodeType ++,
		TransmitterPdu:               nodeType ++,
		TriangleFanSet:               nodeType ++,
		TriangleSet:                  nodeType ++,
		TriangleSet2D:                nodeType ++,
		TriangleStripSet:             nodeType ++,
		TwoSidedMaterial:             nodeType ++,
		UniversalJoint:               nodeType ++,
		Viewpoint:                    nodeType ++,
		ViewpointGroup:               nodeType ++,
		Viewport:                     nodeType ++,
		VisibilitySensor:             nodeType ++,
		VolumeEmitter:                nodeType ++,
		VolumePickSensor:             nodeType ++,
		WindPhysicsModel:             nodeType ++,
		WorldInfo:                    nodeType ++,

		// Abstract node

		X3DBaseNode:                  nodeType ++,

		X3DAppearanceChildNode:       nodeType ++,
		X3DAppearanceNode:            nodeType ++,
		X3DBackgroundNode:            nodeType ++,
		X3DBindableNode:              nodeType ++,
		X3DBoundedObject:             nodeType ++,
		X3DChaserNode:                nodeType ++,
		X3DChildNode:                 nodeType ++,
		X3DColorNode:                 nodeType ++,
		X3DComposedGeometryNode:      nodeType ++,
		X3DCoordinateNode:            nodeType ++,
		X3DDamperNode:                nodeType ++,
		X3DDragSensorNode:            nodeType ++,
		X3DEnvironmentTextureNode:    nodeType ++,
		X3DEnvironmentalSensorNode:   nodeType ++,
		X3DFogObject:                 nodeType ++,
		X3DFollowerNode:              nodeType ++,
		X3DFontStyleNode:             nodeType ++,
		X3DGeometricPropertyNode:     nodeType ++,
		X3DGeometryNode:              nodeType ++,
		X3DGeospatialObject:          nodeType ++,
		X3DGroupingNode:              nodeType ++,
		X3DInfoNode:                  nodeType ++,
		X3DInterpolatorNode:          nodeType ++,
		X3DKeyDeviceSensorNode:       nodeType ++,
		X3DLayerNode:                 nodeType ++,
		X3DLayoutNode:                nodeType ++,
		X3DLightNode:                 nodeType ++,
		X3DLineGeometryNode:          nodeType ++,
		X3DMaterialNode:              nodeType ++,
		X3DMetadataObject:            nodeType ++,
		X3DNBodyCollidableNode:       nodeType ++,
		X3DNBodyCollisionSpaceNode:   nodeType ++,
		X3DNetworkSensorNode:         nodeType ++,
		X3DNode:                      nodeType ++,
		X3DNormalNode:                nodeType ++,
		X3DNurbsControlCurveNode:     nodeType ++,
		X3DNurbsSurfaceGeometryNode:  nodeType ++,
		X3DParametricGeometryNode:    nodeType ++,
		X3DParticleEmitterNode:       nodeType ++,
		X3DParticlePhysicsModelNode:  nodeType ++,
		X3DPickSensorNode:            nodeType ++,
		X3DPickableObject:            nodeType ++,
		X3DPointingDeviceSensorNode:  nodeType ++,
		X3DProductStructureChildNode: nodeType ++,
		X3DProgrammableShaderObject:  nodeType ++,
		X3DPrototypeInstance:         nodeType ++,
		X3DRigidJointNode:            nodeType ++,
		X3DScriptNode:                nodeType ++,
		X3DSensorNode:                nodeType ++,
		X3DSequencerNode:             nodeType ++,
		X3DShaderNode:                nodeType ++,
		X3DShapeNode:                 nodeType ++,
		X3DSoundNode:                 nodeType ++,
		X3DSoundSourceNode:           nodeType ++,
		X3DTexture2DNode:             nodeType ++,
		X3DTexture3DNode:             nodeType ++,
		X3DTextureCoordinateNode:     nodeType ++,
		X3DTextureNode:               nodeType ++,
		X3DTextureTransformNode:      nodeType ++,
		X3DTimeDependentNode:         nodeType ++,
		X3DTouchSensorNode:           nodeType ++,
		X3DTransformMatrix3DNode:     nodeType ++,
		X3DTransformNode:             nodeType ++,
		X3DTriggerNode:               nodeType ++,
		X3DUrlObject:                 nodeType ++,
		X3DVertexAttributeNode:       nodeType ++,
		X3DViewpointNode:             nodeType ++,
		X3DViewportNode:              nodeType ++,

		X3DProtoDeclarationNode:      nodeType ++,
		X3DProtoDeclaration:          nodeType ++,
		X3DExternProtoDeclaration:    nodeType ++,
		attributeCaseMap:	{
accesstype                                 accessType
actionkeypress                             actionKeyPress
actionkeyrelease                           actionKeyRelease
activate                                   activate
activelayer                                activeLayer
additionalinterface                        additionalInterface
address                                    address
align                                      align
alpha                                      alpha
altkey                                     altKey
ambientintensity                           ambientIntensity
anchorpoint                                anchorPoint
angle                                      angle
anglerate                                  angleRate
angulardampingfactor                       angularDampingFactor
angularvelocity                            angularVelocity
anisotropicdegree                          anisotropicDegree
antennalocation                            antennaLocation
antennapatternlength                       antennaPatternLength
antennapatterntype                         antennaPatternType
appinfo                                    appinfo
applicationid                              applicationID
applied                                    applied
appliedparameters                          appliedParameters
articulationparameterarray                 articulationParameterArray
articulationparameterchangeindicatorarray  articulationParameterChangeIndicatorArray
articulationparametercount                 articulationParameterCount
articulationparameterdesignatorarray       articulationParameterDesignatorArray
articulationparameteridpartattachedtoarray articulationParameterIdPartAttachedToArray
articulationparametertypearray             articulationParameterTypeArray
articulationparametervalue0_changed        articulationParameterValue0_changed
articulationparametervalue1_changed        articulationParameterValue1_changed
articulationparametervalue2_changed        articulationParameterValue2_changed
articulationparametervalue3_changed        articulationParameterValue3_changed
articulationparametervalue4_changed        articulationParameterValue4_changed
articulationparametervalue5_changed        articulationParameterValue5_changed
articulationparametervalue6_changed        articulationParameterValue6_changed
articulationparametervalue7_changed        articulationParameterValue7_changed
as                                         AS
attenuation                                attenuation
autocalc                                   autoCalc
autodamp                                   autoDamp
autodisable                                autoDisable
autooffset                                 autoOffset
avatarsize                                 avatarSize
axis                                       axis
axis1                                      axis1
axis1angle                                 axis1Angle
axis1torque                                axis1Torque
axis2                                      axis2
axis2angle                                 axis2Angle
axis2torque                                axis2Torque
axis3angle                                 axis3Angle
axis3torque                                axis3Torque
axisofrotation                             axisOfRotation
axisrotation                               axisRotation
backambientintensity                       backAmbientIntensity
backdiffusecolor                           backDiffuseColor
backemissivecolor                          backEmissiveColor
backshininess                              backShininess
backspecularcolor                          backSpecularColor
backtransparency                           backTransparency
backurl                                    backUrl
bboxcenter                                 bboxCenter
bboxsize                                   bboxSize
beamwidth                                  beamWidth
begincap                                   beginCap
bindtime                                   bindTime
body1anchorpoint                           body1AnchorPoint
body1axis                                  body1Axis
body2anchorpoint                           body2AnchorPoint
body2axis                                  body2Axis
bordercolor                                borderColor
borderwidth                                borderWidth
bottom                                     bottom
bottomradius                               bottomRadius
bottomurl                                  bottomUrl
bounce                                     bounce
boundarymoder                              boundaryModeR
boundarymodes                              boundaryModeS
boundarymodet                              boundaryModeT
boundaryopacity                            boundaryOpacity
category                                   category
ccw                                        ccw
center                                     center
centerofmass                               centerOfMass
centerofrotation                           centerOfRotation
centerofrotation_changed                   centerOfRotation_changed
child1url                                  child1Url
child2url                                  child2Url
child3url                                  child3Url
child4url                                  child4Url
class                                      class
clipboundary                               clipBoundary
closed                                     closed
closuretype                                closureType
collidetime                                collideTime
collisiontype                              collisionType
color                                      color
colorindex                                 colorIndex
colorkey                                   colorKey
colorpervertex                             colorPerVertex
colorsteps                                 colorSteps
constantforcemix                           constantForceMix
contactnormal                              contactNormal
contactsurfacethickness                    contactSurfaceThickness
containerfield                             containerField
content                                    content
contourstepsize                            contourStepSize
controlkey                                 controlKey
controlpoint                               controlPoint
conversionfactor                           conversionFactor
convex                                     convex
coolcolor                                  coolColor
coordindex                                 coordIndex
country                                    country
creaseangle                                creaseAngle
createparticles                            createParticles
crosssection                               crossSection
cryptokeyid                                cryptoKeyID
cryptosystem                               cryptoSystem
cutoffangle                                cutOffAngle
cycleinterval                              cycleInterval
cycletime                                  cycleTime
data                                       data
datalength                                 dataLength
deadreckoning                              deadReckoning
def                                        DEF
deletionallowed                            deletionAllowed
depth                                      depth
description                                description
desiredangularvelocity1                    desiredAngularVelocity1
desiredangularvelocity2                    desiredAngularVelocity2
detonatetime                               detonateTime
detonationlocation                         detonationLocation
detonationrelativelocation                 detonationRelativeLocation
detonationresult                           detonationResult
diffusecolor                               diffuseColor
dimensions                                 dimensions
dir                                        dir
direction                                  direction
directoutput                               directOutput
disableangularspeed                        disableAngularSpeed
disablelinearspeed                         disableLinearSpeed
disabletime                                disableTime
diskangle                                  diskAngle
displacements                              displacements
displayed                                  displayed
documentation                              documentation
domain                                     domain
duration                                   duration
duration_changed                           duration_changed
easeineaseout                              easeInEaseOut
edgecolor                                  edgeColor
elapsedtime                                elapsedTime
emissivecolor                              emissiveColor
enabled                                    enabled
enabledaxes                                enabledAxes
encodingscheme                             encodingScheme
endangle                                   endAngle
endcap                                     endCap
enteredtext                                enteredText
entertime                                  enterTime
entitycategory                             entityCategory
entitycountry                              entityCountry
entitydomain                               entityDomain
entityextra                                entityExtra
entityid                                   entityID
entitykind                                 entityKind
entityspecific                             entitySpecific
entitysubcategory                          entitySubcategory
errorcorrection                            errorCorrection
eventapplicationid                         eventApplicationID
evententityid                              eventEntityID
eventnumber                                eventNumber
eventsiteid                                eventSiteID
exittime                                   exitTime
extra                                      extra
family                                     family
fancount                                   fanCount
fieldofview                                fieldOfView
filled                                     filled
finaltext                                  finalText
finiterotationaxis                         finiteRotationAxis
fired1                                     fired1
fired2                                     fired2
firedtime                                  firedTime
firemissionindex                           fireMissionIndex
firingrange                                firingRange
firingrate                                 firingRate
fixed                                      fixed
fogtype                                    fogType
force                                      force
forceid                                    forceID
forceoutput                                forceOutput
forces                                     forces
forcetransitions                           forceTransitions
fraction_changed                           fraction_changed
frequency                                  frequency
frictioncoefficients                       frictionCoefficients
frictiondirection                          frictionDirection
fromfield                                  fromField
fromnode                                   fromNode
fronturl                                   frontUrl
function                                   function
fuse                                       fuse
generatemipmaps                            generateMipMaps
geocenter                                  geoCenter
geocoord_changed                           geoCoord_changed
geocoords                                  geoCoords
geogridorigin                              geoGridOrigin
geometrytype                               geometryType
geosystem                                  geoSystem
geovalue_changed                           geovalue_changed
global                                     global
gradientthreshold                          gradientThreshold
gravity                                    gravity
groundangle                                groundAngle
groundcolor                                groundColor
gustiness                                  gustiness
hatchcolor                                 hatchColor
hatched                                    hatched
hatchstyle                                 hatchStyle
headlight                                  headlight
height                                     height
hinge1angle                                hinge1Angle
hinge1anglerate                            hinge1AngleRate
hinge2angle                                hinge2Angle
hinge2anglerate                            hinge2AngleRate
hitgeocoord_changed                        hitGeoCoord_changed
hitnormal_changed                          hitNormal_changed
hitpoint_changed                           hitPoint_changed
hittexcoord_changed                        hitTexCoord_changed
horizontal                                 horizontal
http-equiv                                 http-equiv
image                                      image
importeddef                                importedDEF
index                                      index
inertia                                    inertia
info                                       info
initialdestination                         initialDestination
initialvalue                               initialValue
inlinedef                                  inlineDEF
innerradius                                innerRadius
inputfalse                                 inputFalse
inputnegate                                inputNegate
inputsource                                inputSource
inputtrue                                  inputTrue
integerkey                                 integerKey
intensity                                  intensity
intensitythreshold                         intensityThreshold
internal                                   internal
intersectiontype                           intersectionType
isactive                                   isActive
isbound                                    isBound
iscollided                                 isCollided
isdetonated                                isDetonated
isloaded                                   isLoaded
isnetworkreader                            isNetworkReader
isnetworkwriter                            isNetworkWriter
isover                                     isOver
ispaused                                   isPaused
ispickable                                 isPickable
isrtpheaderheard                           isRtpHeaderHeard
isselected                                 isSelected
isstandalone                               isStandAlone
isvalid                                    isValid
iterations                                 iterations
jump                                       jump
justify                                    justify
key                                        key
keypress                                   keyPress
keyrelease                                 keyRelease
keyvalue                                   keyValue
keyvelocity                                keyVelocity
kind                                       kind
knot                                       knot
lang                                       lang
language                                   language
lefttoright                                leftToRight
lefturl                                    leftUrl
length                                     length
lengthofmodulationparameters               lengthOfModulationParameters
level                                      level
level_changed                              level_changed
lifetimevariation                          lifetimeVariation
lighting                                   lighting
limitorientation                           limitOrientation
linearacceleration                         linearAcceleration
lineardampingfactor                        linearDampingFactor
linearvelocity                             linearVelocity
linebounds                                 lineBounds
linesegments                               lineSegments
linetype                                   linetype
linewidthscalefactor                       linewidthScaleFactor
llimit                                     llimit
load                                       load
loadtime                                   loadTime
localdef                                   localDEF
location                                   location
loop                                       loop
magnificationfilter                        magnificationFilter
marking                                    marking
mass                                       mass
matrix                                     matrix
maxangle                                   maxAngle
maxangle1                                  maxAngle1
maxback                                    maxBack
maxcorrectionspeed                         maxCorrectionSpeed
maxextent                                  maxExtent
maxfront                                   maxFront
maxparticles                               maxParticles
maxposition                                maxPosition
maxseparation                              maxSeparation
maxtorque1                                 maxTorque1
maxtorque2                                 maxTorque2
minangle                                   minAngle
minangle1                                  minAngle1
minback                                    minBack
minbouncespeed                             minBounceSpeed
minfront                                   minFront
minificationfilter                         minificationFilter
minposition                                minPosition
minseparation                              minSeparation
mode                                       mode
modifiedfraction_changed                   modifiedFraction_changed
modulationtypedetail                       modulationTypeDetail
modulationtypemajor                        modulationTypeMajor
modulationtypespreadspectrum               modulationTypeSpreadSpectrum
modulationtypesystem                       modulationTypeSystem
momentsofinertia                           momentsOfInertia
motor1angle                                motor1Angle
motor1anglerate                            motor1AngleRate
motor1axis                                 motor1Axis
motor2angle                                motor2Angle
motor2anglerate                            motor2AngleRate
motor2axis                                 motor2Axis
motor3angle                                motor3Angle
motor3anglerate                            motor3AngleRate
motor3axis                                 motor3Axis
multicastrelayhost                         multicastRelayHost
multicastrelayport                         multicastRelayPort
munitionapplicationid                      munitionApplicationID
munitionendpoint                           munitionEndPoint
munitionentityid                           munitionEntityID
munitionquantity                           munitionQuantity
munitionsiteid                             munitionSiteID
munitionstartpoint                         munitionStartPoint
mustevaluate                               mustEvaluate
name                                       name
networkmode                                networkMode
next                                       next
nodefield                                  nodeField
normal_changed                             normal_changed
normalindex                                normalIndex
normalizevelocity                          normalizeVelocity
normalpervertex                            normalPerVertex
numcomponents                              numComponents
objecttype                                 objectType
offset                                     offset
offsetunits                                offsetUnits
on                                         on
opacityfactor                              opacityFactor
order                                      order
orientation                                orientation
orientation_changed                        orientation_changed
origin                                     origin
orthogonalcolor                            orthogonalColor
outerradius                                outerRadius
parallelcolor                              parallelColor
parameter                                  parameter
particlelifetime                           particleLifetime
particlesize                               particleSize
pausetime                                  pauseTime
phasefunction                              phaseFunction
pickable                                   pickable
pickednormal                               pickedNormal
pickedpoint                                pickedPoint
pickedtexturecoordinate                    pickedTextureCoordinate
pitch                                      pitch
plane                                      plane
point                                      point
pointsize                                  pointSize
port                                       port
position                                   position
position_changed                           position_changed
power                                      power
preferaccuracy                             preferAccuracy
previous                                   previous
priority                                   priority
profile                                    profile
progress                                   progress
protofield                                 protoField
radioentitytypecategory                    radioEntityTypeCategory
radioentitytypecountry                     radioEntityTypeCountry
radioentitytypedomain                      radioEntityTypeDomain
radioentitytypekind                        radioEntityTypeKind
radioentitytypenomenclature                radioEntityTypeNomenclature
radioentitytypenomenclatureversion         radioEntityTypeNomenclatureVersion
radioid                                    radioID
radius                                     radius
range                                      range
readinterval                               readInterval
receivedpower                              receivedPower
receiverstate                              receiverState
reference                                  reference
relativeantennalocation                    relativeAntennaLocation
repeatr                                    repeatR
repeats                                    repeatS
repeatt                                    repeatT
resumetime                                 resumeTime
retainedopacity                            retainedOpacity
retainuseroffsets                          retainUserOffsets
righturl                                   rightUrl
rooturl                                    rootUrl
rotateyup                                  rotateYUp
rotation                                   rotation
rotation_changed                           rotation_changed
rtpheaderexpected                          rtpHeaderExpected
samplerate                                 sampleRate
samples                                    samples
scale                                      scale
scalemode                                  scaleMode
scaleorientation                           scaleOrientation
scheme                                     scheme
segmentenabled                             segmentEnabled
separatebackcolor                          separateBackColor
separation                                 separation
separationrate                             separationRate
set_articulationparametervalue0            set_articulationParameterValue0
set_articulationparametervalue1            set_articulationParameterValue1
set_articulationparametervalue2            set_articulationParameterValue2
set_articulationparametervalue3            set_articulationParameterValue3
set_articulationparametervalue4            set_articulationParameterValue4
set_articulationparametervalue5            set_articulationParameterValue5
set_articulationparametervalue6            set_articulationParameterValue6
set_articulationparametervalue7            set_articulationParameterValue7
set_bind                                   set_bind
set_boolean                                set_boolean
set_colorindex                             set_colorIndex
set_coordindex                             set_coordIndex
set_crosssection                           set_crossSection
set_destination                            set_destination
set_fraction                               set_fraction
set_height                                 set_height
set_index                                  set_index
set_normalindex                            set_normalIndex
set_orientation                            set_orientation
set_scale                                  set_scale
set_spine                                  set_spine
set_texcoordindex                          set_texCoordIndex
set_triggertime                            set_triggerTime
set_value                                  set_value
shadows                                    shadows
shiftkey                                   shiftKey
shininess                                  shininess
side                                       side
silhouetteboundaryopacity                  silhouetteBoundaryOpacity
silhouetteretainedopacity                  silhouetteRetainedOpacity
silhouettesharpness                        silhouetteSharpness
siteid                                     siteID
size                                       size
sizeunits                                  sizeUnits
skincoordindex                             skinCoordIndex
skincoordweight                            skinCoordWeight
skyangle                                   skyAngle
skycolor                                   skyColor
sliderforce                                sliderForce
slipcoefficients                           slipCoefficients
slipfactors                                slipFactors
softnessconstantforcemix                   softnessConstantForceMix
softnesserrorcorrection                    softnessErrorCorrection
solid                                      solid
sortorder                                  sortOrder
source                                     source
spacing                                    spacing
spatialize                                 spatialize
specific                                   specific
specularcolor                              specularColor
speed                                      speed
speedfactor                                speedFactor
spine                                      spine
startangle                                 startAngle
starttime                                  startTime
stiffness                                  stiffness
stop1bounce                                stop1Bounce
stop1constantforcemix                      stop1ConstantForceMix
stop1errorcorrection                       stop1ErrorCorrection
stop2bounce                                stop2Bounce
stop2errorcorrection                       stop2ErrorCorrection
stop3bounce                                stop3Bounce
stop3errorcorrection                       stop3ErrorCorrection
stopbounce                                 stopBounce
stoperrorcorrection                        stopErrorCorrection
stoptime                                   stopTime
string                                     string
stripcount                                 stripCount
style                                      style
subcategory                                subcategory
summary                                    summary
surfacearea                                surfaceArea
surfacespeed                               surfaceSpeed
surfacetolerance                           surfaceTolerance
surfacevalues                              surfaceValues
suspensionerrorcorrection                  suspensionErrorCorrection
suspensionforce                            suspensionForce
tau                                        tau
tdltype                                    tdlType
tessellation                               tessellation
tessellationscale                          tessellationScale
texcoordindex                              texCoordIndex
texcoordkey                                texCoordKey
textbounds                                 textBounds
texturecompression                         textureCompression
texturepriority                            texturePriority
time                                       time
timeout                                    timeOut
timestamp                                  timestamp
title                                      title
tofield                                    toField
toggle                                     toggle
tolerance                                  tolerance
tonode                                     toNode
top                                        top
toptobottom                                topToBottom
topurl                                     topUrl
torques                                    torques
touchtime                                  touchTime
trackpoint_changed                         trackPoint_changed
transitioncomplete                         transitionComplete
transitiontime                             transitionTime
transitiontype                             transitionType
translation                                translation
translation_changed                        translation_changed
transmitfrequencybandwidth                 transmitFrequencyBandwidth
transmitstate                              transmitState
transmitterapplicationid                   transmitterApplicationID
transmitterentityid                        transmitterEntityID
transmitterradioid                         transmitterRadioID
transmittersiteid                          transmitterSiteID
transparency                               transparency
triggertime                                triggerTime
triggertrue                                triggerTrue
triggervalue                               triggerValue
turbulence                                 turbulence
type                                       type
uclosed                                    uClosed
udimension                                 uDimension
uknot                                      uKnot
ulimit                                     ulimit
uorder                                     uOrder
update                                     update
url                                        url
use                                        USE
usefiniterotation                          useFiniteRotation
usegeometry                                useGeometry
useglobalgravity                           useGlobalGravity
utessellation                              uTessellation
value                                      value
value_changed                              value_changed
variation                                  variation
vclosed                                    vClosed
vdimension                                 vDimension
vector                                     vector
version                                    version
vertexcount                                vertexCount
vertices                                   vertices
visibilitylimit                            visibilityLimit
visibilityrange                            visibilityRange
visible                                    visible
vknot                                      vKnot
vorder                                     vOrder
vtessellation                              vTessellation
warhead                                    warhead
warmcolor                                  warmColor
weight                                     weight
weightconstant1                            weightConstant1
weightconstant2                            weightConstant2
weightfunction1                            weightFunction1
weightfunction2                            weightFunction2
whichchoice                                whichChoice
whichgeometry                              whichGeometry
writeinterval                              writeInterval
xdimension                                 xDimension
xspacing                                   xSpacing
yscale                                     yScale
zdimension                                 zDimension
zspacing                                   zSpacing
		}
	};

	Object .preventExtensions (X3DConstants);
	Object .freeze (X3DConstants);
	Object .seal (X3DConstants);

	return X3DConstants;
});
