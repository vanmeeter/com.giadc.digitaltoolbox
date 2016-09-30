var haveAFrame;
var symbolName = "";
var symbolFrames = [];
var repeatTest = [];
var frameIndex = 1;
var symbolPivot = {};
var symbolAnimation = null;
var boot = false;
var resp = {
    sprites:{}
};

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

if (typeof JSON !== 'object') JSON = {};

(function () {
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? '0' + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap,
        indent,
        meta,
        rep;


    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? '"' + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"'
            : '"' + string + '"';
    }


    function str(key, holder, min) {
        if(!min) min = 0;

        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' && typeof value.toJSON === 'function') value = value.toJSON(key);
        if (typeof rep === 'function') value = rep.call(holder, key, value);

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

            return isFinite(value)
                ? String(value)
                : 'null';

        case 'boolean':
        case 'null':

            return String(value);

        case 'object':

            if (!value) return 'null';

            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {

                length = value.length;
                for (i = 0; i < length; i += 1) partial[i] = str(i, value,min) || 'null';

                v = partial.length === 0
                    ? '[]'
                    : gap && partial.length>=min
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value, min);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ': '
                                    : ':'
                            ) + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value, min);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ': '
                                    : ':'
                            ) + v);
                        }
                    }
                }
            }
            v = partial.length === 0
                ? '{}'
                : gap && partial.length>=min
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space, min) {
            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) indent += ' ';
            } else if (typeof space === 'string') {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' ||  typeof replacer.length !== 'number')) throw new Error('JSON.stringify');
            return str('', {'': value}, min);
        };
    }

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (rx_one.test(text.replace(rx_two, '@').replace(rx_three, ']').replace(rx_four, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

            throw new SyntaxError('JSON.parse');
        };
    }
}());

function getPluginInfo(lang){
    pluginInfo = new Object();
    pluginInfo.id = "JSON";
    pluginInfo.name = "JSON";
    pluginInfo.ext = "json";
    pluginInfo.encoding = "utf8";
    pluginInfo.capabilities = new Object();
    pluginInfo.capabilities.canRotate = true;
    pluginInfo.capabilities.canTrim = true;
    pluginInfo.capabilities.canShapePad = true;
    pluginInfo.capabilities.canBorderPad = true;
    pluginInfo.capabilities.canStackDuplicateFrames = true;

    return pluginInfo;
}

function beginExport(meta){
}

function frameExport(frame){
    if(symbolName!=frame.symbolName){
        endSymbol();
        symbolName=frame.symbolName;
        symbolPivot = {
            x:Math.floor(frame.registrationPoint.x),
            y:Math.floor(frame.registrationPoint.y)
        }

        symbolAnimation = animationData(frame.symbol.timeline.layers);
    }

    symbolFrames.push({
        f:{
            x:frame.frame.x-1,
            y:frame.frame.y-1,
            w:frame.frame.w+1,
            h:frame.frame.h+1
        },
        s:{
            // x:frame.registrationPoint.x-frame.offsetInSource.x,
            // y:frame.registrationPoint.y-frame.offsetInSource.y,
            // x:frame.registrationPoint.x,
            // y:frame.registrationPoint.y,
            x:frame.offsetInSource.x,
            y:frame.offsetInSource.y,
            w:frame.sourceSize.w,
            h:frame.sourceSize.h
        }
    });
}

function getFrameRate(){
    return fl.getDocumentDOM().frameRate;
}

function animationData(layers){
    var labelLayer = '';
    for (i in layers){
        if (layers[i].name.toLowerCase() == "labels") {
            labelLayer = layers[i];
            break;
        }
    }

    if (labelLayer === '') return {};

    var labelFrame = null;
    var controlFrame = null;
    var labelIndex = 0;
    var controlIndex = 0;
    var frameNumber = 0;
    var endFrameNumber = 0;

    var r = {};

    while (labelIndex < labelLayer.frames.length){
        labelFrame = labelLayer.frames[labelIndex++];


        if (labelFrame.name != null || labelFrame.name!=''){
            endFrameNumber = frameNumber + labelFrame.duration - 1;

            r[labelFrame.name] = {
                start:frameNumber+1,
                end:endFrameNumber+1,
                rate:getFrameRate()
            }

            frameNumber = endFrameNumber + 1;
            labelIndex = frameNumber;
            controlIndex = labelIndex;
        }
    }

    return r;
}

function countVal(arr,val){
    var c = 0;
    for(var i in arr) if(arr[i]==val) c++;
    return c;
}

function endSymbol(){
    if(!symbolName) return;

    var i;
    var stackedFrames = [];
    var frameOrder = [];

    for(i=0;i<symbolFrames.length;i++){
        if(stackedFrames.indexOf(JSON.stringify(symbolFrames[i])) == -1) {
            stackedFrames.push(JSON.stringify(symbolFrames[i]));
        }
    }

    for(i in symbolFrames) frameOrder[i]=stackedFrames.indexOf(JSON.stringify(symbolFrames[i]));

    var newFramesObj = {};
    for(i in symbolFrames){
        if(!newFramesObj[frameOrder[i]]){
            newFramesObj[frameOrder[i]] = symbolFrames[i];
        } else {
            if(!newFramesObj[frameOrder[i]].r) newFramesObj[frameOrder[i]].r=1;
            newFramesObj[frameOrder[i]].r++;
        }
    }

    var newFramesArr = [];
    for(i in newFramesObj) newFramesArr.push(newFramesObj[i]);

    resp.sprites[symbolName.replace(/ instance 1/g,'')] = {
        frames:newFramesArr,
        pivot:symbolPivot,
        animations:symbolAnimation
    }

    symbolPivot = {};
    symbolFrames = [];
    repeatTest = [];
    frameIndex = 1;
}

function endExport(meta){
    endSymbol();

    return JSON.stringify(resp,null,2);
}
