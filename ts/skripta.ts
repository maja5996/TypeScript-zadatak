let studenti: Student[] = [];

class Predmet {
    imeProfesora: string;
    nazivPredmeta: string;
    id: number;
    ocena: number;

	constructor(id: number, nazivPredmeta: string, imeProfesora: string, ocena: number) {
        this.id = id;
        this.imeProfesora = imeProfesora;
        this.nazivPredmeta = nazivPredmeta;
        this.ocena = ocena;
	}
}

class Student {
    private _ime: string;
    private _prezime: string;
    private _fakultet: string;
    private _brojIndeksa: string;
    private _prosecnaOcena: number;
    private _polozeniPredmeti: Predmet[];

    constructor(ime: string, prezime: string, fakulet: string, brojIndeksa: string){
        this._ime = ime;
        this._prezime = prezime;
        this._fakultet = fakulet;
        this._brojIndeksa = brojIndeksa;
        this._prosecnaOcena = 0;
        this._polozeniPredmeti = [];
    }

	public get ime(): string {
		return this._ime;
	}

	public set ime(value: string) {
		this._ime = value;
	}

	public get prezime(): string {
		return this._prezime;
	}

	public set prezime(value: string) {
		this._prezime = value;
	}

	public get fakultet(): string {
		return this._fakultet;
	}

	public set fakultet(value: string) {
		this._fakultet = value;
	}

	public get brojIndeksa(): string {
		return this._brojIndeksa;
	}

	public set brojIndeksa(value: string) {
		this._brojIndeksa = value;
	}

	public get prosecnaOcena(): number {
		return this._prosecnaOcena;
	}

	public set prosecnaOcena(value: number) {
		this._prosecnaOcena = value;
	}

	public get polozeniPredmeti(): Predmet[] {
		return this._polozeniPredmeti;
	}

	public set polozeniPredmeti(value: Predmet[]) {
        this._polozeniPredmeti = value;
        this.izracunajProsecnuOcenu();
    }
    
    public predstaviSe(): string {
        return `Ja sam ${this._ime} ${this._prezime} i studiram na ${this._fakultet}, sa prosecnom ocenom ${this.izracunajProsecnuOcenu()}!`;
    }

    public izracunajProsecnuOcenu(): number {
        let suma = 0;
        for(let i = 0; i < this._polozeniPredmeti.length; i++){
            suma += this._polozeniPredmeti[i].ocena;
        }
        this._prosecnaOcena = suma / this._polozeniPredmeti.length;
        return this._prosecnaOcena;
    }

    public omiljeniProfesori(): string[] {
        let imenaProfesora: string[] = [];
        
        this._polozeniPredmeti.forEach(el => {
           if(el.ocena == 11){
               imenaProfesora.push(el.imeProfesora);
           } 
        });
        
        
        return imenaProfesora;
    }


}

let p1 = new Predmet(1, "1", "P1", 11);
let p2 = new Predmet(2, "2", "P2", 9);
let p3 = new Predmet(3, "3", "P3", 10);

let s1 = new Student("Pera", "Peric", "PMF", "P01");
s1.polozeniPredmeti = [p1, p2, p3];
studenti = [s1];
console.log(s1.predstaviSe());
console.log(s1.omiljeniProfesori());


function devetke(studentNiz: Student[]): Student[] {
    let retVal: Student[] = [];

    for(let i = 0; i < studentNiz.length; i++){
        let counter = 0;
        for(let j = 0; j < studentNiz[i].polozeniPredmeti.length; j++){
            if(studentNiz[i].polozeniPredmeti[j].ocena == 9){
                counter++;
                if(counter >= 3){
                   retVal.push(studentNiz[i]);
                   break;
                }
            }
        }
        
    }

    return retVal;

}


window.onload = () => {

    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault();

        let ime: string = this.ime.value;
        let prezime: string = this.prezime.value;
        let fakulet: string = this.fakultet.value;
        let indeks: string = this.indeks.value;


        let s = new Student(ime, prezime, fakulet, indeks);

        let tekstPredmeta: string = this.predmeti.value;
        let nizPredmeta: string[] = tekstPredmeta.split(";");

    
        for(let i = 0; i < nizPredmeta.length; i++){
            let delovi = nizPredmeta[i].split(",");
            let p = new Predmet(Number(delovi[0]), delovi[1], delovi[2], Number(delovi[3]));
            s.polozeniPredmeti.push(p);
        }

        studenti.push(s);


    });

    document.querySelector("#predstavi").addEventListener("click", ()=>{
        let div: HTMLDivElement = document.getElementById("tekst") as HTMLDivElement;

        div.innerHTML = "";

        studenti.forEach(el => {
            div.innerHTML += el.predstaviSe() + "<br/>";
        });

    });

    document.querySelector("#devetke").addEventListener("click", ()=>{
        let div: HTMLDivElement = document.getElementById("tekst") as HTMLDivElement;

        div.innerHTML = "";
        let devetkasi = devetke(studenti);
        devetkasi.forEach(el => {
            div.innerHTML += el.predstaviSe() + "<br/>";
        });

    });


    document.querySelector("#omiljeni").addEventListener("click", ()=>{
        let div: HTMLDivElement = document.getElementById("tekst") as HTMLDivElement;

        div.innerHTML = "";

        studenti.forEach(el => {
            let omiljeni = el.omiljeniProfesori();
            if(omiljeni.length > 0){
                div.innerHTML += `${el.ime} ${el.prezime} ima omiljene profesore ` + omiljeni.join(", ") + ". <br/>"; 
            }
        });

    });

};

