const Bank = require('./Bank');
let b;

beforeEach(() => {
    b = new Bank();
    b.ujSzamla("Gipsz Jakab", "1234");
});

test('ujSzamla - Létező számlaszámmal hiba', () => {
    expect(() => {
        b.ujSzamla("Teszt Elek", "1234");
    }).toThrow();
});

test('ujSzamla - Létező névvel nincs hiba', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jakab", "5678");
    }).not.toThrow();
});

test('ujSzamla - Üres névvel', () => {
    expect(() => {
        b.ujSzamla("", "5678");
    }).toThrow();
});

test('ujSzamla - Üres számlaszámmal', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jakab", "");
    }).toThrow();
});

test('ujSzamla - Null név', () => {
    expect(() => {
        b.ujSzamla(null, "5678");
    }).toThrow();
});

test('ujSzamla - Null számlaszám', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jakab", null);
    }).toThrow();
});

test('ujSzamla - Számlaszám betű', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jakab", "56A8");
    }).toThrow();
});

test('ujSzamla - Név speciális karakter', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jak!ab", "5678");
    }).toThrow();
});

test('ujSzamla - Név ékezettel', () => {
    expect(() => {
        b.ujSzamla("Gipsz János", "5678");
    }).not.toThrow();
});

test('ujSzamla - Számlaszám szóköz', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jakab", "5678 1234");
    }).not.toThrow();
});

test('ujSzamla - Számlaszám kötőjel', () => {
    expect(() => {
        b.ujSzamla("Gipsz Jakab", "5678-1234");
    }).not.toThrow();
});

test('egyenleg - Számlaszám betű', () => {
    expect(() => {
        b.egyenleg("123A4");
    }).toThrow();
});

test('egyenleg - Számlaszám üres', () => {
    expect(() => {
        b.egyenleg("");
    }).toThrow();
});

test('egyenleg - Számlaszám null', () => {
    expect(() => {
        b.egyenleg(null);
    }).toThrow();
});

test('egyenleg - Számlaszám nem létezik', () => {
    expect(() => {
        b.egyenleg("5678");
    }).toThrow();
});

test('egyenleg - Új számla egyenleg 0', () => {
    expect(b.egyenleg("1234")).toBe(0);
});

/*
 TODO: egyenlegfeltolt - számlaszám
    - üres
    - null
    - betű
    - nem létezik
    - etc.
*/

test('egyenlegFeltolt - összeg 0', () => {
    expect(() => {
        b.egyenlegFeltolt("1234", 0);
    }).toThrow();
});

test('egyenlegFeltolt - összeg negatív', () => {
    expect(() => {
        b.egyenlegFeltolt("1234", -1);
    }).toThrow();
});

test('egyenlegFeltolt - összeg tört szám', () => {
    expect(() => {
        b.egyenlegFeltolt("1234", 100.15);
    }).toThrow();
});

test('egyenlegFeltolt - összeg szöveg', () => {
    expect(() => {
        b.egyenlegFeltolt("1234", "abc");
    }).toThrow();
});

test('egyenlegFeltolt - összeg szám stringként', () => {
    expect(() => {
        b.egyenlegFeltolt("1234", "10000");
    }).not.toThrow();
});

test('egyenlegFeltolt - Összeg rákerül a számlára', () => {
    b.egyenlegFeltolt("1234", "10000");
    expect(b.egyenleg("1234")).toBe(10000);
});

test('egyenlegFeltolt - Összeg hozzáadódik a jelenlegi egyenleghez', () => {
    b.egyenlegFeltolt("1234", "10000");
    expect(b.egyenleg("1234")).toBe(10000);
    b.egyenlegFeltolt("1234", "20000");
    expect(b.egyenleg("1234")).toBe(30000);
    
});

test('egyenlegFeltolt - Összeg megfelelő számlára tölti az egyenleget', () => {
    b.ujSzamla("Gipsz Jakab", "5678");
    b.egyenlegFeltolt("1234", "10000");
    b.egyenlegFeltolt("5678", "20000");
    expect(b.egyenleg("1234")).toBe(10000);
    expect(b.egyenleg("5678")).toBe(20000);
});

// TODO: utal metódus teszteseteinek elkészítése.