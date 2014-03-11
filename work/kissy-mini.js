/*
 * KISSY MINI
 * by: @kissyteam
 * created: 2014-02-12
 * contains: core node event io
 * license: MIT
 **/
;(function(root) {

var S = {
    version: '0.2.0',
    Env: {
        host: root
    }
};

var arrayProto = Array.prototype,
    class2type = {},
    doc = document;
 S.map = function(els, cb) {
    var val,
        key,
        ret = [];

    if (!S.isObject(els)) {
        arrayProto.forEach.call(els, function(el, index) {
            val = cb(el, index);
            if (val !== null) {
                ret.push(val);
            }
        });
    } else {
        for (key in els) {
            val = cb(els[key], key);
            if (val !== null) {
                ret.push(val);
            }
        }
    }

    return ret.length > 0 ? arrayProto.concat.apply([], ret) : ret;
};
 S.each = function(obj, iterator, context) {
    var keys, i, len;
    if (!obj) {
        return obj;
    }
    if (obj.forEach === arrayProto.forEach) {
        obj.forEach(iterator, context);
    } else if (S.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
            if (iterator.call(context, obj[i], i, obj) === false) {
                return;
            }
        }
    } else {
        keys = Object.keys(obj);
        for (i = 0, len = keys.length; i < len; i++) {
            if (iterator.call(context, obj[keys[i]], keys[i], obj) === false) {
                return;
            }
        }
    }
    return obj;
};
 function mix(obj) {
    var k;
    S.each(arrayProto.slice.call(arguments, 1), function(source) {
        if (source) {
            for (var prop in source) {
                if((k = source[prop]) !== undefined) {
                    obj[prop] = k;
                }
            }
        }
    });
    return obj;
}

S.mix = mix;
 S.makeArray = function (o) {
	if (o == null) {
		return [];
	}
	if (S.isArray(o)) {
		return o;
	}
	var lengthType = typeof o.length,
		oType = typeof o;
	if (lengthType !== 'number' ||
			o.alert ||
			oType === 'string' ||
			/* https://github.com/ariya/phantomjs/issues/11478 */
			(oType === 'function' && !( 'item' in o && lengthType === 'number'))) {
				return [o];
			}
	var ret = [];
	for (var i = 0, l = o.length; i < l; i++) {
		ret[i] = o[i];
	}
	return ret;
};
 S.augment = function (r, o, wl) {
	if(o instanceof Function){
		S.mix(r.prototype, o.prototype);
	}
	if(o instanceof Object){
		S.mix(r.prototype, o);
	}
	if(wl instanceof Object){
		S.mix(r.prototype, wl);
	}
	return r;
};
 S.filter = function (arr, fn, context) {
	return Array.prototype.filter.call(arr, fn, context || this);
} ;
 S.clone = function (input, filter) {
	var destination = input;

	if(!input) return destination;

	var constructor = input.constructor;
	if (S.inArray(constructor, [Boolean, String, Number, Date, RegExp])) {
		destination = input.valueOf();
	}
	/* ImageData , File, Blob , FileList .. etc */
	else if (S.isArray(input)) {
		destination = filter ? S.filter(input, filter) : input.concat();
	} else if (S.isPlainObject(input)) {
		destination = {};
	}

	if(S.isArray(input)){
		for (var i = 0; i < destination.length; i++) {
			destination[i] = S.clone(destination[i], filter);
		}
	} else if (S.isPlainObject(input)){
		for (k in input) {
			if (!filter || (filter.call(input, input[k], k, input) !== false)){
				destination[k] = S.clone(input[k], filter);
			}
		}
	}
	return destination;
};
 S.ucfirst= function (s) {
	s += '';
	return s.charAt(0).toUpperCase() + s.substring(1);
};
 S.trim = function (str) {
	return str == null ? '' : String.prototype.trim.call(str);
};
 S.now = Date.now;
 S.reduce = function (arr, callback, initialValue) {
	var len = arr.length;
	if (typeof callback !== 'function') {
		throw new TypeError('callback is not function!');
	}

	/* 如果初始值是空数组，则无返回值，报错 */
	if (len === 0 && arguments.length == 2) {
		throw new TypeError('arguments invalid');
	}

	var k = 0;
	var accumulator;
	if (arguments.length >= 3) {
		accumulator = arguments[2];
	}
	else {
		do {
			if (k in arr) {
				accumulator = arr[k++];
				break;
			}

			/* 如果初始值是空数组，则无返回值，报错 */
			k += 1;
			if (k >= len) {
				throw new TypeError();
			}
		}
		while (TRUE);
	}

	while (k < len) {
		if (k in arr) {
			accumulator = callback.call(undefined, accumulator, arr[k], k, arr);
		}
		k++;
	}

	return accumulator;
};
 S.substitute =  function (str, o, regexp) {
	if (typeof str != 'string' || !o) {
		return str;
	}

	return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
		if (match.charAt(0) === '\\') {
			return match.slice(1);
		}
		return (o[name] === undefined) ? '': o[name];
	});
};
 S.indexOf = function(item, arr) {
	return Array.prototype.indexOf.call(arr, item);
};
 S.inArray = function(item, arr) {
	return S.indexOf(item, arr) > - 1;
};
 S.merge = function() {
	var args = arrayProto.slice.call(arguments, 0);
    return mix.apply(null, [{}].concat(args));
};
 S.extend = function(receiver, supplier, protoPros, staticProps) {
    var supplierProto = supplier.prototype,
        receiverProto;

    supplierProto.constructor = supplier;

    receiverProto = Object.create(supplierProto);
    receiverProto.constructor = receiver;
    receiver.prototype = S.mix(receiverProto, receiver.prototype);
    receiver.superclass = supplierProto;

    if (protoPros) {
        S.mix(receiverProto, protoPros);
    }

    if (staticProps) {
        S.mix(receiver, staticProps);
    }

    return receiver;
};
 S.type = function(obj) {
    return obj == null ?
		String(obj) : class2type[{}.toString.call(obj)] || 'object';
};
 S.unique = function(array) {
    return arrayProto.filter.call(array, function(item, index) {
        return array.indexOf(item) == index;
    });
};
 S.isWindow = function(obj) {
    return obj && obj == obj.window;
};
 S.isPlainObject = function(obj) {
    return S.isObject(obj) && !S.isWindow(obj)
		&& Object.getPrototypeOf(obj) == Object.prototype;
};
 ['Boolean', 'Number', 'String', 'Function',
	'Array', 'Date', 'RegExp', 'Object',
	'Error'].forEach(function(name) {
    var name2lc = name.toLowerCase();

    class2type['[object ' + name + ']'] = name2lc;

    S['is' + name] = function(obj) {
        return S.type(obj) === name2lc;
    };
});

