import type { Locale } from "@/i18n/config";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT + CATEGORY COPY — ES / PT
 * ─────────────────────────────────────────────────────────────────────────
 *  Localized marketing copy for each printer (specLine / description /
 *  highlights) and each category (label / blurb). English lives in the source
 *  data (products.ts); `en` here is intentionally empty so tp()/tc() fall back
 *  to the English source. Product NAMES (FF-M300, DeskFab X1, …) and spec
 *  TABLE values (dimensions, materials) are universal and stay as-is.
 * ─────────────────────────────────────────────────────────────────────────
 */

type ProductCopy = {
  specLine?: string;
  description?: string;
  highlights?: string[];
};

const esProducts: Record<string, ProductCopy> = {
  "deskfab-x1": {
    specLine: "Volumen Ø100 × 70 mm · láser de fibra 300 W · CoCr y titanio",
    description:
      "Una verdadera impresora de metal SLM de escritorio, todo en uno, hecha para laboratorios dentales y trabajos de metal en lotes pequeños. Su huella compacta de 0,39 m², la impresión con IA en un clic y un filtro permanente sin mantenimiento la convierten en la entrada más fácil a la fabricación aditiva de metal en casa.",
    highlights: [
      "Diseño de escritorio integrado todo en uno — 600×650×800 mm, solo 0,39 m² de espacio",
      "Filtro permanente: 30 000 horas de vida útil, sin mantenimiento, sin herramientas, cero errores de instalación",
      "Impresión con IA en un clic — de escaneo a diseño en ~5 minutos",
      "Cartucho modular multimaterial: CoCr, Ti y más, intercambiables",
      "Instalación sin complicaciones con conductos codificados en 4 colores a prueba de errores",
      "La exclusiva LFPT (tecnología de polvo seguido por láser) mejora la eficiencia ~20 %",
    ],
  },
  "ff-m140": {
    specLine: "Volumen Ø140 × 170 mm · láser 500 W · ~150 dientes por ciclo",
    description:
      "Una impresora de metal SLM dental especializada de un solo láser, con volumen Ø140 mm y disposición dental en un clic. Diseñada para componentes dentales precisos y personalizados con alta productividad.",
    highlights: [
      "Sistema óptico estable con disposición dental en un clic",
      "Construcción rápida — ~150 dientes por ciclo",
      "Sin desperdicio de cartuchos de filtro, alto aprovechamiento del polvo",
      "Disposición y procesamiento de datos completos en ~5 minutos",
      "Equipada con cámara para monitoreo remoto seguro",
      "El software de control admite empalme multiláser de hasta 36 galvanómetros",
    ],
  },
  "ff-m220": {
    specLine: "220 × 140 × 100 mm · dos láseres de 500 W · 300 coronas/ciclo",
    description:
      "Una impresora de metal SLM de doble láser con gran volumen de construcción — imprime hasta 300 coronas o 30 estructuras en un solo ciclo. Filtro permanente, tecnología de eficiencia LFPT y software propio gratis para siempre.",
    highlights: [
      "Doble láser, gran volumen — 220×140×100 mm (hasta H200 mm); 300 coronas o 30 estructuras por ciclo",
      "Filtro permanente: 30 000 horas de vida útil, cero costo de reemplazo",
      "LFPT reduce el tiempo de polvo por capa en 9 s (~20 % más de eficiencia)",
      "Disposición en un clic (5 min) e impresión en un clic; software gratis para siempre",
      "Componentes principales a precio de costo y soporte técnico 24 horas",
    ],
  },
  "ff-m300": {
    specLine: "300 × 300 × 400 mm · 2–4 láseres de 500 W · 100 cm³/h",
    description:
      "Una impresora de metal SLM de gran formato para moldes industriales, utillaje y trabajo dental de alto volumen. Esparcido de polvo bidireccional y disposición en un clic para una producción en serie rápida y estable.",
    highlights: [
      "Sistema óptico estable con disposición en un clic",
      "Construcción rápida — ~300 dientes / 5 horas, 30 soportes / 6 horas",
      "Esparcido de polvo bidireccional, alto aprovechamiento del polvo",
      "Disposición y procesamiento de datos completos en ~5 minutos",
      "Monitoreo remoto por cámara; gran estabilidad y fácil instalación",
      "Certificada CE; usada en aeroespacial, automoción, medicina y educación",
    ],
  },
  "ff-m420": {
    specLine: "Volumen 420 × 420 mm · SLM multiláser · tasa de formación 240 cm³/h",
    description:
      "La impresora de metal SLM insignia, multiláser y de formato súper grande, hecha para producción en serie exigente con un sistema de circulación de polvo para tiradas de alto volumen.",
    highlights: [
      "Construcción multiláser súper grande para producción en serie",
      "Sistema de circulación de polvo para facilitar tiradas de alto volumen",
      "Sin desperdicio de cartuchos de filtro, menor uso de polvo",
      "Disposición y procesamiento de datos en ~5 minutos",
      "Esparcido de polvo bidireccional para mayor velocidad",
      "Monitoreo remoto por cámara para una operación segura y sin intervención",
      "Certificada CE",
    ],
  },
  "ff-m800": {
    specLine: "SLM multiláser súper grande · 4 láseres · producción en serie industrial",
    description:
      "Nuestra máquina más industrial. La FF-M800 es un sistema SLM multiláser de formato súper grande hecho para producción exigente — cuatro láseres combinados con un sistema de doble espejo vibratorio, alimentación de polvo bidireccional de velocidad variable y control de lazo cerrado en el eje Z trabajando juntos para fundir piezas de metal grandes de forma rápida y repetible. Imprime en aceros inoxidables, aceros de herramienta, níquel, aluminio y aleaciones de titanio con una resolución de capa de hasta 150 µm y precisión por debajo de 100 µm. Cuando tu productividad supera a todo lo demás de la línea, este es el caballo de batalla de pie que sigue el ritmo — respaldado por soporte en toda América desde la instalación en adelante.",
    highlights: [
      "Nuestro sistema más industrial — SLM multiláser de formato súper grande para producción exigente",
      "4 láseres con sistema de doble espejo vibratorio para fusión de alto rendimiento",
      "Alimentación de polvo bidireccional de velocidad variable para construcciones más rápidas",
      "Control de lazo cerrado en el eje Z para capas consistentes y repetibles",
      "Aleaciones de inoxidable, acero de herramienta, níquel, aluminio y titanio — precisión por debajo de 100 µm",
      "Cartucho de filtro eficiente y gestión de aire; procesamiento de datos en ~5 minutos",
    ],
  },
  "aiform-g1": {
    specLine: "Volumen 140 × 140 × 180 mm · láser verde 500 W · piezas de cobre y térmicas",
    description:
      "Un sistema de láser verde creado para una tarea que la mayoría de las impresoras de metal no puede hacer: el cobre. El cobre refleja la luz infrarroja que usan los láseres de fibra convencionales, por eso es tan difícil de imprimir bien. La AiForm-G1 usa un láser de fibra verde monomodo que el cobre sí absorbe — así obtienes piezas densas y totalmente fusionadas en lugar de porosas. Eso desbloquea la geometría que los ingenieros térmicos siempre quisieron pero nunca pudieron fundir ni mecanizar: placas frías de celosía internas, canales de refrigeración líquida conformados e intercambiadores de calor con paredes de hasta 0,1 mm. Con un haz de 15–40 µm y enfoque inteligente por escena, mantiene el detalle a nivel micro en toda la construcción. Orientada de lleno a la refrigeración líquida de centros de datos, la electrónica de potencia y la gestión térmica aeroespacial — y, como toda máquina FastForm, ejecuta FastForm y cuenta con el respaldo de nuestro equipo en las Américas",
    highlights: [
      "Láser de fibra verde — imprime cobre correctamente, donde los láseres infrarrojos batallan con la reflectividad",
      "Formación de ultra alta densidad de «penetración cero» — piezas densas, no porosas",
      "Precisión a nivel micro — haz de 15–40 µm, espesor mínimo de pared 0,1 mm",
      "Hecha para refrigeración líquida — placas frías de celosía, canales conformados, intercambiadores de calor",
      "El enfoque inteligente por escena mantiene el detalle en toda el área de construcción",
      "Filtro permanente — 0 costo, 0 reemplazo, 0 riesgo",
      "Ejecuta el corte y control FastForm, como el resto de la línea",
    ],
  },
};

