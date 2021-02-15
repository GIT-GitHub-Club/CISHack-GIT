var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/*
TODO
- make HAIR_QUIFF shorter in length
- move adjust bear paths on angle


## SVG Libraies
- svgjs.com
- paperjs.org 
- github.com/andreaferretti/paths-js
- github.com/sebmarkbage/art
- github.com/reactjs/react-art

## Path Data Documentations
- developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
- developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
- css-tricks.com/svg-path-syntax-illustrated-guide/
- sitepoint.com/closer-look-svg-path-data/

## Bezier Curves Documentations
- stackoverflow.com/questions/13643864/how-to-get-the-outline-of-a-stroke
- pomax.github.io/bezierinfo/
- seant23.wordpress.com/2010/11/12/offset-bezier-curves/

## Path Builders
- polynom.co
- codepen.io/anthonydugois/full/mewdyZ
- css-tricks.com/tools-visualize-edit-svg-paths-kinda/

## Path Boolean Operations
- stackoverflow.com/questions/39125355/javascript-svg-vector-path-around-brush-strokes-for-a-brush-selection-tool
- paperjs.org/reference/pathitem/#unite-path

## Other
- https://www.diffchecker.com/diff
*/

// const { Path } = ReactART
// https://codedaily.io/tutorials/29/React-Art-and-Pathsjs

var _Path = void 0;

// SVGPath from ART.js
// https://github.com/sebmarkbage/art/blob/master/modes/svg/path.js
(function () {
  function Class(mixins) {
    var proto = {};
    for (var i = 0, l = arguments.length; i < l; i++) {
      var mixin = arguments[i];
      if (typeof mixin == 'function') mixin = mixin.prototype;
      for (var key in mixin) {
        proto[key] = mixin[key];
      }
    }
    if (!proto.initialize) proto.initialize = function () {};
    proto.constructor = function (a, b, c, d, e, f, g, h) {
      return new proto.initialize(a, b, c, d, e, f, g, h);
    };
    proto.constructor.prototype = proto.initialize.prototype = proto;
    return proto.constructor;
  };
  // Utility command factories

  var point = function point(c) {
    return function (x, y) {
      return this.push(c, x, y);
    };
  };

  var arc = function arc(c, cc) {
    return function (x, y, rx, ry, outer) {
      return this.push(c, Math.abs(rx || x), Math.abs(ry || rx || y), 0, outer ? 1 : 0, cc, x, y);
    };
  };

  var curve = function curve(t, s, q, c) {
    return function (c1x, c1y, c2x, c2y, ex, ey) {
      var l = arguments.length,
          k = l < 4 ? t : l < 6 ? q : c;
      return this.push(k, c1x, c1y, c2x, c2y, ex, ey);
    };
  };

  // SVG Path Class

  var SVGPath = Class({

    initialize: function initialize(path) {
      if (path instanceof SVGPath) {
        this.path = [Array.prototype.join.call(path.path, ' ')];
      } else {
        if (path && path.applyToPath) path.applyToPath(this);else this.path = [path || 'm0 0'];
      }
    },

    push: function push() {
      this.path.push(Array.prototype.join.call(arguments, ' '));
      return this;
    },

    reset: function reset() {
      this.path = [];
      return this;
    },

    move: point('m'),
    moveTo: point('M'),

    line: point('l'),
    lineTo: point('L'),

    curve: curve('t', 's', 'q', 'c'),
    curveTo: curve('T', 'S', 'Q', 'C'),

    arc: arc('a', 1),
    arcTo: arc('A', 1),

    counterArc: arc('a', 0),
    counterArcTo: arc('A', 0),

    close: function close() {
      return this.push('z');
    },

    toSVG: function toSVG() {
      return this.path.join(' ');
    }

  });

  SVGPath.prototype.toString = SVGPath.prototype.toSVG;

  // _Path = SVGPath;
})();

