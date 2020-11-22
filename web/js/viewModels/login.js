/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodel', 'ojs/ojfilepicker', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'fullCalendar', "moment"],
        function (oj, ko, $) {
            function LoginViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.username = ko.observable("dane");
                self.password = ko.observable("dane");
                self.login = function () {
                    var korisnik = self.vratiKorisnika();
                    $.ajax({
                        url: "http://localhost:8083/api/auth/signin",
                        method: "POST",
                        async: false,
                        data: JSON.stringify(korisnik),
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.userID(result.userAccountId);
                            rootViewModel.userLogin(result.userName);
                            self.odrediTipUsera();
                            rootViewModel.isLoggedIn('true');
                            rootViewModel.restSessionId("");
                            self.username(null);
                            self.password(null);
                            self.preusmeri();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            var x = document.getElementById("myDIV");
                            x.style.display = "block";
                        }

                    });
                };
                self.preusmeri = function () {
                    if (rootViewModel.tipUsera() === "nastavnik") {
                        var navData = [
                            {name: 'Spisak kalendara', id: 'izborKalendara',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}
                        ];
                        rootViewModel.navDataSource.reset(navData, {idAttribute: 'id'});
                        self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
                        oj.Router.rootInstance.go('izborKalendara');
                    } else {
                        var navData = [
                            {name: 'Pocetna', id: 'pocetnaStudent',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24 demo-icon-font-24'},
                            {name: 'Moji podaci', id: 'mojiPodaci',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                            {name: 'Zakazi konsultacije', id: 'nastavnici',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24 demo-icon-font-24'},
                            {name: 'Moje konsultacije', id: 'studentoveKonsultacije',
                                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}


                        ];
                        rootViewModel.navDataSource.reset(navData, {idAttribute: 'id'});
                        self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
                        oj.Router.rootInstance.go('pocetnaStudent');
                    }
                }
                self.odrediTipUsera = function () {
                    $.ajax({
                        url: "http://localhost:8083/api/auth/studentOrProfessorID?userAccountId=" + rootViewModel.userID(),
                        type: "GET",
                        async: false,
                        contentType: "text/plain",
                        dataType: "text",
                        processData: false, // avoid the data being parsed to query string params
                        success: function (result, status, jqXHR) {
                            if (result.includes("/")) {
                                rootViewModel.tipUsera("student");
                                rootViewModel.brojIndeksaUlogovanogStudenta(result);
                            } else {
                                rootViewModel.tipUsera("nastavnik");
                                rootViewModel.jmbgUlogovanogNastavnika(result);
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR, textStatus, errorThrown);
                            console.log("Neuspesno odredjivanje tipa usera.");
                        }
                    });
                };
                self.vratiKorisnika = function ()
                {
                    return {
                        'userName': self.username(),
                        'password': self.password()
                    };
                };
            }
            return new LoginViewModel();
        }
);
