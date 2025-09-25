
export type Mentor = {
  fullName: string;
  nickname: string;
  community: string;
};

export type Community = {
  name: string;
  mentors: Omit<Mentor, 'community'>[];
};

export const COMMUNITY_COLORS = {
  Ekilibro: '#6FD34A',
  Energio: '#FD8204',
  Forta: '#87004A',
  Krei: '#79858B',
  Kresko: '#0dcccc',
  Pasio: '#CC0202',
  Reflekto: '#FFDE17',
  Revo: '#C4829A',
  Spirita: '#5B0F8B',
  Talenta: '#EC008C',
};

export const MENTORS_BY_COMMUNITY: Community[] = [
  {
    name: 'Ekilibro',
    mentors: [
      { fullName: 'Leonardo Páez Hervert', nickname: 'Leo' },
      { fullName: 'Abril Joana Margarita De León Rincón', nickname: 'Abril' },
      { fullName: 'Martha Gabriela Flores Ramírez', nickname: 'Martha' },
      { fullName: 'María del Carmen Mora González', nickname: 'MariCa' },
      { fullName: 'Juliana Garza Treviño', nickname: 'July' },
    ],
  },
  {
    name: 'Energio',
    mentors: [
      { fullName: 'Marco Vinicio Cristerna Mata', nickname: 'Vinny' },
      { fullName: 'Pamela Martínez Sepúlveda', nickname: 'Pame' },
      { fullName: 'Ricardo Acosta Klein', nickname: 'Klein' },
      { fullName: 'José Antonio Manuel Rodríguez Rivera', nickname: 'Tony' },
      { fullName: 'Francisca Isabel De la Garza Núñez', nickname: 'Isa' },
    ],
  },
  {
    name: 'Forta',
    mentors: [
      { fullName: 'Zoé Nohemí Montoya Campos', nickname: 'Zoé' },
      { fullName: 'Dámaris Yannaí Morales Leal', nickname: 'Dámaris' },
      { fullName: 'Antonio Rowland Ramos Díaz', nickname: 'Tony Rowland' },
      { fullName: 'Arturo Temolzi Torres', nickname: 'Arturo' },
      { fullName: 'Enrique Adolfo Garza Chávez', nickname: 'Kike' },
    ],
  },
  {
    name: 'Krei',
    mentors: [
      { fullName: 'José Ricardo Flores Espinoza', nickname: 'JR' },
      { fullName: 'Karen Ariadna Guzmán Vega', nickname: 'Karen' },
      { fullName: 'Karla Lorena Villarreal Aldape', nickname: 'Karla' },
      { fullName: 'Angélica Yolanda Zúñiga Montemayor', nickname: 'Angie' },
      { fullName: 'Juan José Franklin Uraga', nickname: 'Franklin' },
    ],
  },
  {
    name: 'Kresko',
    mentors: [
      { fullName: 'Dacia González Fernández', nickname: 'Dacia' },
      { fullName: 'Andrea Herrera Morales', nickname: 'Andy' },
      { fullName: 'Gustavo Paceli de Luca Gallegos', nickname: 'Paceli' },
      { fullName: 'Aleyda Carime Fernández Marchán', nickname: 'Aleyda' },
    ],
  },
  {
    name: 'Pasio',
    mentors: [
      { fullName: 'Roger Rosado Montes', nickname: 'Roger Rosado' },
      { fullName: 'Rocío del Carmen Flores Martínez', nickname: 'Rocío' },
      { fullName: 'Rodrigo Eugenio Holguín Salinas', nickname: 'Rodrigo' },
      { fullName: 'Alma Beatriz Mercado Guerra', nickname: 'Alma' },
      { fullName: 'Monserrat Tijerina Cervantes', nickname: 'Monse' },
    ],
  },
  {
    name: 'Reflekto',
    mentors: [
      { fullName: 'Chantal Alejandra Magallanes Garza', nickname: 'Chantal' },
      { fullName: 'Alinna Correa Escobedo', nickname: 'Alinna' },
      { fullName: 'Laura Lidia Martínez Ochoa', nickname: 'Laura' },
      { fullName: 'Ana María Pinilla Torres', nickname: 'Annie' },
      { fullName: 'Abigail Cepeda Hernández', nickname: 'Abby' },
    ],
  },
  {
    name: 'Revo',
    mentors: [
      { fullName: 'Norman Ernesto Ramírez González', nickname: 'Norman' },
      { fullName: 'José Rogelio Rivas Pimentel', nickname: 'Roger Rivas' },
      { fullName: 'Fabiola Guadalupe Villarreal García', nickname: 'Fabi' },
      { fullName: 'María del Roble Mendiola Delgado', nickname: 'María' },
      { fullName: 'Montserrat García Yáñez', nickname: 'Montserrat' },
    ],
  },
  {
    name: 'Spirita',
    mentors: [
      { fullName: 'Jacob de la Cruz Hinojosa', nickname: 'Jacob' },
      { fullName: 'Fabiola Ivette Campos Salgado', nickname: 'Faby' },
      { fullName: 'Christopher Jean-Philippe Josette Michau', nickname: 'Chris' },
    ],
  },
  {
    name: 'Talenta',
    mentors: [
      { fullName: 'Jorge Mauricio Noriega Montemayor', nickname: 'Mau' },
      { fullName: 'Beatriz Eugenia González Canales', nickname: 'Betyclub' },
      { fullName: 'Brenda Alicia Ramírez Téllez', nickname: 'Brenda' },
      { fullName: 'Laura Gabriela Ríos Contreras', nickname: 'Gaby' },
      { fullName: 'Samira Susana Suro Barbosa', nickname: 'Sami' },
    ],
  },
];

export const ALL_MENTORS: Mentor[] = MENTORS_BY_COMMUNITY.flatMap(community =>
  community.mentors.map(mentor => ({ ...mentor, community: community.name }))
);
