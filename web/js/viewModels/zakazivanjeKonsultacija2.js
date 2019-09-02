/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'viewModels/studentoveKonsultacije', 'ojs/ojpopup', 'ojs/ojknockout', 'ojs/ojchart', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'fullCalendar', 'moment'],
        function (oj, ko, $, studentoveKonsultacije) {
            function ZakazivanjeViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.dogadjajPK = ko.observable("");
                self.status = ko.observable("zakazano");
                self.naslov = ko.observable("");
                self.opis = ko.observable("");
                self.lista = ko.observableArray();
                self.urlPriloga = ko.observable();
                self.nazivMaterijala = ko.observable();
                self.konsZaBrisanje = ko.observable();
                self.mojeKonsultacije = ko.observableArray();
//                self.csvFileContent = ko.observable("");
//                self.acceptStr = ko.observable(".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel");
//                self.acceptArr = ko.pureComputed(function () {
//                    var accept = self.acceptStr();
//                    return accept ? accept.split(",") : [];
//                }, self);

                self.prilog = new FormData();
                self.selectionListener = function (event) {
                    self.files = event.detail.files;
                    for (var i = 0; i < self.files.length; i++) {
                        var file = self.files[i];
                        self.prilog.append("file", file);
                    }
                };

                self.napuniMojeKons = function () {
                    self.mojeKonsultacije.removeAll();
                    $.ajax({
                        url: "http://localhost:8083/zakazaneKonsultacije/zaStudenta?brojIndeksa=" + rootViewModel.brojIndeksaUlogovanogStudenta(),
                        type: "GET",
                        async: false,
                        contentType: "application/json",
                        processData: false, // avoid the data being parsed to query string params
                        success: function (result, status, jqXHR) {
                            $.each(result, function () {
                                self.mojeKonsultacije.push({
                                    idKalendara: this.studentKonsultacijePK.idKalendara,
                                    idDogadjaja: this.studentKonsultacijePK.idDogadjaja
                                });
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Neuspesno odredjivanje tipa usera.");
                        }
                    });
                };
                self.prikaziKonsultacije = function () {
                    self.lista.removeAll();
                    self.jmbgNastavnika = rootViewModel.izabraniNastavnikJmbg();
                    $.ajax({
                        url: "http://localhost:8083/konsultacije/zaNastavnika?JMBGNastavnika=" + self.jmbgNastavnika,
                        type: "GET",
                        async: false,
                        contentType: "application/json",
                        processData: false, // avoid the data being parsed to query string params
                        success: function (result, status, jqXHR) {
                            $.each(result, function () {
                                if (self.daLiSuProsle(this)) {
                                    self.lista.push({
                                        title: 'Prosao termin',
                                        start: this.datumIVremePocetka,
                                        dogadjajPK: this.dogadjajPK,
                                        color: 'red'
                                    });
                                } else if (self.daLiJeZakazao(this)) {
                                    self.lista.push({
                                        textColor: 'black',
                                        title: 'Zakazano',
                                        start: this.datumIVremePocetka,
                                        dogadjajPK: this.dogadjajPK,
                                        color: 'yellow'
                                    });
                                } else {
                                    self.lista.push({
                                        title: 'Slobodan termin',
                                        start: this.datumIVremePocetka,
                                        dogadjajPK: this.dogadjajPK
                                    });
                                }
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Neuspesno odredjivanje tipa usera.");
                        }
                    });
                };
                self.daLiSuProsle = function (dogadjaj) {
                    var u = 0;
                    if (new Date(dogadjaj.datumIVremePocetka) < new Date()) {
                        u = u + 1;
                    }
                    return (u != 0);
                };
                self.daLiJeZakazao = function (dogadjaj) {
                    var x = 0;
                    ko.utils.arrayForEach(self.mojeKonsultacije(), function (mojaKons) {
                        if (mojaKons.idKalendara == dogadjaj.dogadjajPK.idKalendara && mojaKons.idDogadjaja == dogadjaj.dogadjajPK.idDogadjaja) {
                            x = x + 1;
                        }
                    });
                    return x != 0;

                };

                self.zakazi = function () {
                    self.generisiStudentKonsultacijePK();
                    $.ajax({
                        url: "http://localhost:8083/zakazaneKonsultacije/add",
                        method: "POST",
                        async: false,
                        data: JSON.stringify(self.kreirajStudentKonsultacije()),
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            studentoveKonsultacije.osveziTabelu();
                            self.osveziKalendar();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("DOSLO JE DO GRESKE PRILIKOM ZAKAZIVANJE KONSULTACIJA!");
                            console.log('Greska u funkciji login: ' + textStatus);
                        }
                    });
//                    self.generisiStudentKonsultacije();
                    console.log(self.prilog);
                        $.ajax({
                            url: "http://localhost:8083/prilog/add?idKalendara=" + self.studentKonsultacijePK.idKalendara + "&idDogadjaja=" + self.studentKonsultacijePK.idDogadjaja + "&brojIndeksa=" + self.studentKonsultacijePK.brojIndeksaStudenta,
                            data: self.prilog,
                            cache: false,
                            contentType: false,
                            processData: false,
                            method: 'POST',
                            success: function (result, status, jqXHR) {
                                rootViewModel.poruka("Uspesno ste zakazali konsultacije.");
                                document.querySelector('#dijalogPoruka').open();
                                document.querySelector('#popup1').close();
                                self.prilog = new FormData();
                                self.files = null;

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                rootViewModel.poruka("Sistem ne može da zakaže konsultacije.");
                                document.querySelector('#dijalogPoruka').open();
                                console.log(jqXHR);
                                console.log('Greska u funkciji login: ' + textStatus);
                            }
                        });
                    ;
                };
                self.osveziKalendar = function () {
                    self.napuniMojeKons();
                    self.prikaziKonsultacije();
                    $('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('addEventSource', self.lista());
                    $('#calendar').fullCalendar('refetchEvents');
                };
                self.kreirajStudentKonsultacije = function ()
                {
                    return {
                        'studentKonsultacijePK': self.studentKonsultacijePK,
                        'status': self.status(),
                        'naslov': self.naslov(),
                        'opis': self.opis()
                    };
                };

                self.generisiStudentKonsultacijePK = function () {
                    var a = JSON.stringify(self.dogadjajPK()).slice(0, -1);
                    var b = rootViewModel.brojIndeksaUlogovanogStudenta();
                    self.x = ko.pureComputed(function () {
                        return a + ", \"brojIndeksaStudenta\": " + "\"" + b + "\"" + "}";
                    });
                    self.studentKonsultacijePK = JSON.parse(self.x());
                };
//                self.generisiStudentKonsultacije = function () {
//                    var a = JSON.stringify(self.dogadjajPK()).slice(0, -1);
//                    var b = rootViewModel.brojIndeksaUlogovanogStudenta();
//                    self.x = ko.pureComputed(function () {
//                        return "{ \"studentKonsultacijePK\":" + a + ", \"brojIndeksaStudenta\": " + "\"" + b + "\"" + "}}";
//                    });
//                    self.studentKonsultacije = JSON.parse(self.x());
//                };

                self.eventClick = function (calEvent, jsEvent, view) {
                    if (calEvent.color == 'yellow') {
                        document.querySelector('#popupOtkazi').open($(this));
                        self.konsZaBrisanje(calEvent.dogadjajPK);
                    } else if (calEvent.color == 'red') {

                    } else {
                        self.dogadjajPK(calEvent.dogadjajPK);
                        document.querySelector('#popup1').open($(this));
                    }
                    ;
                };


                self.otkazi = function () {
                    $.ajax({
                        url: " http://localhost:8083/zakazaneKonsultacije/izbrisi?idKalendara=" + self.konsZaBrisanje().idKalendara + "&idDogadjaja=" + self.konsZaBrisanje().idDogadjaja + "&brojIndeksaStudenta=" + rootViewModel.brojIndeksaUlogovanogStudenta(),
                        method: "DELETE",
                        async: false,
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Uspesno ste obrisali konsultacije.");
                            document.querySelector('#dijalogPoruka').open();
                            self.osveziKalendar();
                            studentoveKonsultacije.osveziTabelu();

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Greska u funkciji login: ' + textStatus);
                            rootViewModel.poruka("Nespesno ste obrisali konsultacije.");
                            document.querySelector('#dijalogPoruka').open();
                            console.log(jqXHR);

                        }
                    });
                };
                self.napuniMojeKons();

            }
            return new ZakazivanjeViewModel();
        }
);
