/**
 * Bank számláit tároló és kezelő osztály
 */
class Bank {
    /**
     * A bankban lévő számlákat tartalmazza
     */
    #szamlak = [];

    /**
     * Létrehoz egy új számlát a megadott adatokkal 0 Ft egyenleggel és azt eltárolja
     * @param {string} nev A számla tulajdonosának a neve. Nem lehet üres, csak betűt és szóközt tartalmazhat.
     * @param {string} szamlaszam A számla számlaszáma. Nem lehet üres, csak számot és kötőjelet tartalmazhat, egyedinek kell lennie.
     */
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

    /**
     * Megkeresi a megadott számlaszámú számlát és visszaadja a rajta lévő egyenleget
     * @param {string} szamlaszam A keresendő számla számlaszáma
     * @returns A számlán lévő egyenleg
     */
    egyenleg = (szamlaszam) => {
        const szamla = this.szamlaKeres(szamlaszam);
        return szamla.egyenleg;
    }

    /**
     * Feltölti
     * @param {string} szamlaszam Számlaszám
     * @param {number} osszeg Feltöltendő egyenleg
     */
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

    /**
     * Megkeresi
     * @param {string} szamlaszam Számlaszám
     * @returns Számla
     */
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