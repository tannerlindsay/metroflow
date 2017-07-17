var MetroFlow = MetroFlow || {}; MetroFlow["sidebar"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
styles = __webpack_require__(2);


var DisplaySettings = {
    isDebug: false,
};


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


var Observable = {
    Observable: function() {
        this.observers = [];
        return this;
    },
    registerObserver: function(observer) {
        var index = this.observers.indexOf(observer);
        if (index === -1) {
            this.observers.push(observer);
        }
    },
    unregisterObserver: function(observer) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    },
    notifyAllObservers: function() {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(this);
        }
    },
    notifyBeforeRemove: function() {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notifyRemove(this);
        }
    },
};


function Observer(notify, notifyRemove) {
    return {
        notify: notify,
        notifyRemove: notifyRemove,
    }
};


module.exports = {
    DisplaySettings: DisplaySettings,
    Observer: Observer,
    Observable: Observable,
    uuidv4: uuidv4,
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = paper;

/***/ }),
/* 2 */
/***/ (function(module, exports) {


var fillColor = "white";
var strokeWidth = 8;
var stationRadius = 1*strokeWidth;
var selectionColor = rgbToHex(0, 100, 0);


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


var MapStyle = {

};


var TrackStyle = {

};


var SegmentStyle = {
    strokeColor: rgbToHex(255, 0, 0),
    strokeWidth: strokeWidth,
    selectionColor: selectionColor,
    fullySelected: false
};


var StationStyle = {
    strokeColor: rgbToHex(0, 0, 0),
    strokeWidth: strokeWidth/2,
    fillColor: fillColor,
    stationRadius: stationRadius,
    selectionColor: selectionColor,
    fullySelected: false
};


var StationMinorStyle = {
    strokeColor: SegmentStyle.strokeColor,
    strokeWidth: SegmentStyle.strokeWidth,
    selectionColor: selectionColor,
    minorStationSize: SegmentStyle.strokeWidth * 2.0,
    fullySelected: false
};


function createStationStyle() {
    var newStyle = {};
    Object.keys(StationStyle).forEach(function(key) {
        newStyle[key] = StationStyle[key];
    });
    return newStyle;
}

function createStationMinorStyle() {
    var newStyle = {};
    Object.keys(StationMinorStyle).forEach(function(key) {
        newStyle[key] = StationMinorStyle[key];
    });
    return newStyle;
}

function createSegmentStyle() {
    var newStyle = {};
    Object.keys(SegmentStyle).forEach(function(key) {
        newStyle[key] = SegmentStyle[key];
    });
    return newStyle;
}


module.exports = {
    createStationStyle: createStationStyle,
    createSegmentStyle: createSegmentStyle,
    createStationMinorStyle: createStationMinorStyle,
    rgbToHex: rgbToHex,
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

core = __webpack_require__(0);

var minStraight = 30;
var arcRadius = 10.0;

var Segment = {
    Segment: function(stationA, stationB, style) {
        this.stationA = stationA;
        this.stationB = stationB;
        this.style = style;
        this.stationsMinor = [];
        this.id = core.uuidv4();
        this.paths = [];
        this.directionBegin = null;
        this.directionEnd = null;
        this.pathsStraight = [];
        this.isSelected = false;
        return this;
    },
    begin: function() {
        return this.stationA.position;
    },
    end: function() {
        return this.stationB.position;
    },
    direction: function() {
        return this.end() - this.begin();
    },
    center: function() {
        return this.begin() + (this.end() - this.begin())/2;
    },
    lengthStraight: function() {
        var length = 0.0;
        for (var i in this.pathsStraight) {
            length += this.pathsStraight[i].length;
        }
        return length;
    },
    switchDirection: function() {
        console.log('switchDirection');
        console.log(this.stationA.id, this.stationB.id);
        var stationA = this.stationA;
        this.stationA = this.stationB;
        this.stationB = stationA;
        console.log(this.stationA.id, this.stationB.id);
    },
    toggleSelect: function() {
        if (this.isSelected) {
            this.unselect();
        } else {
            this.select();
        }
    },
    select: function() {
        this.isSelected = true;
        for (var i in this.paths){
            this.paths[i].strokeColor = this.style.selectionColor;
        }
    },
    unselect: function() {
        this.isSelected = false;
        for (var i in this.paths){
            this.paths[i].strokeColor = this.style.strokeColor;
        }
    },
    createPath: function() {
        var path = new Path();
        this.paths.push(path);
        path.strokeColor = this.style.strokeColor;
        path.strokeWidth = this.style.strokeWidth;
        path.strokeCap = 'round';
        path.strokeJoin = 'round';
        path.fullySelected = core.DisplaySettings.isDebug;
        return path;
    },
    calcStationPosition: function(station) {
        var pos = this.stationsMinor.indexOf(station);
        var nStations = this.stationsMinor.length + 1; // including main station
        var totalLength = this.lengthStraight();
        var distanceBetweenStations = totalLength/nStations;
        var distanceStation = distanceBetweenStations * (pos+1);
        var currentLength = 0;
        var lengthDone = 0;
        for (var i in this.pathsStraight) {
            currentLength += this.pathsStraight[i].length;
            if (currentLength > distanceStation) {
                path = this.pathsStraight[i];
                break;
            }
            lengthDone += currentLength;
        }
        var middleLine = path.lastSegment.point - path.firstSegment.point;
        var centerPointOnLine = path.firstSegment.point + middleLine.normalize()*(distanceStation-lengthDone);
        return {centerPointOnLine: centerPointOnLine, normalUnitVector: path.getNormalAt(path.length/2.0)};
    },
    draw: function(previous) {
        this.paths = [];
        this.pathsStraight = [];
        var stationVector = this.end() - this.begin();
        var maxDistance = Math.min(Math.abs(stationVector.x), Math.abs(stationVector.y)) - minStraight;
        var straightBegin = Math.abs(stationVector.y) - maxDistance;
        var straightEnd = Math.abs(stationVector.x) - maxDistance;
        straightBegin = Math.max(straightBegin, minStraight);
        straightEnd = Math.max(straightEnd, minStraight);
        // TODO: this is ugly and might not always work, needs to be vector based
        var arcBeginRel = new Point(0, straightBegin)*Math.sign(stationVector.y);
        var arcEndRel = new Point(straightEnd, 0)*Math.sign(stationVector.x);
        if (previous) {
            var previousLastPath = previous.pathsStraight[previous.pathsStraight.length-1];
            var tangentEndLastPath = previousLastPath.getTangentAt(previousLastPath.length);
            var inSameDirectionOutX = (Math.sign(stationVector.x) - tangentEndLastPath.x) !== 0;
            var inSameDirectionOutY = (Math.sign(stationVector.y) - tangentEndLastPath.y) !== 0;
            if (tangentEndLastPath.x !== 0 && !inSameDirectionOutX) {
                arcBeginRel = new Point(straightEnd, 0)*Math.sign(stationVector.x);
                arcEndRel = new Point(0, straightBegin)*Math.sign(stationVector.y);
            } else if (tangentEndLastPath.y !== 0 && inSameDirectionOutY) {
                arcBeginRel = new Point(straightEnd, 0)*Math.sign(stationVector.x);
                arcEndRel = new Point(0, straightBegin)*Math.sign(stationVector.y);
            }
        }
        var needsArc = Math.abs(stationVector.x) > minStraight+arcRadius*2 && Math.abs(stationVector.y) > minStraight+arcRadius*2;
        if (needsArc) {
            var arcEnd = this.end() - arcEndRel;
            var arcBegin = this.begin() + arcBeginRel;
            var beginPoint0 = arcBegin - arcBeginRel.normalize()*arcRadius*2;
            var beginPoint1 = arcBegin - arcBeginRel.normalize()*arcRadius;
            var beginPoint2 = arcBegin + (arcEnd-arcBegin).normalize()*arcRadius;
            var beginPoint3 = arcBegin + (arcEnd-arcBegin).normalize()*arcRadius*2;
            var centerArc1 = beginPoint1 + (beginPoint2-beginPoint1)/2;
            var beginCenter = centerArc1 + (arcBegin-centerArc1)/1.7;

            var pathBegin = this.createPath();
            this.pathsStraight.push(pathBegin);
            var beginA = this.begin();
            var beginB = beginPoint0;
            pathBegin.add(beginA);
            pathBegin.add(beginB);
            this.directionBegin = (beginB - beginA).normalize();

            var endPoint0 = arcEnd - (arcEnd-arcBegin).normalize()*arcRadius*2;
            var endPoint1 = arcEnd - (arcEnd-arcBegin).normalize()*arcRadius;
            var endPoint2 = arcEnd + arcEndRel.normalize()*arcRadius;
            var endPoint3 = arcEnd + arcEndRel.normalize()*arcRadius*2
            var centerArc2 = endPoint2 + (endPoint1-endPoint2)/2;
            var endCenter = centerArc2 + (arcEnd-centerArc2)/1.7;

            var pathArc1 = this.createPath();
            pathArc1.add(beginPoint0);
            pathArc1.add(beginPoint1);
            pathArc1.add(beginCenter);
            pathArc1.add(beginPoint2);
            pathArc1.add(beginPoint3);
            pathArc1.smooth();

            var pathMiddle = this.createPath();
            this.pathsStraight.push(pathMiddle);
            pathMiddle.add(beginPoint3);
            pathMiddle.add(endPoint0);

            var pathArc2 = this.createPath();
            pathArc2.add(endPoint0);
            pathArc2.add(endPoint1);
            pathArc2.add(endCenter);
            pathArc2.add(endPoint2);
            pathArc2.add(endPoint3);
            pathArc2.smooth();

            var pathEnd = this.createPath();
            this.pathsStraight.push(pathEnd);
            var endA = arcEnd + arcEndRel.normalize()*arcRadius*2;
            var endB = this.end();
            pathEnd.add(endA);
            pathEnd.add(endB);
            this.directionEnd = (endB - endA).normalize();
        } else {
            var pathMiddle = this.createPath();
            this.pathsStraight.push(pathMiddle);
            pathMiddle.add(this.begin());
            pathMiddle.add(this.end());
            pathMiddle.smooth();
            this.directionBegin = (this.end() - this.begin()).normalize();
            this.directionEnd = (this.begin() - this.end()).normalize();
        }

        if (core.DisplaySettings.isDebug) {
            var debugPointRadius = 4;
            var center = (stationVector)/2.0 + this.begin();
            var centerCircle = new Path.Circle(center, debugPointRadius);
            centerCircle.strokeWidth = 1;
            centerCircle.strokeColor = 'green';
            centerCircle.fillColor = 'green';
            centerCircle.remove();
            var arcBeginCircle = new Path.Circle(arcBegin, debugPointRadius);
            arcBeginCircle.style = centerCircle.style;
            arcBeginCircle.strokeColor = 'green';
            arcBeginCircle.fillColor = 'green';
            var arcEndCircle = new Path.Circle(arcEnd, debugPointRadius);
            arcEndCircle.style = arcBeginCircle.style;
        }
        this.notifyAllObservers(this);
//        path.fullySelected = true;
//        return path;
    },
};


function createSegment(stationA, stationB, style) {
    console.log('createSegment');
    var observable = Object.create(core.Observable).Observable();
    segment = Object.assign(observable, Segment);
    segment = segment.Segment(stationA, stationB, style);
    return segment;
}


module.exports = {
    createSegment: createSegment,
    minStraight: minStraight,
    arcRadius: arcRadius,
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
core = __webpack_require__(0);
styles = __webpack_require__(2);


var BaseStation = {
    Station: function(position, style) {
        console.log('new station for point', position);
        this.position = position;
        this.style = style;
        this.id = core.uuidv4().substring(0, 8);
        this.path = null;
        this.isSelected = false;
        this.name = "station";
        this.textPositionRel = null;
        return this;
    },
    toggleSelect: function() {
        if (this.isSelected) {
            this.unselect();
        } else {
            this.select();
        }
    },
    select: function() {
        this.isSelected = true;
    },
    unselect: function() {
        this.isSelected = false;
    },
    setPosition: function(position) {
        this.position = position;
        this.textPositionRel = null;
        this.notifyAllObservers();
    },
};


var Station = {
    draw: function() {
        this.path = new Path.Circle(this.position, this.style.stationRadius);
        if (this.isSelected) {
            this.path.strokeColor = this.style.selectionColor;
        } else {
            this.path.strokeColor = this.style.strokeColor;
        }
        this.path.strokeWidth = this.style.strokeWidth;
        this.path.fillColor = this.style.fillColor;
    },
};


var StationMinor = {
    draw: function(segment) {
        var position = segment.calcStationPosition(this);
        this.position = position.centerPointOnLine;
        var minorStationSize = this.style.minorStationSize;
        this.path = new Path.Line(position.centerPointOnLine, position.centerPointOnLine + position.normalUnitVector*minorStationSize);
        this.path.strokeColor = this.style.strokeColor;
        this.path.strokeWidth = this.style.strokeWidth;
        // this.path.fillColor = this.style.fillColor;
    },
    direction: function() {
        return (this.path.lastSegment.point - this.path.firstSegment.point).normalize();
    }
};


function createStation(position, style) {
    var observable = Object.create(core.Observable).Observable();
    var station = Object.assign(observable, BaseStation, Station);
    if (!style) {
        style = styles.createStationStyle();
    }
    station = station.Station(position, style);
    return station;
}


function createStationMinor(position, stationA, stationB, style) {
    console.log('createStationMinor');
    var observable = Object.create(core.Observable).Observable();
    var station = Object.assign(observable, BaseStation, StationMinor);
    station = station.Station(position, style);
    station.stationA = stationA;
    station.stationB = stationB;
    return station;
}


module.exports = {
    createStation: createStation,
    createStationMinor: createStationMinor,
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

core = __webpack_require__(0);
metrotrack = __webpack_require__(6);
metroconnection = __webpack_require__(7);

var DrawSettings = {
    text: true,
    fast: true,
    calcTextPositions: false,
    minorStationText: true,
};


function createDrawSettings() {
    var drawSettings = {};
    Object.keys(DrawSettings).forEach(function(key) {
        drawSettings[key] = DrawSettings[key];
    });
    return drawSettings;
}


var Map = {
    Map: function() {
        this.tracks = [];
        this.connections = [];
        return this;
    },
    createTrack: function() {
        console.log('map.createTrack()');
        var newTrack = metrotrack.createTrack();
        this.tracks.push(newTrack);
        return newTrack;
    },
    createConnection: function(stationA, stationB) {
        console.log('map.createConnection()');
        if (stationA.id === stationB.id) {
            return null
        }
        var newConnection = metroconnection.createConnection(stationA, stationB);
        this.connections.push(newConnection);
        return newConnection;
    },
    draw: function(drawSettings) {
        console.time("map.draw");
        project.clear();
        for (var i in this.tracks) {
            this.tracks[i].draw(drawSettings);
        }
        for (var i in this.connections) {
            this.connections[i].draw();
        }
        if (drawSettings.text) {
            var paths = [];
            if (!drawSettings.fast) {
                paths = this.allPaths();
                console.log("map.draw() paths.length", paths.length);
            }
            this.drawStationNames(paths, drawSettings);
        }
        console.timeEnd("map.draw");
    },
    clear: function() {
        this.tracks = [];
    },
    drawStationNames: function(paths, drawSettings) {
        for (var i in this.tracks) {
            this.tracks[i].drawStationNames(paths, drawSettings);
        }
    },
    allPaths: function() {
        var paths = [];
        for (var i in this.tracks) {
            paths = paths.concat(this.tracks[i].allPaths());
        }
        for (var i in this.connections) {
            paths = paths.concat(this.connections[i].allPaths());
        }
        return paths;
    },
    findStation: function(id) {
        for (var i in this.tracks) {
            var station = this.tracks[i].findStation(id);
            if (station) {
                return station;
            }
        }
        return null;
    },
    findStationByPathId: function(id) {
        for (var i in this.tracks) {
            var track = this.tracks[i];
            var station = track.findStationByPathId(id);
            if (station) {
                return {station: station, track: track};
            }
        }
        return {station: null, track: null};
    },
    findSegmentByPathId: function(id) {
        for (var i in this.tracks) {
            var track = this.tracks[i];
            var segment = track.findSegmentByPathId(id);
            if (segment) {
                return {segment: segment, track: track};
            }
        }
        return {segment: null, track: null};
    }
};


function createMap() {
    var observable = Object.create(core.Observable).Observable();
    var map = Object.assign(observable, Map);
    map = map.Map();
    return map;
}


module.exports = {
    createMap: createMap,
    createDrawSettings: createDrawSettings,
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
var core = __webpack_require__(0);
var metrosegment = __webpack_require__(3);
var metrostation = __webpack_require__(4);
var metrostyles = __webpack_require__(2);


var Track = {
    Track: function() {
        this.stations = [];
        this.stationsMinor = [];
        this.segmentStyle = metrostyles.createSegmentStyle();
        this.stationStyle = metrostyles.createStationStyle();
        this.stationMinorStyle = metrostyles.createStationMinorStyle();
        this.stationMinorStyle.strokeColor = this.segmentStyle.strokeColor;
        this.segments = [];
        this.id = core.uuidv4();
        return this;
    },
    setStationRadius: function(radius) {
        this.stationStyle.stationRadius = radius;
    },
    setStationStrokeWidth: function(strokeWidth) {
        this.stationStyle.strokeWidth = strokeWidth;
    },
    setSegmentStyle: function(style) {
        this.segmentStyle = style;
        this.stationMinorStyle.strokeWidth = this.segmentStyle.strokeWidth;
        this.stationMinorStyle.strokeColor = this.segmentStyle.strokeColor;
        this.stationMinorStyle.minorStationSize = this.segmentStyle.strokeWidth * 2.0;
    },
    setStationStyle: function(style) {
        this.stationStyle = style;
    },
    createStation: function(position, previousStation) {
        var station = metrostation.createStation(position, this.stationStyle);
        if (previousStation) {
            this.createSegment(previousStation, station)
        }
        this.stations.push(station);
        console.log('create station', station.id);
        return station;
    },
    createSegment: function(stationA, stationB) {
        console.log('track.createSegment', stationA.id, stationB.id);
        var segment = metrosegment.createSegment(stationA, stationB, this.segmentStyle);
        this.segments.push(segment);
        return segment;
    },
    createStationMinorOnSegmentId: function(position, segmentId) {
        var segment = this.findSegment(segmentId);
        return this.createStationMinor(position, segment);
    },
    createStationMinorBetweenStations: function(stationA, stationB) {
        var segment = this.findSegmentBetweenStations(stationA, stationB);
        return this.createStationMinor(segment.center(), segment);
    },
    createStationMinor: function(position, segment) {
        var station = metrostation.createStationMinor(position, segment.stationA, segment.stationB, this.stationMinorStyle);
        segment.stationsMinor.push(station);
        this.stationsMinor.push(station);
        this.draw();
        return station;
    },
    stationSegments: function(station) {
        var segments = [];
        segments.push(this.segmentToStation(station));
        segments.push(this.segmentFromStation(station));
    },
    segmentToStation: function(station) {
        for (var i in this.segments) {
            var segment = this.segments[i];
            if (segment.stationB.id === station.id) {
                return segment;
            }
        }
        return null;
    },
    segmentFromStation: function(station) {
        for (var i in this.segments) {
            var segment = this.segments[i];
            if (segment.stationA.id === station.id) {
                return segment;
            }
        }
        return null;
    },
    lastAddedStation: function() {
        if (this.stations.length === 0) {
            return null;
        }
        return this.stations[this.stations.length - 1];
    },
    connectedStations: function(station) {
        var stations = [];
        for (var i in this.segments) {
            var segment = this.segments[i];
            if (station.id === segment.stationA.id) {
                stations.push(segment.stationB);
            }
            if (station.id === segment.stationB.id) {
                stations.push(segment.stationA);
            }
        }
        return stations;
    },
    allPaths: function() {
        var paths = [];
        for (var i in this.segments) {
            for (var j in this.segments[i].paths) {
                paths.push(this.segments[i].paths[j]);
            }
        }
        return paths;
    },
    draw: function() {
        for (var i in this.segments) {
            var segment = this.segments[i];
            var previous = this.segmentToStation(segment.stationA);
            segment.draw(previous);
        }
        for (var i in this.stations) {
            this.stations[i].draw();
        }
        for (var i in this.stationsMinor) {
            var stationMinor = this.stationsMinor[i];
            var segment = this.findSegmentForStationMinor(stationMinor);
            this.stationsMinor[i].draw(segment);
        }
        this.notifyAllObservers(this);
    },
    createText: function(station, positionRelative) {
        var text = new PointText(station.position + positionRelative);
        text.justification = 'left';
        text.fillColor = 'black';
        text.content = station.name;
        return text;
    },
    preventIntersectionSegments: function(text, station, paths, positions) {
        if (!paths) {
            return positions[0];
        }
        var positionsTried = 0;
        var intersects = true;
        while (intersects && positionsTried < positions.length) {
            intersects = false;
            for (var j in paths) {
                if (positionsTried >= positions.length-1) {
                    break;
                }
                var path = paths[j];
                intersects = text.intersects(path);
                if (intersects) {
                    var textOld = text;
                    positionsTried++;
                    text = this.createText(station, positions[positionsTried]);
                    text.fontSize = textOld.fontSize;
                    textOld.remove();
                    break;
                }
            }
        }
        return positions[positionsTried];
    },
    drawStationNames: function(paths, drawSettings) {
        var fontSize = 16;
        this.drawMajorStationNames(paths, fontSize, drawSettings.calcTextPositions);
        fontSize = 10;
        if (drawSettings.minorStationText) {
            this.drawMinorStationNames(fontSize);
        }
    },
    drawMajorStationNames: function(paths, fontSize, calcTextPositions) {
        for (var i in this.stations) {
            var station = this.stations[i];
            if (!calcTextPositions && station.textPositionRel) {
                text = this.createText(station, station.textPositionRel);
                text.fontSize = fontSize;
                continue;
            }
            console.log('recalc best text position');
            var stationRadius = station.style.stationRadius + station.style.strokeWidth;
            var positions = [];
            positions.push(new Point(stationRadius, fontSize / 4.0));
            var text = this.createText(station, positions[0]);
            text.fontSize = fontSize;
            positions.push(new Point(-stationRadius - text.bounds.width, fontSize / 4.0));
            positions.push(new Point(0, -stationRadius * 1.2));
            positions.push(new Point(stationRadius, -stationRadius * 0.8));
            positions.push(new Point(-text.bounds.width, -stationRadius * 1.2));
            positions.push(new Point(0, stationRadius * 2.2));
            positions.push(new Point(stationRadius, stationRadius * 1.4));
            positions.push(new Point(-text.bounds.width, stationRadius * 2.2));
            var pathsToUse = paths;
            if (paths.length === 0) {
                pathsToUse = this.stationSegmentPaths(station);
            }
            station.textPositionRel = this.preventIntersectionSegments(text, station, pathsToUse, positions);
        }
    },
    stationSegmentPaths: function(station) {
        var segmentTo = this.segmentToStation(station);
        var segmentFrom = this.segmentFromStation(station);
        var segments = [];
        if (segmentTo) {
            segments.push(segmentTo);
        }
        if (segmentFrom) {
            segments.push(segmentFrom);
        }
        var pathsLocal = [];
        for (var i in segments) {
            for (var j in segments[i].paths) {
                pathsLocal.push(segments[i].paths[j]);
            }
        }
        return pathsLocal;
    },
    drawMinorStationNames: function(fontSize) {
        for (var i in this.stationsMinor) {
            var station = this.stationsMinor[i];
            var stationLineDirection = station.direction();
            var xOffset = 0;
            var position = station.direction()*station.style.minorStationSize*1.2;
            var text = this.createText(station, position);
            text.fontSize = fontSize;
            if (stationLineDirection.x < 0) {
                xOffset = -text.bounds.width;
                text.position += new Point(xOffset, 0);
            }
            if (stationLineDirection.y > 0.01) {
                yOffset = text.bounds.height/1.5;
                text.position += new Point(0, yOffset);
            }
        }
    },
    findStationByPathId: function(id) {
        for (var i in this.stations) {
            var stationId = this.stations[i].path.id;
            if (stationId === id) {
                return this.stations[i];
            }
        }
        return null;
    },
    findStation: function(id) {
        for (var i in this.stations) {
            if (this.stations[i].id === id) {
                return this.stations[i];
            }
        }
        return null;
    },
    removeStation: function(id) {
        var station = this.findStation(id);
        var pos = this.stations.indexOf(station);
        if (pos > -1) {
            station.notifyBeforeRemove();
            var removedStation = this.stations.splice(pos, 1);
        } else {
            console.log('removeStation: station not found');
            return null;
        }
        return removedStation;
    },
    findSegmentByPathId: function(id) {
        for (var i in this.segments) {
            for (var j in this.segments[i].paths) {
                var path = this.segments[i].paths[j];
                if (path.id === id) {
                    return this.segments[i];
                }
            }
        }
        return null;
    },
    findSegment: function(id) {
        for (var i in this.segments) {
            if (this.segments[i].id === id) {
                return this.segments[i];
            }
        }
        return null;
    },
    findSegmentBetweenStations: function(stationA, stationB) {
        for (var i in this.segments) {
            if (stationA.id === this.segments[i].stationA.id
                && stationB.id === this.segments[i].stationB.id) {
                return this.segments[i];
            }
        }
        return null;
    },
    findSegmentForStationMinor: function(stationMinor) {
        return this.findSegmentBetweenStations(stationMinor.stationA, stationMinor.stationB);
    }
};


function createTrack() {
    var observable = Object.create(core.Observable).Observable();
    var track = Object.assign(observable, Track);
    track = track.Track();
    return track;
}


module.exports = {
    createTrack: createTrack,
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
core = __webpack_require__(0);
styles = __webpack_require__(2);


var Connection = {
    Connection: function(stationA, stationB) {
        this.stationA = stationA;
        this.stationB = stationB;
        this.id = core.uuidv4();
        this.paths = [];
        return this;
    },
    allPaths: function() {
        return this.paths;
    },
    draw: function() {
        var stationRadiusA = this.stationA.style.stationRadius;
        var stationRadiusB = this.stationB.style.stationRadius;
        var stationStrokeWidthA = this.stationA.style.strokeWidth;
        var stationStrokeWidthB = this.stationB.style.strokeWidth;
        var stationStrokeWidth = Math.min(stationStrokeWidthA, stationStrokeWidthB);
        var stationRadius = Math.min(stationRadiusA, stationRadiusB);
        var difference = this.stationB.position - this.stationA.position;
        var size = new Size(difference.length-stationRadius, stationRadius-stationStrokeWidth/2);
        var offset = new Point(-stationRadius/2, stationRadius/2-stationStrokeWidth/4);
        var rectangle = new Path.Rectangle(this.stationA.position - offset, size);
        rectangle.fillColor = styles.rgbToHex(255, 255, 255);
        rectangle.strokeWidth = 0;
        rectangle.rotate(difference.angle, this.stationA.position);
        var offset = difference.normalize().rotate(90) * stationRadius/2;
        var offsetA1 = offset + difference.normalize()*(stationRadiusA-stationStrokeWidthA/2);
        var offsetB1 = offset - difference.normalize()*(stationRadiusB-stationStrokeWidthB/2);
        var offsetA2 = offset - difference.normalize()*(stationRadiusA-stationStrokeWidthA/2);
        var offsetB2 = offset + difference.normalize()*(stationRadiusB-stationStrokeWidthB/2);
        var line1 = new Path(this.stationA.position + offsetA1, this.stationB.position + offsetB1);
        var line2 = new Path(this.stationA.position - offsetA2, this.stationB.position - offsetB2);
        line1.strokeColor = this.stationA.style.strokeColor;
        line2.strokeColor = this.stationA.style.strokeColor;
        line1.strokeWidth = stationStrokeWidth;
        line2.strokeWidth = stationStrokeWidth;
        this.paths = [];
        this.paths.push(rectangle);
        this.paths.push(line1);
        this.paths.push(line2);
    },
};


function createConnection(stationA, stationB) {
    var observable = Object.create(core.Observable).Observable();
    var connection = Object.assign(observable, Connection);
    connection = connection.Connection(stationA, stationB);
    return connection;
}



module.exports = {
    createConnection: createConnection,
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);


function createStationContextMenu(stationElementId, track) {
    $.contextMenu({
        selector: '#' + stationElementId,
        trigger: 'none',
        callback: function(key, options) {
            if (key === "delete") {
                var stationId = $(options.selector).data('station-id');
                track.removeStation(stationId);
            }
        },
        items: {
            "delete": {name: "Delete", icon: "delete"},
        }
    });
}


function createSegmentContextMenu(segmentElementId, track) {
    $.contextMenu({
        selector: '#' + segmentElementId,
        trigger: 'none',
        callback: function(key, options) {
            var segmentId = $(options.selector).data('segment-id');
            if (key === "create minor station") {
                var position = $(options.selector).data('position');
                track.createStationMinorOnSegmentId(position, segmentId);
            } else if (key === "switchdirection") {
                var stationId = $(options.selector).data('station-id');
                var segment = track.findSegment(segmentId);
                segment.switchDirection();
                track.draw();
            }
        },
        items: {
            "create minor station": {name: "Add minor station", icon: "new"},
            "switchdirection": {name: "Switch direction", icon: ""},
        }
    });
}


module.exports = {
    createStationContextMenu: createStationContextMenu,
    createSegmentContextMenu: createSegmentContextMenu,
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

core = __webpack_require__(0);
metrosegment = __webpack_require__(3);


function snapPosition(track, station, position) {
    var snapDistance = metrosegment.minStraight+metrosegment.arcRadius*2.0;
    var stations = track.connectedStations(station);
    if (stations.length === 0 && track.lastAddedStation()) {
        stations.push(track.lastAddedStation());
    }
    var nearestX = null;
    var nearestY = null;
    var minDistanceX = 1e99;
    var minDistanceY = 1e99;
    for (var i in stations) {
        var stationVector = position - stations[i].position;
        var deltaX = Math.abs(stationVector.x);
        if (deltaX < minDistanceX) {
            nearestX = stations[i];
            minDistanceX = deltaX;
        }
        var deltaY = Math.abs(stationVector.y);
        if (deltaY < minDistanceY) {
            nearestY = stations[i];
            minDistanceY = deltaY;
        }
    }
    var snapX = position.x;
    if (minDistanceX < snapDistance) {
        snapX = nearestX.position.x;
    }
    var snapY = position.y;
    if (minDistanceY < snapDistance) {
        snapY = nearestY.position.y;
    }
    return new Point(snapX, snapY);
}


module.exports = {
    snapPosition: snapPosition,
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var metromap = __webpack_require__(5);


function saveMap(map) {
    var mapData = {};
    mapData.tracks = [];
    mapData.connections = [];
    for (var i in map.tracks) {
        var trackData = createTrackData(map.tracks[i]);
        mapData.tracks.push(trackData);
    }
    for (var i in map.connections) {
        var connectionData = createConnectionData(map.connections[i]);
        mapData.connections.push(connectionData);
    }
    console.log(mapData);
    var mapJSONString = JSON.stringify(mapData);
    return mapJSONString;
}


function createTrackData(track) {
    var trackData = {};
    trackData.id = track.id;
    trackData.segmentStyle = track.segmentStyle;
    trackData.stationStyle = track.stationStyle;
    trackData.segments = [];
    trackData.stationsMinor = [];
    for (var j in track.segments) {
        var segmentData = createSegmentData(track.segments[j]);
        trackData.segments.push(segmentData)
    }
    for (var j in track.stationsMinor) {
        var stationData = createStationMinorData(track.stationsMinor[j]);
        trackData.stationsMinor.push(stationData)
    }
    return trackData;
}


function createConnectionData(connection) {
    var connectionData = {
        stationA: connection.stationA.id,
        stationB: connection.stationB.id,
        id: connection.id,
    };
    return connectionData;
}


function createSegmentData(segment) {
    var segmentData = {
        stationA: createStationData(segment.stationA),
        stationB: createStationData(segment.stationB),
        id: segment.id,
    };
    return segmentData;
}


function createStationData(station) {
    var stationData = {
        position: {x: station.position.x, y: station.position.y},
        id: station.id,
        name: station.name,
    };
    return stationData;
}


function createStationMinorData(station) {
    var stationData = {
        position: {x: station.position.x, y: station.position.y},
        id: station.id,
        name: station.name,
        stationA: station.stationA.id,
        stationB: station.stationB.id,
    };
    return stationData;
}


function loadMap(mapJSON) {
    console.log('loadMap');
    if (!mapJSON) {
        // mapJSON = '{"tracks":[{"id":"15479b48-a900-438b-a0fa-2da8c77729af","stations":[{"position":{"x":200,"y":165},"id":"b4212813","name":"station"},{"position":{"x":535,"y":424},"id":"adc99f13","name":"station"},{"position":{"x":806,"y":119},"id":"ebad26f4","name":"station"}],"stationsMinor":[{"position":{"x":274.22056274847716,"y":269.22056274847716},"id":"712c3721","name":"station","stationA":"b4212813","stationB":"adc99f13"},{"position":{"x":341.3700576850888,"y":336.3700576850888},"id":"fb50a4e2","name":"station","stationA":"b4212813","stationB":"adc99f13"},{"position":{"x":408.5195526217004,"y":403.5195526217004},"id":"6c52a2bb","name":"station","stationA":"b4212813","stationB":"adc99f13"},{"position":{"x":634.7959415460184,"y":354.2040584539816},"id":"2f8dadac","name":"station","stationA":"adc99f13","stationB":"ebad26f4"},{"position":{"x":697.5208152801713,"y":291.4791847198287},"id":"f99d3a55","name":"station","stationA":"adc99f13","stationB":"ebad26f4"},{"position":{"x":760.2456890143242,"y":228.7543109856758},"id":"61b3fb5a","name":"station","stationA":"adc99f13","stationB":"ebad26f4"}]},{"id":"e93fb48a-518f-4f29-aa6f-1e395233cc09","stations":[{"position":{"x":209,"y":104},"id":"ce3ea5bf","name":"station"},{"position":{"x":400,"y":104},"id":"2ce21052","name":"station"},{"position":{"x":928,"y":354},"id":"292957b8","name":"station"}],"stationsMinor":[{"position":{"x":272.6666666666667,"y":104},"id":"6fee351c","name":"station","stationA":"ce3ea5bf","stationB":"2ce21052"},{"position":{"x":336.3333333333333,"y":104},"id":"325fe14a","name":"station","stationA":"ce3ea5bf","stationB":"2ce21052"},{"position":{"x":542.2817459305202,"y":104},"id":"074eef3a","name":"station","stationA":"2ce21052","stationB":"292957b8"},{"position":{"x":684.5634918610405,"y":104},"id":"1fba151c","name":"station","stationA":"2ce21052","stationB":"292957b8"},{"position":{"x":820.3205448016022,"y":216.3205448016022},"id":"5a39e0ba","name":"station","stationA":"2ce21052","stationB":"292957b8"}]}]}'
        mapJSON = '{"tracks":[{"id":"3794c750-6605-49df-b810-aa5b0ebb42e8","segmentStyle":{"strokeColor":"red","strokeWidth":8,"selectionColor":"green","fullySelected":false},"stations":[{"position":{"x":152,"y":239},"id":"3fe7243d","name":"station"},{"position":{"x":687,"y":495},"id":"995a2376","name":"station"}],"stationsMinor":[]},{"id":"6fe22ae9-cd61-4705-aa2d-c457e11901e9","segmentStyle":{"strokeColor":"blue","strokeWidth":8,"selectionColor":"green","fullySelected":false},"stations":[{"position":{"x":174,"y":142},"id":"8cb86074","name":"station"},{"position":{"x":764,"y":433},"id":"882322b8","name":"station"}],"stationsMinor":[]}]}';
        mapJSON = JSON.parse(mapJSON);
    }
    var map = metromap.createMap();
    for (var i in mapJSON.tracks) {
        var track = loadTrack(map, mapJSON.tracks[i]);
    }
    for (var i in mapJSON.connections) {
        var connection = loadConnections(map, mapJSON.connections[i]);
    }
    return map;
}


function loadConnections(map, connectionData) {
    var stationA = map.findStation(connectionData.stationA);
    var stationB = map.findStation(connectionData.stationB);
    var connection = map.createConnection(stationA, stationB);
    if (connection) {
        connection.id = connectionData.id;
    }
    return connection;
}


function loadTrack(map, trackData) {
    console.log('load track');
    var track = map.createTrack();
    track.id = trackData.id;
    track.setSegmentStyle(trackData.segmentStyle);
    track.setStationStyle(trackData.stationStyle);
    // track.stationStyle = trackData.stationStyle;
    for (var i in trackData.segments) {
        var segmentData = trackData.segments[i];
        var stationAPoint = new Point(segmentData.stationA.position.x, segmentData.stationA.position.y)
        var stationBPoint = new Point(segmentData.stationB.position.x, segmentData.stationB.position.y)
        stationA = track.findStation(segmentData.stationA.id);
        stationB = track.findStation(segmentData.stationB.id);
        var segment = null;
        if (stationA && stationB) {
            segment = track.createSegment(stationA, stationB);
        } else if (stationA) {
            stationB = track.createStation(stationBPoint, stationA);
            stationB.id = segmentData.stationB.id;
        } else if (stationB) {
            stationA = track.createStation(stationAPoint);
            stationA.id = segmentData.stationA.id;
            segment = track.createSegment(stationA, stationB);
        } else {
            stationA = track.createStation(stationAPoint);
            stationA.id = segmentData.stationA.id;
            stationB = track.createStation(stationBPoint);
            stationB.id = segmentData.stationB.id;
            segment = track.createSegment(stationA, stationB);
        }
        // segment.id = segmentData.id;
    }
    for (var i in trackData.stationsMinor) {
        var stationData = trackData.stationsMinor[i];
        var stationA = track.findStation(stationData.stationA);
        var stationB = track.findStation(stationData.stationB);
        var station = track.createStationMinorBetweenStations(stationA, stationB);
        station.id = stationData.id;
    }
    return track;
}


module.exports = {
    saveMap: saveMap,
    loadMap: loadMap,
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
var core = __webpack_require__(0);
var contextmenu = __webpack_require__(8);


function showStationContextMenu(stationId) {
    $('#station-' + stationId).contextMenu();
}


function showSegmentContextMenu(segmentId, position) {
    $('#segment-' + segmentId).data('position', position);
    $('#segment-' + segmentId).contextMenu();
}


function createStationMinorElement(station, track) {
    var stationElementId = "station-" + station.id;
	$("#overlay").append("<div class=\"station\" id=\"" + stationElementId + "\" data-station-id=\"" + station.id + "\"></div>")
}


function createStationElement(station, track) {
	var stationElementId = "station-" + station.id;
	$("#overlay").append("<div class=\"station\" id=\"" + stationElementId + "\" data-station-id=\"" + station.id + "\"></div>")
    var stationElement = $("#" + stationElementId);

	contextmenu.createStationContextMenu(stationElementId, track);
    updateElementPosition(stationElement, station);
    updateStyle();
    createStationObserver();

    function updateElementPosition(stationElement, station) {
	    stationElement.css('top', (station.position.y - stationElement.width()/2) + 'px');
	    stationElement.css('left', (station.position.x - stationElement.height()/2) + 'px');
    }

    function updateStyle() {
        if (core.DisplaySettings.isDebug) {
            stationElement.css('border-width', '1px');
        } else {
            stationElement.css('border-width', '0px');
        }
    }

    function createStationObserver() {
        var stationObserver = new core.Observer(
            function(station) {
                updateElementPosition(this.stationElement, station);
            },
            function(station) {
                this.stationElement.remove();
            }
        );
        stationObserver.stationElement = stationElement;
        station.registerObserver(stationObserver);
    }
}


function createSegmentElements(track) {
    console.log('createSegmentElements');
    $(".segment").empty();
    for (var i in track.segments) {
        var segment = track.segments[i];
        createSegmentElement(segment, track);
    }
}


function createSegmentElement(segment, track) {
	var segmentElementId = "segment-" + segment.id;
	$("#overlay").append("<div class=\"segment\" id=\"" + segmentElementId + "\" data-segment-id=\"" + segment.id + "\"></div>")
    var segmentElement = $("#" + segmentElementId);

	contextmenu.createSegmentContextMenu(segmentElementId, track);
    updateSegmentElementPosition(segmentElement, segment);
    updateStyle();
    createSegmentObserver();

    function updateSegmentElementPosition(segmentElement, segment) {
	    segmentElement.css('top', (segment.center().y - segmentElement.width()/2) + 'px');
	    segmentElement.css('left', (segment.center().x - segmentElement.height()/2) + 'px');
    }

    function updateStyle() {
        if (core.DisplaySettings.isDebug) {
            segmentElement.css('border-width', '1px');
        } else {
            segmentElement.css('border-width', '0px');
        }
    }

    function createSegmentObserver() {
        var segmentObserver = new core.Observer(
            function(segment) {
                updateSegmentElementPosition(this.segmentElement, segment);
            },
            function(segment) {
                this.segmentElement.remove();
            }
        );
        segmentObserver.segmentElement = segmentElement;
        segment.registerObserver(segmentObserver);
    }
}


module.exports = {
    createStationElement: createStationElement,
    showStationContextMenu: showStationContextMenu,
    showSegmentContextMenu: showSegmentContextMenu,
    createSegmentElements: createSegmentElements,
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {


$(function() {
    var buttonMajorStation = $("#button-major-station");
    var buttonMinorStation = $("#button-minor-station");
    var buttonSelect = $("#button-select");

    buttonMajorStation.bind("click", function () {
        console.log('major button');
    });

    buttonMinorStation.bind("click", function () {
        console.log('minor button');
    });
});

function setMajorStationButtonAction(callback) {
    var buttonMajorStation = $("#button-major-station");
    buttonMajorStation.bind("click", callback);
}

function setMinorStationButtonAction(callback) {
    var buttonMinorStation = $("#button-minor-station");
    buttonMinorStation.bind("click", callback);
}

function setSelectButtonAction(callback) {
    var buttonSelect = $("#button-select");
    buttonSelect.bind("click", callback);
}

function setNewTrackButtonAction(callback) {
    var buttonNewTrack = $("#button-new-track");
    buttonNewTrack.bind("click", callback);
}

function setNewConnectionAction(callback) {
    var buttonNewConnection = $("#button-new-connection");
    buttonNewConnection.bind("click", callback);
}

function setCalcTextPositionsAction(callback) {
    $("#button-calc-text-positions").bind("click", callback);
}

function setToggleSnapAction(callback) {
    $("#checkbox-snap").bind("click", callback);
}

function setSaveMapAction(callback) {
    var button = $("#button-save-map");
    button.bind("click", callback);
}

function setLoadMapAction(callback) {
    document.getElementById('file-input')
        .addEventListener('change', callback, false);
}


module.exports = {
    setMajorStationButtonAction: setMajorStationButtonAction,
    setMinorStationButtonAction: setMinorStationButtonAction,
    setSelectButtonAction: setSelectButtonAction,
    setNewTrackButtonAction: setNewTrackButtonAction,
    setNewConnectionAction: setNewConnectionAction,
    setToggleSnapAction: setToggleSnapAction,
    setCalcTextPositionsAction: setCalcTextPositionsAction,
    setSaveMapAction: setSaveMapAction,
    setLoadMapAction: setLoadMapAction
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
var core = __webpack_require__(0);
var metrosketcher = __webpack_require__(14);

var currentTrack = null;


function setCurrentTrack(track) {
    if (currentTrack && currentTrack.id === track.id) {
        return;
    }
    currentTrack = track;
    var colorPicker = document.getElementById("track-color-picker");
    colorPicker.value = track.segmentStyle.strokeColor;
    document.getElementById("station-stroke-color-picker").value = track.stationStyle.strokeColor;

    $("#track-width-slider").slider('value', track.segmentStyle.strokeWidth);
    $("#station-radius-slider").slider('value', track.stationStyle.stationRadius);
    $("#station-stroke-width-slider").slider('value', track.stationStyle.strokeWidth);
}


function setExampleMapAction(callback) {
    $("#button-example-map1").bind("click", callback);
}


function setTrackColorChangeAction(callback) {
    var colorPicker = document.getElementById("track-color-picker");
    colorPicker.addEventListener("input", watchColorPicker, false);
    colorPicker.addEventListener("change", watchColorPicker, false);

    function watchColorPicker(event) {
        var color = event.target.value;
        callback(color);
    }
}


function setTrackWidthSliderChangeAction(callback) {
    $("#track-width-slider").slider({
        slide: watchSlider,
        change: watchSlider,
        min: 0,
        max: 20,
    });

    function watchSlider(event, ui) {
        callback(ui.value);
    }
}


function setStationRadiusSliderChangeAction(callback) {
    $("#station-radius-slider").slider({
        slide: watchSlider,
        change: watchSlider,
        min: 0,
        max: 20,
    });

    function watchSlider(event, ui) {
        callback(ui.value);
    }
}

function setStationStrokeWidthSliderChangeAction(callback) {
    $("#station-stroke-width-slider").slider({
        slide: watchSlider,
        change: watchSlider,
        min: 0,
        max: 20,
    });

    function watchSlider(event, ui) {
        callback(ui.value);
    }
}



function setStationStrokeColorChangeAction(callback) {
    var colorPicker = document.getElementById("station-stroke-color-picker");
    colorPicker.addEventListener("input", watchColorPicker, false);
    colorPicker.addEventListener("change", watchColorPicker, false);

    function watchColorPicker(event) {
        var color = event.target.value;
        callback(color);
    }
}


//
// function showStations(track) {
//     var sideBar = $("#sidebar");
//     sideBar.empty();
//     for (var i in track.stations) {
//         var station = track.stations[i];
//         sideBar.append("<span><small>Station " + station.id + "</small></span>");
//         sideBar.append("<span><small> (" + station.position.x + ", " + station.position.y + ")</small></span>");
//         sideBar.append("<br/>");
//     }
// }


function showTracks(tracks) {
    var sideBar = $("#sidebar");
}


function notifyNewStation(station, track) {
    var stationObserver = new core.Observer(
        function(station) {
            // showStations(track);
        },
        function(station) {
            // showStations(track);
        }
    );
    station.registerObserver(stationObserver);
}


module.exports = {
    notifyNewStation: notifyNewStation,
    setExampleMapAction: setExampleMapAction,
    setCurrentTrack: setCurrentTrack,
    setTrackColorChangeAction: setTrackColorChangeAction,
    setTrackWidthSliderChangeAction: setTrackWidthSliderChangeAction,
    setStationRadiusSliderChangeAction: setStationRadiusSliderChangeAction,
    setStationStrokeWidthSliderChangeAction: setStationStrokeWidthSliderChangeAction,
    setStationStrokeColorChangeAction: setStationStrokeColorChangeAction,
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
var core = __webpack_require__(0);
var metromap = __webpack_require__(5);
var snap = __webpack_require__(9);
var interaction = __webpack_require__(11);
var sidebar = __webpack_require__(13);
var toolbar = __webpack_require__(12);
var serialize = __webpack_require__(10);

$(initialise);

var map = null;
var currentTrack = null;
var segmentClicked = null;
var selectedStation = null;
var connectionStationA = null;
var connectionStationB = null;
var drawSettings = null;
var drawSettingsDrag = null;
var drawSettingsFull = null;
var dragging = false;
var doSnap = true;


function resetState() {
    map = null;
    currentTrack = null;
    segmentClicked = null;
    selectedStation = null;
    connectionStationA = null;
    connectionStationB = null;
    dragging = false;
}


function initialise() {
    drawSettings = metromap.createDrawSettings();
    drawSettingsDrag = metromap.createDrawSettings();
    drawSettingsDrag.text = false;
    drawSettingsDrag.fast = true;
    drawSettingsFull = metromap.createDrawSettings();
    drawSettingsFull.text = true;
    drawSettingsFull.fast = false;
    drawSettingsFull.calcTextPositions = true;
    initialiseToolbarActions();
    map = metromap.createMap();
    setCurrentTrack(map.createTrack());
}


var modes = {
    majorstation: "majorstation",
    minorstation: "minorstation",
    select: "select",
    createConnection: "createConnection"
};

var mode = modes.majorstation;


var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 3
};


function setCurrentTrack(track) {
    if (!track) {
        return;
    }
    currentTrack = track;
    selectedStation = null;
    sidebar.setCurrentTrack(track);
}


function getStationClicked(hitResult) {
    var path = hitResult.item;
    var result = map.findStationByPathId(path.id);
    var stationClicked = result.station;
    setCurrentTrack(result.track);
    return stationClicked;
}


function getSegmentClicked(hitResult) {
    var path = hitResult.item;
    var segments = path.segments;
    if (!segments) {
        return null;
    }
    var result = map.findSegmentByPathId(segments[0].path.id);
    var segmentClicked = result.segment;
    setCurrentTrack(result.track);
    return segmentClicked;
}


function onRightClick(event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    if (!hitResult) {
        return;
    }

    var stationClicked = getStationClicked(hitResult);
    if (stationClicked) {  // right mouse
        interaction.showStationContextMenu(stationClicked.id);
        return;
    }
    var segmentClicked = getSegmentClicked(hitResult);
    if (segmentClicked) {  // right mouse
        interaction.showSegmentContextMenu(segmentClicked.id);
        return;
    }
}


function onClickMajorStationMode(event) {
    console.log('onClickMajorStation');
    var hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult) {
        var stationClicked = getStationClicked(hitResult);
        if (stationClicked) {
            console.log('station clicked');
            stationClicked.select();
            selectedStation = stationClicked;
        }
    } else {
        if (!selectedStation) {
            selectedStation = currentTrack.lastAddedStation();
        }
        var stationNew = currentTrack.createStation(event.point, selectedStation);
        if (doSnap) {
            var position = snap.snapPosition(currentTrack, stationNew, event.point);
            stationNew.setPosition(position);
        }
        selectedStation = stationNew;
        sidebar.notifyNewStation(stationNew, currentTrack);
        interaction.createStationElement(stationNew, currentTrack);
        interaction.createSegmentElements(currentTrack);
        map.draw(drawSettings);
    }
}


function onClickMinorStationMode(event) {
    console.log('onClickMinorStationMode');
    var hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult) {
        var path = hitResult.item;
        if (hitResult.type === "stroke" || path) {
            console.log('stroke hit');
            segmentClicked = getSegmentClicked(hitResult);
            if (segmentClicked) {
                currentTrack.createStationMinorOnSegmentId(event.point, segmentClicked.id);
                map.draw(drawSettings);
            } else {
                console.log('warning: no segment clicked');
            }
        }
    }
}


function onClickSelectMode(event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult) {
        var stationClicked = getStationClicked(hitResult);
        if (stationClicked) {
            stationClicked.toggleSelect();
            selectedStation = stationClicked;
            map.draw(drawSettings);
            return;
        }
        var segmentClicked = getSegmentClicked(hitResult);
        if (segmentClicked) {
            segmentClicked.toggleSelect();
            map.draw(drawSettings);
            return;
        }
    }
}


function onClickCreateConnectionMode(event) {
    console.log('onClickCreateConnectionMode');
    var hitResult = project.hitTest(event.point, hitOptions);
    if (!hitResult) {
        return;
    }
    var stationClicked = getStationClicked(hitResult);
    if (!stationClicked) {
        return
    }

    if (!connectionStationA) {
        connectionStationA = stationClicked;
        connectionStationA.select();
        map.draw(drawSettings);
    } else {
        connectionStationB = stationClicked;
        if (connectionStationA.id === connectionStationB.id) {
            connectionStationB = null;
            return;
        }
        console.log('create new connection', connectionStationA.id, connectionStationB.id);
        map.createConnection(connectionStationA, connectionStationB);
        connectionStationA.unselect();
        map.draw(drawSettings);
        connectionStationA = null;
        connectionStationB = null;
    }
}


function onMouseDown(event) {
    if (event.event.which === 3) {  // right mouse
        onRightClick(event);
        return;
    }

    if (mode === modes.majorstation) {
        onClickMajorStationMode(event);
    } else if (mode === modes.minorstation) {
        selectedStation = null;
        onClickMinorStationMode(event);
    } else if (mode === modes.select) {
        onClickSelectMode(event);
    } else if (mode === modes.createConnection) {
        onClickCreateConnectionMode(event);
    }
}


function onMouseUp(event) {
    if (dragging) {
        map.draw(drawSettings);
        dragging = false;
    }
}


function onMouseDrag(event) {
    dragging = true;
	if (selectedStation) {
        var position = event.point;
	    if (doSnap) {
	        position = snap.snapPosition(currentTrack, selectedStation, event.point);
        }
        selectedStation.setPosition(position);
	    map.draw(drawSettingsDrag);
	}
}


function onKeyDown(event) {
    if (event.key === 'd') {
        console.log('d key pressed');
        core.DisplaySettings.isDebug = !core.DisplaySettings.isDebug;
        map.draw(drawSettings);
        if (core.DisplaySettings.isDebug) {
            $(".station").css('border-width', '1px');
            $(".segment").css('border-width', '1px');
        } else {
            $(".station").css('border-width', '0px');
            $(".segment").css('border-width', '0px');
        }
    }
}


function initialiseToolbarActions() {
    console.log('initialiseToolbarActions');

    toolbar.setMajorStationButtonAction(majorStationButtonClicked);
    toolbar.setMinorStationButtonAction(minorStationButtonClicked);
    toolbar.setSelectButtonAction(selectButtonClicked);
    toolbar.setNewTrackButtonAction(newTrackButtonClicked);
    toolbar.setNewConnectionAction(newConnectionButtionClicked);
    toolbar.setCalcTextPositionsAction(calcTextPositionButtonClicked);
    toolbar.setToggleSnapAction(snapCheckboxClicked);
    toolbar.setSaveMapAction(saveMapClicked);
    toolbar.setLoadMapAction(loadMapClicked);

    sidebar.setExampleMapAction(loadExampleMapClicked);
    sidebar.setTrackColorChangeAction(onTrackColorChanged);
    sidebar.setTrackWidthSliderChangeAction(onTrackWidthChanged);
    sidebar.setStationRadiusSliderChangeAction(onStationRadiusChanged);
    sidebar.setStationStrokeWidthSliderChangeAction(onStationStrokeWidthChanged);
    sidebar.setStationStrokeColorChangeAction(onStationStrokeColorChanged);

    function majorStationButtonClicked() {
        console.log('major station drawing selected');
        mode = modes.majorstation;
    }

    function minorStationButtonClicked() {
        console.log('minor station drawing selected');
        mode = modes.minorstation;
    }

    function selectButtonClicked() {
        console.log('selection mode selected');
        mode = modes.select;
    }

    function newTrackButtonClicked() {
        console.log('new track button clicked');
        var newTrack = map.createTrack();
        var segmentStyle = styles.createSegmentStyle();
        segmentStyle.strokeColor = styles.rgbToHex(0, 0, 255);
        newTrack.segmentStyle = segmentStyle;
        setCurrentTrack(newTrack);
    }

    function newConnectionButtionClicked() {
        console.log('new connection button clicked');
        connectionStationA = null;
        connectionStationB = null;
        mode = modes.createConnection;
    }

    function calcTextPositionButtonClicked() {
        console.log('calc text position button clicked');
        map.draw(drawSettingsFull);
    }

    function snapCheckboxClicked(event) {
        console.log('snap clicked', event.target.checked);
        doSnap = event.target.checked;
        map.draw(drawSettingsFull);
    }

    function saveMapClicked() {
        console.log('save map button clicked');
        var mapJSONString = serialize.saveMap(map);
        var data = "text/json;charset=utf-8," + encodeURIComponent(mapJSONString);
        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'download JSON';

        // var container = document.getElementById('toolbar');
        // container.appendChild(a);
        a.click();
    }

    function loadMapClicked(event) {
        console.log('load map button clicked');
        project.clear();
        resetState();
        readSingleFile(event);

        function readSingleFile(event) {
            var file = event.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function(event) {
                var contents = event.target.result;
                displayContents(contents);
            };
            reader.readAsText(file);
        }

        function displayContents(contents) {
            loadMapJson(JSON.parse(contents));
        }
    }

    function loadMapJson(json) {
        map = serialize.loadMap(json);
        if (map.tracks.length > 0) {
            setCurrentTrack(map.tracks[0]);
        }
        map.draw(drawSettingsFull);
    }

    function loadMapFile(filepath) {
        project.clear();
        $.getJSON(filepath, function(json) {
            loadMapJson(json);
        });
    }

    function loadExampleMapClicked() {
        loadMapFile("src/maps/test1.json");
    }

    function onTrackColorChanged(color) {
        console.log('onTrackColorChanged');
        var segmentStyle = currentTrack.segmentStyle;
        segmentStyle.strokeColor = color;
        currentTrack.setSegmentStyle(segmentStyle);
        map.draw(drawSettings);
    }

    function onTrackWidthChanged(value) {
        var segmentStyle = currentTrack.segmentStyle;
        segmentStyle.strokeWidth = value;
        currentTrack.setSegmentStyle(segmentStyle);
        map.draw(drawSettings);
    }

    function onStationRadiusChanged(radius) {
        console.log('onStationRadiusChanged', radius);
        currentTrack.stationStyle.stationRadius = radius;
        map.draw(drawSettings);
    }

    function onStationStrokeWidthChanged(strokeWidth) {
        currentTrack.stationStyle.strokeWidth = strokeWidth;
        map.draw(drawSettings);
    }

    function onStationStrokeColorChanged(color) {
        currentTrack.stationStyle.strokeColor = color;
        map.draw(drawSettings);
    }
}


tool.onMouseDown = onMouseDown;
tool.onMouseUp = onMouseUp;
tool.onMouseDrag = onMouseDrag;
tool.onKeyDown = onKeyDown;






/***/ })
/******/ ]);