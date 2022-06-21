// Initialize button with user's preferred color
let changeColor = document.getElementById("button");

//chrome.storage.sync.get("color", ({ color }) => {
  //changeColor.style.backgroundColor = color;
//});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {

  //const getUnicodeAsHex = (c) => {
    //return c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')
  //};

  const escapeRegexExpChars = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  };

  const plan = document.getElementById("ctl00_mainCopy_Lbl_Plan").innerHTML;

  const translations = {
    "este documento es solamente informativo y carece de cualquier valid\u00E9z oficial": {
      "global": ""
    },
    "../../": {
      "global": "https://www.saes.escom.ipn.mx/"
    },
    'style="height:400px;overflow-y:scroll;"': {
      "global": ""
    },
    "ING. EN SIS. COMPUTACIONALES": {
      "en": "computer systems engineering"
    },
    "semestre": {
      "en": "level"
    },
    "primer": {
      "en": "first"
    },
    "segundo": {
      "en": "second"
    },
    "tercer": {
      "en": "third"
    },
    "cuarto": {
      "en": "fourth"
    },
    "quinto": {
      "en": "fifth"
    },
    "sexto": {
      "en": "sixth"
    },
    "séptimo": {
      "en": "seventh"
    },
    "octavo": {
      "en": "eighth"
    },
    "materia": {
      "en": "course"
    },
    "clave": {
      "en": "code"
    },
    "fecha": {
      "en": "date"
    },
    "periodo": {
      "en": "period"
    },
    "forma eval.": {
      "en": "type"
    },
    "calificacion": {
      "en": "grade"
    },
    "jun": {
      "en": "jun"
    },
    "dic": {
      "en": "dec"
    },
    "boleta": {
      "en": "student id"
    },
    "plan": {
      "en": "plan"
    },
    "nombre": {
      "en": "full name"
    },
    "carrera": {
      "en": "career"
    },
    "promedio": {
      "en": "average"
    },
    "ANALISIS VECTORIAL": {
      "en": "vector analysis"
    },
    "MATEMATICAS DISCRETAS": {
      "en": "discrete mathematics"
    },
    "ALGORITMIA Y PROGRAMACION ESTRUCTURADA": {
      "en": "algorithms and structured programming"
    },
    "FISICA": {
      "en": "physics"
    },
    "INGENIERIA ETICA Y SOCIEDAD": {
      "en": "ethical engineering and society"
    },
    "ECUACIONES DIFERENCIALES": {
      "en": "differential equations"
    },
    "ALGEBRA LINEAL": {
      "en": "linear algebra"
    },
    "CALCULO APLICADO": {
      "en": "applied calculus"
    },
    "CALCULO": {
      "en": "calculus"
    },
    "ESTRUCTURAS DE DATOS": {
      "en": "data structures"
    },
    "COMUNICACION ORAL Y ESCRITA": {
      "en": "written and oral expression"
    },
    "ANALISIS FUNDAMENTAL DE CIRCUITOS": {
      "en": "fundamental circuit analysis"
    },
    "MATEMATICAS AVANZADAS PARA LA INGENIERIA": {
      "en": "ADVANCED MATHEMATICS FOR ENGINEERING"
    },
    "FUNDAMENTOS ECONOMICOS": {
      "en": "ECONOMICS FUNDAMENTALS"
    },
    "FUNDAMENTOS DE DISE\u00D1O DIGITAL": {
      "en": "DIGITAL DESIGN FUNDAMENTALS"
    },
    "TEORIA COMPUTACIONAL": {
      "en": "COMPUTATIONAL THEORY"
    },
    "BASES DE DATOS": {
      "en": "DATABASES"
    },
    "PROGRAMACION ORIENTADA A OBJETOS": {
      "en": "OBJECT-ORIENTED PROGRAMMING"
    },
    "ELECTRONICA ANALOGICA": {
      "en": "ANALOGIC ELECTRONICS"
    },
    "REDES DE COMPUTADORAS": {
      "en": "COMPUTER NETWORKS"
    },
    "DISE\u00D1O DE SISTEMAS DIGITALES": {
      "en": "DIGITAL SYSTEMS DESIGN"
    },
    "PROBABILIDAD Y ESTADISTICA": {
      "en": "PROBABILITY AND STATISTICS"
    },
    "SISTEMAS OPERATIVOS": {
      "en": "OPERATIVE SYSTEMS"
    },
    "ANALISIS Y DISE\u00D1O ORIENTADO A OBJETOS": {
      "en": "OBJECT ORIENTED ANALYSIS AND DESIGN"
    },
    "TECNOLOGIAS PARA LA WEB": {
      "en": "WEB TECHNOLOGIES"
    },
    "ADMINISTRACION FINANCIERA": {
      "en": "FINANCIAL ADMINISTRATION"
    },
    "ARQUITECTURA DE COMPUTADORAS": {
      "en": "COMPUTER ARCHITECTURE"
    },
    "COMPILADORES": {
      "en": "COMPILERS"
    },
    "INGENIERIA DE SOFTWARE": {
      "en": "SOFTWARE ENGINEERING"
    },
    "ADMINISTRACION DE PROYECTOS": {
      "en": "PROJECT ADMINISTRATION"
    },
    "INSTRUMENTACION": {
      "en": "INSTRUMENTATION"
    },
    "TEORIA DE COMUNICACIONES Y SE\u00D1ALES": {
      "en": "COMMUNICATION AND SIGNAL THEORY"
    },
    "APLICACIONES PARA COMUNICACIONES EN RED": {
      "en": "APPLICATIONS FOR NETWORK COMMUNICATIONS"
    },
    "INTRODUCCION A LOS MICROCONTROLADORES": {
      "en": "INTRODUCTION TO MICROCONTROLLERS"
    },
    "ANALISIS DE ALGORITMOS": {
      "en": "ALGORITHMS ANALYSIS"
    },
    "METODOS CUANTITATIVOS PARA LA TOMA DE DECISIONES": {
      "en": "QUANTITATIVE METHODS FOR DECISION MAKING"
    },
    "GESTION EMPRESARIAL": {
      "en": "BUSINESS MANAGEMENT"
    },
    "TRABAJO TERMINAL I": {
      "en": "TERMINAL PROJECT I"
    },
    "TRABAJO TERMINAL II": {
      "en": "TERMINAL PROJECT II"
    },
    "LIDERAZGO Y DESARROLLO PROFESIONAL": {
      "en": "LEADERSHIP AND PROFESSIONAL DEVELOPMENT"
    },
    "ADMINISTRACION DE SERVICIOS EN RED": {
      "en": "NETWORK SERVICES MANAGEMENT"
    },
    "DESARROLLO DE SISTEMAS DISTRIBUIDOS": {
      "en": "DEVELOPMENT OF DISTRIBUTED SYSTEMS"
    },

    //ISC 2020 SUBJECTS

    "FUNDAMENTOS DE PROGRAMACION": {
      "en": "PROGRAMMING FUNDAMENTALS"
    },
    "MECANICA Y ELECTROMAGNETISMO": {
      "en": "MECHANICS AND ELECTROMAGNETISM"
    },
    "ALGORITMOS Y ESTRUCTURAS DE DATOS": {
      "en": "ALGORITHMS AND DATA STRUCTURES"
    },
    "CIRCUITOS ELECTRICOS": {
      "en": "ELECTRICAL CIRCUITS"
    },
    "FINANZAS EMPRESARIALES": {
      "en": "BUSINESS FINANCE"
    },
    "PARADIGMAS DE PROGRAMACION": {
      "en": "PROGRAMMING PARADIGMS"
    },
    "ANALISIS Y DISE\u00D1O DE ALGORITMOS": {
      "en": "ANALYSIS AND DESIGN OF ALGORITHMS"
    },
    "TEORIA DE LA COMPUTACION": {
      "en": "COMPUTING THEORY"
    },
    "TECNOLOGIAS PARA EL DESARROLLO DE APLICACIONES WEB": {
      "en": "TECHNOLOGIES FOR THE DEVELOPMENT OF WEB APPLICATIONS"
    },
    "PROCESAMIENTO DIGITAL DE SE\u00D1ALES": {
      "en": "DIGITAL SIGNAL PROCESSING"
    },
    "INSTRUMENTACION Y CONTROL": {
      "en": "INSTRUMENTATION AND CONTROL"
    },
    "ANALISIS Y DISE\u00D1O DE SISTEMAS": {
      "en": "ANALYSIS AND DESIGN OF SYSTEMS"
    },
    "FORMULACION Y EVALUACION DE PROYECTOS INFORMATICOS": {
      "en": "FORMULATION AND EVALUATION OF IT PROJECTS"
    },
    "INTELIGENCIA ARTIFICIAL": {
      "en": "ARTIFICIAL INTELLIGENCE"
    },
    "SISTEMAS EN CHIP": {
      "en": "SYSTEMS ON CHIP"
    },
    "DESARROLLO DE APLICACIONES MOVILES NATIVAS": {
      "en": "NATIVE MOBILE APPLICATION DEVELOPMENT"
    },
    "SISTEMAS DISTRIBUIDOS": {
      "en": "DISTRIBUTED SYSTEMS"
    },
    "LIDERAZGO PERSONAL": {
      "en": "PERSONAL LEADERSHIP"
    },
    "DESARROLLO DE HABILIDADES SOCIALES PARA LA ALTA DIRECCION": {
      "en": "SOFT SKILLS DEVELOPMENT FOR SENIOR MANAGEMENT"
    },
    "ESTANCIA PROFESIONAL": {
      "en": "PROFESSIONAL STAY"
    },

    // LCD 2020 SUBJECTS

    "LICENCIATURA EN CIENCIA DE DATOS": {
      "en": "BACHELOR'S DEGREE IN DATA SCIENCE"
    },
    "INTRODUCCION A LA CIENCIA DE DATOS": {
      "en": "INTRODUCTION TO DATA SCIENCE"
    },
    "ETICA Y LEGALIDAD": {
      "en": "ETHICS AND LEGALITY"
    },
    "CALCULO MULTIVARIABLE": {
      "en": "MULTIVARIABLE CALCULUS"
    },
    "METODOS NUMERICOS": {
      "en": "NUMERICAL METHODS"
    },
    "PROBABILIDAD": {
      "en": "PROBABILITY"
    },
    "PROGRAMACION PARA CIENCIA DE DATOS": {
      "en": "PROGRAMMING FOR DATA SCIENCE"
    },
    "DESARROLLO DE APLICACIONES WEB": {
      "en": "WEB APPLICATION DEVELOPMENT"
    },
    "COMPUTO DE ALTO DESEMPEÑO": {
      "en": "HIGH PERFORMANCE COMPUTING"
    },
    "ESTADISTICA": {
      "en": "STATISTICS"
    },
    "BASES DE DATOS AVANZADAS": {
      "en": "ADVANCED DATABASES"
    },
    "DESARROLLO DE APLICACIONES PARA ANALISIS DE DATOS": {
      "en": "DEVELOPMENT OF APPLICATIONS FOR DATA ANALYSIS"
    },
    "METODOLOGIA DE LA INVESTIGACION Y DIVULGACION CIENTIFICA": {
      "en": "RESEARCH METHODOLOGY AND SCIENTIFIC DIVULGATION"
    },
    "ANALISIS Y VISUALIZACION DE DATOS": {
      "en": "DATA ANALYSIS AND VISUALIZATION"
    },
    "APRENDIZAJE DE MAQUINA E INTELIGENCIA ARTIFICIAL": {
      "en": "MACHINE LEARNING AND ARTIFICIAL INTELLIGENCE"
    },
    "PROCESOS ESTOCASTICOS": {
      "en": "STOCHASTIC PROCESSES"
    },
    "MATEMATICAS AVANZADAS PARA CIENCIA DE DATOS": {
      "en": "ADVANCED MATHEMATICS FOR DATA SCIENCE"
    },
    "MINERIA DE DATOS": {
      "en": "DATA MINING"
    },
    "ANALISIS DE SERIES DE TIEMPO": {
      "en": "TIME SERIES ANALYSIS"
    },
    "ANALITICA AVANZADA DE DATOS": {
      "en": "ADVANCED DATA ANALYTICS"
    },
    "MODELO PREDICTIVO": {
      "en": "PREDICTIVE MODEL"
    },
    "PROCESAMIENTO DE LENGUAJE NATURAL": {
      "en": "NATURAL LANGUAGE PROCESSING"
    },
    "ADMINISTRACION DE PROYECTOS DE TI": {
      "en": "IT PROJECT MANAGEMENT"
    },
    "MODELOS ECONOMETRICOS": {
      "en": "ECONOMETRIC MODELS"
    },

  };

  if(plan == 20){
    translations["semestre"] = {
      "en": "semester"
    }
  };

  const translate = (str, langCode) => {
    let ans = str;
    if (translations.hasOwnProperty(str)) {
      const langObj = translations[str];
      if (langObj.hasOwnProperty(langCode)) {
        ans = langObj[langCode];
      } else if (langObj.hasOwnProperty("global")) {
        ans = langObj["global"];
      } else {
        ans = undefined;
      }
    } else {
      ans = undefined;
    }
    return ans;
  };

  const container = document.getElementsByClassName("container")[0].innerHTML;
  const wordsToTranslate = Object.keys(translations);
  const wordsToTranslateEscaped = wordsToTranslate.map(word => escapeRegexExpChars(word));
  const regex = new RegExp(wordsToTranslateEscaped.join("|"), 'giu');
  const containerTranslated = container.replace(regex, (match) => {
    return (
      translate(match, "en") ??
      translate(match.toUpperCase(), "en") ??
      translate(match.toLowerCase(), "en") ??
      match
    ).toUpperCase();
  });
  var link = document.createElement('a');
  link.download = 'test.html';
  var blob = new Blob([containerTranslated], {type: 'text/html'});
  link.href = window.URL.createObjectURL(blob);
  link.click();
  //console.log(containerTranslated);
  //chrome.storage.sync.get("color", ({ color }) => {
    //document.body.style.backgroundColor = color;
  //});
}