const ptProducts: Record<string, ProductCopy> = {
  "deskfab-x1": {
    specLine: "Volume Ø100 × 70 mm · laser de fibra 300 W · CoCr e titânio",
    description:
      "Uma verdadeira impressora de metal SLM de mesa, tudo em um, feita para laboratórios odontológicos e trabalhos de metal em pequenos lotes. Sua área compacta de 0,39 m², a impressão com IA em um clique e um filtro permanente sem manutenção fazem dela a porta de entrada mais fácil para a manufatura aditiva de metal internamente.",
    highlights: [
      "Design de mesa integrado tudo em um — 600×650×800 mm, apenas 0,39 m² de espaço",
      "Filtro permanente: 30.000 horas de vida útil, sem manutenção, sem ferramentas, zero erros de instalação",
      "Impressão com IA em um clique — do escaneamento ao design em ~5 minutos",
      "Cartucho modular multimaterial: CoCr, Ti e mais, intercambiáveis",
      "Instalação sem complicações com dutos codificados em 4 cores à prova de erros",
      "A exclusiva LFPT (tecnologia de pó seguido por laser) aumenta a eficiência ~20%",
    ],
  },
  "ff-m140": {
    specLine: "Volume Ø140 × 170 mm · laser 500 W · ~150 dentes por ciclo",
    description:
      "Uma impressora de metal SLM odontológica especializada de laser único, com volume Ø140 mm e disposição dental em um clique. Feita para componentes odontológicos precisos e personalizados com alta produtividade.",
    highlights: [
      "Sistema óptico estável com disposição dental em um clique",
      "Construção rápida — ~150 dentes por ciclo",
      "Sem desperdício de cartuchos de filtro, alto aproveitamento do pó",
      "Disposição e processamento de dados completos em ~5 minutos",
      "Equipada com câmera para monitoramento remoto seguro",
      "O software de controle suporta emenda multilaser de até 36 galvanômetros",
    ],
  },
  "ff-m220": {
    specLine: "220 × 140 × 100 mm · dois lasers de 500 W · 300 coroas/ciclo",
    description:
      "Uma impressora de metal SLM de laser duplo com grande volume de construção — imprima até 300 coroas ou 30 estruturas em um único ciclo. Filtro permanente, tecnologia de eficiência LFPT e software próprio grátis para sempre.",
    highlights: [
      "Laser duplo, grande volume — 220×140×100 mm (até H200 mm); 300 coroas ou 30 estruturas por ciclo",
      "Filtro permanente: 30.000 horas de vida útil, zero custo de substituição",
      "LFPT reduz o tempo de pó por camada em 9 s (~20% mais de eficiência)",
      "Disposição em um clique (5 min) e impressão em um clique; software grátis para sempre",
      "Componentes principais a preço de custo e suporte técnico 24 horas",
    ],
  },
  "ff-m300": {
    specLine: "300 × 300 × 400 mm · 2–4 lasers de 500 W · 100 cm³/h",
    description:
      "Uma impressora de metal SLM de grande formato para moldes industriais, ferramental e trabalho odontológico de alto volume. Espalhamento de pó bidirecional e disposição em um clique para uma produção em série rápida e estável.",
    highlights: [
      "Sistema óptico estável com disposição em um clique",
      "Construção rápida — ~300 dentes / 5 horas, 30 suportes / 6 horas",
      "Espalhamento de pó bidirecional, alto aproveitamento do pó",
      "Disposição e processamento de dados completos em ~5 minutos",
      "Monitoramento remoto por câmera; grande estabilidade e fácil instalação",
      "Certificada CE; usada em aeroespacial, automotivo, medicina e educação",
    ],
  },
  "ff-m420": {
    specLine: "Volume 420 × 420 mm · SLM multilaser · taxa de formação 240 cm³/h",
    description:
      "A impressora de metal SLM carro-chefe, multilaser e de formato supergrande, feita para produção em série exigente com um sistema de circulação de pó para tiragens de alto volume.",
    highlights: [
      "Construção multilaser supergrande para produção em série",
      "Sistema de circulação de pó para facilitar tiragens de alto volume",
      "Sem desperdício de cartuchos de filtro, menor uso de pó",
      "Disposição e processamento de dados em ~5 minutos",
      "Espalhamento de pó bidirecional para mais velocidade",
      "Monitoramento remoto por câmera para operação segura e sem intervenção",
      "Certificada CE",
    ],
  },
  "ff-m800": {
    specLine: "SLM multilaser supergrande · 4 lasers · produção em série industrial",
    description:
      "Nossa máquina mais industrial. A FF-M800 é um sistema SLM multilaser de formato supergrande feito para produção exigente — quatro lasers combinados com um sistema de espelho vibratório duplo, alimentação de pó bidirecional de velocidade variável e controle em malha fechada no eixo Z trabalhando juntos para fundir peças de metal grandes de forma rápida e repetível. Imprima em aços inoxidáveis, aços-ferramenta, níquel, alumínio e ligas de titânio com resolução de camada de até 150 µm e precisão abaixo de 100 µm. Quando sua produtividade supera todo o resto da linha, este é o cavalo de batalha de piso que acompanha — com suporte em toda a América a partir da instalação.",
    highlights: [
      "Nosso sistema mais industrial — SLM multilaser de formato supergrande para produção exigente",
      "4 lasers com sistema de espelho vibratório duplo para fusão de alto rendimento",
      "Alimentação de pó bidirecional de velocidade variável para construções mais rápidas",
      "Controle em malha fechada no eixo Z para camadas consistentes e repetíveis",
      "Ligas de inoxidável, aço-ferramenta, níquel, alumínio e titânio — precisão abaixo de 100 µm",
      "Cartucho de filtro eficiente e gestão de ar; processamento de dados em ~5 minutos",
    ],
  },
  "aiform-g1": {
    specLine: "Volume 140 × 140 × 180 mm · laser verde 500 W · peças de cobre e térmicas",
    description:
      "Um sistema de laser verde criado para uma tarefa que a maioria das impressoras de metal não consegue fazer: o cobre. O cobre reflete a luz infravermelha que os lasers de fibra convencionais usam, por isso é tão difícil de imprimir bem. A AiForm-G1 usa um laser de fibra verde monomodo que o cobre realmente absorve — então você obtém peças densas e totalmente fundidas em vez de porosas. Isso libera a geometria que os engenheiros térmicos sempre quiseram mas nunca puderam fundir ou usinar: placas frias em treliça internas, canais de resfriamento líquido conformados e trocadores de calor com paredes de até 0,1 mm. Com um feixe de 15–40 µm e foco inteligente por cena, mantém o detalhe em nível micro em toda a construção. Voltada diretamente para o resfriamento líquido de data centers, a eletrônica de potência e a gestão térmica aeroespacial — e, como toda máquina FastForm, roda FastForm e conta com o suporte da nossa equipe nas Américas.",
    highlights: [
      "Laser de fibra verde — imprime cobre corretamente, onde os lasers infravermelhos têm dificuldade com a refletividade",
      "Formação de altíssima densidade de \"penetração zero\" — peças densas, não porosas",
      "Precisão em nível micro — feixe de 15–40 µm, espessura mínima de parede 0,1 mm",
      "Feita para resfriamento líquido — placas frias em treliça, canais conformados, trocadores de calor",
      "O foco inteligente por cena mantém o detalhe em toda a área de construção",
      "Filtro permanente — 0 custo, 0 substituição, 0 risco",
      "Roda o fatiamento e controle FastForm, como o resto da linha",
    ],
  },
};

