import TreeNode from "../../../structures/TreeNode";
import random from "../../../utils/random";

/**
  Example
  
 *  Node
    const node1 = new TreeNode(0, false, -790, 590, "¿En qué afore estoy?", 2);

 *  Game node
    const node2 = new TreeNode(0, false, -790, 590); //juego 0

 *  Set Descendants
    node1.descendants = [
      { node: node1_2, hint: "Preguntaré en RH de mi empresa" },
      { node: node1_3, hint: "Revisaré en internet" },
    ];

 *  Set Game
    node2.game = 0;
 */

const node1 = new TreeNode(
  0,
  false,
  -1052,
  772,
  "Ahora que me quedé sin empleo y tampoco encuentro uno, debo investigar si hay alguna ayuda por parte de insttituciones o gobierno",
  2
);

node1.quotes = [
  "“El estrés de no ser autosuficiente es lo peor”",
  "“Échame la mano, no tengo ni para comer”",
];

const node1_2 = new TreeNode(
  2,
  false,
  -1052,
  772,
  "Un amigo que está en una situación similar me comentó que el hizo un retiro por desempleo de su Afore. No recuerdo en cual estoy, pero recuerdo que alguna vez me puse en contacto con Profuturo.",
  2
);

//node1_2.game = 6;

node1_2.quotes = [
  "“Con esto podré darles algo a mis hijos en Navidad”",
  "“Saber que podía hacer un retiro me dió tranquilidad, al menos así voy a poder mantener a la familia un tiempo”",
  "“Cuando perdí mi empleo, lo único que me preocupaba era la inscripción de mi hija a la escuela”",
];

const node1_3 = new TreeNode(
  2,
  false,
  -1052,
  772,
  "Encontré que puedo hacer un retiro de mi Afore. No recuerdo en cuál estoy, pero recuerdo que alguna vez me puse en contacto con Profuturo.",
  2
);

//const node2 = new TreeNode(0, false, -1355, 950, "¿En qué Afore estoy?", 2);

const node2_2 = new TreeNode(
  2,
  false,
  -1355,
  950,
  "Encontré una página que se llama e'sar que me dijo que mi Afore es Profuturo. Buscaré como contactarlos",
  2
);

//const node3 = new TreeNode(0, false, -1485, 1025, "Profuturo es mi Afore", 2);

const node4 = new TreeNode(
  0,
  false,
  -2177,
  1263,
  "Encontré que tienen un call center y sucursales.",
  2
);

node4.quotes = [
  "“Me enteré por un amigo que podía hacer retiros en mi Afore si es que lo necesitaba”",
  "“La información que dan para hacer el tramite no es clara y no es de mucha ayuda, solo me confundí”",
];

const node4_1 = new TreeNode(
  0,
  false,
  -2177,
  1263,
  "Veo que puedo hacer cita, pero solo hay disponibilidad dentro de una semana.",
  2
);

const node4_1_1 = new TreeNode(2, false, -2177, 1263, "Te atienden rápido.", 2);

const node4_1_2 = new TreeNode(
  2,
  false,
  -2177,
  1263,
  "Te atienden en una hora.",
  2
);

const node5 = new TreeNode(
  1,
  false,
  -2687,
  1100,
  "¿Es un cliente registrado?",
  2
);

node5.quotes = [
  "“Cuando vi que podía hacer un retiro por desempleo, ni sabía en que Afore estaba, cuando supe, tuve que registrarme, lo cual hizo que todo fuera más tardado, no entienden que tenemos una necesidad...”",
  "“La persona que me atendió fué muy amable, me supo explicar todo y me resolvió dudas. ¡El servicio está para aplaudirse!”",
];

const node5_1 = new TreeNode(
  1,
  false,
  -2687,
  1100,
  "Hola, estás marcando a Profuturo, ¿en qué te puedo apoyar?",
  0
);

const node5_1_2 = new TreeNode(
  0,
  false,
  -2687,
  1100,
  "Me gustaría hacer un retiro por desempleo, ¿qué es lo que tengo que hacer?",
  0
);

const node5_1_3 = new TreeNode(
  1,
  false,
  -2687,
  1100,
  "Claro, ¿me podría proporcionar su CURP?",
  0
);

const node5_2_1 = new TreeNode(
  1,
  false,
  -2687,
  1100,
  "Ya eres cliente Profuturo y veo que tienes tu Expediente completo, podemos hacer el trámite de retiro por desempleo.",
  2
);

node5_2_1.quotes = ["“Me atendieron rápido en sucursal y me dieron asesoría”"];

