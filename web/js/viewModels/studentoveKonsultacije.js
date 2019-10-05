/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout',
    'jquery', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojmodel', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojswitch', 'ojs/ojcheckboxset'],
        function (oj, ko, $) {
            function StudentoveKonsultacijeViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.racuni = ko.observableArray();
                self.lista = ko.observableArray();
                self.studentKonsultacijePK = ko.observable();
                self.osveziTabelu = function () {
                    self.lista.removeAll();
                    $.getJSON("http://localhost:8083/zakazaneKonsultacije/zaStudenta?brojIndeksa=" + rootViewModel.brojIndeksaUlogovanogStudenta()).
                            then(function (movies) {
                                $.each(movies, function () {
                                    self.datumPocetka = ko.observable(this.konsultacije.datumIVremePocetka.substring(0, 10));
                                    self.vremePocetka = ko.observable(this.konsultacije.datumIVremePocetka.substring(11, 19));
                                    self.datumZavrsetka = ko.observable(this.konsultacije.datumIVremeZavrsetka.substring(0, 10));
                                    self.vremeZavrsetka = ko.observable(this.konsultacije.datumIVremeZavrsetka.substring(11, 19));
                                    self.lista.push({
                                        studentKonsultacijePK: this.studentKonsultacijePK,
                                        naslov: this.naslov,
                                        datum: self.datumPocetka(),
                                        vremePocetka: self.vremePocetka(),
                                        vremeZavrsetka: self.vremeZavrsetka(),
                                        mestoOdrzavanja: this.konsultacije.mestoOdrzavanja,
                                        nastavnik: this.konsultacije.kalendar.nastavnik.ime + " " + this.konsultacije.kalendar.nastavnik.prezime,
                                        status: this.status,
                                        opis: this.opis
                                    });
                                });
                            });
                };
                self.listaPotrosaca = new oj.ArrayTableDataSource(
                        self.lista,
                        {idAttribute: 'studentKonsultacijePK'}
                );
                self.tableRowClick = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    document.querySelector('#popupOtkazi').open();
                };
                self.otkazi = function () {
                    $.ajax({
                        url: " http://localhost:8083/zakazaneKonsultacije/izbrisi?idKalendara=" + self.studentKonsultacijePK().idKalendara + "&idDogadjaja=" + self.studentKonsultacijePK().idDogadjaja + "&brojIndeksaStudenta=" + rootViewModel.brojIndeksaUlogovanogStudenta(),
                        method: "DELETE",
                        async: false,
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Sistem je obrisao zakazane konsultacije.");
                            document.querySelector('#dijalogPoruka').open();
                            self.osveziTabelu();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            rootViewModel.poruka("Sistem ne moze da obriše zakazane konsultacije.");
                            document.querySelector('#dijalogPoruka').open();
                        }
                    });
                };
                self.osveziTabelu();

            }
            return new StudentoveKonsultacijeViewModel();
        }
);