export const productMessages: Record<Locale, Record<string, ProductCopy>> = {
  en: {},
  es: esProducts,
  pt: ptProducts,
};

type CategoryCopy = { label?: string; blurb?: string };

export const categoryMessages: Record<Locale, Record<string, CategoryCopy>> = {
  en: {},
  es: {
    Desktop: {
      label: "Escritorio",
      blurb:
        "Sistemas SLM compactos todo en uno — impresión de metal interna sin ocupar espacio.",
    },
    Dental: {
      label: "Dental",
      blurb:
        "Impresoras de metal SLM de precisión para coronas, estructuras y laboratorios dentales.",
    },
    Industrial: {
      label: "Industrial",
      blurb:
        "SLM de gran y súper gran formato para moldes, utillaje y producción en serie.",
    },
    Thermal: {
      label: "Térmico",
      blurb:
        "Impresión de cobre con láser verde — refrigeración líquida, placas frías e intercambiadores de calor que no se pueden fundir ni mecanizar.",
    },
  },
  pt: {
    Desktop: {
      label: "Mesa",
      blurb:
        "Sistemas SLM compactos tudo em um — impressão de metal interna sem ocupar espaço.",
    },
    Dental: {
      label: "Odontológico",
      blurb:
        "Impressoras de metal SLM de precisão para coroas, estruturas e laboratórios odontológicos.",
    },
    Industrial: {
      label: "Industrial",
      blurb:
        "SLM de grande e supergrande formato para moldes, ferramental e produção em série.",
    },
    Thermal: {
      label: "Térmico",
      blurb:
        "Impressão de cobre com laser verde — resfriamento líquido, placas frias e trocadores de calor que não dá para fundir ou usinar.",
    },
  },
};
