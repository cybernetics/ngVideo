/**
 * @module ngVideo
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/ngVideo
 */
(function Service($angular) {

    "use strict";

    /**
     * @property module
     * @type {Object}
     */
    var module = $angular.module('ngVideo', []);

    /**
     * @constant ngVideoOptions
     * @type {Object}
     */
    module.constant('ngVideoOptions', {
        RESTRICT: 'CA',
        REFRESH: 50,
        SCREEN_DIRECTIVE: 'vi-screen',
        VOLUME_STEPS: 0.1,
        VOLUME_MINIMUM: 0,
        VOLUME_MAXIMUM: 1,
        BUFFER_COLOUR: '#dd4b39',
        BUFFER_HEIGHT: 1,
        BUFFER_WIDTH: 485
    });

    /**
     * @value ngVideoPlaylist
     * @type {Object}
     */
    module.value('ngVideoPlaylist', []);

    /**
     * @service video
     * @type {Function}
     * @param $rootScope {Object}
     * @param $timeout {Function|Object}
     * @param ngVideoPlaylist {Array}
     */
    module.service('video', ['$rootScope', '$timeout', 'ngVideoPlaylist',

        function videoService($rootScope, $timeout, ngVideoPlaylist) {

            var service = {};

            /**
             * @method addSource
             * @param type {String}
             * @param src {String}
             * @return {Object}
             */
            service.addSource = function addSource(type, src) {

                // Add a new video to the playlist, and broadcast the success.
                var model = { type: type, src: src };
                ngVideoPlaylist.push(model);

                $rootScope.$broadcast('ng-video/add', model);
                return model;

            };

            /**
             * @method multiSource
             * @return {MultiSource}
             */
            service.multiSource = function multiSource() {

                /**
                 * @class MultiSource
                 * @constructor
                 */
                function MultiSource() {}

                /**
                 * @property prototype
                 * @type {Object}
                 */
                MultiSource.prototype = {

                    /**
                     * @property sources
                     * @type {Array}
                     */
                    sources: [],

                    /**
                     * @method addSource
                     * @param type {String}
                     * @param src {String}
                     * @return {Object}
                     */
                    addSource: function addSource(type, src) {
                        var model = { type: type, src: src };
                        this.sources.push(model);
                        return model;
                    },

                    /**
                     * @method save
                     * @return {void}
                     */
                    save: function save() {
                        ngVideoPlaylist.push(this.sources);
                        $rootScope.$broadcast('ng-video/add', this.sources);
                    }

                };

                return new MultiSource();

            };

            /**
             * @method throwException
             * @param message {String}
             * @return {void}
             */
            service.throwException = function throwException(message) {
                throw 'ngVideo: ' + message + '.';
            };

            return service;

        }]);

})(window.angular);