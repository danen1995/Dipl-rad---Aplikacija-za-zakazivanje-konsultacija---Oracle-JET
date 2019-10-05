/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojTable', 'ojs/ojinputtext', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $) {
            function CustomerViewModel() {
                var self = this;
                self.brojIndeksa = ko.observable("");
                self.ime = ko.observable("");
                self.prezime = ko.observable("");
                self.godinaUpisa = ko.observable("");
                self.smer = ko.observable("");
                self.brojTelefona = ko.observable("");
                self.email = ko.observable("");
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                $.ajax({
                    url: "http://localhost:8083/student/getStudent?brojIndeksa=" + rootViewModel.brojIndeksaUlogovanogStudenta(),
                    method: "GET",
                    async: false,
                    contentType: "application/json",
                    success: function (result, status, jqXHR) {
                        var student = result;
                        self.brojIndeksa(student.brojIndeksa);
                        self.ime(student.ime);
                        self.prezime(student.prezime);
                        self.godinaUpisa(student.godinaUpisa);
                        self.smer(student.smer);
                        self.brojTelefona(student.brojTelefona);
                        self.email(student.email);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        rootViewModel.poruka("Sistem ne može da prikaže va[e podatke.");
                        document.querySelector('#dijalogPoruka').open();
                    }

                });

            }
            ;
            return new CustomerViewModel();
        }
);