const node5_2_2 = new TreeNode(
  1,
  false,
  -2687,
  1100,
  "Ya eres cliente Profuturo pero no tienes tu Expediente completo, antes de hacer el trámite de Retiro, tenemos que completar tu Expediente.",
  2
);

node5_2_2.quotes = [
  "“Citas tardan muchos días y en sucursal prácticamente no te atienden sin cita”",
];

const node5_3 = new TreeNode(
  1,
  false,
  -2687,
  1100,
  "No eres cliente de Profuturo, para hacer el trámite de retiro, primero tendremos que registrarte en la app Profuturo Movil y luego venir con nosotros para hacer el trámite de tu Expediente y luego el trámite de retiro.",
  2
);

node5_3.quotes = [
  "“No entiendo porqué si necesito hacer un retiro de mi Afore, me están pidiendo que haga un trámite antes”",
];

const node5_3_1 = new TreeNode(
  2,
  false,
  -2687,
  1100,
  "El trámite de registro en sucursal toma 10 días habiles. Además es necesario volver a hacer cita en sucursal para el Expediente ID. Te dicen cuáles son los documentos necesarios.",
  2
);

const node5_3_2 = new TreeNode(
  0,
  false,
  -2687,
  1100,
  "Ya vi en la app que mi trámite concluyó exitosamente, Tengo que ir a la sucursal, estoy revisando en el portal y no hay disponibilidad mas que la siguiente semana.",
  10 * 24
);

/*
const node6 = new TreeNode(
  1,
  false,
  -3215,
  1394,
  "¿Es un cliente registrado?",
  2
);
*/

const node6_2 = new TreeNode(
  1,
  false,
  -3215,
  1394,
  "Ya eres cliente Profuturo pero no tienes tu expediente completo, antes de hacer el trámite de retiro, tenemos quecompletar tu Expediente.",
  2
);

const node6_2_1 = new TreeNode(
  1,
  false,
  -3215,
  1394,
  "Ya eres cliente Profuturo y veo que tienes tu Expediente completo, podemos hacer el trámite de Retiro por Desempleo.",
  2
);

const node6_3 = new TreeNode(
  1,
  false,
  -3215,
  1394,
  "No eres cliente Profuturo, para hacer en trámite de retiro, tendrás que primero registrarte en la app Profuturo Movil y luego venis con nosotros para hacer el trámite de tu expediente y luego el trámite de Retiro.",
  2
);

const node7 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Vamos a empezar el trámite del Expediente de identificación, ingresemos tu CURP.",
  0
);

node7.quotes = [
  "“Me urge el dinero y al final se tardan años, no tienen nada de consideración con sus clientes, solo nos ponen trabas y trabas para para sacar NUESTRO dinero”",
];

const node7_2 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Vamos a empezar el trámite del Expediente de identificación, ingresemos tu CURP",
  1
);

node7_2.quotes = [
  "“Me urge el dinero y al final se tardan años, no tienen nada de consideración con sus clientes, solo nos ponen trabas y trabas para para sacar NUESTRO dinero”",
];

const node8 = new TreeNode(2, false, -3215, 1394, "Juego 1 (Proximamente)"); //juego 0

const node8_2 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Hay un problema con tu CURP, te recomendamos que vayas con RENAPO para aclarar el problema y después regresa con nosotros para hacer nuevamente el trámite.",
  2
);

node8_2.quotes = [
  "“Nunca nos ofrecen el expediente para evitarnos hacer estas vueltas cuando necesitamos estos trámites, el servicio que recibí creo que tiene areas de oportunidad. La verdad me piienso cambiar de Afore”",
];

const node8_2_1 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Pasan 70 días y tiene que volver a ir a sucursal para hacer el expediente, lo hace y va todo ok (son 5 días habiles para el resultado del trámite)",
  24 * 70
);

const node8_3 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "No hay ningún problema con la CURP",
  2
);

node8_3.quotes = [
  "“La señorita me ayudó a capturar mi trámite muy rápido, que bueno que consideren los tiempos de sus clientes”",
];

const node8_3_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "El trámite va a tardar 5 días habiles",
  2
);

const node8_3_1_1 = new TreeNode(
  1,
  false,
  -3215,
  1394,
  "Ya me llegó la confirmación de que mi trámite de expedientees correcto, ya por fin podré hacer el trámite de retiro por desempleo.",
  2
);

/*
const node8_3_1_2 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Hubo problemas con las huellas, tardamos mucho en este paso",
  2
);

const node8_3_1_1_2 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Juego 2 (Proximamente)"
); //juego 1

//node8_3_1_1_2.game = 6;
*/

const node8_4 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Comencemos con el trámite, ¿me permites tus documentos por favor?",
  0
);

