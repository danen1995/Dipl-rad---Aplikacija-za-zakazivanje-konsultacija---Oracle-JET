/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
        {
            baseUrl: 'js',
            // Path mappings for the logical module names
            // Update the main-release-paths.json for release mode when updating the mappings
            paths:
                    //injector:mainReleasePaths
                            {
                                'knockout': 'libs/knockout/knockout-3.4.0.debug',
                                'jquery': 'libs/jquery/jquery-3.1.1',
                                'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
                                'promise': 'libs/es6-promise/es6-promise',
                                'hammerjs': 'libs/hammer/hammer-2.0.8',
                                'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
                                'ojs': 'libs/oj/v5.2.0/debug',
                                'ojL10n': 'libs/oj/v5.2.0/ojL10n',
                                'ojtranslations': 'libs/oj/v5.2.0/resources',
                                'text': 'libs/require/text',
                                'signals': 'libs/js-signals/signals',
                                'customElements': 'libs/webcomponents/CustomElements',
                                'proj4': 'libs/proj4js/dist/proj4-src',
                                'css': 'libs/require-css/css',
                                'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min',
                                'fullCalendar': 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min',
//                                'scheduler': 'libs/fullcalendar/lib/scheduler'
//                                'moment': 'libs/fullcalendar/lib/moment.min',
//                                'fullCalendar': 'libs/fullcalendar/fullcalendar'
//                                'bootstrap' : 'libs/bootstrap-4.0.0/dist/js/bootstrap',
//                                'bootstrap.min' : 'libs/bootstrap-4.0.0/dist/js/bootstrap.min'
                            }
                    //endinjector
                    ,
                    // Shim configurations for modules that do not expose AMD
                    shim:
                            {
                                'jquery':
                                        {
                                            exports: ['jQuery', '$']
                                        }
                            }
                }
        );

        /**
         * A top-level require call executed by the Application.
         * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
         * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
         * objects in the callback
         */
        require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
            'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
                function (oj, ko, app) { // this callback gets executed when all required modules are loaded
                    $(function () {

                        function init() {
                            oj.Router.sync().then(
                                    function () {
                                        // Bind your ViewModel for the content of the whole page body.
//                                       ko.cleanNode(document.getElementById('globalBody'));
                                        ko.applyBindings(app, document.getElementById('globalBody'));
                                    },
                                    function (error) {
                                        oj.Logger.error('Error in root start: ' + error.message);
                                    }
                            );
                        }

                        // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
                        // event before executing any code that might interact with Cordova APIs or plugins.
                        if ($(document.body).hasClass('oj-hybrid')) {
                            document.addEventListener("deviceready", init);
                        } else {
                            init();
                        }

                    });

                }
        );
