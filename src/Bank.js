class Bank {
    #szamlak = [];

    ujSzamla = (nev, szamlaszam) => {
        if (nev == null || nev.trim() == "") {
            throw new Error();
        }
        if (nev.match(/[^\w\sÁÉÍÓÖŐÚŰáéíóőúű]/g)) {
            throw new Error();
        }
        if (szamlaszam == null || szamlaszam.trim() == "") {
            throw new Error();
        }
        if (szamlaszam.match(/[^\d\s-]/g)) {
            throw new Error();
        }
        const index = this.#szamlak.findIndex(elem => elem.szamlaszam == szamlaszam);
        if (index > -1) {
            throw new Error();
        }

        const szamla = {
            nev: nev,
            szamlaszam: szamlaszam,
            egyenleg: 0
        }
        this.#szamlak.push(szamla);
    }

    egyenleg = (szamlaszam) => {
        const szamla = this.szamlaKeres(szamlaszam);
        return szamla.egyenleg;
    }

    egyenlegFeltolt = (szamlaszam, osszeg) => {
        const osszegSzam = parseInt(osszeg);
        if (osszeg != osszegSzam) {
            throw new Error();
        }
        if (osszegSzam < 1) {
            throw new Error();
        }
        const szamla = this.szamlaKeres(szamlaszam);
        szamla.egyenleg += osszegSzam;
    }

    /**
     * Átutalja a megadott összeget egyik számláról a másikra. Ha a forrás számlán nincs elég összeg, akkor nem történik utalás.
     * @param {string} honnan A forrás számla számlaszáma
     * @param {string} hova A cél számla számlaszáma
     * @param {number} osszeg Az átutalandó egyenleg
     * @returns {boolean} az utalás sikeressége.
     */
    utal = (honnan, hova, osszeg) => {
        // TODO: Metódus implementálása
    }

    szamlaKeres = (szamlaszam) => {
        if (szamlaszam == null || szamlaszam.trim() == "") {
            throw new Error();
        }
        if (szamlaszam.match(/[^\d\s-]/g)) {
            throw new Error();
        }
        let ind = 0;
        while (ind < this.#szamlak.length && this.#szamlak[ind].szamlaszam != szamlaszam) {
            ind++;
        }
        if (ind == this.#szamlak.length) {
            throw new Error();
        }
        return this.#szamlak[ind];
    }

 }

module.exports = Bank;