const node8_4_2 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Comencemos con el trámite, me permites tus documentos por favor.",
  24
);

const node8_4_3 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Comencemos con el trámite, me permites tus documentos por favor.",
  25
);

const node8_5 = new TreeNode(2, false, -3215, 1394, "Juego 3 (Proximamente)"); //juego 2

const node8_5_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Hubo intermitencia en el sistema de Profuturo, tendré que regresar. El trámite esta tardando mucho, ¡ya necesito el dinero!",
  2
);

node8_5_1.quotes = [
  "“Se les olvida que es dinero del ahorrador, su aplicación para celular NUNCA funcionó, su personal siempre le echa la culpa al IMSS, y mientras uno apenas vive, el dinero no es para la parranda, ¡es para SOBREVIVIR!”",
];

const node8_5_2 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "No hay sistema del IMSS, tendré que regresar. El tramite está tardando mucho, ¡ya necesito el dinero!",
  2
);

node8_5_2.quotes = [
  "“Me rechazaron el trámite por un diagnóstico que no entendí, la persona de sucursal fué muy amable y me explicó qué es lo que debía de hacer”",
];

const node8_5_3 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "No existe consulta para la certificación parcial, tendré que regresar. El tramite está tardando mucho, ¡ya necesito el dinero!",
  2
);

node8_5_3.quotes = [
  "“Me rechazaron el trámite por un diagnóstico que no entendí, la persona de sucursal fué muy amable y me explicó qué es lo que debía de hacer”",
];

const node8_5_4 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "Pre-validación de mi solicitud para el IMSS, van a dar un diagnostico",
  2
);

node8_5_4.quotes = [
  "“Hace unos años había hecho el trámite de retiro y fué muy tardado, que bueno que mejoraron su atención y sus procesos, hacen que sea más fácil la situación que uno vive”",
];

const node8_6 = new TreeNode(
  2,
  false,
  -3085,
  1324,
  "Es necesario regresar en otro momento para continuar",
  2
);

const node8_7 = new TreeNode(2, false, -3215, 1394, "Juego 4 (Proximamente)"); //juego 3

const node8_7_1 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "El diagnóstico fué rechazado",
  2
);

node8_7_1.quotes = [
  "“No me dejaron sacar lo que quería, me dieron un tope de monto, pero al final ese dinero es mío...”",
];

const node8_7_1_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Dicen que sigo activo ante el IMSS, tienen que pasar 46 días para que me den de baja. ¡Necesito dinero!",
  2
);

const node8_7_2 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "El diagnóstico fué rechazado",
  2
);

node8_7_2.quotes = [
  "“No me dejaron sacar lo que quería, me dieron un tope de monto, pero al final ese dinero es mío...”",
];

const node8_7_2_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Hice otro retiro por desempleo en los últimos cinco años, no me paso los requisitos y no me pueden liberar dinero, ¿qué hago? ¡Necesito dinero!",
  2
);

const node8_7_3 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "El diagnóstico fué rechazado",
  2
);

node8_7_3.quotes = [
  "“No me dejaron sacar lo que quería, me dieron un tope de monto, pero al final ese dinero es mío...”",
];

const node8_7_3_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Como estoy en demanda con el Patrón, no me pueden liberar los recursos. ¡Necesito dinero!",
  2
);

const node8_7_4 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "El diagnóstico fué rechazado",
  2
);

node8_7_4.quotes = [
  "“No me dejaron sacar lo que quería, me dieron un tope de monto, pero al final ese dinero es mío...”",
];

const node8_7_4_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Hubo una omisión (diferencia de firmas, faltó un documento, no se leyó correctamente) y lo tienen que arreglar. ¡Llevo horas aquí!",
  2
);

const node8_7_5 = new TreeNode(
  2,
  false,
  -3215,
  1394,
  "El diagnóstico fué aceptado",
  2
);

node8_7_5.quotes = [
  "“Me explicaron las consecuencias de hacer el retiro, está bien que nos digan para estar informados y poder hacer algo después”",
];

const node8_7_5_1 = new TreeNode(
  0,
  false,
  -3215,
  1394,
  "Mandaron mi Expediente de Servicio a procesar, tardarán 5 días habiles. ¡Me van a pagar!",
  2
);

node8_7_5_1.quotes = [
  "“Me debieron depositar a inicios del mes y sigo esperando el deposito, por eso es apoyo de desempleo porque no tengo un ingreso y requiero de dinero para saldar deudas y gasto corriente”",
  "“Demasiado complejos los requisitos y además el trámite deberia ser único y no en abonos”",
];

