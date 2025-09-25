
export type Question = {
  id: string;
  text: string;
  placeholder?: string;
  prompts: string[];
  type?: 'textarea' | 'checkbox';
  options?: string[];
};

export const IKIGAI_QUESTIONS: Record<string, Question[]> = {
  passion: [
    {
      id: 'passion-1',
      text: '¿Qué materias o temas te generan más curiosidad, incluso fuera de clases?',
      placeholder: 'Ej: Programación, historia del arte, biotecnología, finanzas, etc.',
      prompts: ['Siento una gran curiosidad por...', 'Podría pasar horas aprendiendo sobre...', 'Los temas que más busco en internet son...'],
      type: 'textarea',
    },
    {
      id: 'passion-2',
      text: 'Si tuvieras una tarde libre, ¿qué actividad elegirías solo por placer?',
      placeholder: 'Ej: Tocar un instrumento, salir a caminar, leer, dibujar, armar algún proyecto, etc.',
      prompts: ['Me recarga de energía...', 'Disfruto mucho de...', 'Mi pasatiempo favorito es...'],
      type: 'textarea',
    },
    {
      id: 'passion-3',
      text: '¿En qué tipo de proyectos (personales o académicos) te has sentido más motivado/a y con más energía?',
      placeholder: 'Describe ese proyecto que te hizo sentir que el tiempo volaba.',
      prompts: ['Me sentí muy realizado/a cuando trabajé en...', 'El proyecto que más me gustó fue...', 'Tengo más energía cuando los proyectos implican...'],
      type: 'textarea',
    },
  ],
  mission: [
    {
      id: 'mission-1',
      text: '¿En qué áreas tus amigos, amigas o profesores/as suelen pedirte ayuda o consejo?',
      placeholder: 'Ej: Para resolver problemas de matemáticas, organizar un evento, dar una opinión honesta, etc.',
      prompts: ['La gente suele buscarme para...', 'Soy la persona a la que acuden cuando necesitan...', 'Se me da bien explicar...'],
      type: 'textarea',
    },
    {
      id: 'mission-2',
      text: '¿Cuál ha sido tu mayor logro académico o personal y qué habilidad clave utilizaste para conseguirlo?',
      placeholder: 'Piensa en un momento del que te sientas especialmente orgulloso/a. ¿Qué hiciste para que sucediera?',
      prompts: ['Estoy orgulloso/a de haber logrado...', 'La habilidad clave para mi éxito fue...', 'Demostré mi capacidad para...'],
      type: 'textarea',
    },
    {
      id: 'mission-3',
      text: 'Si tuvieras que enseñar algo, ¿qué sería?',
      placeholder: 'Puede ser algo académico, un hobby o una habilidad para la vida.',
      prompts: ['Me encantaría enseñar a otros a...', 'Tengo conocimientos valiosos en...', 'Podría compartir mi experiencia sobre...'],
      type: 'textarea',
    },
  ],
  vocation: [
    {
      id: 'vocation-1',
      text: '¿Qué problemas en tu comunidad, país o en el mundo te gustaría ayudar a resolver?',
      placeholder: 'Ej: La desinformación, el acceso a la educación, la sostenibilidad ambiental, la salud mental, etc.',
      prompts: ['Me preocupa profundamente...', 'Quisiera contribuir a solucionar...', 'Si tuviera el poder, cambiaría...'],
      type: 'textarea',
    },
    {
      id: 'vocation-2',
      text: '¿Cómo te imaginas contribuyendo a la sociedad a través de tu futura profesión?',
      placeholder: 'Visualiza el impacto positivo que quieres generar con tu trabajo.',
      prompts: ['A través de mi carrera, espero...', 'Mi impacto ideal sería...', 'Quiero que mi trabajo sirva para...'],
      type: 'textarea',
    },
    {
      id: 'vocation-3',
      text: '¿Qué tipo de experiencias te gustaría vivir durante tu carrera para crecer y generar un impacto?',
      prompts: [],
      type: 'checkbox',
      options: [
        'Intercambios internacionales',
        'Participar en grupos estudiantiles',
        'Realizar prácticas profesionales',
        'Competir en concursos y hackathones',
        'Destacar por mi rendimiento académico',
        'Desarrollar mi talento en arte y cultura',
        'Destacar en el ámbito deportivo',
        'Aportar a una causa social',
      ],
    },
  ],
  profession: [
    {
      id: 'profession-1',
      text: '¿Qué tipo de habilidades concretas (técnicas o blandas) te gustaría que fueran el centro de tu trabajo diario?',
      placeholder: 'Ej: Analizar datos, diseñar interfaces, liderar equipos, hablar en público, etc.',
      prompts: ['Disfrutaría un trabajo donde pueda usar mi habilidad para...', 'Quiero ser experto/a en...', 'Las habilidades que más quiero aplicar son...'],
      type: 'textarea',
    },
    {
      id: 'profession-2',
      text: '¿Qué es más importante para ti en un ambiente laboral: la colaboración en equipo, la autonomía, la estabilidad o la innovación constante?',
      placeholder: 'Describe tu lugar de trabajo ideal.',
      prompts: ['Valoro un entorno de trabajo que sea...', 'Mi ambiente ideal es aquel que promueve...', 'Necesito un trabajo que me ofrezca...'],
      type: 'textarea',
    },
    {
      id: 'profession-3',
      text: 'Más allá del salario, ¿qué buscas en una carrera que te brinde satisfacción a largo plazo?',
      placeholder: 'Ej: Aprendizaje continuo, oportunidades de viajar, buen balance vida-trabajo, etc.',
      prompts: ['Para mí, una carrera satisfactoria debe incluir...', 'Busco un trabajo que me permita...', 'La verdadera recompensa para mí es...'],
      type: 'textarea',
    },
  ],
};

export const PILLARS = [
  {
    key: 'passion',
    title: 'Tus Intereses',
    subtitle: 'Lo que amas',
    description: 'Estas preguntas te ayudan a explorar tus intereses más profundos y lo que te trae alegría.',
  },
  {
    key: 'mission',
    title: 'Tus Talentos',
    subtitle: 'En lo que eres bueno/a',
    description: 'Reflexiona sobre tus talentos, habilidades y las fortalezas únicas que puedes aportar.',
  },
  {
    key: 'vocation',
    title: 'Tu Impacto',
    subtitle: 'Lo que el mundo necesita',
    description: 'Considera las necesidades de la sociedad y cómo tus contribuciones pueden marcar la diferencia.',
  },
  {
    key: 'profession',
    title: 'Tu Carrera',
    subtitle: 'Por lo que te pueden recompensar',
    description: 'Piensa en cómo tus habilidades pueden traducirse en una carrera que te sustente y satisfaga.',
  },
];