// Path from Path-js
// https://github.com/andreaferretti/paths-js/blob/9f38bae7ba68ef72450efe9d1a906ce9ff76f46e/src/path.js
// https://github.com/andreaferretti/paths-js/wiki/Low%20level%20API
(function () {
  Path = function (_Path2) {
    function Path(_x) {
      return _Path2.apply(this, arguments);
    }

    Path.toString = function () {
      return _Path2.toString();
    };

    return Path;
  }(function (init) {
    var instructions = init || [];

    var push = function push(arr, el) {
      var copy = arr.slice(0, arr.length);
      copy.push(el);
      return copy;
    };

    var areEqualPoints = function areEqualPoints(_ref, _ref2) {
      var _ref4 = _slicedToArray(_ref, 2),
          a1 = _ref4[0],
          b1 = _ref4[1];

      var _ref3 = _slicedToArray(_ref2, 2),
          a2 = _ref3[0],
          b2 = _ref3[1];

      return a1 === a2 && b1 === b2;
    };

    var trimZeros = function trimZeros(string, char) {
      var l = string.length;
      while (string.charAt(l - 1) === '0') {
        l = l - 1;
      }
      if (string.charAt(l - 1) === '.') {
        l = l - 1;
      }
      return string.substr(0, l);
    };

    var round = function round(number, digits) {
      var str = number.toFixed(digits);
      return trimZeros(str);
    };

    var printInstrunction = function printInstrunction(_ref5) {
      var command = _ref5.command,
          params = _ref5.params;

      var numbers = params.map(function (param) {
        return round(param, 6);
      });
      return command + ' ' + numbers.join(' ');
    };

    var point = function point(_ref6, _ref7) {
      var command = _ref6.command,
          params = _ref6.params;

      var _ref8 = _slicedToArray(_ref7, 2),
          prevX = _ref8[0],
          prevY = _ref8[1];

      switch (command) {
        case 'm':
        case 'M':
          return [params[0], params[1]];
        case 'l':
        case 'L':
          return [params[0], params[1]];
        case 'H':
          return [params[0], prevY];
        case 'V':
          return [prevX, params[0]];
        case 'Z':
          return null;
        case 'C':
          return [params[4], params[5]];
        case 'S':
          return [params[2], params[3]];
        case 'Q':
          return [params[2], params[3]];
        case 'T':
          return [params[0], params[1]];
        case 'A':
          return [params[5], params[6]];
      }
    };

    var verbosify = function verbosify(keys, f) {
      return function (a) {
        var args = (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' ? keys.map(function (k) {
          return a[k];
        }) : arguments;
        return f.apply(null, args);
      };
    };

    var plus = function plus(instruction) {
      return Path(push(instructions, instruction));
    };

    return {
      move: verbosify(['x', 'y'], function (x, y) {
        return plus({
          command: 'm',
          params: [x, y]
        });
      }),
      moveTo: verbosify(['x', 'y'], function (x, y) {
        return plus({
          command: 'M',
          params: [x, y]
        });
      }),
      line: verbosify(['x', 'y'], function (x, y) {
        return plus({
          command: 'l',
          params: [x, y]
        });
      }),
      lineTo: verbosify(['x', 'y'], function (x, y) {
        return plus({
          command: 'L',
          params: [x, y]
        });
      }),
      hline: verbosify(['x'], function (x) {
        return plus({
          command: 'h',
          params: [x]
        });
      }),
      hlineTo: verbosify(['x'], function (x) {
        return plus({
          command: 'H',
          params: [x]
        });
      }),
      vline: verbosify(['y'], function (y) {
        return plus({
          command: 'v',
          params: [y]
        });
      }),
      vlineTo: verbosify(['y'], function (y) {
        return plus({
          command: 'V',
          params: [y]
        });
      }),
      closepath: function closepath() {
        return plus({
          command: 'Z',
          params: []
        });
      },
      curve: verbosify(['x1', 'y1', 'x2', 'y2', 'x', 'y'], function (x1, y1, x2, y2, x, y) {
        return plus({
          command: 'c',
          params: [x1, y1, x2, y2, x, y]
        });
      }),
      curveTo: verbosify(['x1', 'y1', 'x2', 'y2', 'x', 'y'], function (x1, y1, x2, y2, x, y) {
        return plus({
          command: 'C',
          params: [x1, y1, x2, y2, x, y]
        });
      }),
      smoothcurve: verbosify(['x2', 'y2', 'x', 'y'], function (x2, y2, x, y) {
        return plus({
          command: 's',
          params: [x2, y2, x, y]
        });
      }),
      smoothcurveTo: verbosify(['x2', 'y2', 'x', 'y'], function (x2, y2, x, y) {
        return plus({
          command: 'S',
          params: [x2, y2, x, y]
        });
      }),
      qcurve: verbosify(['x1', 'y1', 'x', 'y'], function (x1, y1, x, y) {
        return plus({
          command: 'q',
          params: [x1, y1, x, y]
        });
      }),
      qcurveTo: verbosify(['x1', 'y1', 'x', 'y'], function (x1, y1, x, y) {
        return plus({
          command: 'Q',
          params: [x1, y1, x, y]
        });
      }),
      smoothqcurve: verbosify(['x', 'y'], function (x, y) {
        return plus({
          command: 't',
          params: [x, y]
        });
      }),
      smoothqcurveTo: verbosify(['x', 'y'], function (x, y) {
        return plus({
          command: 'T',
          params: [x, y]
        });
      }),
      arc: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'], function (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) {
        return plus({
          command: 'a',
          params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
        });
      }),
      arcTo: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'], function (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) {
        return plus({
          command: 'A',
          params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
        });
      }),
      // print: () =>
      //   instructions.map(printInstrunction).join(' '),
      toString: function toString() {
        return instructions.map(printInstrunction).join(' ');
      }
      // points: () => {
      //   let ps = []
      //   let prev = [0, 0]
      //   for(let instruction of instructions) {
      //     let p = point(instruction, prev)
      //     prev = p
      //     if(p) {
      //       ps.push(p)
      //     }
      //   }
      //   return ps
      // },
      //   instructions: () =>
      //     instructions.slice(0, instructions.length),
      //   connect: function(path) {
      //     let ps = this.points()
      //     let last = ps[ps.length - 1]
      //     let first = path.points()[0]
      //     let newInstructions = path.instructions().slice(1)
      //     if (!areEqualPoints(last, first)) {
      //       newInstructions.unshift({
      //         command: "L",
      //         params: first
      //       })
      //     }
      //     return Path(this.instructions().concat(newInstructions))
      //   }
    };
  });

  // Path = Path;
})();

