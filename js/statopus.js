/**
 *
 * @author Zac Audette
 * @organization Wright State University
 * @license GNU General Public License v2.0
 *
**/
var statopus = new function() {
    var self = this;
    this.testkits = [];
    this.selectedTestkit = null;
    this.selectedLoci = null;
    this.selectedAlleles = [];

    // private variables
    this.runApp = function() {
        self.getTestKitsNames();
        self.launch();
    };

    this.launch = function() {
        // init nav home controles
        var homeNavButton = document.getElementById('homeNavButton');
        if (homeNavButton) {
            homeNavButton.addEventListener('click', function() {
                var home = document.getElementById('home');
                if (home) {
                    home.style.display = '';
                }
                var testkits = document.getElementById('testkits');
                if (testkits) {
                    testkits.style.display = 'none';
                }
                var lociAlleles = document.getElementById('lociAlleles');
                if (lociAlleles) {
                    lociAlleles.style.display = 'none';
                }
                var sampleCalculations = document.getElementById('sampleCalculations');
                if (sampleCalculations) {
                    sampleCalculations.style.display = 'none';
                }
            });
        }

        // init home controls
        var home = document.getElementById('home');
        if (home) {
            var homeButton = document.getElementById('homeButton');
            if (homeButton) {
                homeButton.addEventListener('click', function() {
                    var testkits = document.getElementById('testkits');
                    if (testkits) {
                        testkits.style.display = '';
                    }
                    var home = document.getElementById('home');
                    if (home) {
                        home.style.display = 'none';
                    }
                    var alleleTables = document.getElementById('alleleTables');
                    if (alleleTables) {
                        alleleTables.style.display = 'none';
                    }
                });
            }
        }

        // init the testkits controls
        var testkits = document.getElementById('testkits');
        if (testkits) {
            var testkitsBack = document.getElementById('testkitsBack');
            if (testkitsBack) {
                testkitsBack.addEventListener('click', function() {
                    var home = document.getElementById('home');
                    if (home) {
                        home.style.display = '';
                    }
                    testkits.style.display = 'none';
                });
            }
            var testkitsForward = document.getElementById('testkitsForward');
            if (testkitsForward) {
                testkitsForward.addEventListener('click', function() {
                    if (self.selectedTestkit === null) {
                        window.alert('Please select a test kit before moving on.');
                    }
                    else {
                        var lociAlleles = document.getElementById('lociAlleles');
                        if (lociAlleles) {
                            lociAlleles.style.display = '';
                        }
                        testkits.style.display = 'none';
                        self.loadLoci();
                    }
                });
            }
        }

        // init the lociAlleles controls
        var lociAlleles = document.getElementById('lociAlleles');
        if (lociAlleles) {
            var lociAllelesBack = document.getElementById('lociAllelesBack');
            if (lociAllelesBack) {
                lociAllelesBack.addEventListener('click', function() {
                    var testkits = document.getElementById('testkits');
                    if (testkits) {
                        testkits.style.display = '';
                    }
                    lociAlleles.style.display = 'none';
                });
            }
            var lociAllelesForward = document.getElementById('lociAllelesForward');
            if (lociAllelesForward) {
                lociAllelesForward.addEventListener('click', function() {
                    var alleleTables = document.getElementById('alleleTables');
                    if (alleleTables) {
                        alleleTables.style.display = '';
                    }
                    lociAlleles.style.display = 'none';
                });
            }
        }

        // init the lociAlleles controls
        var alleleTables = document.getElementById('alleleTables');
        if (alleleTables) {
            var alleleTablesBack = document.getElementById('alleleTablesBack');
            if (alleleTablesBack) {
                alleleTablesBack.addEventListener('click', function() {
                    var lociAlleles = document.getElementById('lociAlleles');
                    if (lociAlleles) {
                        lociAlleles.style.display = '';
                    }
                    alleleTables.style.display = 'none';
                });
            }
            var alleleTablesForward = document.getElementById('alleleTablesForward');
            if (alleleTablesForward) {
                alleleTablesForward.addEventListener('click', function() {
                    var sampleCalculations = document.getElementById('sampleCalculations');
                    if (sampleCalculations) {
                        sampleCalculations.style.display = '';
                    }
                    alleleTables.style.display = 'none';
                });
            }
        }

        // init the sampleCalculations controls
        var sampleCalculations = document.getElementById('sampleCalculations');
        if (sampleCalculations) {
            var sampleCalculationsBack = document.getElementById('sampleCalculationsBack');
            if (sampleCalculationsBack) {
                sampleCalculationsBack.addEventListener('click', function() {
                    var alleleTables = document.getElementById('alleleTables');
                    if (alleleTables) {
                        alleleTables.style.display = '';
                    }
                    sampleCalculations.style.display = 'none';
                });
            }
            var sampleCalculationsForward = document.getElementById('sampleCalculationsForward');
            if (sampleCalculationsForward) {
                sampleCalculationsForward.addEventListener('click', function() {
                    var home = document.getElementById('home');
                    if (home) {
                        home.style.display = '';
                    }
                    sampleCalculations.style.display = 'none';
                });
            }
            var runCalculationsButton = document.getElementById('runCalculationsButton');
            if (runCalculationsButton) {
                runCalculationsButton.addEventListener('click', function() {
                    var home = document.getElementById('home');
                    if (home) {
                        home.style.display = '';
                    }
                    runCalculationsButton.style.display = 'none';
                });
            }
        }
    };

    this.getTestKitsNames = function() {
        $.getJSON("../libs/test_kits_names.json", function(data) {
            self.getTestKits(data);
        });
    };

    this.getTestKits = function(data) {
        var filenames = data.filenames;
        var baseUrl = '../libs/test_kits/';
        for (file in filenames) {
            var url = baseUrl + filenames[file];
            $.getJSON(url, function(data) {
                self.testkits.push(data.testkit);
                self.addTestkitToPage(data.testkit);
            });
        }
    };

    this.addTestkitToPage = function(testkit) {
        var testKitsContainer = document.getElementById('testKitsContainer');
        if (testKitsContainer) {
            var button = document.createElement('button');
            button.id = testkit.NAME;
            button.className = 'col-md-3 btn btn-lg btn-success testkitsButtons';
            button.role = 'button';
            button.innerText = testkit.NAME;
            if (document.getElementById(testkit.NAME)) {
            }
            else {
                testKitsContainer.appendChild(button);
            }
            button.addEventListener('click', function() {
                if (self.selectedTestkit !== null) {
                    var testkitsButtons = document.getElementsByClassName('testkitsButtons');
                    if (testkitsButtons) {
                        var l = testkitsButtons.length;
                        for (var i = 0; i < l; i++) {
                            var testkitbutton = testkitsButtons[i];
                            testkitbutton.style.borderColor = '#388038';
                            testkitbutton.style.backgroundColor = '#5cb85c';
                        }
                    }

                    if (self.selectedTestkit === testkit.NAME) {
                        self.selectedTestkit = null;
                        button.style.borderColor = '#388038';
                        button.style.backgroundColor = '#5cb85c';
                    }
                    else {
                        self.selectedTestkit = testkit.NAME;
                        button.style.backgroundColor = '#388038';
                    }
                }
                else {
                    self.selectedTestkit = testkit.NAME;
                    button.style.backgroundColor = '#388038';
                }
            });
        }
    };

    this.loadLoci = function() {
        var testkit = null;
        var l = self.testkits.length;
        for (var i = 0; i < l; i++) {
            var kit = self.testkits[i];
            if (self.selectedTestkit === kit.NAME) {
                testkit = kit;
                break;
            }
        }

        var lociContainer = document.getElementById('lociContainer');
        var allelesContainer = document.getElementById('allelesContainer');
        // clear old loci and allele values
        lociContainer.innerHTML = '';
        allelesContainer.innerHTML = '';


        if (testkit.BLUE) {
            var locus = testkit.BLUE.LOCUS;
            for (loci in locus) {
                if (document.getElementById('loci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'loci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-primary lociButtons';
                button.role = 'button';
                button.innerText = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(5, this.id.length);
                    var alleles = locus[thisLoci];
                    if (self.selectedLoci !== null) {
                        var lociButtons = document.getElementsByClassName('lociButtons');
                        if (lociButtons) {
                            var l = lociButtons.length;
                            for (var i = 0; i < l; i++) {
                                var locibutton = lociButtons[i];
                                if (locibutton.classList.contains('btn-primary')) {
                                    locibutton.style.borderColor = '#2e6da4';
                                    locibutton.style.backgroundColor = '#337ab7';
                                }
                                if (locibutton.classList.contains('btn-success')) {
                                    locibutton.style.borderColor = '#388038';
                                    locibutton.style.backgroundColor = '#5cb85c';
                                }
                                if (locibutton.classList.contains('btn-danger')) {
                                    locibutton.style.borderColor = '#d43f3a';
                                    locibutton.style.backgroundColor = '#d9534f';
                                }
                                if (locibutton.classList.contains('btn-default')) {
                                    locibutton.style.borderColor = '#fff062';
                                    locibutton.style.backgroundColor = '#fff062';
                                }
                            }
                        }
                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#296293';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                    else {
                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#296293';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                });
            }
        }
        if (testkit.GREEN) {
            var locus = testkit.GREEN.LOCUS;
            for (loci in locus) {
                if (document.getElementById('loci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'loci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-success lociButtons';
                button.role = 'button';
                button.innerText = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(5, this.id.length);
                    if (self.selectedLoci !== null) {
                        var lociButtons = document.getElementsByClassName('lociButtons');
                        if (lociButtons) {
                            var l = lociButtons.length;
                            for (var i = 0; i < l; i++) {
                                var locibutton = lociButtons[i];
                                if (locibutton.classList.contains('btn-primary')) {
                                    locibutton.style.borderColor = '#2e6da4';
                                    locibutton.style.backgroundColor = '#337ab7';
                                }
                                if (locibutton.classList.contains('btn-success')) {
                                    locibutton.style.borderColor = '#388038';
                                    locibutton.style.backgroundColor = '#5cb85c';
                                }
                                if (locibutton.classList.contains('btn-danger')) {
                                    locibutton.style.borderColor = '#d43f3a';
                                    locibutton.style.backgroundColor = '#d9534f';
                                }
                                if (locibutton.classList.contains('btn-default')) {
                                    locibutton.style.borderColor = '#fff062';
                                    locibutton.style.backgroundColor = '#fff062';
                                }
                            }
                        }

                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#388038';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                    else {
                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#388038';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                });
            }
        }
        if (testkit.RED) {
            var locus = testkit.RED.LOCUS;
            for (loci in locus) {
                if (document.getElementById('loci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'loci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-danger lociButtons';
                button.role = 'button';
                button.innerText = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(5, this.id.length);
                    if (self.selectedLoci !== null) {
                        var lociButtons = document.getElementsByClassName('lociButtons');
                        if (lociButtons) {
                            var l = lociButtons.length;
                            for (var i = 0; i < l; i++) {
                                var locibutton = lociButtons[i];
                                if (locibutton.classList.contains('btn-primary')) {
                                    locibutton.style.borderColor = '#2e6da4';
                                    locibutton.style.backgroundColor = '#337ab7';
                                }
                                if (locibutton.classList.contains('btn-success')) {
                                    locibutton.style.borderColor = '#388038';
                                    locibutton.style.backgroundColor = '#5cb85c';
                                }
                                if (locibutton.classList.contains('btn-danger')) {
                                    locibutton.style.borderColor = '#d43f3a';
                                    locibutton.style.backgroundColor = '#d9534f';
                                }
                                if (locibutton.classList.contains('btn-default')) {
                                    locibutton.style.borderColor = '#fff062';
                                    locibutton.style.backgroundColor = '#fff062';
                                }
                            }
                        }

                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#a33e3b';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                    else {
                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#a33e3b';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                });
            }
        }
        if (testkit.YELLOW) {
            var locus = testkit.YELLOW.LOCUS;
            for (loci in locus) {
                if (document.getElementById('loci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'loci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-default yellow lociButtons';
                button.role = 'button';
                button.innerText = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(5, this.id.length);
                    if (self.selectedLoci !== null) {
                        var lociButtons = document.getElementsByClassName('lociButtons');
                        if (lociButtons) {
                            var l = lociButtons.length;
                            for (var i = 0; i < l; i++) {
                                var locibutton = lociButtons[i];
                                if (locibutton.classList.contains('btn-primary')) {
                                    locibutton.style.borderColor = '#2e6da4';
                                    locibutton.style.backgroundColor = '#337ab7';
                                }
                                if (locibutton.classList.contains('btn-success')) {
                                    locibutton.style.borderColor = '#388038';
                                    locibutton.style.backgroundColor = '#5cb85c';
                                }
                                if (locibutton.classList.contains('btn-danger')) {
                                    locibutton.style.borderColor = '#d43f3a';
                                    locibutton.style.backgroundColor = '#d9534f';
                                }
                                if (locibutton.classList.contains('btn-default')) {
                                    locibutton.style.borderColor = '#fff062';
                                    locibutton.style.backgroundColor = '#fff062';
                                }
                            }
                        }

                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#b5af2b';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                    else {
                        self.selectedLoci = thisLoci;
                        this.style.backgroundColor = '#b5af2b';
                        this.style.borderColor = '#ffffff';
                        self.loadAlleles(thisLoci);
                    }
                });
            }
        }
    };

    this.loadAlleles = function(loci) {
        var testkit = null;
        var alleles = null;
        // determine which group of alleles to render
        var l = self.testkits.length;
        for (var i = 0; i < l; i++) {
            var kit = self.testkits[i];
            if (self.selectedTestkit === kit.NAME) {
                testkit = kit;
                break;
            }
        }

        var locus = null;
        if (testkit.BLUE) {
            var l = testkit.BLUE.LOCUS;
            if (l[loci] !== undefined) {
                alleles = l[loci];
                locus = l;
            }
        }
        if (testkit.GREEN) {
            var l = testkit.GREEN.LOCUS;
            if (l[loci] !== undefined) {
                alleles = l[loci];
                locus = l;
            }
        }
        if (testkit.RED) {
            var l = testkit.RED.LOCUS;
            if (l[loci] !== undefined) {
                alleles = l[loci];
                locus = l;
            }
        }
        if (testkit.YELLOW) {
            var l = testkit.YELLOW.LOCUS;
            if (l[loci] !== undefined) {
                alleles = l[loci];
                locus = l;
            }
        }

        var allelesContainer = document.getElementById('allelesContainer');
        var alleleLociContainer = document.getElementById('loci' + loci + '_alleles');
        var alleleLociClass = document.getElementsByClassName('alleleLociClass');
        var l = alleleLociClass.length;
        for (var i = 0; i < l; i++) {
            var alc = alleleLociClass[i];
            alc.style.display = 'none';
        }
        if (alleleLociContainer) {
            alleleLociContainer.style.display = '';
        }
        else {
            var span = document.createElement('span');
            span.id = 'loci' + loci + '_alleles';
            span.className = 'alleleLociClass';
            allelesContainer.appendChild(span);
            for (allele in alleles) {
                var button = document.createElement('button');
                button.id = 'alleles_' + allele;
                button.className = 'col-md-3 btn btn-lg btn-success allelesButtons';
                button.role = 'button';
                button.innerText = allele;
                button.setAttribute('alleleValue', allele);
                button.setAttribute('lociValue', loci);
                button.setAttribute('selected', 'false');
                span.appendChild(button);
                button.addEventListener('click', function() {
                    var l = self.selectedAlleles.length;
                    var previouslySelected = false;
                    var index = null;
                    if (l > 0) {
                        for (var i = 0; i < l; i++) {
                            var selectedAllele = self.selectedAlleles[i];
                            if (selectedAllele.allele === this.getAttribute('alleleValue')) {
                                previouslySelected = true;
                                index = i;
                                break;
                            }
                        }
                        if (previouslySelected) {
                            this.style.borderColor = '#4cae4c';
                            this.style.backgroundColor = '#5cb85c';
                            this.setAttribute('selected', 'false');
                            self.selectedAlleles.splice(index, 1);
                        }
                        else {
                            var a = {
                                loci: this.getAttribute('lociValue'),
                                allele: this.getAttribute('alleleValue')
                            };
                            self.selectedAlleles.push(a);
                            this.setAttribute('selected', 'true');
                            this.style.backgroundColor = '#388038';
                            this.style.borderColor = '#ffffff';
                        }
                    }
                    else {
                        var a = {
                            loci: this.getAttribute('lociValue'),
                            allele: this.getAttribute('alleleValue')
                        };
                        self.selectedAlleles.push(a);
                        this.setAttribute('selected', 'true');
                        this.style.backgroundColor = '#388038';
                        this.style.borderColor = '#ffffff';
                    }
                });
            }
        }
    };
};
statopus.runApp();
