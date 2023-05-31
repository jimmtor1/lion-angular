export class Cate {

    name: string[] = ["Građevinarstvo", "Sve za kuću", "Informatika i telekomunikacije", " Od glave do pete", "Svi proizvodi / Usluge"];

    title: string[][] = [

        ["Građevinski radovi", "Obrtnički radovi", "Instalaterski radovi", "Stolarija"],
        ["Namještaj", "Rasvjeta", "Dekoracije", "Grijanje i hlađenje", "Kućanski tekstil"],
        ["Servisiranje uređaja i opreme", "Informatičke usluge"],
        ["Obuci se", "Zanatski radovi"],
        ["Ostalo", "Ostalo", "Grijanje i hlađenje", "Kućanski tekstil", "Namještaj", "Rasvjeta", "Dekoracije", "Kućanski tekstil"]

    ];

    subcategory1: string[][] = [

        ["Zemljani radovi", "Betonski radovi", "Armirano-betonski radovi", "Zidarski radovi", "Tesarski radovi", "Izolacijski radovi"],
        ["Krovopokrivački radovi", "Limarski radovi", "Bravarski radovi", "Stolarski radovi", "Keramički radovi", "Fasadski radovi", "Grijanje i hlađenje"],
        ["Hidroinstalacije", "Elektroinstalacije", "Strojarske instalacije"],
        ["Prozori", "Sobna vrata", "Ulazna vrata", "Roletne"]

    ]

    subcategory2: string[][] = [

        ["Kuhinje", "Stolovi i stolice", "Dnevni boravak namještaj", "Stilski namještaj", "Dječije sobe", "Kupaonski namještaj", "Predsoblja namještaj"],
        ["Led rasvjeta", "Lusteri", "Stropna rasvjeta i plafonjere", "Zidna rasvjeta", "Podne lampe", "Stolne lampe", "Ugradbena rasvjeta", "Vanjska rasvjeta"],
        ["Vaze", "Zidni sat", "Tapete", "Ostale dekoracije"],
        ["Klima uređaji", "Radijatori", "Ventilatori", "Kamini", "Peći", "Grijalice"],
        ["Jastuci", "Posteljina", "Prekrivači i deke", "Zavjese", "Tepisi"],

    ]

    subcategory3: string[][] = [

        ["Servis TV, audio i video uređaja", "Servis mobitela", "Servis kućanskih aparata", "Servis klima uređaja", "Servis računara", "Servis igraćih konzola"],
        ["Web hosting", "Web i software izrada", "Mreže serveri i telekomunikacije", "Mreže sigurnost"],

    ]

    subcategory4: string[][] = [

        ["Odjeća", "Obuća", "Radna odjeća i zaštitna oprema", "Dječija odjeća i obuća", "Dorbe i novčanici", "Naočale", "Nakit", "Satovi"],
        ["Krojači", "Sahadžije"],

    ]

    subcategory5: string[][] = [

        ["Mobiteli", "Automobili", "Sportska oprema", "Informatička oprema", "Audio, video i foto", "Dječiji svijet"],
        ["Odjeća", "Obuća", "Građevinski materijal", "Računari i laptopi", "Konzole", "Tableti", "Mašine i alati"],
        ["Klima uređaji", "Radijatori", "Ventilatori", "Kamini", "Peći", "Grijalice"],
        ["Jastuci", "Posteljina", "Prekrivači i deke", "Zavjese", "Tepisi"],
        ["Kuhinje", "Stolovi i stolice", "Dnevni boravak namještaj", "Stilski namještaj", "Dječije sobe", "Kupaonski namještaj", "Predsoblja namještaj"],
        ["Led rasvjeta", "Lusteri", "Stropna rasvjeta i plafonjere", "Zidna rasvjeta", "Podne lampe", "Stolne lampe", "Ugradbena rasvjeta", "Vanjska rasvjeta"],
        ["Vaze", "Zidni sat", "Tapete", "Ostale dekoracije"],
        ["Jastuci", "Posteljina", "Prekrivači i deke", "Zavjese", "Tepisi"],
    ]


    getId(group: number, row: number): number {
        let cuenta = 1;
        switch (group) {
            case 0:
                if (row > 0) {
                    for (let index = 0; index < row; index++) {
                        cuenta += this.subcategory1[index].length;
                    }
                }
                break;
            case 1:
                cuenta += 20;
                if (row > 0) {
                    for (let index = 0; index < row; index++) {
                        cuenta += this.subcategory2[index].length;
                    }
                }
                break;
            case 2:
                cuenta += 50;
                if (row > 0) {
                    for (let index = 0; index < row; index++) {
                        cuenta += this.subcategory3[index].length;
                    }
                }
                break;
            case 3:
                cuenta += 60;
                if (row > 0) {
                    for (let index = 0; index < row; index++) {
                        cuenta += this.subcategory4[index].length;
                    }
                }
                break;
            case 4:
                cuenta += 70;
                if (row > 0) {
                    for (let index = 0; index < row; index++) {
                        cuenta += this.subcategory5[index].length;
                    }
                }
                break;
        }
        return cuenta;
    }
}


// class categoria {
//     name: string;
//     subtitle: subTitle;
// }

// class subTitle {
//     title: string;
//     subcategory: Subcategory2;

// }

// class Subcategory2 {
//     idsubcategory: number;
//     name: string;
// }

