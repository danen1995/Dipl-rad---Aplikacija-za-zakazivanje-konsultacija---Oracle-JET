/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas', 'ojs/ojdialog', 'ojs/ojswitch', 'ojs/ojbutton'],
        function (oj, ko) {
            function ControllerViewModel() {
                var self = this;
                self.poruka = ko.observable("poruka123")
                // Media queries for repsonsive layouts
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'login': {label: 'Ulogujte se', isDefault: true},
                    'registracijaKorisnika': {label: 'Registracija-student'},
                    'nastavnici': {label: 'Nastavnici'},
                    'dogadjaji': {label: 'Dogadjaji'},
                    'zakazivanjeKonsultacija2': {label: 'Zakazivanje konsultacija'},
                    'pocetnaNastavnik': {label: 'Pocetna strana'},
                    'pocetnaStudent': {label: 'Pocetna strana'},
                    'izborKalendara': {label: 'Izbor kalendara'},
                    'studentoveKonsultacije': {label: 'Moje konsultacije'},
                    'nastavnikoveKonsultacije': {label: 'Moje konsultacije'},
                    'konsultacijeZaDan': {label: 'Zakazane konsultacije'},
                    'mojiPodaci': {label: 'Moji podaci'},
                    'kalendarDogadjaja': {label: 'Kalendar'}
                });
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
                $(document).ready(function () {
                    $('#calendar').fullCalendar();
                });
                var navData = [
//                    {name: 'Nastavnici', id: 'nastavnici',
//                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24 demo-icon-font-24'},
                    {name: 'Ulogujte se', id: 'login',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-education-icon-24 '},
                    {name: 'Registracija-student', id: 'registracijaKorisnika',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}

                ];
                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                // Drawer
                // Close offcanvas on medium and larger screens
                self.navChangeHandler = function (event, data) {
                    if (data.option === 'selection' && data.value !== self.router.stateId()) {
                        self.toggleDrawer();
                    }
                };
                self.mdScreen.subscribe(function () {
                    oj.OffcanvasUtils.close(self.drawerParams);
                });
                self.drawerParams = {
                    displayMode: 'push',
                    selector: '#navDrawer',
                    content: '#pageContent'
                };
                // Called by navigation drawer toggle button and after selection of nav drawer item
                self.toggleDrawer = function () {
                    return oj.OffcanvasUtils.toggle(self.drawerParams);
                }
                // Add a close listener so we can move focus back to the toggle button when the drawer closes
                $("#navDrawer").on("ojclose", function () {
                    $('#drawerToggleButton').focus();
                });

                self.appName = ko.observable("");
                self.userLogin = ko.observable("");
                self.userID = ko.observable("");
                self.brojIndeksaUlogovanogStudenta = ko.observable("");
                self.jmbgUlogovanogNastavnika = ko.observable("");
                self.dogadjajPrimarni = ko.observable("");
                self.izabraniDatum = ko.observable("");
                self.idKalendara = ko.observable("");
                self.izabraniKalendar = ko.observable(" nije izabrana");
                self.vremeZavrsetkaIzabranihKonsultacija = ko.observable("");
                self.vremePocetkaIzabranihKonsultacija = ko.observable("");
                self.tipUsera = ko.observable("");
                self.isLoggedIn = ko.observable(false);
                self.izabraniNastavnikJmbg = ko.observable("");
                self.restSessionId = ko.observable("");
                // Dropdown menu states
                self.menuItemSelect = function (event, ui) {
                    switch (ui.item.attr("id")) {
                        case "pref":
                            oj.Router.rootInstance.go('pocetnaStudent');
                            break;
                        case "out":
                            self.userLogin("");
                            self.userID("");
                            self.tipUsera("");
                            self.isLoggedIn(false);
                            self.restSessionId("");
                            window.location.href = "http://localhost:8383/Aplikacija/web/index.html";
                            break;
                        default:
                    }
                };

                self.link1Name = "About Oracle";
                self.linkId = "aboutOracle";
                self.link1Url = "http://www.oracle.com/us/corporate/index.html#menu-about";

                self.link2Id = "contactUs";
                self.link2Url = "http://www.oracle.com/us/corporate/contact/index.html";
                // Footer
                function footerLink(name, id, linkTarget) {
                    this.name = name;
                    this.linkId = id;
                    this.linkTarget = linkTarget;
                }
                self.footerLinks = ko.observableArray([
                    new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                    new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                    new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                    new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                    new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
                ]);
            }

            return new ControllerViewModel();
        }
);