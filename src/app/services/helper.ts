
// export const API_URL = 'http://localhost:8080/';
export const IMG_PROFILE_URL = 'https://test2.dcl.ba/images/profile-images/';
export const IMG_PRODUCT_URL = 'https://test2.dcl.ba/images/product-images/';
export const DOC_URL = 'https://test2.dcl.ba/images/documents/'; //tender documents
export const DOC_PROPOSAL_URL = 'https://test2.dcl.ba/images/proposal-documents/';

export const API_URL = 'https://test1.dcl.ba/';
// export const IMG_PROFILE_URL = '/images/profile-images/';
// export const IMG_PRODUCT_URL = '/images/product-images/';   
// export const DOC_URL = '/images/documents/';
// export const DOC_PROPOSAL_URL = '/images/proposal-documents/'

export class federation {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export const FEDERATIONS = [
    new federation(0, "FEDERACIJA BiH"), //title 
    new federation(1, "UNSKO-SANSKI KANTON"),
    new federation(2, "Posavski kanton"),
    new federation(3, "Tuzlanski kanton"),
    new federation(4, "Zeničko-dobojski kanton"),
    new federation(5, "Bosansko-podrinjski kanton"),
    new federation(6, "Srednjobosanski kanton"),
    new federation(7, "Hercegovačko-neretvanski kanton"),
    new federation(8, "Zapadnohercegovački kanton"),
    // new federation(9, "Bosansko-podrinjski kanton"),
    new federation(9, "Kanton Sarajevo"),
    new federation(10, "Kanton 10"),
    new federation(0, "REPUBLIKA SRPSKA"), //title
    new federation(11, "Banjalučka"),
    new federation(12, "Dobojsko-Bijeljinska"),
    new federation(13, "Sarajevsko-Zvornička"),
    new federation(14, "Trebinjsko-Fočanska"),
    new federation(0, "BRČKO DISTRIKT"), //title     
    new federation(15, "Brčko Distrikt"),
];


export function select_fed(id: number): federation | null {

    let federation = null;
    for (let index = 0; index < FEDERATIONS.length; index++) {
        if (FEDERATIONS[index].id == id) {
            federation = FEDERATIONS[index];
            break;
        }
    }
    return federation;

}

class city {
    id: number;
    idFed: number
    name: string;
    constructor(id: number, idFed: number, name: string) {
        this.id = id;
        this.idFed = idFed;
        this.name = name;
    }
}

export const CITIES = [
    new city(1, 1, "Bihać"),
    new city(2, 1, "Bosanska Krupa"),
    new city(3, 1, "Bosanski Petrovac"),
    new city(4, 1, "Bužim"),
    new city(5, 1, "Cazin"),
    new city(6, 1, "Ključ"),
    new city(7, 1, "Sanski Most"),
    new city(8, 1, "Velika Kladuša"),

    new city(9, 2, "Šamac"),
    new city(10, 2, "Odžak"),
    new city(11, 2, "Orašje"),

    new city(12, 3, "Banovići"),
    new city(13, 3, "Čelić"),
    new city(14, 3, "Doboj Istok"),
    new city(15, 3, "Gračanica"),
    new city(16, 3, "Gradačac"),
    new city(17, 3, "Kalesija"),
    new city(18, 3, "Kladanj"),
    new city(19, 3, "Lukavac"),
    new city(20, 3, "Sapna"),
    new city(21, 3, "Srebrenik"),
    new city(22, 3, "Teočak"),
    new city(23, 3, "Tuzla"),
    new city(24, 3, "Živinice"),

    new city(25, 4, "Breza"),
    new city(26, 4, "Doboj Jug"),
    new city(27, 4, "Kakanj"),
    new city(28, 4, "Maglaj"),
    new city(29, 4, "Olovo"),
    new city(30, 4, "Tešanj"),
    new city(31, 4, "Usora"),
    new city(32, 4, "Vareš"),
    new city(33, 4, "Visoko"),
    new city(34, 4, "Zavidovići"),
    new city(35, 4, "Zenica"),
    new city(36, 4, "Žepče"),

    new city(37, 5, "Goražde"),
    new city(38, 5, "Ustikolina"),

    new city(39, 6, "Bugojno"),
    new city(40, 6, "Busovača"),
    new city(41, 6, "Dobretići"),
    new city(42, 6, "Donji Vakuf"),
    new city(43, 6, "Fojnica"),
    new city(44, 6, "Gornji Vakuf-Uskoplje"),
    new city(45, 6, "Jajce"),
    new city(46, 6, "Kiseljak"),
    new city(47, 6, "Kreševo"),
    new city(48, 6, "Novi Travnik"),
    new city(49, 6, "Travnik"),
    new city(50, 6, "Vitez"),

    new city(51, 7, "Čapljina"),
    new city(52, 7, "Čitluk"),
    new city(53, 7, "Jablanica"),
    new city(54, 7, "Konjic"),
    new city(55, 7, "Mostar"),
    new city(56, 7, "Neum"),
    new city(57, 7, "Prozor"),
    new city(58, 7, "Ravno"),
    new city(59, 7, "Stolac"),

    new city(60, 8, "Grude"),
    new city(61, 8, "Ljubuški"),
    new city(62, 8, "Posušje"),
    new city(63, 8, "Široki Brijeg"),

    new city(64, 9, "Hadžići"),
    new city(65, 9, "Ilidža"),
    new city(66, 9, "Ilijaš"),
    new city(67, 9, "Sarajevo - Centar"),
    new city(68, 9, "Sarajevo - Novi Grad"),
    new city(69, 9, "Sarajevo - Novo Sarajevo"),
    new city(70, 9, "Sarajevo - Stari Grad"),
    new city(71, 9, "Trnovo"),
    new city(72, 9, "Vogošća"),

    new city(73, 10, "Bosansko Grahovo"),
    new city(74, 10, "Drvar"),
    new city(75, 10, "Glamoč"),
    new city(76, 10, "Kupres"),
    new city(77, 10, "Livno"),
    new city(78, 10, "Tomislavgrad"),

    //["Banjalučka", "Dobojsko-Bijeljinska", "Sarajevsko-Zvornička", "Trebinjsko-Fočanska"],
    new city(79, 11, "Banja Luka"),
    new city(80, 11, "Čelinac"),
    new city(81, 11, "Gradiška"),
    new city(82, 11, "Jezero"),
    new city(83, 11, "Kneževo"),
    new city(84, 11, "Kostajnica"),
    new city(85, 11, "Kotor Varoš"),
    new city(86, 11, "Kozarska Dubica"),
    new city(87, 11, "Krupa na Uni"),
    new city(88, 11, "Laktaši"),
    new city(89, 11, "Mrkonjić Grad"),
    new city(90, 11, "Novi Grad"),
    new city(91, 11, "Oštra Luka"),
    new city(92, 11, "Prijedor"),
    new city(93, 11, "Prnjavor"),
    new city(94, 11, "Ribnik"),
    new city(95, 11, "Šipovo"),
    new city(96, 11, "Srbac"),

    new city(97, 12, "Bijeljina"),
    new city(98, 12, "Brod"),
    new city(99, 12, "Derventa"),
    new city(100, 12, "Doboj"),
    new city(101, 12, "Donji Žabar"),
    new city(102, 12, "Lopare"),
    new city(103, 12, "Modriča"),
    new city(104, 12, "Pelagićevo"),
    new city(105, 12, "Petrovo"),
    new city(106, 12, "Šamac"),
    new city(107, 12, "Stanari"),
    new city(108, 12, "Teslić"),
    new city(109, 12, "Ugljevik"),
    new city(110, 12, "Vukosavlje"),

    new city(111, 13, "Bratunac"),
    new city(112, 13, "Han Pijesak"),
    new city(113, 13, "Istočna Ilidža"),
    new city(114, 13, "Istočni Stari Grad"),
    new city(115, 13, "Istočno Sarajevo"),
    new city(116, 13, "Lukavica"),
    new city(117, 13, "Milići"),
    new city(118, 13, "Novo Goražde"),
    new city(119, 13, "Osmaci"),
    new city(120, 13, "Pale"),
    new city(121, 13, "Rogatica"),
    new city(122, 13, "Rudo"),
    new city(123, 13, "Šekovići"),
    new city(124, 13, "Sokolac"),
    new city(125, 13, "Srebrenica"),
    new city(126, 13, "Višegrad"),
    new city(127, 13, "Vlasenica"),
    new city(128, 13, "Zvornik"),

    new city(129, 14, "Berkovići"),
    new city(130, 14, "Bileća"),
    new city(131, 14, "Čajniče"),
    new city(132, 14, "Foča"),
    new city(133, 14, "Gacko"),
    new city(134, 14, "Istočni Mostar"),
    new city(135, 14, "Kalinovik"),
    new city(136, 14, "Ljubinje"),
    new city(137, 14, "Nevesinje"),
    new city(138, 14, "Trebinje"),

    new city(139, 15, "Brčko"),

]

export function select_city(id: number) {
    return CITIES[id - 1];
}

export function selectListByFed(id: number) {
    let cities: city[] = [];

    CITIES.forEach(c => {
        if (c.idFed == id) {
            cities.push(c);
        }
    });

    return cities;
}