const node8_7_6 = new TreeNode(
  0,
  false,
  -3560,
  1694,
  "¡Me llegó la notificación, ya tengo mi dinero! Incluso lo recibí antes de lo esperado, ¡triunfo!",
  24 * 5
);

node8_7_6.quotes = [
  "“Esperaba el dinero en 5 días y me lo depositaron en 3, sentí que Profuturo llegó como ángel”",
];

const node8_8 = new TreeNode(
  2,
  false,
  -3560,
  1694,
  "Retiro por desempleo es rechazado",
  2
);

const node9 = new TreeNode(2, false, -3560, 1694);

//////

node1.descendants = [
  {
    node: node1_2,
    hint: "Le preguntaré a amigos y familiares",
  },
  {
    node: node1_3,
    hint: "Buscaré en internet",
  },
];

node1_2.descendants = [
  {
    node: node4,
    hint: "Lo más seguro es que sí sea Profuturo, buscaré su contacto",
  },
  { node: node2_2, hint: "Buscaré en internet" },
];

node1_3.descendants = [
  {
    node: node4,
    hint: "Lo más seguro es que sí sea Profuturo, buscaré su contacto",
  },
  { node: node2_2, hint: "Buscaré en internet" },
];

/*
node2.descendants = [
  {
    node: node4,
    hint: "Profuturo es mi Afore",
  },
  {
    node: node2_2,
    hint: "Preguntaré en Recursos Humanos de mi empresa",
  },
  {
    node: node3,
    hint: "Revisaré en internet cómo saber en qué Afore estoy",
  },
];
*/

node2_2.descendants = [
  {
    node: node4,
    hint: "Continuar",
  },
];

/*
node3.descendants = [
  {
    node: node4,
    hint: "Continuar",
  },
];
*/
node4.descendants = [
  {
    node: node5_1,
    hint: "Marcaré para que me den toda la información",
  },
  {
    node: node4_1,
    hint: "Visitaré la sucursal más cerca de mi casa para que me apoyen con el trámite",
  },
];

node4_1.descendants = [
  {
    node: random([node6_2, node6_2_1, node6_3]),
    hint: "Me conviene agendar cita para no esperar en la sucursal",
  },
  {
    node: random([node4_1_1, node4_1_2]),
    hint: "Me urge el dinero, prefiero ir mañana aunque tenga que esperar mucho tiempo",
  },
];

node4_1_1.descendants = [
  {
    node: random([node6_2, node6_2_1, node6_3]),
    hint: "Continuar",
  },
];

node4_1_2.descendants = [
  {
    node: random([node6_2, node6_2_1, node6_3]),
    hint: "Continuar",
  },
];

/*
node5.descendants = [
  {
    node: node5_2,
    hint: "Sí, soy cliente de profuturo",
  },
  {
    node: node5_3,
    hint: "No, no estoy registrado",
  },
];

node5_2.descendants = [
  {
    node: node5_2_1,
    hint: "Sí, tengo el Expediente de Id",
  },
  {
    node: node5_2_2,
    hint: "No tengo el expediente de Id",
  },
];
*/

node5_1.descendants = [{ node: node5_1_2, hint: "Continuar" }];

node5_1_2.descendants = [{ node: node5_1_3, hint: "Continuar" }];

node5_1_3.descendants = [
  { node: random([node5_2_1, node5_2_2, node5_3]), hint: "Proporcionar CURP" },
];

node5_2_1.descendants = [
  {
    node: node8_4,
    hint: "Me conviene agendar una cita para no esperar en la sucursal",
  },
  {
    node: random([node8_4_2, node8_4_3]),
    hint: "Me urge el dinero, prefiero ir mañana aunque espera mucho tiempo",
  },
];

node5_2_2.descendants = [
  {
    node: node7,
    hint: "Me conviene agendar una cita para no esperar en la sucursal",
  },
  {
    node: random([node7, node7_2]),
    hint: "Me urge el dinero, prefiero ir mañana aunque espera mucho tiempo",
  },
];

node5_3.descendants = [
  {
    node: node5_3_1,
    hint: "Continuar",
  },
];

node5_3_1.descendants = [
  {
    node: node5_3_2,
    hint: "Continuar",
  },
];

node5_3_2.descendants = [
  {
    node: node7,
    hint: "Me conviene agendar una cita para no esperar en la sucursal",
  },
  {
    node: random([node7, node7_2]),
    hint: "Me urge el dinero, prefiero ir mañana aunque espera mucho tiempo",
  },
];

/*
node6.descendants = [
  {
    node: node6_2,
    hint: "Sí, soy cliente de profuturo",
  },
  {
    node: node6_3,
    hint: "No, no estoy registrado",
  },
];
*/

