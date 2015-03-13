<<<<<<< HEAD
/**
 *
 * @author Zac Audette
 * @organization Wright State University
 * @license GNU General Public License v2.0
 *
**/
var statopus = new function() {
    // private variables
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
                    var lociAlleles = document.getElementById('lociAlleles');
                    if (lociAlleles) {
                        lociAlleles.style.display = '';
                    }
                    testkits.style.display = 'none';
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

=======
var statopus = new function() {
>>>>>>> 34890d6b5fcef6ff369cc63856d83b2d6e6d4229
    var readJSONFile = function(callback) {
        var xml_http = new XMLHttpRequest();
        xml_http.overrideMimeType("application/json");
        xml_http.open('GET', '../libs/test_kits/identifiler.json', true);
        xml_http.onreadystatechange = function () {
            if (xml_http.readyState == 4 && xobj.status == "200") {
                callback(xml_http.responseText);
            }
        };
        xml_http.send(null);
    };

    var getTestKits = function() {
        var callback = function(response) {
        // Do Something with the response e.g.
        //jsonresponse = JSON.parse(response);
        // Assuming json data is wrapped in square brackets as Drew suggests
        //console.log(jsonresponse[0].name);
        };
        getTestKits(callback);
    }
};
<<<<<<< HEAD
statopus.launch();
=======
>>>>>>> 34890d6b5fcef6ff369cc63856d83b2d6e6d4229