// Parse Patth
function cleanUpPath(d) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'arguments';

  var letterRgx = /[a-z]/gi;
  var numberRgx = /((?:-)?(?:\.)?[0-9]+(?:\.[0-9]+)?)/g;
  var emptyRgx = /^(\s+)$/;

  var isEven = function isEven(n) {
    return n % 2 == 0;
  };
  var isOdd = function isOdd(n) {
    return Math.abs(n % 2) == 1;
  };

  var data = d.replace(letterRgx, function (m) {
    return '\n' + m + ' ';
  }).split(/\n/g).map(function (str) {
    var search = str.match(numberRgx);

    if (!search || !search.length > 2) {
      return str;
    }

    var action = str[0] + str[1];

    return action + search;
  }).filter(function (str) {
    return str.length !== 0;
  }).filter(function (str) {
    return !emptyRgx.test(str);
  });

  console.log(data.join('\n'));

  // transform to path.js
  if (type === 'arguments') {
    return 'Path()\n' + data.map(function (str) {
      var _str = _toArray(str),
          commmand = _str[0],
          _ = _str[1],
          coords = _str.slice(2);

      var args = coords.map(function (l) {
        return l === ',' ? l + ' ' : l;
      }).join('');

      switch (commmand) {
        case 'm':
          return '.move(' + args + ')';
        case 'M':
          return '.moveTo(' + args + ')';
        case 'l':
          return '.line(' + args + ')';
        case 'L':
          return '.lineTo(' + args + ')';
        case 'h':
          return '.hline(' + args + ')';
        case 'H':
          return '.hlineTo(' + args + ')';
        case 'v':
          return '.vline(' + args + ')';
        case 'V':
          return '.vlineTo(' + args + ')';
        case 'c':
          return '.curve(' + args + ')';
        case 'C':
          return '.curveTo(' + args + ')';
        case 's':
          return '.smoothcurve(' + args + ')';
        case 'S':
          return '.smoothcurveTo(' + args + ')';
        case 'q':
          return '.qcurve(' + args + ')';
        case 'Q':
          return '.qcurveTo(' + args + ')';
        case 'r':
          return '.smoothqcurve(' + args + ')';
        case 'T':
          return '.smoothqcurveTo(' + args + ')';
        case 'a':
          return '.arc(' + args + ')';
        case 'A':
          return '.arcTo(' + args + ')';
        case 'z':
        case 'Z':
          return '.closepath()';
        default:
          return str;
      }
    }).join('\n');
  } else if (type === 'object') {
    return 'Path()\n' + data.map(function (str) {
      var _str2 = _toArray(str),
          commmand = _str2[0],
          _ = _str2[1],
          coords = _str2.slice(2);

      var args = coords.join('').split(',');

      switch (commmand) {
        case 'm':
          return '.move({ x: ' + args[0] + ', y: ' + args[1] + ' })';
        case 'M':
          return '.moveTo({ x: ' + args[0] + ', y: ' + args[1] + ' })';
        case 'l':
          return '.line({ x: ' + args[0] + ', y: ' + args[1] + ' })';
        case 'L':
          return '.lineTo({ x: ' + args[0] + ', y: ' + args[1] + ' })';
        case 'h':
          return '.hline({ x: ' + args[0] + ' })';
        case 'H':
          return '.hlineTo({ x: ' + args[0] + ' })';
        case 'v':
          return '.vline({ y: ' + args[0] + ' })';
        case 'V':
          return '.vlineTo({ y: ' + args[0] + ' })';
        case 'c':
          return '.curve({ x1: ' + args[0] + ', y1: ' + args[1] + ', x2: ' + args[2] + ', y2: ' + args[3] + ', x: ' + args[4] + ', y: ' + args[5] + ' })';
        case 'C':
          return '.curveTo({ x1: ' + args[0] + ', y1: ' + args[1] + ', x2: ' + args[2] + ', y2: ' + args[3] + ', x: ' + args[4] + ', y: ' + args[5] + ' })';
        case 's':
          return '.smoothcurve({ x2: ' + args[0] + ', y2: ' + args[1] + ', x: ' + args[2] + ', y: ' + args[3] + ' })';
        case 'S':
          return '.smoothcurveTo({ x2: ' + args[0] + ', y2: ' + args[1] + ', x: ' + args[2] + ', y: ' + args[3] + ' })';
        case 'q':
          return '.qcurve({ x1: ' + args[0] + ', y1: ' + args[1] + ', x: ' + args[2] + ', y: ' + args[3] + ' })';
        case 'Q':
          return '.qcurveTo({ x1: ' + args[0] + ', y1: ' + args[1] + ', x: ' + args[2] + ', y: ' + args[3] + ' })';
        case 't':
          return '.smoothqcurve({ x: ' + args[0] + ', y: ' + args[1] + ' })';
        case 'T':
          return '.smoothqcurveTo({ x: ' + args[0] + ', y: ' + args[1] + ' })';
        case 'a':
          return '.arc({ rx: ' + args[0] + ', ry: ' + args[1] + ', xrot: ' + args[2] + ', largeArcFlag: ' + args[3] + ', sweepFlag: ' + args[4] + ', x: ' + args[5] + ', y: ' + args[6] + ' })';
        case 'A':
          return '.arcTo({ rx: ' + args[0] + ', ry: ' + args[1] + ', xrot: ' + args[2] + ', largeArcFlag: ' + args[3] + ', sweepFlag: ' + args[4] + ', x: ' + args[5] + ', y: ' + args[6] + ' })';
        case 'z':
        case 'Z':
          return '.closepath()';
        default:
          return str;
      }
    }).join('\n');
  } else {
    return data.join('\n');
  }
}

