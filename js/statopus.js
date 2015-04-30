/**
 *
 * @author Zac Audette
 * @organization Wright State University
 * @license GNU General Public License v2.0
 *
 * All questions can be sent to the author at zaudette14@gmail.com
**/
var statopus = new function() {
    var self = this;
    this.testkits = [];
    this.finalTestkit = null;
    this.alleletables = [];
    this.selectedTestkit = null;
    this.selectedAlleleTables = [];
    this.selectedLoci = null;
    this.selectedAlleles = [];
    this.randomMatchProbability = false;
    this.combinedProbability = false;
    this.thetaValue = 0.01;
    this.userName = '';
    this.sampleName = '';
    this.closeRelatives = '';
    this.randomMatchResults = [];
    this.combinedMatchResults = [];
    this.currentTable = null;

    this.runApp = function() {
        self.getTestKitsNames();
        self.getAlleleTableNames();
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
                var sampleResults = document.getElementById('sampleResults');
                if (sampleResults) {
                    sampleResults.style.display = 'none';
                    var resultsWrapper = document.getElementById('resultsWrapper');
                    if (resultsWrapper) {
                        resultsWrapper.innerHTML = '';
                    }
                    self.selectedTestkit = null;
                    self.selectedAlleleTables = [];
                    self.selectedLoci = null;
                    self.selectedAlleles = [];
                    self.randomMatchProbability = false;
                    self.combinedProbability = false;
                    self.thetaValue = 0.01;
                    self.userName = '';
                    self.sampleName = '';
                    self.closeRelatives = '';
                    self.randomMatchResults = [];
                    self.combinedMatchResults = [];
                    self.currentTable = null;
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
                    if (self.selectedAlleleTable === null) {
                        window.alert('Please select at least on allele table before moving on.');
                    }
                    else {
                        var sampleCalculations = document.getElementById('sampleCalculations');
                        if (sampleCalculations) {
                            sampleCalculations.style.display = '';
                            var hideRMP = self.hideRmpAndCloseRelativesIfNeeded();
                            if (hideRMP) {
                                var randomProb = document.getElementById('randomProb');
                                if (randomProb) {
                                    randomProb.disabled = true;
                                }
                                var closeRelative = document.getElementById('closeRelative');
                                if (closeRelative) {
                                    closeRelative.disabled = true;
                                }
                            }
                            else {
                                var randomProb = document.getElementById('randomProb');
                                if (randomProb) {
                                    randomProb.disabled = false;
                                }
                                var closeRelative = document.getElementById('closeRelative');
                                if (closeRelative) {
                                    closeRelative.disabled = false;
                                }
                            }
                        }
                        alleleTables.style.display = 'none';
                    }
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
            var runCalculationsButton = document.getElementById('runCalculationsButton');
            if (runCalculationsButton) {
                runCalculationsButton.addEventListener('click', function() {
                    var sampleResults = document.getElementById('sampleResults');
                    if (sampleResults) {
                        sampleResults.style.display = '';
                    }
                    self.runCalculations();
                    sampleCalculations.style.display = 'none';
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
            button.innerHTML = testkit.NAME;
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

                    if (self.selectedTestkit === this.id) {
                        self.selectedTestkit = null;
                        this.style.borderColor = '#388038';
                        this.style.backgroundColor = '#5cb85c';
                    }
                    else {
                        self.selectedTestkit = this.id;
                        this.style.backgroundColor = '#388038';
                        this.style.borderColor = '#ffffff';
                    }
                }
                else {
                    self.selectedTestkit = this.id;
                    this.style.backgroundColor = '#388038';
                    this.style.borderColor = '#ffffff';
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
                self.finalTestkit = testkit;
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
                if (document.getElementById('bloci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'bloci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-primary lociButtons';
                button.role = 'button';
                button.innerHTML = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(6, this.id.length);
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
                if (document.getElementById('gloci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'gloci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-success lociButtons';
                button.role = 'button';
                button.innerHTML = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(6, this.id.length);
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
        if (testkit.YELLOW) {
            var locus = testkit.YELLOW.LOCUS;
            for (loci in locus) {
                if (document.getElementById('yloci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'yloci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-default yellow lociButtons';
                button.role = 'button';
                button.innerHTML = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(6, this.id.length);
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
        if (testkit.RED) {
            var locus = testkit.RED.LOCUS;
            for (loci in locus) {
                if (document.getElementById('rloci_' + loci)) {
                    continue;
                }
                var button = document.createElement('button');
                button.id = 'rloci_' + loci;
                button.className = 'col-md-3 btn btn-lg btn-danger lociButtons';
                button.role = 'button';
                button.innerHTML = loci;
                lociContainer.appendChild(button);
                button.addEventListener('click', function() {
                    var thisLoci = this.id.substr(6, this.id.length);
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
                button.innerHTML = allele;
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
                            if (selectedAllele.allele === this.getAttribute('alleleValue') && selectedAllele.loci === this.getAttribute('lociValue')) {
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

    this.getAlleleTableNames = function() {
        $.getJSON("../libs/allele_table_names.json", function(data) {
            self.getAlleleTables(data);
        });
    };

    this.getAlleleTables = function(data) {
        var filenames = data.filenames;
        var baseUrl = '../libs/allele_tables/';
        for (file in filenames) {
            var url = baseUrl + filenames[file];
            $.getJSON(url, function(data) {
                self.alleletables.push(data.data);
                self.addAlleleTableToPage(data.data);
            });
        }
    };

    this.addAlleleTableToPage = function(table) {
        var alleleTablesContainer = document.getElementById('alleleTablesContainer');
        if (alleleTablesContainer) {
            var button = document.createElement('button');
            button.id = table.name;
            button.className = 'col-md-3 btn btn-lg btn-success alleleTablesButtons';
            button.role = 'button';
            button.innerHTML = table.name;
            if (document.getElementById(table.name)) {
            }
            else {
                alleleTablesContainer.appendChild(button);
            }
            button.addEventListener('click', function() {
                var l = self.selectedAlleleTables.length;
                var inListAlready = false;
                if (l > 0) {
                    var index = null;
                    for (var i = 0; i < l; i++) {
                        var selectedAlleleTable = self.selectedAlleleTables[i];
                        if (selectedAlleleTable === this.id) {
                            inListAlready = true;
                            index = i;
                            break;
                        }
                    }
                    if (inListAlready) {
                        self.selectedAlleleTables.splice(index, 1);
                        this.style.borderColor = '#388038';
                        this.style.backgroundColor = '#5cb85c';
                    }
                    else {
                        self.selectedAlleleTables.push(this.id);
                        this.style.backgroundColor = '#388038';
                        this.style.borderColor = '#ffffff';
                    }
                }
                else {
                    self.selectedAlleleTables.push(this.id);
                    this.style.backgroundColor = '#388038';
                    this.style.borderColor = '#ffffff';
                }
            });
        }
    };

    this.runCalculations = function() {
        var sampleName = document.getElementById('sampleName');
        if (sampleName) {
            self.sampleName = sampleName.value;
        }
        var userName = document.getElementById('userName');
        if (userName) {
            self.userName = userName.value;
        }
        var thetaValue = document.getElementById('thetaValue');
        if (thetaValue) {
            self.thetaValue = thetaValue.value;
        }
        var closeRelative = document.getElementById('closeRelative');
        if (closeRelative) {
            self.closeRelatives = closeRelative.value;
        }
        var combinedProb = document.getElementById('combinedProb');
        if (combinedProb.checked) {
            self.combinedProbability = true;
        }
        var randomProb = document.getElementById('randomProb');
        if (randomProb.checked) {
            self.randomMatchProbability = true;
        }

        if (self.randomMatchProbability) {
            self.runRandomMatchCalculations();
        }

        if(self.combinedProbability) {
            self.runCombinedCalculations();
        }
        self.displayResults();
    };

    this.runRandomMatchCalculations = function() {
        var testkit = self.finalTestkit;
        var satl = self.selectedAlleleTables.length;
        for (var s = 0; s < satl; s++) {
            var table = self.getTableByName(self.selectedAlleleTables[s]);
            self.currentTable = table;
            var result = {
                table: table
            };
            result.loci = [];
            if(testkit.BLUE) {
                var locus = testkit.BLUE.LOCUS;
                for(loci in locus) {
                    var loc = {
                        locus: loci
                    };
                    loc.alleles = [];
                    var l = self.selectedAlleles.length;
                    for(var i = 0; i < l; i++) {
                        var allele = self.selectedAlleles[i];
                        if(loci === allele.loci) {
                            loc.alleles.push(allele);
                        }
                    }
                    self.randomIndividualMatchCalculation(loc, this.result);
                    result.loci.push(loc);
                }
            }
            if(testkit.GREEN) {
                var locus = testkit.GREEN.LOCUS;
                for (loci in locus) {
                    var loc = {
                        locus: loci
                    };
                    loc.alleles = [];
                    var l = self.selectedAlleles.length;
                    for(var i = 0; i < l; i++) {
                        var allele = self.selectedAlleles[i];
                        if(loci === allele.loci) {
                            loc.alleles.push(allele);
                        }
                    }
                    self.randomIndividualMatchCalculation(loc);
                    result.loci.push(loc);
                }
            }
            if(testkit.YELLOW) {
                var locus = testkit.YELLOW.LOCUS;
                for(loci in locus) {
                    var l = self.selectedAlleles.length;
                    for (var i = 0; i < l; i++) {
                        var loc = {
                            locus: loci
                        };
                        loc.alleles = [];
                        var l = self.selectedAlleles.length;
                        for(var i = 0; i < l; i++) {
                            var allele = self.selectedAlleles[i];
                            if(loci === allele.loci) {
                                loc.alleles.push(allele);
                            }
                        }
                        self.randomIndividualMatchCalculation(loc);
                        result.loci.push(loc);
                    }
                }
            }
            if(testkit.RED) {
                var locus = testkit.RED.LOCUS;
                for(loci in locus) {
                    var loc = {
                        locus: loci
                    };
                    loc.alleles = [];
                    var l = self.selectedAlleles.length;
                    for(var i = 0; i < l; i++) {
                        var allele = self.selectedAlleles[i];
                        if(loci === allele.loci) {
                            loc.alleles.push(allele);
                        }
                    }
                    self.randomIndividualMatchCalculation(loc);
                    result.loci.push(loc);
                }
            }

            // calcualte the total likelihood
            var length = result.loci.length;
            var likelihood = 1;
            for (var i = 0; i < length; i++) {
                var p = result.loci[i].p;
                if (p !== null) {
                    likelihood = likelihood * p;
                }
            }
            result.likelihood = likelihood;
            result.oneInN = 1.0 / likelihood;
            result.tableName = table.name;
            self.randomMatchResults.push(result);
        }
    };

    this.randomIndividualMatchCalculation = function(locus) {
        var allelesCount = locus.alleles.length;
        // homozygote
        if (allelesCount === 1) {
            var f = self.getFrequency(locus.alleles[0]);
            locus.alleles[0].frequency = f;
            switch(self.closeRelatives) {
                case 'siblings':
                    var partOne = (1 + f) * (1 + f);
                    var partTwo = (7 + (7 * f) - ((2 * f) * (2 * f))) * self.thetaValue;
                    var partThree = (16 - (9 * f) + (f * f)) * (self.thetaValue * self.thetaValue);
                    var partFour = (2 * (1 + self.thetaValue) * (1 + (2 * self.thetaValue)));
                    var p = (partOne + partTwo + partThree) / partFour;
                    locus.p = p;
                    break;
                case 'halfSiblings':
                    var partOne = ((2 * self.thetaValue) + ((1 - self.thetaValue) * f));
                    var partTwo = (2 + (4 * self.thetaValue) + ((1 - self.thetaValue) * f));
                    var partThree = (2 * (1 + self.thetaValue) * (1 + (2 * self.thetaValue)));
                    var p = (partOne * partTwo) / partThree;
                    locus.p = p;
                    break;
                case 'parentChild':
                    var partOne = (2 * self.thetaValue) + ((1 - self.thetaValue) * f);
                    var partTwo = (1 - self.thetaValue);
                    var p = partOne / partTwo;
                    locus.p = p;
                    break;
                case 'firstCousins':
                    var partOne = (2 * self.thetaValue) + ((1 - self.thetaValue) * f);
                    var partTwo = (2 + (11 * self.thetaValue) + (3 * ((1 - self.thetaValue) * f)));
                    var partThree = (4 * (1 + self.thetaValue) * (1 + (2 * self.thetaValue)));
                    var p = (partOne * partTwo) / partThree;
                    locus.p = p;
                    break;
                case 'none':
                default:
                    var p = (f * f) + f * (1 - f) * self.thetaValue;
                    locus.p = p;
                    break;
            }
        }
        else if (allelesCount > 1) { // heterozygote
            var a1 = locus.alleles[0];
            var fp = self.getFrequency(a1);
            locus.alleles[0].frequency = fp;
            var a2 = locus.alleles[1];
            var fq = self.getFrequency(a2);
            locus.alleles[1].frequency = fq;
            switch(self.closeRelatives) {
                case 'siblings':
                    var partOne = (1 + fp + fq + (2 * fp * fq));
                    var partTwo = (5 + (3 * fp) + (3 * fq) - (4 * fp * fq)) * self.thetaValue;
                    var partThree = (2 * (4 - (2 * fp) - (2 * fq) + (fp * fq)) * (self.thetaValue * self.thetaValue));
                    var partFour = (4 * (1 + self.thetaValue) * (1 + (2 * self.thetaValue)));
                    var p = (partOne + partTwo + partThree) / partFour;
                    locus.p = p;
                    break;
                case 'halfSiblings':
                    var partOne = (fp + fq + (4 * fp * fq));
                    var partTwo = (2 + (5 * fp) + (5 * fq) + (8 * fp * fq)) * self.thetaValue;
                    var partThree = (8 - (6 * fp) - (6 * fq) + (4 * fp * fq)) * (self.thetaValue * self.thetaValue);
                    var partFour = 4 * (1 + self.thetaValue) * (1 * (2 * self.thetaValue));
                    var p = (partOne + partTwo + partThree) / partFour;
                    locus.p = p;
                    break;
                case 'parentChild':
                    var partOne = (2 * self.thetaValue);
                    var partTwo = (1 - self.thetaValue);
                    var partThree = (fp + fq);
                    var partFour = (2 * (1 + self.thetaValue));
                    var p = (partOne + (partTwo * partThree)) / partFour;
                    locus.p = p;
                    break;
                case 'firstCousins':
                    var partOne = (fp + fq + (12 * fp * fq));
                    var partTwo = (2 + (13 * fp) + (13 * fq) - (24 * fp * fq)) * self.thetaValue;
                    var partThree = 2 * (8 - (7 * fp) - (7 * fq) + (6 * fp * fq)) * (self.thetaValue * self.thetaValue);
                    var partFour = 8 * (1 + self.thetaValue) * (1 * (2 * self.thetaValue));
                    var p = (partOne + partTwo + partThree) / partFour;
                    locus.p = p;
                    break;
                case 'none':
                default:
                    var p = 2 * (fp * fq) * (1 - self.thetaValue);
                    locus.p = p;
                    break;
            }
        }
        else {
            locus.p = null;
        }
    }

    this.runCombinedCalculations = function(locus) {
        var testkit = self.finalTestkit;
        var satl = self.selectedAlleleTables.length;
        for (var s = 0; s < satl; s++) {
            var table = self.getTableByName(self.selectedAlleleTables[s]);
            self.currentTable = table;
            var result = {
                table: table
            };
            result.loci = [];
            if(testkit.BLUE) {
                var locus = testkit.BLUE.LOCUS;
                for(loci in locus) {
                    var loc = {
                        locus: loci
                    };
                    loc.alleles = [];
                    var l = self.selectedAlleles.length;
                    for(var i = 0; i < l; i++) {
                        var allele = self.selectedAlleles[i];
                        if(loci === allele.loci) {
                            loc.alleles.push(allele);
                        }
                    }
                    self.individualCombinedCalculation(loc);
                    result.loci.push(loc);
                }
            }
            if(testkit.GREEN) {
                var locus = testkit.GREEN.LOCUS;
                for (loci in locus) {
                    var loc = {
                        locus: loci
                    };
                    loc.alleles = [];
                    var l = self.selectedAlleles.length;
                    for(var i = 0; i < l; i++) {
                        var allele = self.selectedAlleles[i];
                        if(loci === allele.loci) {
                            loc.alleles.push(allele);
                        }
                    }
                    self.individualCombinedCalculation(loc);
                    result.loci.push(loc);
                }
            }
            if(testkit.YELLOW) {
                var locus = testkit.YELLOW.LOCUS;
                for(loci in locus) {
                    var l = self.selectedAlleles.length;
                    for (var i = 0; i < l; i++) {
                        var loc = {
                            locus: loci
                        };
                        loc.alleles = [];
                        var l = self.selectedAlleles.length;
                        for(var i = 0; i < l; i++) {
                            var allele = self.selectedAlleles[i];
                            if(loci === allele.loci) {
                                loc.alleles.push(allele);
                            }
                        }
                        self.individualCombinedCalculation(loc);
                        result.loci.push(loc);
                    }
                }
            }
            if(testkit.RED) {
                var locus = testkit.RED.LOCUS;
                for(loci in locus) {
                    var loc = {
                        locus: loci
                    };
                    loc.alleles = [];
                    var l = self.selectedAlleles.length;
                    for(var i = 0; i < l; i++) {
                        var allele = self.selectedAlleles[i];
                        if(loci === allele.loci) {
                            loc.alleles.push(allele);
                        }
                    }
                    self.individualCombinedCalculation(loc);
                    result.loci.push(loc);
                }
            }

            // calcualte the total likelihood
            var length = result.loci.length;
            var likelihood = 1;
            for (var i = 0; i < length; i++) {
                var p = result.loci[i].p;
                if (p !== null) {
                    likelihood = likelihood * p;
                }
            }
            result.likelihood = likelihood;
            result.oneInN = 1.0 / likelihood;
            result.tableName = table.name;
            self.combinedMatchResults.push(result);
        }
    };

    this.individualCombinedCalculation = function(locus) {
        var allelesCount = locus.alleles.length;
        if (allelesCount > 0) {
            var fsum = 0;
            for (var i = 0; i < allelesCount; i++) {
                var f = self.getFrequency(locus.alleles[i]);
                locus.alleles[i].frequency = f;
                fsum = fsum + f;
            }
            var p = (fsum * fsum) + ((fsum * (1 - fsum)) * self.thetaValue);
            locus.p = p;
        }
        else {
            locus.p = null;
        }
    };

    this.getFrequency = function(a) {
        var frequency = 0.01;
        var table = self.currentTable.table;
        var loci = table[a.loci];
        var alleles = table[a.loci].data.alleles;
        var allele = alleles[a.allele];
        if (allele) {
            frequency = allele.data.frequency;
        }
        else {
            var minF = 10;
            l = alleles.length;
            for (a in alleles) {
                var f = alleles[a].data.frequency;
                if (f < minF) {
                    minF = f;
                }
            }
            if (minF < 10) {
                frequency = minF;
            }
            else {
                frequency = 0.01;
            }
        }
        return frequency;
    };

    this.getTableByName = function(name) {
        var table = null;
        var length = self.alleletables.length;
        for (var a = 0; a < length; a++) {
            var t = self.alleletables[a];
            if (t.name === name) {
                table = t;
                break;
            }
        }
        return table;
    };

    this.displayResults = function() {
        var resultsWrapper = document.getElementById('resultsWrapper');
        var sampleResults = document.getElementById('sampleResults');
        var sampleCalculations = document.getElementById('sampleCalculations');
        if (sampleCalculations) {
            sampleCalculations.style.display = 'none';
        }
        var sampleResultsBack = document.getElementById('sampleResultsBack');
        if (sampleResultsBack) {
            sampleResultsBack.addEventListener('click', function() {
                if (confirm('Are you sure you want to go back to the Sample Calculations page? All current sample results will be lost.')) {
                    self.combinedMatchResults = [];
                    self.randomMatchResults = [];
                    sampleResults.style.display = 'none';
                    var resultsWrapper = document.getElementById('resultsWrapper');
                    if (resultsWrapper) {
                        resultsWrapper.innerHTML = '';
                    }
                    sampleCalculations.style.display = '';
                }
            });
        }

        // start to display results
        if (self.selectedTestkit.length > 0) {
            var p = document.createElement('p');
            p.className = 'resultsP';
            p.innerHTML = '<b>Test Kit:</b><span style="padding-left:5em">' + self.selectedTestkit + '</span>';
            resultsWrapper.appendChild(p);
            var br = document.createElement('br');
            resultsWrapper.appendChild(br);
        }
        if (self.userName.length > 0) {
            var p = document.createElement('p');
            p.className = 'resultsP';
            p.innerHTML = '<b>User Name:</b><span style="padding-left:3.3em">' + self.userName + '</span>';
            resultsWrapper.appendChild(p);
            var br = document.createElement('br');
            resultsWrapper.appendChild(br);
        }
        if (self.sampleName.length > 0) {
            var p = document.createElement('p');
            p.className = 'resultsP';
            p.innerHTML = '<b>Sample Name:</b><span style="padding-left:1.8em">' + self.sampleName + '</span>';
            resultsWrapper.appendChild(p);
            var br = document.createElement('br');
            resultsWrapper.appendChild(br);
        }
        var date = new Date();
        var p = document.createElement('p');
        p.className = 'resultsP';
        p.innerHTML = '<b>Date:</b><span style="padding-left:6.4em">' + date.toString() + '</span>';
        resultsWrapper.appendChild(p);
        var rml = self.randomMatchResults.length;
        if (rml > 0) {
            for (var i = 0; i < rml; i++) {
                var currentResults = self.randomMatchResults[i];
                // header info
                var table = document.createElement('table');
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.innerHTML = '<b>RMP</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.colSpan = 3;
                td.innerHTML = '<b>' + currentResults.tableName + '</b>';
                tr.appendChild(td);
                table.appendChild(tr);
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.innerHTML = '<b>Total Frequency</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = currentResults.likelihood.toExponential(3);
                td.colSpan = 3;
                tr.appendChild(td);
                table.appendChild(tr);
                tr = document.createElement('tr');
                td = document.createElement('td');
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '<b>Loci Freq.</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '<b>Allele</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '<b>Allele Freq.</b>';
                tr.appendChild(td);
                table.appendChild(tr);

                // actual results
                var resultValue = currentResults.loci;
                var rvl = resultValue.length;
                for (var j = 0; j < rvl; j++) {
                    var currentLoci = currentResults.loci[j];
                    var alleleLength = currentLoci.alleles.length;
                    tr = document.createElement('tr');
                    td = document.createElement('td');
                    td.innerHTML = '<b>' + currentLoci.locus + '</b>';
                    td.rowSpan = alleleLength;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    if (currentLoci.p) {
                        td.innerHTML = currentLoci.p.toExponential(3);
                    }
                    else {
                        td.innerHTML = '';
                    }
                    td.rowSpan = alleleLength;
                    tr.appendChild(td);
                    for (var a = 0; a < alleleLength; a++) {
                        var allele = currentLoci.alleles[a];
                        var alleleFreq = 0;
                        if(currentResults.table.table[currentLoci.locus].data.alleles[allele.allele]) {
                            alleleFreq = currentResults.table.table[currentLoci.locus].data.alleles[allele.allele].data.frequency;
                        }
                        else {
                            var minF = 10;
                            var aLength = currentResults.table.table[currentLoci.locus].data.alleles.length;
                            for (var ii = 0; ii < aLength; ii++) {
                                var f = minF;
                                if (currentResults.table.table[currentLoci.locus].data.alleles[allele.allele]) {
                                    f = currentResults.table.table[currentLoci.locus].data.alleles[allele.allele].data.frequency;
                                }
                                else {
                                    continue;
                                }
                                if (f < minF) {
                                    minF = f;
                                }
                            }
                            if (minF < 10) {
                                alleleFreq = minF;
                            }
                            else {
                                alleleFreq = 0.01;
                            }
                        }
                        td = document.createElement('td');
                        td.innerHTML = allele.allele;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = alleleFreq.toFixed(5);
                        tr.appendChild(td);
                        table.appendChild(tr);
                        tr = document.createElement('tr');
                    }
                }
                resultsWrapper.appendChild(table);
                var br = document.createElement('br');
                resultsWrapper.appendChild(br);
            }
        }

        var cml = self.combinedMatchResults.length;
        if (cml > 0) {
            for (var i = 0; i < cml; i++) {
                var currentResults = self.combinedMatchResults[i];
                // header info
                var table = document.createElement('table');
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.innerHTML = '<b>CPI</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.colSpan = 3;
                td.innerHTML = '<b>' + currentResults.tableName + '</b>';
                tr.appendChild(td);
                table.appendChild(tr);
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.innerHTML = '<b>Total Frequency</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = currentResults.likelihood.toExponential(3);
                td.colSpan = 3;
                tr.appendChild(td);
                table.appendChild(tr);
                tr = document.createElement('tr');
                td = document.createElement('td');
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '<b>Loci Freq.</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '<b>Allele</b>';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '<b>Allele Freq.</b>';
                tr.appendChild(td);
                table.appendChild(tr);

                // actual results
                var resultValue = currentResults.loci;
                var rvl = resultValue.length;
                for (var j = 0; j < rvl; j++) {
                    var currentLoci = currentResults.loci[j];
                    var alleleLength = currentLoci.alleles.length;
                    tr = document.createElement('tr');
                    td = document.createElement('td');
                    td.innerHTML = '<b>' + currentLoci.locus + '</b>';
                    td.rowSpan = alleleLength;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    if (currentLoci.p) {
                        td.innerHTML = currentLoci.p.toExponential(3);
                    }
                    else {
                        td.innerHTML = '';
                    }
                    td.rowSpan = alleleLength;
                    tr.appendChild(td);
                    for (var a = 0; a < alleleLength; a++) {
                        var allele = currentLoci.alleles[a];
                        var alleleFreq = 0;
                        if(currentResults.table.table[currentLoci.locus].data.alleles[allele.allele]) {
                            alleleFreq = currentResults.table.table[currentLoci.locus].data.alleles[allele.allele].data.frequency;
                        }
                        else {
                            var minF = 10;
                            var aLength = currentResults.table.table[currentLoci.locus].data.alleles.length;
                            for (var ii = 0; ii < aLength; ii++) {
                                var f = minF;
                                if (currentResults.table.table[currentLoci.locus].data.alleles[allele.allele]) {
                                    f = currentResults.table.table[currentLoci.locus].data.alleles[allele.allele].data.frequency;
                                }
                                else {
                                    continue;
                                }
                                if (f < minF) {
                                    minF = f;
                                }
                            }
                            if (minF < 10) {
                                alleleFreq = minF;
                            }
                            else {
                                alleleFreq = 0.01;
                            }
                        }
                        td = document.createElement('td');
                        td.innerHTML = allele.allele;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = alleleFreq.toFixed(5);
                        tr.appendChild(td);
                        table.appendChild(tr);
                        tr = document.createElement('tr');
                    }
                }
                resultsWrapper.appendChild(table);
                var br = document.createElement('br');
                resultsWrapper.appendChild(br);
            }
        }
    };

    this.hideRmpAndCloseRelativesIfNeeded = function() {
        var hideRMP = false;
        var alleles = self.selectedAlleles;
        var l = alleles.length;
        var alleleCount = 0;
        for (var i = 0; i < l; i++) {
            var loci = alleles[i].loci;
            for (var j = 0; j < l; j++) {
                var currentLoci = alleles[j].loci;
                if (currentLoci === loci) {
                    alleleCount++;
                }
            }
            if (alleleCount > 2) {
                hideRMP = true;
                break;
            }
            else {
                alleleCount = 0;
            }
        }
        return hideRMP;
    };
};
statopus.runApp();
