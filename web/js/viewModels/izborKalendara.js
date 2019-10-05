/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'viewModels/kalendarDogadjaja', 'ojs/ojtimezonedata', 'ojs/ojmodel',
    'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojswitch', 'ojs/ojselectcombobox',
    'ojs/ojdatetimepicker'],
        function (oj, ko, $, kalendarDogadjaja) {
            function IzborKalendaraViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.lista = ko.observableArray();
                self.idKalendara = ko.observable();
                self.osveziTabelu = function () {
                    self.lista.removeAll();
                    $.getJSON("http://localhost:8083/kalendar/zaNastavnika?jmbg=" + rootViewModel.jmbgUlogovanogNastavnika()).
                            then(function (movies) {
                                $.each(movies, function () {
                                    self.lista.push({
                                        all: this.idKalendara + this.idSkolskeGodine.skolskaGodina + " " + this.idSkolskeGodine.semestar,
                                        idKalendara: this.idKalendara,
                                        skGodina: this.idSkolskeGodine.skolskaGodina,
                                        semestar: this.idSkolskeGodine.semestar
                                    });
                                });
                            });
                };
                self.osveziTabelu();
                self.listaPotrosaca = new oj.ArrayTableDataSource(
                        self.lista,
                        {idAttribute: 'all'}
                );
                self.optionChange = function () {
                    var selectionObj = $("#table").ojTable("option", "selection");
                    rootViewModel.idKalendara(selectionObj[0].startKey.row.toString().slice(0, -14));
                    document.querySelector('#modalDialog1').open();
                    rootViewModel.izabraniKalendar(selectionObj[0].startKey.row.toString().slice(-14));
                    kalendarDogadjaja.osveziKalendar();
                    var navData = [
                        {name: 'Skolska godina', id: 'izborKalendara',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                        {name: 'Generator konsultacija', id: 'dogadjaji',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                        {name: 'Kalendar', id: 'kalendarDogadjaja',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                        {name: 'Zakazane konsultacije', id: 'nastavnikoveKonsultacije',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}
                    ];
                    rootViewModel.navDataSource.reset(navData, {idAttribute: 'id'});
                    self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
                    oj.Router.rootInstance.go('kalendarDogadjaja');
                };
                self.prikaziKalendar = function () {
                    oj.Router.rootInstance.go('kalendarDogadjaja');
                    kalendarDogadjaja.osveziKalendar();
                };
            }
            return new IzborKalendaraViewModel();
        }
);
