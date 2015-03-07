///<reference path='../interface/IValueObject.ts'/>
///<reference path='../BaseObject.ts'/>
///<reference path='../util/Util.ts'/>

/**
 * Value Object (VO) is a design pattern used to transfer data between software application subsystems.
 *
 * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
 *  Also in the class you inherit ValueObject from you can override the update method to handle the data how you want.
 *
 * @class ValueObject
 * @extends BaseObject
 * @param [data] {any} Provide a way to update the value object upon initialization.
 * @module StructureJS
 * @submodule model
 * @requires Extend
 * @requires BaseObject
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     var data = {
 *          make: 'Tesla',
 *          model: 'Model S',
 *          year: 2014,
 *          feature: {
 *              abs: true,
 *              airbags: true
 *          }
 *     }
 *     var carVO = new CarVO(data);
 *
 *
 *     // Example how to extend the ValueObject class.
 *      var CarVO = (function () {
 *          var _super = Extend(CarVO, ValueObject);
 *          function CarVO(data) {
 *              _super.call(this);
 *
 *              // You need to have properties so the data will get assigned.
 *              // If not the data will not get assigned to the vo.
 *              this.make = null;
 *              this.model = null;
 *              this.year = null;
 *              this.allWheel = false; // Set a default value.
 *
 *              // You can assign another ValueObject to a property which will
 *              // automatically created it and pass the data to it.
 *              this.feature = FeatureVO;
 *
 *              if (data) {
 *                  this.update(data);
 *              }
 *          }
 *
 *          // @overridden ValueObject.update
 *          CarVO.prototype.update = function (data) {
 *              _super.prototype.update.call(this, data);
 *
 *              // Override any values after the default super update method has set the values.
 *
 *              // If the data doesn't match the property names you can set the values
 *              // manually after update super method has been called.
 *              // Also in the class you inherit ValueObject from you can override the
 *              // update method to handle the data how you want.
 *              this.allWheel = data.AllWheel;
 *          };
 *
 *          return CarVO;
 *      })();
 */
module StructureTS
{
    export class ValueObject extends BaseObject implements IValueObject
    {
        constructor()
        {
            super();
        }

        /**
         * Provide a way to update the value object.
         *
         * @method update
         * @param data {any}
         * @public
         * @example
         *     // Example of updating some of the data:
         *     carVO.update({ year: 2015, allWheel: true});
         *
         *     // Of course you can also do it the following way:
         *     carVO.year = 2015;
         *     carVO.allWheel = false;
         */
        public update(data:any):any
        {
            for (var key in data)
            {
                if (this.hasOwnProperty(key))
                {
                    this[key] = data[key];
                }
            }

            return this;
        }

        /**
         * Converts the value object data into a JSON object and deletes the cid property.
         *
         * @method toJSON
         * @returns {any}
         * @public
         * @example
         *     var obj = carVO.toJSON();
         */
        public toJSON():any
        {
            var clone:any = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['cid']);
        }

        /**
         * Converts a value object to a JSON string,
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     var str = carVO.toJSONString();
         */
        public toJSONString():string
        {
            return JSON.stringify(this.toJSON());
        }

        /**
         * Converts the string json data into an Object and calls the {{#crossLink "ValueObject/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      var str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      var carVO = new CarVO();
         *      carVO.fromJSON(str);
         */
        public fromJSON(json:string):any
        {
            var parsedData:any = JSON.parse(json);
            this.update(parsedData);

            return this;
        }

        /**
         * Create a clone/copy of the value object.
         *
         * @method Object
         * @returns {any}
         * @public
         * @example
         *     var clone = carVO.clone();
         */
        public clone():any
        {
            var clonedValueObject = new (<any>this).constructor(this);
            return clonedValueObject;
        }
    }
}