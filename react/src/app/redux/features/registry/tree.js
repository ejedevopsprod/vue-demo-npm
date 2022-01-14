import TreeNode from "../../../structures/TreeNode";

const node1 = new TreeNode(
  0,
  false,
  -790,
  590,
  "Creo que empezaré buscando en qué Afore estoy, ¿cómo puedo saberlo?",
  0
);

node1.quotes = [
  "“He trabajado 7 años y nunca había escuchado el tema de las Afore, no tengo ni idea en cuál estoy y ni quien me metió ahí”",
  "“Un amigo me comentó que tenía un problema con su Afore, y es cuando comencé a ver que onda con la mía, me acuerdo haberlo visto cuando inicié a trabajar, pero de ahí nada”",
];

const node1_2 = new TreeNode(
  2,
  false,
  -790,
  590,
  "Recursos Humanos me recomendó buscar en internet en la página de e-sar, creo que debí haber empezado ahí desde el principio.",
  2
);

node1_2.quotes = [
  "“No recordaba en que Afore estaba, es impresionante que no te busquen”",
  "“Algo que valoro con Profuturo es que me mantienen informado de mi saldo, nunca dejen de hacerlo”",
];

//node1_2.game = 2;

const node1_3 = new TreeNode(
  0,
  false,
  -790,
  590,
  "Después de consultar la información en e-sar, no me convence la Afore en la que estoy, buscaré en internet cómo puedo cambiarme a la que más me conviene.",
  0
);

node1_3.quotes = [
  "“No entiendo como es que estaba en una Afore si nunca me registré ni nada, y como es posible que nunca me han contactado”",
  "“No es claro para la gente como funcionan las Afores, por eso uno las escoje por el tema del dinero, quien tenga mejor rendimiento, aunque me preocupa que nunca veré ese dinero”",
  "“Me decidí cambiar a Profuturo porque es una empresa que ha sabido demostrar solidez a lo largo de los años”",
];

const node2 = new TreeNode(0, false, -790, 590); //juego 0

const node3 = new TreeNode(
  0,
  false,
  -1800,
  1165,
  "Ahora que sé que Profuturo es la Afore que más me conviene, tengo que ver cómo cambiarme.",
  2
);
const node3_2 = new TreeNode(
  0,
  false,
  -2400,
  1500,
  "Después de mucho tiempo de buscar el teléfono por fin creo haberlo encontrado.",
  2
);
const node3_2_1 = new TreeNode(
  2,
  false,
  -2400,
  1500,
  "Escuchemos a nuestros clientes",
  2
);

node3_2.quotes = [
  "“Fue muy dificil encontrar los datos de contacto de Profuturo, parecia como si no quisieran que me cambiara con ellos”",
];

const node3_3 = new TreeNode(
  0,
  false,
  -2400,
  1500,
  "Dentro de su página me invitaron a hacerlo por la app, es un tema tan desconocido que no me siento listo para hacerlo solo, prefiero hacerlo con una persona, buscaré el teléfono para ver si alguien me puede ayudar.",
  2
);

const node3_4 = new TreeNode(0, false, -2400, 1500); //juego 1

//300,100
const node4 = new TreeNode(2, true, -2860, 2080, "Llamando.", 0);
node4.audio = 0;
const node4_2 = new TreeNode(
  1,
  true,
  -2860,
  2080,
  "Hola, estás hablando a Profuturo, ¿en qué te puedo ayudar? ",
  0
);
const node4_2_2 = new TreeNode(
  0,
  true,
  -2370,
  2370,
  "Listo. Volví a llamar y me comentaron que me va a marcar un asesor el día de mañana. Espero así sea.",
  1
);
const node4_3 = new TreeNode(
  0,
  true,
  -2860,
  2080,
  "Me gustaría cambiarme a Profuturo, ¿me podría explicar cómo hacerlo? Vi que se podía hacer por una app, pero sí me gustaría que alguien me asesore.",
  0
);
const node4_3_2 = new TreeNode(
  0,
  true,
  -2860,
  2080,
  "Estoy en espera de que un asesor me contacte y ya pasó una semana.",
  24 * 7
);

