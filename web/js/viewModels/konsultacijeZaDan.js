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
            function KonsultacijeZaDanViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.racuni = ko.observableArray();
                self.status = ko.observable("");
                self.studentKonsultacijePK = ko.observable();
                self.lista = ko.observableArray();
                self.opis = ko.observable();
                self.izabraniDatum = ko.observable();
                self.vremePocetkaIzabranihKons = ko.observable("");
                self.vremeZavrsetkaIzabranihKons = ko.observable("");
                self.dogadjajPrimarni = ko.observable();
                self.osveziTabelu = function () {
                    self.izabraniDatum(rootViewModel.izabraniDatum());
                    self.vremePocetkaIzabranihKons(rootViewModel.vremePocetkaIzabranihKonsultacija());
                    self.vremeZavrsetkaIzabranihKons(rootViewModel.vremeZavrsetkaIzabranihKonsultacija());
                    console.log(self.izabraniDatum());
                    self.lista.removeAll();
                    self.dogadjajPrimarni(rootViewModel.dogadjajPrimarni());
                    console.log(self.dogadjajPrimarni().idKalendara);
                    console.log(self.dogadjajPrimarni().idDogadjaja);
                    $.ajax({
                        url: " http://localhost:8083/zakazaneKonsultacije/getForEvent?idKalendara=" + self.dogadjajPrimarni().idKalendara + "&idDogadjaja=" + self.dogadjajPrimarni().idDogadjaja,
                        method: "GET",
                        async: false,
                        contentType: "application/json",
                        processData: false,
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
                            console.log('Greska u funkciji login: ' + textStatus);
                            console.log(jqXHR);
                            console.log(errorThrown);
                        }

                    });
                };

                self.listaPotrosaca = new oj.ArrayTableDataSource(
                        self.lista,
                        {idAttribute: 'studentKonsultacijePK'}
                );

                self.izbrisiKonsultacije = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    $.ajax({
                        url: " http://localhost:8083/zakazaneKonsultacije/izbrisi?idKalendara=1&idDogadjaja=2&brojIndeksaStudenta=2014/0044",
                        method: "DELETE",
                        async: false,
                        contentType: "application/json",
                        success: function (result, status, jqXHR) {
                            rootViewModel.poruka("Uspesno ste obrisali konsultacije. Obavestite studenta o tome.");
                            document.querySelector('#dijalogPoruka').open();
                            console.log(jqXHR)
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Greska u funkciji login: ' + textStatus);
                            rootViewModel.poruka("NeUspesno");
                            document.querySelector('#dijalogPoruka').open();
                            console.log(jqXHR);

                        }
                    });
                };
                self.postaviOpisIStatus = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    $.getJSON("http://localhost:8083/zakazaneKonsultacije/get?idKalendara=" + self.studentKonsultacijePK().idKalendara + "&idDogadjaja=" + self.studentKonsultacijePK().idDogadjaja + "&brojIndeksaStudenta=" + self.studentKonsultacijePK().brojIndeksaStudenta)
                            .fail(function (jqXHR, status, error) {
                                console.log("fejlovao je servis");
                                console.log(jqXHR);
                            }).then(function (student) {
                        student.status = self.status();
                        student.opis = self.opis();

                        $.ajax({
                            url: "http://localhost:8083/zakazaneKonsultacije/update",
                            method: "PUT",
                            async: false,
                            data: JSON.stringify(student),
                            contentType: "application/json",
                            success: function (result, status, jqXHR) {
                                rootViewModel.poruka("Uspešno ste postavili status i opis.");
                                document.querySelector('#dijalogPoruka').open();
                                self.osveziTabelu();
                                document.querySelector('#modalDialog3').close();

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                rootViewModel.poruka("NeUspesno");
                                document.querySelector('#dijalogPoruka').open();
                                console.log('Greska u funkciji login: ' + textStatus);
                            }

                        });
                    });

                };
                self.optionChange = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    self.studentKonsultacijePK(selectionObj[0].startKey.row);
                    document.querySelector('#modalDialog1').open();

                };
            }
            return new KonsultacijeZaDanViewModel();
        }
);
