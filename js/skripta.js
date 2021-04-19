var studenti = [];
var Predmet = /** @class */ (function () {
    function Predmet(id, nazivPredmeta, imeProfesora, ocena) {
        this.id = id;
        this.imeProfesora = imeProfesora;
        this.nazivPredmeta = nazivPredmeta;
        this.ocena = ocena;
    }
    return Predmet;
}());
var Student = /** @class */ (function () {
    function Student(ime, prezime, fakulet, brojIndeksa) {
        this._ime = ime;
        this._prezime = prezime;
        this._fakultet = fakulet;
        this._brojIndeksa = brojIndeksa;
        this._prosecnaOcena = 0;
        this._polozeniPredmeti = [];
    }
    Object.defineProperty(Student.prototype, "ime", {
        get: function () {
            return this._ime;
        },
        set: function (value) {
            this._ime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "prezime", {
        get: function () {
            return this._prezime;
        },
        set: function (value) {
            this._prezime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "fakultet", {
        get: function () {
            return this._fakultet;
        },
        set: function (value) {
            this._fakultet = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "brojIndeksa", {
        get: function () {
            return this._brojIndeksa;
        },
        set: function (value) {
            this._brojIndeksa = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "prosecnaOcena", {
        get: function () {
            return this._prosecnaOcena;
        },
        set: function (value) {
            this._prosecnaOcena = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "polozeniPredmeti", {
        get: function () {
            return this._polozeniPredmeti;
        },
        set: function (value) {
            this._polozeniPredmeti = value;
            this.izracunajProsecnuOcenu();
        },
        enumerable: true,
        configurable: true
    });
    Student.prototype.predstaviSe = function () {
        return "Ja sam " + this._ime + " " + this._prezime + " i studiram na " + this._fakultet + ", sa prosecnom ocenom " + this.izracunajProsecnuOcenu() + "!";
    };
    Student.prototype.izracunajProsecnuOcenu = function () {
        var suma = 0;
        for (var i = 0; i < this._polozeniPredmeti.length; i++) {
            suma += this._polozeniPredmeti[i].ocena;
        }
        this._prosecnaOcena = suma / this._polozeniPredmeti.length;
        return this._prosecnaOcena;
    };
    Student.prototype.omiljeniProfesori = function () {
        var imenaProfesora = [];
        this._polozeniPredmeti.forEach(function (el) {
            if (el.ocena == 11) {
                imenaProfesora.push(el.imeProfesora);
            }
        });
        return imenaProfesora;
    };
    return Student;
}());
var p1 = new Predmet(1, "1", "P1", 11);
var p2 = new Predmet(2, "2", "P2", 9);
var p3 = new Predmet(3, "3", "P3", 10);
var s1 = new Student("Pera", "Peric", "PMF", "P01");
s1.polozeniPredmeti = [p1, p2, p3];
studenti = [s1];
console.log(s1.predstaviSe());
console.log(s1.omiljeniProfesori());
function devetke(studentNiz) {
    var retVal = [];
    for (var i = 0; i < studentNiz.length; i++) {
        var counter = 0;
        for (var j = 0; j < studentNiz[i].polozeniPredmeti.length; j++) {
            if (studentNiz[i].polozeniPredmeti[j].ocena == 9) {
                counter++;
                if (counter >= 3) {
                    retVal.push(studentNiz[i]);
                    break;
                }
            }
        }
    }
    return retVal;
}
window.onload = function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        var ime = this.ime.value;
        var prezime = this.prezime.value;
        var fakulet = this.fakultet.value;
        var indeks = this.indeks.value;
        var s = new Student(ime, prezime, fakulet, indeks);
        var tekstPredmeta = this.predmeti.value;
        var nizPredmeta = tekstPredmeta.split(";");
        for (var i = 0; i < nizPredmeta.length; i++) {
            var delovi = nizPredmeta[i].split(",");
            var p = new Predmet(Number(delovi[0]), delovi[1], delovi[2], Number(delovi[3]));
            s.polozeniPredmeti.push(p);
        }
        studenti.push(s);
    });
    document.querySelector("#predstavi").addEventListener("click", function () {
        var div = document.getElementById("tekst");
        div.innerHTML = "";
        studenti.forEach(function (el) {
            div.innerHTML += el.predstaviSe() + "<br/>";
        });
    });
    document.querySelector("#devetke").addEventListener("click", function () {
        var div = document.getElementById("tekst");
        div.innerHTML = "";
        var devetkasi = devetke(studenti);
        devetkasi.forEach(function (el) {
            div.innerHTML += el.predstaviSe() + "<br/>";
        });
    });
    document.querySelector("#omiljeni").addEventListener("click", function () {
        var div = document.getElementById("tekst");
        div.innerHTML = "";
        studenti.forEach(function (el) {
            var omiljeni = el.omiljeniProfesori();
            if (omiljeni.length > 0) {
                div.innerHTML += el.ime + " " + el.prezime + " ima omiljene profesore " + omiljeni.join(", ") + ". <br/>";
            }
        });
    });
};
//# sourceMappingURL=skripta.js.map