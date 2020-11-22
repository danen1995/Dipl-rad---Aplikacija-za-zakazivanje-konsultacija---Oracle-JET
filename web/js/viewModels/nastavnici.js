/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'viewModels/zakazivanjeKonsultacija2', 'ojs/ojavatar', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojlistview', 'ojs/ojpopup'],
        function (oj, ko, zakazivanjeKonsultacija2) {
            function NastavniciViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.filter = ko.observable("");
                self.currentItemId = ko.observable();
                self.slika = ko.observable("");
                self.lista = ko.observableArray();
                self.listaPotrosaca = new oj.ArrayTableDataSource(
                        self.lista,
                        {idAttribute: 'jmbg'}
                );
                this.dataProvider = new oj.ArrayDataProvider(self.lista, {'keyAttributes': 'jmbg'});
                self.osveziListu = function () {
                    self.lista.removeAll();
                    $.ajax({
                        url: "http://localhost:8083/teacher/getAll",
                        type: "GET",
                        async: false,
                        contentType: "application/json",
                        processData: false, // avoid the data being parsed to query string params
                        success: function (result, status, jqXHR) {
                            $.each(result, function () {
                                if ((this.ime + " " + this.prezime + " " + this.email).toLowerCase().includes(self.filter().toLowerCase())) {
                                    self.lista.push({
                                        jmbg: this.jmbg,
                                        ime: this.ime,
                                        prezime: this.prezime,
                                        email: this.email,
                                        brojTelefona: this.brojTelefona,
                                        kabinet: this.kabinet,
                                        slika: this.slika
                                    });
                                }
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Neuspesno odredjivanje tipa usera.");
                        }
                    });
                };

                self.listItemClickListener = function (event)
                {
                    var itemId = event.detail.value;
                    rootViewModel.izabraniNastavnikJmbg(itemId);
                    document.querySelector('#popupNastavnik').open(event.detail.value);

                };
                self.izaberiNastavnika = function ()
                {
                    oj.Router.rootInstance.go("zakazivanjeKonsultacija2");
                    zakazivanjeKonsultacija2.osveziKalendar();
                };
                self.handleRawValueChanged = function (event)
                {
                    self.filter(event.detail.value);
                    self.osveziListu();
                };
                self.osveziListu();
            }
            return new NastavniciViewModel();
        }
);
