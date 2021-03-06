'use strict';

// Imports
var Extend = require('../../../js/util/Extend');
var ValueObject = require('../../../js/model/ValueObject');

/**
 * TODO: YUIDoc_comment
 *
 * @class CastVO
 * @extends ValueObject
 * @constructor
 **/
var CastVO = (function () {

    var _super = Extend(CastVO, ValueObject);

    function CastVO(data) {
        _super.call(this);

        this.id = null;
        this.name = null;
        this.characters = [];

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden ValueObject.update
     */
    CastVO.prototype.update = function (data) {
         _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
    };

    return CastVO;
})();

module.exports = CastVO;