node4_3_2.quotes = [
  "“Esperé mucho para que alguien me llamara, pensé que nunca me iban a marcar”",
];

const node4_4 = new TreeNode(
  1,
  true,
  -2860,
  2080,
  "Claro, si estás de acuerdo, un asesor se pondrá en contacto contigo a la brevedad para ayudarte a hacer el trámite, sólo compárteme tus datos.",
  0
);
const node4_4_4 = new TreeNode(
  1,
  true,
  -2860,
  2080,
  "Entiendo, haré la notificación y en breve un asesor se pondrá en contacto.",
  0
);
const node4_5 = new TreeNode(
  0,
  true,
  -2860,
  2080,
  "De acuerdo, te comparto mis datos y espero la llamada del asesor.",
  1
);
const node4_6 = new TreeNode(
  2,
  true,
  -2370,
  2370,
  "La persona que me atendió en la llamada fue muy amable. ¿Cómo cuánto tiempo se tardará en llamarme el asesor? Espero que no mucho y me contacte pronto.",
  0
);
const node4_7 = new TreeNode(
  2,
  true,
  -2370,
  2370,
  "Ya pasaron 2 días desde que marqué a Profuturo y no me han llamado. Estaré pendiente del teléfono para que no se me pasé.",
  24 * 2
);
const node4_8 = new TreeNode(
  2,
  true,
  -2370,
  2370,
  "Ya van 5 días desde la llamada con Profuturo y sigo sin tener noticias, espero que no hayan perdido mi información y sí me marquen.",
  24 * 3
);
const node4_9 = new TreeNode(
  0,
  true,
  -2370,
  2370,
  "Ya pasó una semana y no me han contactado.",
  24 * 2
);

const node4_10 = new TreeNode(2, true, -2370, 2370, "Al día siguiente.", 24);
const node4_10_2 = new TreeNode(
  2,
  true,
  -2370,
  2370,
  "No puedo creer que van dos semanas y no he tenido noticias, ahora sí marcaré para ver qué pasó.",
  24 * 7
);

const node4_11 = new TreeNode(
  1,
  true,
  -2150,
  2500,
  "Hola, te marco de parte de Profuturo, me comentaron que te interesa cambiarte con nosotros. Para hacer el trámite es necesario que nos veamos, no tomará más de 15 minutos, ¿te queda bien mañana?",
  0
);

node4_11.quotes = [
  "“El asesor fué muy amable, agendamos la cita, solo no estaba seguro si sí era un asesor de Profuturo, me dió un poco de desconfianza. Deberían de asegurarse que todos sus asesores tengan su credencial o que por lo menos marquen de una línea oficial”",
];

const node5 = new TreeNode(
  0,
  true,
  -2150,
  2500,
  "No me comentaron y no pregunté si necesitaba algún documento.",
  0
);

node5.quotes = [
  "“NUNCA me dijeron que tenía que llevar mi INE para el trámite, lo que ocasionó que tuviera que reagendar la cita, por favor sean más cuidadosos con la información que proporcionan, juegan con el tiempo de las personas que quieren pasarse con ustedes”",
];
const node5_1 = new TreeNode(1, true, -2150, 2500, "Llamando.", 0);
const node5_1_1 = new TreeNode(
  1,
  true,
  -2150,
  2500,
  "Hola de nuevo, ¿surgió algún inconveniente para la cita de mañana?",
  0
);
const node5_3 = new TreeNode(
  0,
  true,
  -2150,
  2500,
  "No, sólo me surge una duda, ¿tengo que llevar algún documento a la cita? Si es así, ¿me podrías decir cuáles tengo que llevar?",
  0
);
const node5_4 = new TreeNode(
  1,
  true,
  -2150,
  2500,
  "Claro, una disculpa que no los comenté, los documentos que necesitas para el trámite son: CURP, Número de Seguridad Social, Tu INE / IFE y un comprobante de domicilio.",
  0
);

node5_4.quotes = [
  "“Su asesor fué muy paciente y me explicó todas mis dudas, hasta me explicó como funcionan las Afore, lo que nunca nadie había hecho, sigan así”",
];
const node5_5 = new TreeNode(
  0,
  true,
  -2150,
  2500,
  "Perfecto, los consigo y nos vemos mañana ¡Muchas gracias!",
  1
);

