define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var EventBroker = require('structurejs/event/EventBroker');
    var GrandparentView = require('example2/view/GrandparentView');
    var Router = require('structurejs/controller/Router');

    /**
     * YUIDoc_comment
     *
     * @class EventBubblingApp
     * @extends Stage
     * @constructor
     **/
    var EventBubblingApp = (function () {

        var _super = Extend(EventBubblingApp, Stage);

        function EventBubblingApp() {
            _super.call(this);

            this._grandpaView = null;
            this._clearButton = null;
            this._$stageMessage = null;

            Router.add('/home/', this.onHome, this);
            Router.add('/about/:id:/', this.onHome, this);
//            Router.add('/home/:id:/:id:/', this.onHome, this);
            Router.add('/home/:id:/another/:asdf:/', this.onHome, this);
            Router.add('/blog/{page}/', this.onHome, this);
            Router.add('/blog/{page}/cool/{page}/{page}/', this.onHome, this);
            Router.add('/contact/{page}/another/:asdf:/', this.onHome, this);

            Router.enable();
            //Router.add('*', this.asdf, this);
        }

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.onHome = function(param) {
            console.log("param", arguments);
        };


        /**
         * @overridden EventBubblingApp.createChildren
         */
        EventBubblingApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._grandpaView = new GrandparentView();
            this.addChild(this._grandpaView);

            this._clearButton = this.getChild('#js-clearButton');
            this._$stageMessage = this.$element.find('.js-message');
        };

        /**
         * @overridden Stage.layoutChildren
         */
        EventBubblingApp.prototype.layoutChildren = function () {
            this._$stageMessage.css('opacity', 0);
            this._grandpaView.layoutChildren();

            return this;
        };

        /**
         * @overridden Stage.enable
         */
        EventBubblingApp.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);
            //EventBroker.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.addEventListener('click', this.onClearClick, this);
            this._grandpaView.enable();

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden Stage.disable
         */
        EventBubblingApp.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.removeEventListener('click', this.onClearClick, this);
            this._grandpaView.disable();

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden Stage.destroy
         */
        EventBubblingApp.prototype.destroy = function () {
            _super.prototype.destroy();

            this._grandpaView.destroy();
            this._grandpaView = null;

            this._clearButton.destroy();
            this._clearButton = null;

            this._$stageMessage = null;
        };

        EventBubblingApp.prototype.onClearClick = function (event) {
            this.layoutChildren();
        };

        EventBubblingApp.prototype.onBubbled = function (event) {
            this._$stageMessage.css('opacity', 1);
        };

        return EventBubblingApp;
    })();

    module.exports = EventBubblingApp;

});
