/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout',
    'jquery', 'ojs/ojdatetimepicker', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojtimezonedata', 'ojs/ojmodel', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojswitch', 'ojs/ojcheckboxset', 'ojs/ojselectcombobox'],
        function (oj, ko, $) {
            function NastavnikoveKonsultacijeViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.racuni = ko.observableArray();
                self.status = ko.observable("odobreno");
                self.studentKonsultacijePK = ko.observable();
                self.lista = ko.observableArray();
                self.opis = ko.observable();
                self.osveziTabelu = function () {
                    self.lista.removeAll();
                    $.ajax({
                        url: " http://localhost:8083/scheduledConsultations/teacher?teacherId=" + rootViewModel.jmbgUlogovanogNastavnika(),
                        method: "GET",
                        async: false,
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            $.each(result, function () {
                                self.datumPocetka = ko.observable(this.konsultacije.datumIVremePocetka.substring(0, 10));
                                self.vremePocetka = ko.observable(this.konsultacije.datumIVremePocetka.substring(11, 19));
                                self.datumZavrsetka = ko.observable(this.konsultacije.datumIVremeZavrsetka.substring(0, 10));
                                self.vremeZavrsetka = ko.observable(this.konsultacije.datumIVremeZavrsetka.substring(11, 19));
                                self.lista.push({
                                    studentKonsultacijePK: this.studentKonsultacijePK,
                                    status: this.status,
                                    opis: this.opis,
                                    naslov: this.naslov,
                                    datum: self.datumPocetka(),
                                    vremePocetka: self.vremePocetka(),
                                    vremeZavrsetka: self.vremeZavrsetka(),
                                    mestoOdrzavanja: this.konsultacije.mestoOdrzavanja,
                                    student: this.student.ime + " " + this.student.brojIndeksa
                                });
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            rootViewModel.poruka("Sistem ne može da prikaže zakazane konsultacije.");
                            document.querySelector('#dijalogPoruka').open();
                        }
                    });
                };
                self.osveziTabelu();
                self.listaPotrosaca = new oj.ArrayTableDataSource(
                        self.lista,
                        {idAttribute: 'studentKonsultacijePK'}
                );

                self.izbrisiKonsultacije = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    $.ajax({
                        url: " http://localhost:8083/scheduledConsultations/delete?calendarId=1&eventId=2&indexNumber=2014/0044",
                        method: "DELETE",
                        async: false,
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Uspesno ste obrisali konsultacije. Obavestite studenta o tome.");
                            document.querySelector('#dijalogPoruka').open();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Greska u funkciji login: ' + textStatus);
                            rootViewModel.poruka("NEspesno");
                            document.querySelector('#dijalogPoruka').open();

                        }
                    });
                };
                self.postaviOpisIStatus = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    $.getJSON("http://localhost:8083/scheduledConsultations/get?calendarId=" + self.studentKonsultacijePK().idKalendara + "&eventId=" + self.studentKonsultacijePK().idDogadjaja + "&indexNumber=" + self.studentKonsultacijePK().brojIndeksaStudenta)
                            .fail(function (jqXHR, status, error) {
                                console.log("fejlovao je servis");
                                console.log(jqXHR);
                            }).then(function (student) {
                        student.status = self.status();
                        student.opis = self.opis();

                        $.ajax({
                            url: "http://localhost:8083/scheduledConsultations/update",
                            method: "PUT",
                            async: false,
                            data: JSON.stringify(student),
                            contentType: "application/json",
                            success: function (result, status, jqXHR) {
                                rootViewModel.poruka("Izmene su uspešno sačuvane.");
                                document.querySelector('#dijalogPoruka').open();
                                self.osveziTabelu();
                                document.querySelector('#modalDialog3').close();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                rootViewModel.poruka("Sistem nije sačuvao izmene.");
                                document.querySelector('#dijalogPoruka').open();
                                console.log('Greska u funkciji login: ' + textStatus);
                            }
                        });
                    });
                };

                self.downloadPrilog = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    window.open("http://localhost:8083/attachment/download?calendarId=" + self.studentKonsultacijePK().idKalendara + "&eventId=" + self.studentKonsultacijePK().idDogadjaja + "&indexNumber=" + self.studentKonsultacijePK().brojIndeksaStudenta, '_blank');
                };

                self.optionChange = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    document.querySelector('#modalDialog3').open();
                };
            }
            return new NastavnikoveKonsultacijeViewModel();
        }
);