const node5_2_1 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "Hola, vamos a empezar con el trámite, ¿me permites tus documentos por favor?",
  24
);
const node5_2_2 = new TreeNode(
  0,
  true,
  -2550,
  2800,
  "¡No sabía que tenía que traer algún documento! ¿Hay forma de hacer el trámite sin ellos?",
  0
);
const node5_2_3 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "Para continuar con el trámite, el CURP, tu Número de Seguridad Social, tu INE / IFE y un comprobante de domicilio, son indispensables. Si estás de acuerdo, podemos reagendar la cita.",
  0
);
const node5_2_4 = new TreeNode(
  0,
  true,
  -2550,
  2800,
  "Creo que sí será conveniente reagendarla para mañana, y mientras consigo los documentos.",
  24
);
const node5_6 = new TreeNode(0, true, -2150, 2500, "", 24); //juego 2

const node6 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "Hola, ya con tus documentos podemos comenzar el trámite, y en algún punto tendremos que tomar tus huellas para validar tu identidad.",
  0
);
const node6_2 = new TreeNode(
  0,
  true,
  -2550,
  2800,
  "No me habían comentado algo sobre huellas y fotos. No sé si preguntar para qué los necesitan, me da un poco de pena, pero no me siento seguro.",
  0
);

node6_2.quotes = [
  "“Creo que las huellas no son necesarias para hacer el trámite, creo que bastaría con la INE o IFE, busquen hacer sus trámites más sencillos para los clientes”",
];
const node6_3 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "Necesitamos tus huellas y datos biométricos para poder validar tu identidad y asegurarnos que seas tu quién está haciendo este trámite, así tu ahorro para el retiro estará seguro.",
  0
);
const node6_4 = new TreeNode(0, true, -2550, 2800); //juego 3

const node6_5 = new TreeNode(
  2,
  true,
  -2550,
  2800,
  "Después de hora y media.",
  2
);
const node6_6 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "¡Listo! Terminamos con la solicitud de cambio. Ya mandamos toda la documentación para que sea validada y procesada, esto puede durar alrededor de 28 días naturales.",
  0
);

node6_6.quotes = [
  "“Me comentaron que el trámite duraba 20 min, esta es la segunda vez que veo a mi asesor por el tema de las huellas”",
  "“Mi asesor fue muy atento, solo falló el tema de las huellas, pero todo lo demás, la sesoría y la explicación estuvo excelente”",
];
const node6_7 = new TreeNode(
  0,
  true,
  -2550,
  2800,
  "¿28 días? ¿Por qué dura tanto tiempo? ¿Podría quedar antes? Quisiera saber cuánto tengo ahorrado.",
  0
);
const node6_8 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "En estos 28 días, vamos a validar tu información, que todo este correcto y si es así, se iniciaría con la transferencia de tus recursos a Profuturo. Esto por normativa no puede durar más de 28 días naturales. Para dar seguimiento al trámite puedes descargar la app Profuturo Móvil y ahí podrás ver el avance.",
  0
);
const node6_9 = new TreeNode(
  1,
  true,
  -2550,
  2800,
  "Te recomiendo descargar la app Profuturo Móvil donde podrás dar seguimiento al proceso",
  2
);
const node6_10 = new TreeNode(
  0,
  true,
  -2550,
  2800,
  "Muchas gracias por la recomendación, no cuento con espacio para descargarla, pero esperaré la confirmación de mi trámite. Gracias por el apoyo con el trámite.",
  2
);

node6_10.quotes = ["“Mejoren su aplicación, ¡no pude entrar nunca!”"];

//???
const node7 = new TreeNode(
  0,
  false,
  -2850,
  3000,
  "Ya pasaron los 28 días y no he recibido ninguna notificación de confirmación de que ya soy cliente de Profuturo. Creo que me contactaré con Profuturo.",
  28 * 24
);
const node7_1 = new TreeNode(2, false, -2850, 3000, "Llamando.", 0);
const node7_2 = new TreeNode(
  0,
  false,
  -2850,
  3000,
  "Mi asesor no me ha contestado, le mandaré un mensaje a ver si me contesta y me indica qué puedo hacer.",
  0
);
const node7_2_1 = new TreeNode(
  0,
  false,
  -2850,
  3000,
  "Llamar al Call center.",
  0
);