S.isUndefined = function(o){
	return o === undefined;
};

S.isNull = function(o){
	return o === null;
};

S.isArray = Array.isArray || S.isArray;
 S.startsWith = function(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
};
 S.endsWith   = function(str, suffix) {
    var ind = str.length - suffix.length;
    return ind >= 0 && str.indexOf(suffix, ind) === ind;
};

var guid = 0;
 S.guid = function(pre) {
    return (pre || '') + guid++;
};
 S.ready = function(fn){
    if (/complete|loaded|interactive/.test(doc.readyState) && doc.body) fn(S);
    else doc.addEventListener('DOMContentLoaded', function(){ fn(S); }, false);
    return this;
};

(function (S, undefined) {
    /* ios Function.prototype.bind === undefined */
    function bindFn(r, fn, obj) {
        function FNOP() {
        }

        var slice = [].slice,
            args = slice.call(arguments, 3),
            bound = function () {
                var inArgs = slice.call(arguments);
                return fn.apply(
                    this instanceof FNOP ? this :
                        /* fix: y.x=S.bind(fn); */
                        obj || this,
                    (r ? inArgs.concat(args) : args.concat(inArgs))
                );
            };
        FNOP.prototype = fn.prototype;
        bound.prototype = new FNOP();
        return bound;
    }

    S.mix(S, {
         noop: function () {
        },
         bind: bindFn(0, bindFn, null, 0),
        rbind: bindFn(0, bindFn, null, 1)
    });
})(S);

