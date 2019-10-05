/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'viewModels/kalendarDogadjaja', 'ojs/ojtimezonedata', 'ojs/ojmodel',
    'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojswitch', 'ojs/ojselectcombobox',
    'ojs/ojdatetimepicker', 'ojs/ojdialog'],
        function (oj, ko, $, kalendarDogadjaja) {
            function DogadjajiViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.datumIVremePocetka = ko.observable();
                self.datumIVremeZavrsetka = ko.observable();
                self.datumPocetka = ko.observable("");
                self.datumZavrsetka = ko.observable();
                self.vremePocetka = ko.observable();
                self.vremeZavrsetka = ko.observable();
                self.mestoOdrzavanja = ko.observable("");
                self.listaDatuma = ko.observableArray("");
                self.kapacitet = ko.observable(10);
                self.dani = ko.observableArray([""]);
                self.val = ko.observable("");
                self.username = rootViewModel.userLogin();
                self.kreirajKonsultacije = function ()
                {
                    var dogadjajPK = JSON.parse("{\"idKalendara\":" + rootViewModel.idKalendara() + "}");
                    var tipDogadjaja = JSON.parse("{\"idTipaDogadjaja\": 2}");
                    return {
                        'dogadjajPK': dogadjajPK,
                        'datumIVremePocetka': self.datumIVremePocetka(),
                        'datumIVremeZavrsetka': self.datumIVremeZavrsetka(),
                        'mestoOdrzavanja': self.mestoOdrzavanja(),
                        'idTipaDogadjaja': tipDogadjaja,
                        'kapacitet': self.kapacitet(),
                        'brojZakazanih': 0
                    };
                };
                self.validacija = function () {
                    var x = "uspesno";
                    if (self.val() == "" || self.datumPocetka() == "" || self.datumZavrsetka() == "" || self.vremePocetka() == "" || self.vremeZavrsetka() == "" || self.mestoOdrzavanja() == "" || self.kapacitet() == "") {
                        rootViewModel.poruka("Sva polja su obavezna");
                        document.querySelector('#dijalogPoruka').open();
                        x = "neuspesno";
                    }
                    if (new Date(self.datumPocetka()) > new Date(self.datumZavrsetka())) {
                        rootViewModel.poruka("Datum zavrsetka mora biti nakon datuma pocetka");
                        document.querySelector('#dijalogPoruka').open();
                        x = "neuspesno";
                    }

                    return (x == "uspesno");
                };
                self.generisi = function () {
                    if (self.validacija() == true) {
                        $.ajax({
                            url: "http://localhost:8083/konsultacije/ispis?datumOd=" + self.datumPocetka() + "&datumDo=" + self.datumZavrsetka() + "&dan=" + self.val(),
                            type: "GET",
                            async: false,
                            contentType: "application/json",
                            processData: false, // avoid the data being parsed to query string params
                            success: function (result, status, jqXHR) {
                                $.each(result, function () {
                                    self.listaDatuma.push(this);
                                    self.datumIVremePocetka(this + self.vremePocetka());
                                    self.datumIVremeZavrsetka(this + self.vremeZavrsetka());
                                    self.dodajKonsultaciju();
                                });
                                kalendarDogadjaja.osveziKalendar();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                rootViewModel.poruka("Greska!");
                                document.querySelector('#dijalogPoruka').open();
                            }
                        });
                    }
                };

                self.dodajKonsultaciju = function () {
                    $.ajax({
                        url: "http://localhost:8083/konsultacije/add",
                        method: "POST",
                        async: false,
                        data: JSON.stringify(self.kreirajKonsultacije()),
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Uspesno ste dodali konsultacije.");
                            document.querySelector('#dijalogPoruka').open();

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            rootViewModel.poruka("Neuspesno dodavanje konsultacije");
                            document.querySelector('#dijalogPoruka').open();
                        }
                    });
                };
            }
            return new DogadjajiViewModel();
        }
);