var _React = React,
    Component = _React.Component;

var PropTypes = PropTypes;
var _ReactDOM = ReactDOM,
    render = _ReactDOM.render;
var _ReactMotion = ReactMotion,
    Motion = _ReactMotion.Motion,
    spring = _ReactMotion.spring;


function ratio(val, max) {
  return val / max;
}

function centerRatio(val, max) {
  return ratio(val, max) - 1 / 2;
}

var COLOR_HAIR_LIGHT = '#000';
var COLOR_HAIR_MEDIUM = '#000';
var COLOR_HAIR_DARK = '#000';

var COLOR_SKIN_LIGHT = '#DDB684';
var COLOR_SKIN_MEDIUM = '#DDB684';
var COLOR_SKIN_DARK = '#DDB684';

var Avatar = function (_Component) {
  _inherits(Avatar, _Component);

  function Avatar(props) {
    _classCallCheck(this, Avatar);

    var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

    _this.handleMouseMove = function (e) {
      var moveX = centerRatio(e.clientX, window.innerWidth) * 2;
      var moveY = centerRatio(e.clientY, window.innerHeight) * 2;

      _this.setState({
        moveX: moveX,
        moveY: moveY
      });
    };

    _this.state = {
      moveX: 0,
      moveY: 0
    };
    return _this;
  }

  _createClass(Avatar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          moveX = _state.moveX,
          moveY = _state.moveY;


      var HEAR_LEFT_PATH = Path().moveTo(270.2, 457.1).curve(-1, 12.7, -1.5, 25.6, -1.5, 38.6).smoothcurve(1.5, 43.3, 4.3, 64);

      var HEAR_RIGHT_PATH = Path().moveTo(689.8, 457.1).curve(1, 12.7, 1.5, 25.6, 1.5, 38.6).smoothcurve(-1.5, 43.3, -4.3, 64);

      var HEAR_TRANSFORM = 'translate(' + moveX * 20 + ', ' + moveY * -20 + ')';

      var HEAD_PATH = Path().moveTo(480, 178.4).curve(-116.7, 0, -211.4, 94.6, -211.4, 211.4).vline(118.7).hline(.2).curve(4.4, 169.4, 97.3, 304.7, 211.2, 304.7).smoothcurve(206.8, -135.3, 211.2, -304.7).hline(.2).vlineTo(389.7).curve(0, -116.7, -94.6, -211.3, -211.4, -211.3).closepath();

      var TRANSFORM_HEAD = 'translate(' + moveX * 30 + ', ' + moveY * 10 + ')';
      var TRANSFORN_HEAD_FOR_HAIR = 'translate(' + moveX * -30 + ', ' + moveY * -30 + ')';

      var HAIR_PATH = "M623.7 143.5l27.5 266c1.3 12.1 6.4 23.5 14.6 32.5 0 0 7.5 7.3 16.5 18.1 7.2 8.6 18.6 22.1 18.3 48.4-1.1 84.2-20.3 120-39.8 151.3-25.3 40.5-67.5 59.5-93.5 3.2-8.3-18-26.5-30.5-47.6-30.5H480h-39.7c-21.1 0-39.3 12.5-47.6 30.5-25.9 56.3-68.2 37.4-93.5-3.2-19.5-31.3-38.7-67.1-39.8-151.3-.3-26.2 11.1-39.7 18.3-48.4 9-10.8 16.5-18.1 16.5-18.1 8.2-9 13.4-20.4 14.6-32.5l27.5-266H199.4v730.3h561.2V143.5H623.7zm-86.3 541.3c0 9.6-7.9 17.5-17.5 17.5h-80c-9.6 0-17.5-7.9-17.5-17.5s7.9-17.5 17.5-17.5h80c9.7 0 17.5 7.9 17.5 17.5z";

      var TRANSFORM_FACE = 'translate(' + moveX * 60 + ', ' + moveY * 40 + ')';

      // move with face
      var HAIR_QUIFF_PATH = Path().moveTo(438.3, 198.9).curve(-70.4, 0, -127.5, 57.1, -127.5, 127.5).curve(0, 44.2, 22.5, 83.2, 56.7, 106.1).curve(6.6, -33, 35.8, -57.9, 70.8, -57.9).hline(175.7 + Math.abs(moveX) * -15).curve(70.4, 0, 127.5, -57.1, 127.5, -127.5).curve(0, -53.1, -32.5, -98.6, -78.6, -117.8).curve(2, 5.5, 3.1, 11.5, 3.1, 17.7).curve(0, 28.7, -23.3, 52, -52, 52).hline(-175.7 + Math.abs(moveX) * -15).closepath();

      var HAIR_QUIFF_TRANSFORM = 'translate(' + moveX * 60 + ', ' + moveY * 60 + ')';

      var NECK_SHADOW_PATH = Path().move(320.2, 632.4).vline(133.1).curve(27.8, 47.3, 114.6, 114.4, 159.6, 114.5).curve(45, 0, 132.7, -66.8, 160, -115).vline(-132.6).hline(-319.6).closepath();

      var NECK_SKIN_PATH = Path().moveTo(320.2, 632.4).vline(133.1).curve({
        x1: 27.7 + moveX * 10, y1: 38.9,
        x2: 114.6 + moveX * 10, y2: 90.3,
        x: 159.6 + moveX * 10, y: 90.3
      }).curve({
        x1: 45 + moveX * 10, y1: 0,
        x2: 132.7 - moveX * 10, y2: -51.1,
        x: 160 - moveX * 10, y: -90.8
      }).vline(-132.6).hline(-319.6).closepath();

      var HAIRLINE_DIFF = 80;

      var HAIRLINE_PATH = Path().move(199.4, 146.9).vline(226.6 - moveY * HAIRLINE_DIFF / 2).curve({
        x1: 67.9, y1: 0 + moveY * HAIRLINE_DIFF * 2 / 3,
        x2: 168.4, y2: 0 + moveY * HAIRLINE_DIFF,
        x: 280.6, y: 0 + moveY * HAIRLINE_DIFF
      }).smoothcurve({
        x2: 212.6, y2: 0 - moveY * HAIRLINE_DIFF * 1 / 3,
        x: 280.6, y: 0 - moveY * HAIRLINE_DIFF
      }).vline(-226.6 + moveY * HAIRLINE_DIFF / 2).closepath();

      var TRANSFORM_HAIRLINE = 'translate(' + moveX * 60 + ', ' + moveY * 20 + ')';

      return React.createElement(
        'svg',
        { viewBox: '0 0 960 960' },
        React.createElement(
          'defs',
          null,
          React.createElement(
            'clipPath',
            { id: 'HeadClipPath' },
            React.createElement('path', {
              d: HEAD_PATH,
              transform: TRANSFORM_HEAD
            })
          ),
          React.createElement(
            'clipPath',
            { id: 'HeadForHairClipPath' },
            React.createElement('path', {
              d: HEAD_PATH,
              transform: TRANSFORN_HEAD_FOR_HAIR
            })
          ),
          React.createElement(
            'clipPath',
            { id: 'HairClipPath' },
            React.createElement('path', {
              clipPath: 'url(#HeadForHairClipPath)',
              d: HAIR_PATH,
              transform: TRANSFORM_FACE
            })
          )
        ),
        React.createElement('path', {
          id: 'neckBackGround',
          fill: COLOR_SKIN_DARK,
          d: NECK_SHADOW_PATH
        }),
        React.createElement('path', {
          id: 'neckForeGround',
          fill: COLOR_SKIN_MEDIUM,
          d: NECK_SKIN_PATH
        }),
        React.createElement('path', {
          id: 'leftHear',
          fill: 'none',
          stroke: COLOR_SKIN_LIGHT,
          strokeWidth: '36',
          strokeLinecap: 'round',
          transform: HEAR_TRANSFORM,
          d: HEAR_LEFT_PATH
        }),
        React.createElement('path', {
          id: 'rightHear',
          fill: 'none',
          stroke: COLOR_SKIN_LIGHT,
          strokeWidth: '36',
          strokeLinecap: 'round',
          transform: HEAR_TRANSFORM,
          d: HEAR_RIGHT_PATH
        }),
        React.createElement(
          'g',
          { id: 'face', clipPath: 'url(#HeadClipPath)' },
          React.createElement('rect', {
            fill: COLOR_SKIN_LIGHT,
            x: '199.4', y: '143.5',
            width: '561.2', height: '730.3',
            transform: TRANSFORM_FACE
          })
        ),
        React.createElement(
          'g',
          { id: 'hair', clipPath: 'url(#HairClipPath)' },
          React.createElement('rect', {
            fill: COLOR_HAIR_MEDIUM,
            x: '199.4', y: '143.5',
            width: '561.2', height: '730.3',
            transform: TRANSFORM_FACE
          }),
          React.createElement('ellipse', {
            fill: COLOR_HAIR_MEDIUM,
            cx: '480', cy: '508.6',
            rx: '280.6', ry: '123.8',
            transform: TRANSFORM_FACE
          })
        ),
        React.createElement(
          'g',
          { id: 'hairline', clipPath: 'url(#HeadClipPath)' },
          React.createElement('path', {
            fill: COLOR_HAIR_DARK,
            d: HAIRLINE_PATH,
            transform: TRANSFORM_HAIRLINE
          })
        ),
        React.createElement('path', {
          id: 'hairQuiff',
          fill: COLOR_HAIR_MEDIUM,
          d: HAIR_QUIFF_PATH,
          transform: HAIR_QUIFF_TRANSFORM
        })
      );
    }
  }]);

  return Avatar;
}(Component);

ReactDOM.render(React.createElement(Avatar, null), document.getElementById('render'));