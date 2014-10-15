define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ${Extends} = require('${path}/${Extends}');

    /**
     * TODO_YUIDoc_comment
     *
     * @class ${NAME}
     * @extends ${Extends}
     * @constructor
     **/
    var ${NAME} = (function () {

        var _super = Extend(${NAME}, ${Extends});

        function ${NAME}() {
            _super.call(this);
        }

        return ${NAME};
    })();

    module.exports = ${NAME};

});