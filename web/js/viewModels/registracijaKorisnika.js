/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'viewModels/login', 'jquery', 'ojs/ojmodel',
    'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojcollectiontabledatasource'],
        function (oj, ko, login) {
            function RegKorViewModel() {
                var self = this;
                ;

                self.idKorisnika = ko.observable("");
                self.korisnickoIme = ko.observable("");
                self.lozinka = ko.observable("");
                self.student = ko.observable("");
                self.brojIndeksa = ko.observable("");
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.sviNalozi = 'http://localhost:8083/register';
                self.collection = new oj.Collection(null, {
                    url: self.sviNalozi,
                    fetchSize: 10,
                    model: new oj.Model.extend({
                        idAttribute: 'korisnickoIme'
                    })
                });

                self.registracijaKorisnika = function ()
                {
                    $.getJSON("http://localhost:8083/student/getStudent?brojIndeksa=" + self.brojIndeksa()).fail(function (jqXHR, status, error) {
                        console.log(jqXHR);
                        document.getElementById('divError').innerHTML = "Student sa tim brojem indeksa ne postoji!";
                        document.getElementById('divError').style.display = "block";
                    }).then(function (student) {
                        self.student(student);
                        console.log(self.kreirajKorisnika());
                        self.collection.create(self.kreirajKorisnika(), {
                            wait: true,
                            contentType: 'application/json',
                            success: function (response) {
                                self.collection.refresh();
                                rootViewModel.poruka("Uspešno ste se registrovali.");
                                document.querySelector('#dijalogPoruka').open();
                                oj.Router.rootInstance.go('login');
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                rootViewModel.poruka("Neuspesno.");
                                document.querySelector('#dijalogPoruka').open();
                                console.log('Error in Create: ' + textStatus);
                                console.log(jqXHR);
                                document.getElementById('divError').innerHTML = jqXHR.responseText;
                                document.getElementById('divError').style.display = "block";
                            }
                        });
                    });
                };
                self.kreirajKorisnika = function ()
                {
                    return {
                        'korisnickoIme': self.korisnickoIme(),
                        'lozinka': self.lozinka(),
                        'nastavnik': null,
                        'student': self.student()
                    };
                };
            }
            return new RegKorViewModel();
        }
);
