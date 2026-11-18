export type Language = "en" | "pt";

export const DEFAULT_LANGUAGE: Language = "en";

export function getHtmlLang(language: Language) {
  return language === "pt" ? "pt-BR" : "en";
}

const copy = {
  en: {
    meta: {
      title: "Davi Andrade | Full-Stack Developer & Computer Science Portfolio",
      description:
        "Portfolio of Davi Andrade, a Brazilian full-stack developer and computer science graduate pursuing graduate research in software engineering, applied computing, web and mobile systems, HCI, and related areas.",
    },
    common: {
      skipToContent: "Skip to main content",
      liveDemo: "Live demo",
      ongoing: "In progress",
      internal: "Private",
      contribution: "Contribution",
      viewProject: "Open project",
      viewSite: "Open site",
      mediaGallery: "Media gallery",
      closeGallery: "Close gallery",
      expandPreview: "View preview",
      playVideo: "Play video",
      previousMedia: "Previous media",
      nextMedia: "Next media",
      projectHighlights: "Project highlights",
      primaryNavigation: "Primary navigation",
      footerLinks: "Footer links",
      opensInNewTab: "Opens in a new tab",
    },
    preferences: {
      group: "Display preferences",
      language: "Language",
      theme: "Theme",
      english: "English",
      portuguese: "Portuguese",
      light: "Light",
      dark: "Dark",
    },
    nav: {
      resume: "Resume",
      projects: "Projects",
      ongoing: "In progress",
      contributions: "Contributions",
      internal: "Private projects",
      contact: "Contact",
    },
    auth: {
      signIn: "Sign in",
      signOut: "Sign out",
      account: "Account",
    },
    contact: {
      eyebrow: "Let's connect",
      body: "Open to graduate research conversations, advisor-fit discussions, and product engineering collaborations across computer science, especially software engineering, applied computing, web and mobile systems, HCI, human-centered computing, and related areas.",
      email: "Email",
      phone: "Phone",
      github: "GitHub",
      linkedin: "LinkedIn",
      message: "Send a message",
      messageHint: "Contact form",
    },
    footer: {
      copy: "© 2026 Davi Andrade. Portfolio, research, and engineering work.",
    },
    hero: {
      eyebrow: "Full-stack developer · computer science research",
      title: "Davi Andrade",
      titleFirst: "Davi",
      titleHighlight: "Andrade",
      bodyLead: "Computer Science graduate and full-stack developer building",
      bodyHighlight1: "accessible, user-centered software",
      bodyMiddle: ", from public transparency platforms and internal systems at TCE-PB to",
      bodyHighlight2: "Asebili",
      bodyEnd:
        ", a cross-platform ecosystem for teaching written Portuguese to deaf learners, born from undergraduate research in computing and education.",
      bodySecondary:
        "I work with TypeScript, React, Next.js, and React Native on products used in government, education, and social impact, including Seriesaholic. I am seeking graduate research opportunities and advisor fit in computer science, with interests spanning software engineering, applied computing, web and mobile systems, HCI, human-centered computing, and education.",
      profileAlt: "Davi Andrade, full-stack developer portrait",
      focus: "Focus areas",
      focusItems: ["React & Next.js", "Expo / React Native", "PostgreSQL & APIs", "Applied software systems"],
      stats: {
        demos: { value: "5+", label: "Years building software" },
        platforms: { value: "Seeking", label: "Graduate research fit" },
        stack: { value: "CS", label: "Software and applied computing" },
      },
      card: {
        eyebrow: "Academic direction",
        title: "Computer science, from systems to people",
        body: "I bring production engineering experience from public-sector, education, and social-impact systems. Asebili is one research thread connecting HCI, education, and accessibility, alongside broader interests in software engineering and applied computing.",
      },
    },
    sections: {
      projectsTitle: "Live projects",
      projectsBody:
        "Deployed demos you can open in the browser. Click a preview to expand it, or open the live site.",
      contributionsTitle: "Public-sector contributions",
      ongoingTitle: "In-progress work",
      contributionsBody:
        "Platforms I help maintain for the Paraíba Court of Accounts, focused on transparency, citizen access, and institutional communication.",
      internalTitle: "Private projects",
      internalBody:
        "Non-public systems and research prototypes, including SAGRES, TecVoto, and the origin of Asebili.",
    },
    resume: {
      eyebrow: "Living resume",
      title: "Experience & research",
      download: "Download PDF",
      downloading: "Preparing PDF",
      lattes: "Lattes CV",
      current: "Present",
      inProgress: "In progress",
      tagsLabel: "Technologies",
      interestsTitle: "Research interests",
      portfolio: "Portfolio",
      blocks: {
        summary: "Summary",
        projects: "Projects",
        experience: "Professional experience",
        education: "Education",
        research: "Research experience",
        volunteering: "Volunteer experience",
        publications: "Publications",
        affiliations: "Affiliations",
      },
      skills: {
        title: "Technical skills",
      },
    },
    editor: {
      edit: "Edit portfolio",
      done: "Close editor",
      save: "Save",
      saving: "Saving",
      cancel: "Cancel",
      add: "Add",
      remove: "Remove",
      editItem: "Edit",
      saved: "Saved",
      confirmRemove: "Remove this entry?",
      dialog: "Edit entry",
      close: "Close",
      profile: "Profile and summary",
      category: "Section",
      href: "Link",
      cover: "Cover image path",
      highlights: "Highlights, one per line",
      bullets: "Bullets, one per line",
      items: "Items, one per line",
      tags: "Technologies, separated by commas",
      current: "Current role",
      inProgress: "In progress",
      internal: "Private, no public link",
      block: "Resume section",
      period: "Period",
      title: "Title",
      org: "Organization",
      location: "Location",
      label: "Label",
      text: "Text",
      categories: {
        projects: "Live projects",
        ongoing: "In progress",
        contributions: "Contributions",
        internal: "Private projects",
      },
      blocks: {
        experience: "Professional experience",
        research: "Research experience",
        volunteering: "Volunteer experience",
      },
      errors: {
        invalid: "Check the required fields and try again.",
        "vercel-link": "Links on this site use the daviandrade.dev address.",
        "invalid-link": "Use an http, https, mailto, tel, or in-page link.",
        unauthorized: "Sign in with the portfolio owner account to save.",
        unavailable: "Saving is unavailable until the database is configured.",
      },
    },
  },
  pt: {
    meta: {
      title: "Davi Andrade | Desenvolvedor Full-Stack & Ciência da Computação",
      description:
        "Portfólio de Davi Andrade, desenvolvedor full-stack brasileiro e bacharel em Ciência da Computação buscando pesquisa de pós-graduação em engenharia de software, computação aplicada, sistemas web e mobile, IHC e áreas relacionadas.",
    },
    common: {
      skipToContent: "Ir para o conteúdo principal",
      liveDemo: "Demo ao vivo",
      ongoing: "Em andamento",
      internal: "Privado",
      contribution: "Contribuição",
      viewProject: "Abrir projeto",
      viewSite: "Abrir site",
      mediaGallery: "Galeria de mídia",
      closeGallery: "Fechar galeria",
      expandPreview: "Ver preview",
      playVideo: "Assistir vídeo",
      previousMedia: "Mídia anterior",
      nextMedia: "Próxima mídia",
      projectHighlights: "Destaques do projeto",
      primaryNavigation: "Navegação principal",
      footerLinks: "Links do rodapé",
      opensInNewTab: "Abre em uma nova aba",
    },
    preferences: {
      group: "Preferências de exibição",
      language: "Idioma",
      theme: "Tema",
      english: "Inglês",
      portuguese: "Português",
      light: "Claro",
      dark: "Escuro",
    },
    nav: {
      resume: "Currículo",
      projects: "Projetos",
      ongoing: "Em andamento",
      contributions: "Contribuições",
      internal: "Projetos privados",
      contact: "Contato",
    },
    auth: {
      signIn: "Entrar",
      signOut: "Sair",
      account: "Conta",
    },
    contact: {
      eyebrow: "Vamos conversar",
      body: "Aberto a conversas de pesquisa de pós-graduação, alinhamento com orientadores e colaborações em engenharia de produto em Ciência da Computação, especialmente engenharia de software, computação aplicada, sistemas web e mobile, IHC, computação centrada em pessoas e áreas afins.",
      email: "E-mail",
      phone: "Telefone",
      github: "GitHub",
      linkedin: "LinkedIn",
      message: "Envie uma mensagem",
      messageHint: "Formulário de contato",
    },
    footer: {
      copy: "© 2026 Davi Andrade. Portfólio, pesquisa e engenharia de software.",
    },
    hero: {
      eyebrow: "Desenvolvedor full-stack · pesquisa em Ciência da Computação",
      title: "Davi Andrade",
      titleFirst: "Davi",
      titleHighlight: "Andrade",
      bodyLead: "Formado em Ciência da Computação e desenvolvedor full-stack que constrói",
      bodyHighlight1: "software acessível e centrado no usuário",
      bodyMiddle: ", de plataformas públicas de transparência e sistemas internos no TCE-PB ao",
      bodyHighlight2: "Asebili",
      bodyEnd:
        ", ecossistema multiplataforma para ensino de português escrito a aprendizes surdos, nascido de pesquisa de graduação em computação e educação.",
      bodySecondary:
        "Trabalho com TypeScript, React, Next.js e React Native em produtos usados no setor público, educação e impacto social, inclusive o Seriesaholic. Busco oportunidades de pesquisa de pós-graduação e alinhamento com orientadores em Ciência da Computação, com interesses em engenharia de software, computação aplicada, sistemas web e mobile, IHC, computação centrada em pessoas e educação.",
      profileAlt: "Davi Andrade, retrato de desenvolvedor full-stack",
      focus: "Áreas de foco",
      focusItems: ["React & Next.js", "Expo / React Native", "PostgreSQL & APIs", "Sistemas de software aplicados"],
      stats: {
        demos: { value: "5+", label: "Anos construindo software" },
        platforms: { value: "Buscando", label: "Alinhamento de pesquisa" },
        stack: { value: "CC", label: "Software e computação aplicada" },
      },
      card: {
        eyebrow: "Direção acadêmica",
        title: "Ciência da Computação, de sistemas a pessoas",
        body: "Trago experiência em engenharia de produção no setor público, educação e impacto social. Asebili é uma frente que conecta IHC, educação e acessibilidade, junto a interesses mais amplos em engenharia de software e computação aplicada.",
      },
    },
    sections: {
      projectsTitle: "Projetos ao vivo",
      projectsBody:
        "Demos publicadas que você pode abrir no navegador. Clique no preview para ampliar ou abra o site no ar.",
      contributionsTitle: "Contribuições no setor público",
      ongoingTitle: "Trabalhos em andamento",
      contributionsBody:
        "Plataformas que ajudo a manter no Tribunal de Contas da Paraíba, com foco em transparência, acesso cidadão e comunicação institucional.",
      internalTitle: "Projetos privados",
      internalBody:
        "Sistemas não públicos e protótipos de pesquisa, incluindo SAGRES, TecVoto e a origem do Asebili.",
    },
    resume: {
      eyebrow: "Currículo vivo",
      title: "Experiência e pesquisa",
      download: "Baixar PDF",
      downloading: "Preparando PDF",
      lattes: "Currículo Lattes",
      current: "Atual",
      inProgress: "Em andamento",
      tagsLabel: "Tecnologias",
      interestsTitle: "Interesses de pesquisa",
      portfolio: "Portfólio",
      blocks: {
        summary: "Resumo",
        projects: "Projetos",
        experience: "Experiência profissional",
        education: "Formação",
        research: "Experiência em pesquisa",
        volunteering: "Experiência voluntária",
        publications: "Publicações",
        affiliations: "Afiliações",
      },
      skills: {
        title: "Habilidades técnicas",
      },
    },
    editor: {
      edit: "Editar portfólio",
      done: "Fechar editor",
      save: "Salvar",
      saving: "Salvando",
      cancel: "Cancelar",
      add: "Adicionar",
      remove: "Remover",
      editItem: "Editar",
      saved: "Salvo",
      confirmRemove: "Remover este item?",
      dialog: "Editar item",
      close: "Fechar",
      profile: "Perfil e resumo",
      category: "Seção",
      href: "Link",
      cover: "Caminho da imagem de capa",
      highlights: "Destaques, um por linha",
      bullets: "Tópicos, um por linha",
      items: "Itens, um por linha",
      tags: "Tecnologias, separadas por vírgula",
      current: "Cargo atual",
      inProgress: "Em andamento",
      internal: "Privado, sem link público",
      block: "Seção do currículo",
      period: "Período",
      title: "Título",
      org: "Organização",
      location: "Local",
      label: "Rótulo",
      text: "Texto",
      categories: {
        projects: "Projetos ao vivo",
        ongoing: "Em andamento",
        contributions: "Contribuições",
        internal: "Projetos privados",
      },
      blocks: {
        experience: "Experiência profissional",
        research: "Experiência em pesquisa",
        volunteering: "Experiência voluntária",
      },
      errors: {
        invalid: "Confira os campos obrigatórios e tente de novo.",
        "vercel-link": "Os links deste site usam o endereço daviandrade.dev.",
        "invalid-link": "Use um link http, https, mailto, tel ou âncora da página.",
        unauthorized: "Entre com a conta dona do portfólio para salvar.",
        unavailable: "Salvar fica indisponível até o banco estar configurado.",
      },
    },
  },
} as const;

type CopyTree = (typeof copy)[Language];

function readPath(tree: CopyTree, path: string): string | readonly string[] | undefined {
  return path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in node) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, tree) as string | readonly string[] | undefined;
}

export function translate(language: Language, path: string): string {
  const value = readPath(copy[language], path) ?? readPath(copy.en, path);
  if (typeof value === "string") return value;
  return path;
}

export function translateList(language: Language, path: string): string[] {
  const value = readPath(copy[language], path) ?? readPath(copy.en, path);
  return Array.isArray(value) ? [...value] : [];
}