node6_2.descendants = [
  {
    node: node7,
    hint: "Continuar",
  },
];

node6_2_1.descendants = [
  {
    node: node8_4,
    hint: "Continuar",
  },
];

node6_3.descendants = [
  {
    node: node5_3,
    hint: "Continuar",
  },
];

node7.descendants = [
  {
    node: node8,
    hint: "Continuar",
  },
];

node7_2.descendants = [
  {
    node: node8,
    hint: "Continuar",
  },
];

node8.descendants = [
  {
    node: node8_2,
    hint: "Resultado 1",
  },
  {
    node: node8_3,
    hint: "Resultado 2",
  },
];

node8.game = 5;

node8_2.descendants = [
  {
    node: node8_2_1,
    hint: "Continuar",
  },
];

node8_2_1.descendants = [
  {
    node: node8_3_1_1,
    hint: "Continuar",
  },
];

node8_3.descendants = [
  {
    node: node8_3_1,
    hint: "Continuar",
  },
];

node8_3_1.descendants = [
  {
    node: node8_3_1_1,
    hint: "Continuar",
  },
];

node8_3_1_1.descendants = [
  {
    node: node8_4,
    hint: "Continuar",
  },
];

/*
node8_3_1_1_2.descendants = [
  {
    node: node8_3_1_2,
    hint: "Resultado",
  },
];

node8_3_1_1_2.game = 3;

node8_3_1_2.descendants = [
  {
    node: node8_4,
    hint: "Continuar",
  },
];
*/

node8_4.descendants = [
  {
    node: node8_5,
    hint: "Continuar",
  },
];

node8_4_2.descendants = [
  {
    node: node8_5,
    hint: "Continuar",
  },
];

node8_4_3.descendants = [
  {
    node: node8_5,
    hint: "Continuar",
  },
];

node8_5.descendants = [
  {
    node: node8_5_1,
    hint: "Resultado 1",
  },
  {
    node: node8_5_2,
    hint: "Resultado 2",
  },
  {
    node: node8_5_3,
    hint: "Resultado 3",
  },
  {
    node: node8_5_4,
    hint: "Resultado 4",
  },
];

node8_5.game = 7;

node8_5_1.descendants = [
  {
    node: node8_6,
    hint: "Continuar",
  },
];

node8_5_2.descendants = [
  {
    node: node8_6,
    hint: "Continuar",
  },
];

node8_5_3.descendants = [
  {
    node: node8_6,
    hint: "Continuar",
  },
];

node8_5_4.descendants = [
  {
    node: node8_7,
    hint: "Continuar",
  },
];

node8_6.descendants = [
  {
    node: node8_5_4,
    hint: "Continuar",
  },
];

node8_7.descendants = [
  {
    node: node8_7_1,
    hint: "Resultado 1",
  },
  {
    node: node8_7_2,
    hint: "Resultado 2",
  },
  {
    node: node8_7_3,
    hint: "Resultado 3",
  },
  {
    node: node8_7_4,
    hint: "Resultado 4",
  },
  {
    node: node8_7_5,
    hint: "Resultado 5",
  },
];

node8_7.game = 6;

node8_7_1.descendants = [
  {
    node: node8_7_1_1,
    hint: "¿Por qué?",
  },
];

node8_7_1_1.descendants = [
  {
    node: node8_5_4,
    hint: "Continuar",
  },
];

node8_7_2.descendants = [
  {
    node: node8_7_2_1,
    hint: "¿Por qué?",
  },
];

node8_7_2_1.descendants = [
  {
    node: node8_8,
    hint: "Continuar",
  },
];

node8_7_3.descendants = [
  {
    node: node8_7_3_1,
    hint: "¿Por qué?",
  },
];

node8_7_3_1.descendants = [
  {
    node: node8_8,
    hint: "Continuar",
  },
];

node8_7_4.descendants = [
  {
    node: node8_7_4_1,
    hint: "¿Por qué?",
  },
];

node8_7_4_1.descendants = [
  {
    node: node8_5_4,
    hint: "Continuar",
  },
];

node8_7_5.descendants = [
  {
    node: node8_7_5_1,
    hint: "¿Qué sigue?",
  },
];

node8_7_5_1.descendants = [
  {
    node: node8_7_6,
    hint: "Continuar",
  },
];

node8_7_6.descendants = [
  {
    node: node9,
    hint: "Continuar",
  },
];

node8_8.descendants = [
  {
    node: node9,
    hint: "Continuar",
  },
];

node9.isLast = true;

export default node1;
