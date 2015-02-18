/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher', '../event/LoaderEvent', '../net/URLLoaderDataFormat', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'), require('../event/LoaderEvent'), require('../net/URLLoaderDataFormat'), require('jquery'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.URLLoader = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.LoaderEvent, root.structurejs.URLLoaderDataFormat, root.jQuery);
    }
}(this, function(Extend, EventDispatcher, LoaderEvent, URLLoaderDataFormat, jQuery) {
    'use strict';

    /**
     * The URLLoader...
     *
     * @class URLLoader
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule net
     * @param [request=null] {URLRequest}
     * @requires Extend
     * @requires EventDispatcher
     * @requires LoaderEvent
     * @requires URLLoaderDataFormat
     * @requires jQuery
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var URLLoader = (function () {

        var _super = Extend(URLLoader, EventDispatcher);

        function URLLoader(request) {
            if (request === void 0) { request = null; }
            _super.call(this);
            /**
             * TODO: YUIDoc_comment
             *
             * @property dataFormat
             * @type {string}
             * @default URLLoaderDataFormat.TEXT
             */
            this.dataFormat = URLLoaderDataFormat.TEXT;
            /**
             * TODO: YUIDoc_comment
             *
             * @property data
             * @type {any}
             * @default null
             */
            this.data = null;
            /**
             * TODO: YUIDoc_comment
             *
             * @property complete
             * @type {boolean}
             * @default false
             */
            this.complete = false;
            /**
             * TODO: YUIDoc_comment
             *
             * @property _xhr
             * @type {JQueryXHR}
             * @default null
             * @private
             */
            this._xhr = null;
            if (request) {
                this.load(request);
            }
        }
        /**
         * TODO: YUIDoc_comment
         *
         * @method load
         * @param request {URLRequest}
         * @public
         */
        URLLoader.prototype.load = function (request) {
            this.complete = false;
            var self = this;
            this._xhr = jQuery.ajax({
                url: request.url,
                type: request.method,
                data: request.data,
                contentType: request.contentType,
                dataType: self.dataFormat,
                jsonp: 'callback'
            });
            this._xhr.done(self.onSuccess.bind(this));
            this._xhr.fail(self.onError.bind(this));
        };
        /**
         * @overridden EventDispatcher.destroy
         */
        URLLoader.prototype.destroy = function () {
            this.abort();
            _super.prototype.destroy.call(this);
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method abort
         * @public
         */
        URLLoader.prototype.abort = function () {
            if (this._xhr != null) {
                this._xhr.abort();
            }
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method onError
         * @private
         */
        URLLoader.prototype.onError = function () {
            console.log("[URLLoader] - onError", arguments);
            this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method onSuccess
         * @private
         */
        URLLoader.prototype.onSuccess = function (data) {
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this.data));
        };
        return URLLoader;
    })();

    return URLLoader;
}));