node7_2_1.quotes = [
  "“Tuve que marcar al call center porque no sabía si ya soy cliente Profuturo”",
];
const node7_2_2 = new TreeNode(0, false, -2850, 3000); //juego 3
const node7_3 = new TreeNode(
  1,
  false,
  -2850,
  3000,
  "Hola, estás hablando a Profuturo, ¿en qué te puedo ayudar?",
  0
);
const node7_4 = new TreeNode(
  0,
  false,
  -2850,
  3000,
  "Hace poco realicé el trámite para ser cliente Profuturo y quisiera saber cuál es su estatus.",
  0
);
const node7_5 = new TreeNode(
  1,
  false,
  -2850,
  3000,
  "Claro, un momento por favor, voy a consultar el estatus.",
  0
);
const node7_6 = new TreeNode(
  1,
  false,
  -2850,
  3000,
  "Listo, ya eres cliente de Profuturo, te recomendamos bajar la app Profuturo Móvil para estar al tanto de tu Afore.",
  1
);
const node7_7 = new TreeNode(
  0,
  false,
  -2850,
  3000,
  "Si no tengo espacio, ¿hay alguna otra forma en la que pueda revisar mi saldo?",
  0
);

node7_7.quotes = [
  "“Con tanto trámite y vueltas lo único que uno quiere es ver que su dinero esté bien”",
];
const node7_8 = new TreeNode(
  1,
  false,
  -2850,
  3000,
  "Mensualmente mandamos un resumen de saldos donde podrá ver su saldo al día, adicional se lo puedo compartir ahorita. ¿Qué opción preferirías?",
  0
);
const node7_9 = new TreeNode(2, false, -2850, 3000, "Voy a:", 2);
//???
const node8 = new TreeNode(
  0,
  false,
  -3350,
  3100,
  "Perfecto, esperaré el boletín mensual.",
  1
);
const node8_2 = new TreeNode(
  0,
  false,
  -3350,
  3100,
  "Me costó un poco de trabajo pero después de crear mi perfil pude consultar mi saldo al fin",
  1
);
const node8_3 = new TreeNode(
  0,
  false,
  -3350,
  3100,
  "Que trámite tan complicado y sigo sin saber mi saldo :(",
  0
);
const node9 = new TreeNode(0, false, -3350, 3100);

node1.descendants = [
  { node: node9 },
  { node: node1_2, hint: "Preguntaré en Recursos Humanos de mi empresa" },
  { node: node1_3, hint: "Revisaré en internet" },
];
node1_2.descendants = [{ node: node1_3, hint: "Continuar" }];
//node1_2.audio = 1;
node1_3.descendants = [{ node: node2, hint: "Continuar" }];

node2.game = 0;
node2.descendants = [{ node: node3 }];

node3.descendants = [
  { node: node3_2, hint: "Buscaré su teléfono en internet" },
  { node: node3_3, hint: "Buscaré en su página cómo hacerlo" },
];
node3_2.descendants = [{ node: node3_2_1, hint: "Continuar" }];
node3_2_1.descendants = [{ node: node3_4 }];
node3_3.descendants = [{ node: node3_2, hint: "Continuar" }];
node3_4.game = 1;
node3_4.descendants = [{ node: node4 }];

node4.descendants = [{ node: node4_2, hint: "Continuar" }];
node4_2.descendants = [{ node: node4_3, hint: "Continuar" }];
node4_2_2.descendants = [{ node: node4_10, hint: "Continuar" }];

node4_3.descendants = [{ node: node4_4, hint: "Continuar" }];
node4_3_2.descendants = [{ node: node4_4_4, hint: "Continuar" }];
node4_4.descendants = [{ node: node4_5, hint: "Continuar" }];
node4_4_4.descendants = [{ node: node4_10, hint: "Continuar" }];
node4_5.descendants = [{ node: node4_6, hint: "Continuar" }];
node4_6.descendants = [{ node: node4_7, hint: "Continuar" }];
node4_7.descendants = [{ node: node4_8, hint: "Continuar" }];
node4_8.descendants = [{ node: node4_9, hint: "Continuar" }];