var fns    = {},
    config = {
        debug : false,
        fns   : fns
    };

S.Config = config;
 S.config = function (configName, configValue) {
    var cfg,
        r,
        self = this,
        fn,
        Config = S.Config,
        configFns = Config.fns;
    if (S.isObject(configName)) {
        S.each(configName, function (configValue, p) {
            fn = configFns[p];
            if (fn) {
                fn.call(self, configValue);
            } else {
                Config[p] = configValue;
            }
        });
    } else {
        cfg = configFns[configName];
        if (configValue === undefined) {
            if (cfg) {
                r = cfg.call(self);
            } else {
                r = Config[configName];
            }
        } else {
            if (cfg) {
                r = cfg.call(self, configValue);
            } else {
                Config[configName] = configValue;
            }
        }
    }
    return r;
};

S.config('mini',true);

var modules = {};

var isString   = S.isString,
    isFunction = S.isFunction;

var RE_DIRNAME = /[^?#]*\//,
    RE_DOT = /\/\.\//g,
    RE_DOUBLE_DOT = /\/[^/]+\/\.\.\//,
    RE_DOUBLE_SLASH = /([^:/])\/\//g;

function parseDirName(name) {
    var mat = name.match(RE_DIRNAME);
    return name ? mat[0] : name + '/';
}

function parseRelativeName(name, refName) {
    if (refName && /^[\.\/]/.test(name)) {
        name = parseDirName(refName) + name;
        /* /a/b/./c/./d ==> /a/b/c/d */
        name = name.replace(RE_DOT, '/');

        /* a/b/c/../../d  ==>  a/b/../d  ==>  a/d */
        while (name.match(RE_DOUBLE_DOT)) {
            name = name.replace(RE_DOUBLE_DOT, '/');
        }

        /* a//b/c  ==>  a/b/c  */
        name = name.replace(RE_DOUBLE_SLASH, '$1/');
    }
    return name;
}

function parseModuleName(name, refName) {
    if (name.charAt(name.length - 1) === '/') {
        name += 'index';
    } else if (/.js$/.test(name)) {
        name = name.slice(0, -3);
    }

    return parseRelativeName(name, refName);
}

function execFnWithModules(fn, modNames, refName)  {
    var args = S.map(modNames || [], function(modName) {
        return S.require(modName, refName);
    });
    return isFunction(fn) ? fn.apply(S, [S].concat(args)) : undefined;
}

function execFnWithCJS(fn) {
    return isFunction(fn) ? fn.apply(S, [S, S.require]) : undefined;
}
 S.add = function(name, factory, config) {
    if (isString(name)) {
        name = parseModuleName(name);
        modules[name] = {
            factory  : factory,
            requires : config && config.requires
        };
    }
    return S;
};
 S.require = function(name, refName) {
    var mod;
    if (isString(name)) {
        name = parseModuleName(name, refName);
        mod  = modules[name];
        if (mod) {
            if (!mod.exports) {
                mod.exports = isFunction(mod.factory) ?
                    mod.requires ?
                        execFnWithModules(mod.factory, mod.requires, name) :
                        execFnWithCJS(mod.factory)
                    :
                    mod.factory;
            }
            return mod.exports;
        }
    }
};
 S.use = function(names, success) {
    /* assign callback functions */
    if (S.isObject(success)) {
        success = success.success;
    }
    /* parse string to array */
    if (isString(names)) {
        names = names.replace(/\s+/g, '').split(',');
    }

    execFnWithModules(success, names);

    return S;
};
 S.log = function(msg, cat, type) {
    var logger = console;
    cat = cat && logger[cat] ? cat : 'log';
    logger[cat](type ? type + ': ' + msg : msg);
};
 S.error = function(msg) {
    if (S.config('debug')) {
        throw msg instanceof Error ? msg : new Error(msg);
    }
};

root.KISSY = S;


}(this));
