
/**
 * The BrowserUtil...
 *
 * @class BrowserUtil
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class BrowserUtil
    {
        constructor()
        {
        }

        /**
         * Returns the name of the browser.
         *
         * @method browserName
         * @return {string}
         * @public
         * @static
         */
        public static browserName():string
        {
            return BrowserUtil.getBrowser()[0];
        }

        /**
         * Returns the version of the browser.
         *
         * @method browserVersion
         * @param [majorVersion=true0 {boolean}
         * @return {number|string}
         * @public
         * @static
         */
        public static browserVersion(majorVersion:boolean = true):any
        {
            var version:string = BrowserUtil.getBrowser()[1];

            if (majorVersion === true)
            {
                return parseInt(version, 10);
            }
            else
            {
                return version;
            }
        }

        /**
         * YUIDoc_comment
         *
         * @method getBrowser
         * @private
         * @return {Array.<string>}
         * @static
         */
        private static getBrowser():string[]
        {
            var N = navigator.appName, ua = navigator.userAgent, tem;
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
            M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

            return M;
        }

        /**
         * YUIDoc_comment
         *
         * @method isAndroid
         * @returns {boolean}
         * @public
         * @static
         */
        public static isAndroid():boolean
        {
            return !!navigator.userAgent.match(/Android/i);
        }

        /**
         * YUIDoc_comment
         *
         * @method isBlackBerry
         * @returns {boolean}
         * @public
         * @static
         */
        public static isBlackBerry():boolean
        {
            return Boolean(!!navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/));
        }

        /**
         * isIOS
         *
         * @method isIOS
         * @returns {boolean}
         * @public
         * @static
         */
        public static isIOS():boolean
        {
            return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }

        /**
         * YUIDoc_comment
         *
         * @method isOperaMini
         * @returns {boolean}
         * @public
         * @static
         */
        public static isOperaMini():boolean
        {
            return !!navigator.userAgent.match(/Opera Mini/i);
        }

        /**
         * YUIDoc_comment
         *
         * @method isIEMobile
         * @returns {boolean}
         * @public
         * @static
         */
        public static isIEMobile():boolean
        {
            return !!navigator.userAgent.match(/IEMobile/i);
        }

        /**
         * YUIDoc_comment
         *
         * @method isMobile
         * @returns {boolean}
         * @public
         * @static
         */
        public static isMobile():boolean
        {
            return (BrowserUtil.isAndroid() || BrowserUtil.isBlackBerry() || BrowserUtil.isIOS() || BrowserUtil.isOperaMini() || BrowserUtil.isIEMobile());
        }

        /**
         * YUIDoc_comment
         *
         * @method hasBrowserHistory
         * @returns {boolean}
         * @public
         * @static
         */
        public static hasBrowserHistory():boolean
        {
            return !!(window.history && history.pushState);
        }

        /**
         * YUIDoc_comment
         *
         * @method hasLocalStorage
         * @returns {boolean}
         * @public
         * @static
         */
        public static hasLocalStorage():boolean
        {
            try
            {
                return ('localStorage' in window) && window.localStorage !== null;
            }
            catch (error)
            {
                return false;
            }
        }

        /**
         * YUIDoc_comment
         *
         * @method hasSessionStorage
         * @returns {boolean}
         * @public
         * @static
         */
        public static hasSessionStorage():boolean
        {
            try
            {
                return ('sessionStorage' in window) && window.sessionStorage !== null;
            }
            catch (error)
            {
                return false;
            }
        }
    }
}