node4_9.descendants = [
  { node: node4_10_2, hint: "Esperaré un poco más." },
  { node: node4_2_2, hint: "Marcaré nuevamente a Profuturo." },
];

node4_10.descendants = [{ node: node4_11, hint: "Continuar" }];
node4_10_2.descendants = [{ node: node4_2_2, hint: "Continuar" }];

node4_11.descendants = [{ node: node5, hint: "Me parece bien" }];

node5.descendants = [
  {
    node: node5_1,
    hint: "Marcaré al asesor que me contactó para estar seguro.",
  },
  {
    node: node5_2_1,
    hint: "No creo que necesite alguno, si no me lo hubieran dicho, asistiré así a la cita.",
  },
];
node5_1.descendants = [{ node: node5_1_1, hint: "Continuar" }];
node5_2_1.descendants = [{ node: node5_3, hint: "Continuar" }];
node5_3.descendants = [{ node: node5_4, hint: "Continuar" }];
node5_4.descendants = [{ node: node5_5, hint: "Continuar" }];
node5_5.descendants = [{ node: node5_6, hint: "Continuar" }];

node5_2_1.descendants = [{ node: node5_2_2, hint: "Continuar" }];
node5_2_2.descendants = [{ node: node5_2_3, hint: "Continuar" }];
node5_2_3.descendants = [{ node: node5_2_4, hint: "Continuar" }];
node5_2_4.descendants = [{ node: node5_6, hint: "Reagendar cita" }];

node5_6.game = 2;
node5_6.descendants = [{ node: node6 }];

node6.descendants = [{ node: node6_2, hint: "Continuar" }];
node6_2.descendants = [
  { node: node6_3, hint: "Preguntaré para quitarme la duda" },
  { node: node6_4, hint: "No preguntaré, seguro así es en todos lados" },
];
node6_3.descendants = [{ node: node6_4, hint: "Continuar" }];
node6_4.game = 3;
node6_4.descendants = [{ node: node6_6 }];
node6_5.descendants = [{ node: node6_6, hint: "Continuar" }];
node6_6.descendants = [{ node: node6_7, hint: "Continuar" }];
node6_7.descendants = [{ node: node6_8, hint: "Continuar" }];
node6_8.descendants = [{ node: node6_10, hint: "Continuar" }];
node6_9.descendants = [{ node: node6_10, hint: "Continuar" }];
node6_10.descendants = [{ node: node7, hint: "Continuar" }];

node7.descendants = [
  { node: node7_1, hint: "Llamar al Call Center" },
  { node: node7_2_2, hint: "Contactar a mi asesor" },
];

node7_1.descendants = [{ node: node7_2_2, hint: "Continuar" }];
node7_2.descendants = [{ node: node7_2_2, hint: "Continuar" }];
node7_2_1.descendants = [{ node: node7_2_2, hint: "Continuar" }];
node7_2_2.game = 4;
node7_2_2.descendants = [{ node: node7_3 }];
node7_3.descendants = [{ node: node7_4, hint: "Continuar" }];
node7_4.descendants = [{ node: node7_5, hint: "Continuar" }];
node7_5.descendants = [{ node: node7_6, hint: "Continuar" }];
node7_6.descendants = [{ node: node7_7, hint: "Continuar" }];
node7_7.descendants = [{ node: node7_8, hint: "Continuar" }];
node7_8.descendants = [{ node: node7_9, hint: "Continuar" }];
node7_9.descendants = [
  { node: node8, hint: "Liberar espacio en mi celular y descargar la app." },
  { node: node8_2, hint: "Pedir que me lo manden en este momento." },
  {
    node: node8_3,
    hint: "Esperar al boletín mensual.",
  },
];
node8.descendants = [{ node: node9, hint: "Continuar" }];
node8_2.descendants = [{ node: node9, hint: "Continuar" }];
node8_3.descendants = [{ node: node9, hint: "Continuar" }];
node9.isLast = true;

export default node1;
