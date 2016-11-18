/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This file is part of the Cobweb Project.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains "non-military use only" components.
 *
 * Copyright 2016 Andreas Plesch.
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

	var AttributeHTMLSupport =
    	{
		attributeLowerCaseToCamelCase:
		{
			"accesstype" : "accessType",
			"actionkeypress" : "actionKeyPress",
			"actionkeyrelease" : "actionKeyRelease",
			"activate" : "activate",
			"activelayer" : "activeLayer",
			"additionalinterface" : "additionalInterface",
			"address" : "address",
			"align" : "align",
			"alpha" : "alpha",
			"altkey" : "altKey",
			"ambientintensity" : "ambientIntensity",
			"anchorpoint" : "anchorPoint",
			"angle" : "angle",
			"anglerate" : "angleRate",
			"angulardampingfactor" : "angularDampingFactor",
			"angularvelocity" : "angularVelocity",
			"anisotropicdegree" : "anisotropicDegree",
			"antennalocation" : "antennaLocation",
			"antennapatternlength" : "antennaPatternLength",
			"antennapatterntype" : "antennaPatternType",
			"appinfo" : "appinfo",
			"applicationid" : "applicationID",
			"applied" : "applied",
			"appliedparameters" : "appliedParameters",
			"articulationparameterarray" : "articulationParameterArray",
			"articulationparameterchangeindicatorarray" : "articulationParameterChangeIndicatorArray",
			"articulationparametercount" : "articulationParameterCount",
			"articulationparameterdesignatorarray" : "articulationParameterDesignatorArray",
			"articulationparameteridpartattachedtoarray" : "articulationParameterIdPartAttachedToArray",
			"articulationparametertypearray" : "articulationParameterTypeArray",
			"articulationparametervalue0_changed" : "articulationParameterValue0_changed",
			"articulationparametervalue1_changed" : "articulationParameterValue1_changed",
			"articulationparametervalue2_changed" : "articulationParameterValue2_changed",
			"articulationparametervalue3_changed" : "articulationParameterValue3_changed",
			"articulationparametervalue4_changed" : "articulationParameterValue4_changed",
			"articulationparametervalue5_changed" : "articulationParameterValue5_changed",
			"articulationparametervalue6_changed" : "articulationParameterValue6_changed",
			"articulationparametervalue7_changed" : "articulationParameterValue7_changed",
			"as" : "AS",
			"attenuation" : "attenuation",
			"autocalc" : "autoCalc",
			"autodamp" : "autoDamp",
			"autodisable" : "autoDisable",
			"autooffset" : "autoOffset",
			"avatarsize" : "avatarSize",
			"axis" : "axis",
			"axis1" : "axis1",
			"axis1angle" : "axis1Angle",
			"axis1torque" : "axis1Torque",
			"axis2" : "axis2",
			"axis2angle" : "axis2Angle",
			"axis2torque" : "axis2Torque",
			"axis3angle" : "axis3Angle",
			"axis3torque" : "axis3Torque",
			"axisofrotation" : "axisOfRotation",
			"axisrotation" : "axisRotation",
			"backambientintensity" : "backAmbientIntensity",
			"backdiffusecolor" : "backDiffuseColor",
			"backemissivecolor" : "backEmissiveColor",
			"backshininess" : "backShininess",
			"backspecularcolor" : "backSpecularColor",
			"backtransparency" : "backTransparency",
			"backurl" : "backUrl",
			"bboxcenter" : "bboxCenter",
			"bboxsize" : "bboxSize",
			"beamwidth" : "beamWidth",
			"begincap" : "beginCap",
			"bindtime" : "bindTime",
			"body1anchorpoint" : "body1AnchorPoint",
			"body1axis" : "body1Axis",
			"body2anchorpoint" : "body2AnchorPoint",
			"body2axis" : "body2Axis",
			"bordercolor" : "borderColor",
			"borderwidth" : "borderWidth",
			"bottom" : "bottom",
			"bottomradius" : "bottomRadius",
			"bottomurl" : "bottomUrl",
			"bounce" : "bounce",
			"boundarymoder" : "boundaryModeR",
			"boundarymodes" : "boundaryModeS",
			"boundarymodet" : "boundaryModeT",
			"boundaryopacity" : "boundaryOpacity",
			"category" : "category",
			"ccw" : "ccw",
			"center" : "center",
			"centerofmass" : "centerOfMass",
			"centerofrotation" : "centerOfRotation",
			"centerofrotation_changed" : "centerOfRotation_changed",
			"child1url" : "child1Url",
			"child2url" : "child2Url",
			"child3url" : "child3Url",
			"child4url" : "child4Url",
			"class" : "class",
			"clipboundary" : "clipBoundary",
			"closed" : "closed",
			"closuretype" : "closureType",
			"collidetime" : "collideTime",
			"collisiontype" : "collisionType",
			"color" : "color",
			"colorindex" : "colorIndex",
			"colorkey" : "colorKey",
			"colorpervertex" : "colorPerVertex",
			"colorsteps" : "colorSteps",
			"constantforcemix" : "constantForceMix",
			"contactnormal" : "contactNormal",
			"contactsurfacethickness" : "contactSurfaceThickness",
			"containerfield" : "containerField",
			"content" : "content",
			"contourstepsize" : "contourStepSize",
			"controlkey" : "controlKey",
			"controlpoint" : "controlPoint",
			"conversionfactor" : "conversionFactor",
			"convex" : "convex",
			"coolcolor" : "coolColor",
			"coordindex" : "coordIndex",
			"country" : "country",
			"creaseangle" : "creaseAngle",
			"createparticles" : "createParticles",
			"crosssection" : "crossSection",
			"cryptokeyid" : "cryptoKeyID",
			"cryptosystem" : "cryptoSystem",
			"cutoffangle" : "cutOffAngle",
			"cycleinterval" : "cycleInterval",
			"cycletime" : "cycleTime",
			"data" : "data",
			"datalength" : "dataLength",
			"deadreckoning" : "deadReckoning",
			"def" : "DEF",
			"deletionallowed" : "deletionAllowed",
			"depth" : "depth",
			"description" : "description",
			"desiredangularvelocity1" : "desiredAngularVelocity1",
			"desiredangularvelocity2" : "desiredAngularVelocity2",
			"detonatetime" : "detonateTime",
			"detonationlocation" : "detonationLocation",
			"detonationrelativelocation" : "detonationRelativeLocation",
			"detonationresult" : "detonationResult",
			"diffusecolor" : "diffuseColor",
			"dimensions" : "dimensions",
			"dir" : "dir",
			"direction" : "direction",
			"directoutput" : "directOutput",
			"disableangularspeed" : "disableAngularSpeed",
			"disablelinearspeed" : "disableLinearSpeed",
			"disabletime" : "disableTime",
			"diskangle" : "diskAngle",
			"displacements" : "displacements",
			"displayed" : "displayed",
			"documentation" : "documentation",
			"domain" : "domain",
			"duration" : "duration",
			"duration_changed" : "duration_changed",
			"easeineaseout" : "easeInEaseOut",
			"edgecolor" : "edgeColor",
			"elapsedtime" : "elapsedTime",
			"emissivecolor" : "emissiveColor",
			"enabled" : "enabled",
			"enabledaxes" : "enabledAxes",
			"encodingscheme" : "encodingScheme",
			"endangle" : "endAngle",
			"endcap" : "endCap",
			"enteredtext" : "enteredText",
			"entertime" : "enterTime",
			"entitycategory" : "entityCategory",
			"entitycountry" : "entityCountry",
			"entitydomain" : "entityDomain",
			"entityextra" : "entityExtra",
			"entityid" : "entityID",
			"entitykind" : "entityKind",
			"entityspecific" : "entitySpecific",
			"entitysubcategory" : "entitySubcategory",
			"errorcorrection" : "errorCorrection",
			"eventapplicationid" : "eventApplicationID",
			"evententityid" : "eventEntityID",
			"eventnumber" : "eventNumber",
			"eventsiteid" : "eventSiteID",
			"exittime" : "exitTime",
			"extra" : "extra",
			"family" : "family",
			"fancount" : "fanCount",
			"fieldofview" : "fieldOfView",
			"filled" : "filled",
			"finaltext" : "finalText",
			"finiterotationaxis" : "finiteRotationAxis",
			"fired1" : "fired1",
			"fired2" : "fired2",
			"firedtime" : "firedTime",
			"firemissionindex" : "fireMissionIndex",
			"firingrange" : "firingRange",
			"firingrate" : "firingRate",
			"fixed" : "fixed",
			"fogtype" : "fogType",
			"force" : "force",
			"forceid" : "forceID",
			"forceoutput" : "forceOutput",
			"forces" : "forces",
			"forcetransitions" : "forceTransitions",
			"fraction_changed" : "fraction_changed",
			"frequency" : "frequency",
			"frictioncoefficients" : "frictionCoefficients",
			"frictiondirection" : "frictionDirection",
			"fromfield" : "fromField",
			"fromnode" : "fromNode",
			"fronturl" : "frontUrl",
			"function" : "function",
			"fuse" : "fuse",
			"generatemipmaps" : "generateMipMaps",
			"geocenter" : "geoCenter",
			"geocoord_changed" : "geoCoord_changed",
			"geocoords" : "geoCoords",
			"geogridorigin" : "geoGridOrigin",
			"geometrytype" : "geometryType",
			"geosystem" : "geoSystem",
			"geovalue_changed" : "geovalue_changed",
			"global" : "global",
			"gradientthreshold" : "gradientThreshold",
			"gravity" : "gravity",
			"groundangle" : "groundAngle",
			"groundcolor" : "groundColor",
			"gustiness" : "gustiness",
			"hatchcolor" : "hatchColor",
			"hatched" : "hatched",
			"hatchstyle" : "hatchStyle",
			"headlight" : "headlight",
			"height" : "height",
			"hinge1angle" : "hinge1Angle",
			"hinge1anglerate" : "hinge1AngleRate",
			"hinge2angle" : "hinge2Angle",
			"hinge2anglerate" : "hinge2AngleRate",
			"hitgeocoord_changed" : "hitGeoCoord_changed",
			"hitnormal_changed" : "hitNormal_changed",
			"hitpoint_changed" : "hitPoint_changed",
			"hittexcoord_changed" : "hitTexCoord_changed",
			"horizontal" : "horizontal",
			"http-equiv" : "http-equiv",
			"image" : "image",
			"importeddef" : "importedDEF",
			"index" : "index",
			"inertia" : "inertia",
			"info" : "info",
			"initialdestination" : "initialDestination",
			"initialvalue" : "initialValue",
			"inlinedef" : "inlineDEF",
			"innerradius" : "innerRadius",
			"inputfalse" : "inputFalse",
			"inputnegate" : "inputNegate",
			"inputsource" : "inputSource",
			"inputtrue" : "inputTrue",
			"integerkey" : "integerKey",
			"intensity" : "intensity",
			"intensitythreshold" : "intensityThreshold",
			"internal" : "internal",
			"intersectiontype" : "intersectionType",
			"isactive" : "isActive",
			"isbound" : "isBound",
			"iscollided" : "isCollided",
			"isdetonated" : "isDetonated",
			"isloaded" : "isLoaded",
			"isnetworkreader" : "isNetworkReader",
			"isnetworkwriter" : "isNetworkWriter",
			"isover" : "isOver",
			"ispaused" : "isPaused",
			"ispickable" : "isPickable",
			"isrtpheaderheard" : "isRtpHeaderHeard",
			"isselected" : "isSelected",
			"isstandalone" : "isStandAlone",
			"isvalid" : "isValid",
			"iterations" : "iterations",
			"jump" : "jump",
			"justify" : "justify",
			"key" : "key",
			"keypress" : "keyPress",
			"keyrelease" : "keyRelease",
			"keyvalue" : "keyValue",
			"keyvelocity" : "keyVelocity",
			"kind" : "kind",
			"knot" : "knot",
			"lang" : "lang",
			"language" : "language",
			"lefttoright" : "leftToRight",
			"lefturl" : "leftUrl",
			"length" : "length",
			"lengthofmodulationparameters" : "lengthOfModulationParameters",
			"level" : "level",
			"level_changed" : "level_changed",
			"lifetimevariation" : "lifetimeVariation",
			"lighting" : "lighting",
			"limitorientation" : "limitOrientation",
			"linearacceleration" : "linearAcceleration",
			"lineardampingfactor" : "linearDampingFactor",
			"linearvelocity" : "linearVelocity",
			"linebounds" : "lineBounds",
			"linesegments" : "lineSegments",
			"linetype" : "linetype",
			"linewidthscalefactor" : "linewidthScaleFactor",
			"llimit" : "llimit",
			"load" : "load",
			"loadtime" : "loadTime",
			"localdef" : "localDEF",
			"location" : "location",
			"loop" : "loop",
			"magnificationfilter" : "magnificationFilter",
			"marking" : "marking",
			"mass" : "mass",
			"matrix" : "matrix",
			"maxangle" : "maxAngle",
			"maxangle1" : "maxAngle1",
			"maxback" : "maxBack",
			"maxcorrectionspeed" : "maxCorrectionSpeed",
			"maxextent" : "maxExtent",
			"maxfront" : "maxFront",
			"maxparticles" : "maxParticles",
			"maxposition" : "maxPosition",
			"maxseparation" : "maxSeparation",
			"maxtorque1" : "maxTorque1",
			"maxtorque2" : "maxTorque2",
			"minangle" : "minAngle",
			"minangle1" : "minAngle1",
			"minback" : "minBack",
			"minbouncespeed" : "minBounceSpeed",
			"minfront" : "minFront",
			"minificationfilter" : "minificationFilter",
			"minposition" : "minPosition",
			"minseparation" : "minSeparation",
			"mode" : "mode",
			"modifiedfraction_changed" : "modifiedFraction_changed",
			"modulationtypedetail" : "modulationTypeDetail",
			"modulationtypemajor" : "modulationTypeMajor",
			"modulationtypespreadspectrum" : "modulationTypeSpreadSpectrum",
			"modulationtypesystem" : "modulationTypeSystem",
			"momentsofinertia" : "momentsOfInertia",
			"motor1angle" : "motor1Angle",
			"motor1anglerate" : "motor1AngleRate",
			"motor1axis" : "motor1Axis",
			"motor2angle" : "motor2Angle",
			"motor2anglerate" : "motor2AngleRate",
			"motor2axis" : "motor2Axis",
			"motor3angle" : "motor3Angle",
			"motor3anglerate" : "motor3AngleRate",
			"motor3axis" : "motor3Axis",
			"multicastrelayhost" : "multicastRelayHost",
			"multicastrelayport" : "multicastRelayPort",
			"munitionapplicationid" : "munitionApplicationID",
			"munitionendpoint" : "munitionEndPoint",
			"munitionentityid" : "munitionEntityID",
			"munitionquantity" : "munitionQuantity",
			"munitionsiteid" : "munitionSiteID",
			"munitionstartpoint" : "munitionStartPoint",
			"mustevaluate" : "mustEvaluate",
			"name" : "name",
			"networkmode" : "networkMode",
			"next" : "next",
			"nodefield" : "nodeField",
			"normal_changed" : "normal_changed",
			"normalindex" : "normalIndex",
			"normalizevelocity" : "normalizeVelocity",
			"normalpervertex" : "normalPerVertex",
			"numcomponents" : "numComponents",
			"objecttype" : "objectType",
			"offset" : "offset",
			"offsetunits" : "offsetUnits",
			"on" : "on",
			"opacityfactor" : "opacityFactor",
			"order" : "order",
			"orientation" : "orientation",
			"orientation_changed" : "orientation_changed",
			"origin" : "origin",
			"orthogonalcolor" : "orthogonalColor",
			"outerradius" : "outerRadius",
			"parallelcolor" : "parallelColor",
			"parameter" : "parameter",
			"particlelifetime" : "particleLifetime",
			"particlesize" : "particleSize",
			"pausetime" : "pauseTime",
			"phasefunction" : "phaseFunction",
			"pickable" : "pickable",
			"pickednormal" : "pickedNormal",
			"pickedpoint" : "pickedPoint",
			"pickedtexturecoordinate" : "pickedTextureCoordinate",
			"pitch" : "pitch",
			"plane" : "plane",
			"point" : "point",
			"pointsize" : "pointSize",
			"port" : "port",
			"position" : "position",
			"position_changed" : "position_changed",
			"power" : "power",
			"preferaccuracy" : "preferAccuracy",
			"previous" : "previous",
			"priority" : "priority",
			"profile" : "profile",
			"progress" : "progress",
			"protofield" : "protoField",
			"radioentitytypecategory" : "radioEntityTypeCategory",
			"radioentitytypecountry" : "radioEntityTypeCountry",
			"radioentitytypedomain" : "radioEntityTypeDomain",
			"radioentitytypekind" : "radioEntityTypeKind",
			"radioentitytypenomenclature" : "radioEntityTypeNomenclature",
			"radioentitytypenomenclatureversion" : "radioEntityTypeNomenclatureVersion",
			"radioid" : "radioID",
			"radius" : "radius",
			"range" : "range",
			"readinterval" : "readInterval",
			"receivedpower" : "receivedPower",
			"receiverstate" : "receiverState",
			"reference" : "reference",
			"relativeantennalocation" : "relativeAntennaLocation",
			"repeatr" : "repeatR",
			"repeats" : "repeatS",
			"repeatt" : "repeatT",
			"resumetime" : "resumeTime",
			"retainedopacity" : "retainedOpacity",
			"retainuseroffsets" : "retainUserOffsets",
			"righturl" : "rightUrl",
			"rooturl" : "rootUrl",
			"rotateyup" : "rotateYUp",
			"rotation" : "rotation",
			"rotation_changed" : "rotation_changed",
			"rtpheaderexpected" : "rtpHeaderExpected",
			"samplerate" : "sampleRate",
			"samples" : "samples",
			"scale" : "scale",
			"scalemode" : "scaleMode",
			"scaleorientation" : "scaleOrientation",
			"scheme" : "scheme",
			"segmentenabled" : "segmentEnabled",
			"separatebackcolor" : "separateBackColor",
			"separation" : "separation",
			"separationrate" : "separationRate",
			"set_articulationparametervalue0" : "set_articulationParameterValue0",
			"set_articulationparametervalue1" : "set_articulationParameterValue1",
			"set_articulationparametervalue2" : "set_articulationParameterValue2",
			"set_articulationparametervalue3" : "set_articulationParameterValue3",
			"set_articulationparametervalue4" : "set_articulationParameterValue4",
			"set_articulationparametervalue5" : "set_articulationParameterValue5",
			"set_articulationparametervalue6" : "set_articulationParameterValue6",
			"set_articulationparametervalue7" : "set_articulationParameterValue7",
			"set_bind" : "set_bind",
			"set_boolean" : "set_boolean",
			"set_colorindex" : "set_colorIndex",
			"set_coordindex" : "set_coordIndex",
			"set_crosssection" : "set_crossSection",
			"set_destination" : "set_destination",
			"set_fraction" : "set_fraction",
			"set_height" : "set_height",
			"set_index" : "set_index",
			"set_normalindex" : "set_normalIndex",
			"set_orientation" : "set_orientation",
			"set_scale" : "set_scale",
			"set_spine" : "set_spine",
			"set_texcoordindex" : "set_texCoordIndex",
			"set_triggertime" : "set_triggerTime",
			"set_value" : "set_value",
			"shadows" : "shadows",
			"shiftkey" : "shiftKey",
			"shininess" : "shininess",
			"side" : "side",
			"silhouetteboundaryopacity" : "silhouetteBoundaryOpacity",
			"silhouetteretainedopacity" : "silhouetteRetainedOpacity",
			"silhouettesharpness" : "silhouetteSharpness",
			"siteid" : "siteID",
			"size" : "size",
			"sizeunits" : "sizeUnits",
			"skincoordindex" : "skinCoordIndex",
			"skincoordweight" : "skinCoordWeight",
			"skyangle" : "skyAngle",
			"skycolor" : "skyColor",
			"sliderforce" : "sliderForce",
			"slipcoefficients" : "slipCoefficients",
			"slipfactors" : "slipFactors",
			"softnessconstantforcemix" : "softnessConstantForceMix",
			"softnesserrorcorrection" : "softnessErrorCorrection",
			"solid" : "solid",
			"sortorder" : "sortOrder",
			"source" : "source",
			"spacing" : "spacing",
			"spatialize" : "spatialize",
			"specific" : "specific",
			"specularcolor" : "specularColor",
			"speed" : "speed",
			"speedfactor" : "speedFactor",
			"spine" : "spine",
			"startangle" : "startAngle",
			"starttime" : "startTime",
			"stiffness" : "stiffness",
			"stop1bounce" : "stop1Bounce",
			"stop1constantforcemix" : "stop1ConstantForceMix",
			"stop1errorcorrection" : "stop1ErrorCorrection",
			"stop2bounce" : "stop2Bounce",
			"stop2errorcorrection" : "stop2ErrorCorrection",
			"stop3bounce" : "stop3Bounce",
			"stop3errorcorrection" : "stop3ErrorCorrection",
			"stopbounce" : "stopBounce",
			"stoperrorcorrection" : "stopErrorCorrection",
			"stoptime" : "stopTime",
			"string" : "string",
			"stripcount" : "stripCount",
			"style" : "style",
			"subcategory" : "subcategory",
			"summary" : "summary",
			"surfacearea" : "surfaceArea",
			"surfacespeed" : "surfaceSpeed",
			"surfacetolerance" : "surfaceTolerance",
			"surfacevalues" : "surfaceValues",
			"suspensionerrorcorrection" : "suspensionErrorCorrection",
			"suspensionforce" : "suspensionForce",
			"tau" : "tau",
			"tdltype" : "tdlType",
			"tessellation" : "tessellation",
			"tessellationscale" : "tessellationScale",
			"texcoordindex" : "texCoordIndex",
			"texcoordkey" : "texCoordKey",
			"textbounds" : "textBounds",
			"texturecompression" : "textureCompression",
			"texturepriority" : "texturePriority",
			"time" : "time",
			"timeout" : "timeOut",
			"timestamp" : "timestamp",
			"title" : "title",
			"tofield" : "toField",
			"toggle" : "toggle",
			"tolerance" : "tolerance",
			"tonode" : "toNode",
			"top" : "top",
			"toptobottom" : "topToBottom",
			"topurl" : "topUrl",
			"torques" : "torques",
			"touchtime" : "touchTime",
			"trackpoint_changed" : "trackPoint_changed",
			"transitioncomplete" : "transitionComplete",
			"transitiontime" : "transitionTime",
			"transitiontype" : "transitionType",
			"translation" : "translation",
			"translation_changed" : "translation_changed",
			"transmitfrequencybandwidth" : "transmitFrequencyBandwidth",
			"transmitstate" : "transmitState",
			"transmitterapplicationid" : "transmitterApplicationID",
			"transmitterentityid" : "transmitterEntityID",
			"transmitterradioid" : "transmitterRadioID",
			"transmittersiteid" : "transmitterSiteID",
			"transparency" : "transparency",
			"triggertime" : "triggerTime",
			"triggertrue" : "triggerTrue",
			"triggervalue" : "triggerValue",
			"turbulence" : "turbulence",
			"type" : "type",
			"uclosed" : "uClosed",
			"udimension" : "uDimension",
			"uknot" : "uKnot",
			"ulimit" : "ulimit",
			"uorder" : "uOrder",
			"update" : "update",
			"url" : "url",
			"use" : "USE",
			"usefiniterotation" : "useFiniteRotation",
			"usegeometry" : "useGeometry",
			"useglobalgravity" : "useGlobalGravity",
			"utessellation" : "uTessellation",
			"value" : "value",
			"value_changed" : "value_changed",
			"variation" : "variation",
			"vclosed" : "vClosed",
			"vdimension" : "vDimension",
			"vector" : "vector",
			"version" : "version",
			"vertexcount" : "vertexCount",
			"vertices" : "vertices",
			"visibilitylimit" : "visibilityLimit",
			"visibilityrange" : "visibilityRange",
			"visible" : "visible",
			"vknot" : "vKnot",
			"vorder" : "vOrder",
			"vtessellation" : "vTessellation",
			"warhead" : "warhead",
			"warmcolor" : "warmColor",
			"weight" : "weight",
			"weightconstant1" : "weightConstant1",
			"weightconstant2" : "weightConstant2",
			"weightfunction1" : "weightFunction1",
			"weightfunction2" : "weightFunction2",
			"whichchoice" : "whichChoice",
			"whichgeometry" : "whichGeometry",
			"writeinterval" : "writeInterval",
			"xdimension" : "xDimension",
			"xspacing" : "xSpacing",
			"yscale" : "yScale",
			"zdimension" : "zDimension",
			"zspacing" : "zSpacing"
		}
	};

	Object .preventExtensions (AttributeHTMLSupport);
	Object .freeze (AttributeHTMLSupport);
	Object .seal (AttributeHTMLSupport);

	return AttributeHTMLSupport;
});
