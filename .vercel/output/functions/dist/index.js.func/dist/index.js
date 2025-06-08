"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get app () {
        return app;
    },
    get default () {
        return handler;
    }
});
const _core = /*#__PURE__*/ _interop_require_default(require("@godspeedsystems/core"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
try {
    if (process.env.OTEL_ENABLED == 'true') {
        require('@godspeedsystems/tracing').initialize();
    }
} catch (error) {
    console.error("OTEL_ENABLED is set, unable to initialize opentelemetry tracing.");
    console.error(error);
    process.exit(1);
}
let gsApp;
let expressApp;
let initialized = false;
function handler(req, res) {
    return _async_to_generator(function*() {
        try {
            if (!initialized) {
                gsApp = new _core.default();
                yield gsApp.initialize();
                expressApp = gsApp.eventsources.http.client;
                initialized = true;
            }
            return expressApp(req, res);
        } catch (error) {
            console.error('Function error:', error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    })();
}
const app = expressApp;
// // Add this for local/serverful mode:
if (require.main === module) {
    (()=>_async_to_generator(function*() {
            const gsApp = new _core.default();
            yield gsApp.initialize();
            const app = gsApp.eventsources.http.client;
            const port = process.env.PORT || 3002;
            if (app && typeof app.listen === 'function') {
                app.listen(port, ()=>{
                    console.log(`Server running on http://localhost:${port}`);
                });
            } else {
                console.error('Express app instance not found or does not have a listen method.');
            }
        })())();
}

//# sourceMappingURL=index.js.map