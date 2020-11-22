/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'viewModels/konsultacijeZaDan', 'fullCalendar', 'ojs/ojmodel', 'ojs/ojinputtext', 'ojs/ojdatetimepicker',
    'ojs/ojtimezonedata', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojswitch',
    'ojs/ojcheckboxset', 'ojs/ojtrain', 'moment'],
        function (oj, ko, $, konsultacijeZaDan, fullCalendar) {
            function KalendarDogadjajaViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.dogadjajPKString = ko.observable();
                self.dogadjajPK = ko.observable();
                self.lista = ko.observableArray();
                self.datumIVremePocetka = ko.observable();
                self.datumIVremeZavrsetka = ko.observable();
                self.vremePocetka1 = ko.observable("");
                self.vremeZavrsetka1 = ko.observable();
                self.kliknutiDatum = ko.observable();
                self.mestoOdrzavanja = ko.observable();
                self.kapacitet = ko.observable();
                self.dogadjajPrimarni = ko.observable();
                self.tipDogadjajaString = ko.observable("{\"idTipaDogadjaja\": 2}");
                var tipDogadjaja = JSON.parse(self.tipDogadjajaString());
                self.osveziKalendar = function () {
                    self.lista.removeAll();
                    self.dogadjajPKString("{\"idKalendara\": " + rootViewModel.idKalendara() + "}");
                    self.dogadjajPK(JSON.parse(self.dogadjajPKString()));
                    $.ajax({
                        url: "http://localhost:8083/consultations/fromTeachersCalendar?teacherId=" + rootViewModel.jmbgUlogovanogNastavnika() + "&calendarId=" + rootViewModel.idKalendara(),
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
                                        end: this.datumIVremeZavrsetka,
                                        dogadjajPK: this.dogadjajPK,
                                        color: 'red'
                                    });
                                } else {
                                    self.lista.push({
                                        title: 'Konsultacije',
                                        start: this.datumIVremePocetka,
                                        end: this.datumIVremeZavrsetka,
                                        dogadjajPK: this.dogadjajPK
                                    });
                                }
                            });
                            $('#calendar').fullCalendar('removeEvents');
                            $('#calendar').fullCalendar('addEventSource', self.lista());
                            $('#calendar').fullCalendar('refetchEvents');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Neuspesno odredjivanje tipa usera.");
                        }
                    });
                };
                self.dayClick = function (date, jsEvent, view) {
                    if (new Date() > new Date(date.format())) {

                    } else {
                        self.kliknutiDatum(date.format());
                        document.querySelector('#modalDialog3').open();
                    }

                };

                self.generisi = function () {
                    self.datumIVremePocetka(self.kliknutiDatum() + self.vremePocetka1());
                    self.datumIVremeZavrsetka(self.kliknutiDatum() + self.vremeZavrsetka1());
                    self.dodajKonsultaciju();
                    self.osveziKalendar();

                };

                self.dodajKonsultaciju = function () {
                    $.ajax({
                        url: "http://localhost:8083/consultations/add",
                        method: "POST",
                        async: false,
                        data: JSON.stringify(self.kreirajKonsultacije()),
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Sistem je zapamtio konsultacije");
                            document.querySelector('#dijalogPoruka').open();
                            self.osveziKalendar();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            rootViewModel.poruka("Sistem ne može da zapamti novi termin konsultacija");
                            document.querySelector('#dijalogPoruka').open();
                        }
                    });

                };
                self.kreirajKonsultacije = function ()
                {
                    return {
                        'eventPK': self.dogadjajPK(),
                        'startDateTime': self.datumIVremePocetka(),
                        'endDateTime': self.datumIVremeZavrsetka(),
                        'place': self.mestoOdrzavanja(),
                        'eventTypeId': tipDogadjaja,
                        'capacity': self.kapacitet(),
                        'numberOfScheduledCons': 0
                    };
                };
                self.eventClick = function (calEvent, jsEvent, view) {
                    document.querySelector('#popupEvent').open($(this));
                    self.dogadjajPrimarni(calEvent.dogadjajPK);
                    rootViewModel.vremePocetkaIzabranihKonsultacija(calEvent.start._i.toString().substring(11, 16));
                    rootViewModel.vremeZavrsetkaIzabranihKonsultacija(calEvent.end._i.toString().substring(11, 16));
                    rootViewModel.izabraniDatum(calEvent.start._d.toString().substring(4, 15));
                };

                self.detaljanPregled = function () {
                    rootViewModel.dogadjajPrimarni(self.dogadjajPrimarni());
                    oj.Router.rootInstance.go('konsultacijeZaDan');
                    konsultacijeZaDan.osveziTabelu();
                };
                self.otvoriDijalogZaBrisanje = function () {
                    document.querySelector('#izbrisiDijalog').open();
                };
                self.izbrisi = function () {
                    $.ajax({
                        url: " http://localhost:8083/consultations/delete?calendarId=" + self.dogadjajPrimarni().idKalendara + "&eventId=" + self.dogadjajPrimarni().idDogadjaja,
                        type: "DELETE",
                        async: false,
                        contentType: "application/json",
                        processData: false, // avoid the data being parsed to query string params
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Sistem je otkazao termin konsultacija.");
                            document.querySelector('#dijalogPoruka').open();

                        },
                        error: function (jqXHtus, errorThrown) {
                            rootViewModel.poruka("Sistem ne može da otkaže termin konsultacija.");
                            document.querySelector('#dijalogPoruka').open();
                        }
                    });
                    $.ajax({
                        url: " http://localhost:8083/sendMail?email=danen1995@gmail.com",
                        type: "GET",
                        async: false,
                        contentType: "application/json",
                        processData: false, // avoid the data being parsed to query string params
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Sistem je otkazao termin konsultacija.");
                            document.querySelector('#dijalogPoruka').open();
                            document.querySelector('#izbrisiDijalog').close();
                            self.osveziKalendar();


                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Neuspesno slanje emaila.");
                        }
                    });
                };
                self.daLiSuProsle = function (dogadjaj) {
                    if (new Date(dogadjaj.datumIVremePocetka) < new Date()) {
                        return true;
                    }
                    return false;
                };
            }
            return new KalendarDogadjajaViewModel();
        }
);
