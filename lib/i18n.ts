export type Language = "en" | "pt";

export const DEFAULT_LANGUAGE: Language = "en";

export function getHtmlLang(language: Language) {
  return language === "pt" ? "pt-BR" : "en";
}

const copy = {
  en: {
    meta: {
      title: "Davi Andrade | Full-Stack Software Engineer & Computer Science",
      description:
        "Full-stack developer with 5+ years building web and mobile applications, public-sector systems, and accessible interfaces with TypeScript, React, Next.js, Node.js, Java, and PostgreSQL.",
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
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
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
      cv: "PDF resumes",
      livingResume: "Living resume",
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
      body: "Open to full-stack engineering roles (remote, UTC-3), product collaborations, and academic research conversations in software engineering, HCI, and accessibility.",
      email: "Email",
      phone: "Phone",
      github: "GitHub",
      linkedin: "LinkedIn",
      message: "Send a message",
      messageHint: "Contact form",
      copyEmail: "Copy email",
      emailCopied: "Email copied to clipboard",
      copyFailed: "Could not copy email",
      form: {
        backToPortfolio: "Back to portfolio",
        title: "Get in touch",
        subtitle: "Write a short note. It goes straight to my inbox, no account required.",
        toLabel: "To",
        fullName: "Full name",
        replyEmail: "Your email",
        replyEmailHint: "I will reply to this address.",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        sent: "Message sent. I will reply to the email above.",
        invalidFields: "Fill in all required fields before sending.",
        invalidEmail: "Enter a valid email address.",
        sendFailed: "Could not send the message. Try again in a moment.",
        sendNotConfigured: "Email delivery is not configured on this server yet.",
        rateLimited: "Too many messages in a short time. Try again later.",
        whatsappEyebrow: "Instant messaging",
        whatsappTitle: "WhatsApp",
        whatsappDesc: "Send a message on WhatsApp for a quicker reply.",
      },
    },
    command: {
      button: "Quick jump",
      placeholder: "Jump to a section, project, or action…",
      empty: "No matching results.",
      label: "Command menu",
      groups: {
        navigation: "Sections",
        projects: "Projects",
        actions: "Actions",
      },
      actions: {
        downloadPdf: "Download resume PDF",
        copyEmail: "Copy email address",
        toggleTheme: "Toggle color theme",
        toggleLanguage: "Switch language (PT / EN)",
        editPortfolio: "Toggle portfolio editor",
        openLattes: "Open Lattes CV",
      },
    },
    footer: {
      copy: "Davi Andrade. Portfolio and projects.",
    },
    system: {
      notFoundTitle: "Page not found",
      notFoundDesc:
        "The address you opened does not exist or has moved. Return to the portfolio home or send a message.",
      errorTitle: "Something went wrong",
      errorDesc:
        "An unexpected error occurred while loading this page. Try again or return to the portfolio home.",
      backHome: "Back to home",
      tryAgain: "Try again",
      reference: "Reference",
    },
    hero: {
      eyebrow: "João Pessoa, Brazil · UTC-3",
      role: "Full-Stack Software Engineer · Computer Science",
      title: "Davi Andrade",
      titleFirst: "Davi",
      titleHighlight: "Andrade",
      bodyLead: "5+ years building production web and mobile software with",
      bodyHighlight1: "TypeScript, React, Next.js, Node.js, Java, and PostgreSQL",
      bodyMiddle: ". From auditing and transparency systems at TCE-PB to",
      bodyHighlight2: "Asebili",
      bodyEnd:
        " and the shared-auth daviandrade.dev apps.",
      bodySecondary:
        "Available for full-stack software engineering roles and open to applied research collaborations in HCI and accessibility.",
      profileAlt: "Davi Andrade, full-stack software engineer portrait",
      portraitBadge: "Open to opportunities · Remote · PT / EN",
      focus: "Core stack & focus",
      focusItems: [
        "TypeScript · React · Next.js",
        "Node.js · Java · PostgreSQL",
        "React Native · Expo · Docker",
        "WCAG 2.2 AA · i18n · HCI",
      ],
      actions: {
        projects: "Explore projects",
        resume: "Living resume",
        command: "Quick jump",
      },
      proof: {
        work: {
          eyebrow: "Production · 5+ years",
          title: "Web & public-sector systems",
          body: "Auditing, transparency, and institutional platforms in production (SAGRES, Portal Hub, Basic Education, and internal login).",
        },
        research: {
          eyebrow: "Research & EdTech",
          title: "Asebili · HCI & Accessibility",
          body: "Cross-platform ecosystem for teaching written Portuguese to deaf learners. Manuscript in preparation.",
        },
        credentials: {
          eyebrow: "Education & Systems",
          title: "B.S. CS + Postgrad Cloud (GPA 3.83)",
          body: "UNIPÊ & Gran · ACM and ANETI member · Central Better Auth SSO powering all daviandrade.dev apps.",
        },
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
        "Non-public systems and research prototypes, including TecVoto and the 2023 Asebili prototype.",
    },
    cv: {
      eyebrow: "PDF downloads",
      title: "Resume",
      body: "Download the academic or professional version in English or Portuguese.",
      downloadAction: "Download",
      downloaded: "Resume PDF download started",
      items: {
        academicPt: {
          title: "Academic CV (PT-BR)",
          description: "Portuguese academic version with HCI research, publications, and education.",
        },
        professionalPt: {
          title: "Professional Resume (PT-BR)",
          description: "Portuguese engineering version focused on full-stack delivery and stack.",
        },
        academicEn: {
          title: "Academic CV (EN)",
          description: "English academic version with HCI research, publications, GPA, and affiliations.",
        },
        professionalEn: {
          title: "Professional Resume (EN)",
          description: "English engineering version tailored for international full-stack roles.",
        },
      },
    },
    resume: {
      eyebrow: "Living resume",
      title: "Experience & research",
      lattes: "Lattes CV",
      current: "Present",
      inProgress: "In progress",
      tagsLabel: "Technologies",
      interestsTitle: "Research interests",
      portfolio: "Portfolio",
      filterLabel: "Filter timeline",
      filters: {
        all: "All",
        research: "Research",
        experience: "Experience",
        volunteering: "Volunteering",
      },
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
      title: "Davi Andrade | Engenheiro de Software Full-Stack & Ciência da Computação",
      description:
        "Desenvolvedor full-stack com mais de 5 anos criando aplicações web e mobile, sistemas no setor público e interfaces acessíveis com TypeScript, React, Next.js, Node.js, Java e PostgreSQL.",
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
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
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
      cv: "Currículo (PDF)",
      livingResume: "Currículo vivo",
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
      body: "Aberto a vagas de engenharia full-stack (remoto, UTC-3), parcerias em produto e conversas de pesquisa em engenharia de software, IHC e acessibilidade.",
      email: "E-mail",
      phone: "Telefone",
      github: "GitHub",
      linkedin: "LinkedIn",
      message: "Envie uma mensagem",
      messageHint: "Formulário de contato",
      copyEmail: "Copiar e-mail",
      emailCopied: "E-mail copiado",
      copyFailed: "Não foi possível copiar o e-mail",
      form: {
        backToPortfolio: "Voltar ao portfólio",
        title: "Fale comigo",
        subtitle: "Escreva uma nota curta. Ela chega direto na minha caixa, sem precisar de conta.",
        toLabel: "Para",
        fullName: "Nome completo",
        replyEmail: "Seu e-mail",
        replyEmailHint: "Respondo neste endereço.",
        subject: "Assunto",
        message: "Mensagem",
        send: "Enviar mensagem",
        sending: "Enviando...",
        sent: "Mensagem enviada. Respondo no e-mail informado.",
        invalidFields: "Preencha todos os campos obrigatórios antes de enviar.",
        invalidEmail: "Informe um endereço de e-mail válido.",
        sendFailed: "Não foi possível enviar. Tente de novo em instantes.",
        sendNotConfigured: "O envio de e-mail ainda não está configurado neste servidor.",
        rateLimited: "Muitas mensagens em pouco tempo. Tente de novo mais tarde.",
        whatsappEyebrow: "Mensagem instantânea",
        whatsappTitle: "WhatsApp",
        whatsappDesc: "Me mande uma mensagem no WhatsApp para uma resposta mais rápida.",
      },
    },
    command: {
      button: "Acesso rápido",
      placeholder: "Ir para seção, projeto ou ação…",
      empty: "Nenhum resultado encontrado.",
      label: "Menu de comandos",
      groups: {
        navigation: "Seções",
        projects: "Projetos",
        actions: "Ações",
      },
      actions: {
        downloadPdf: "Baixar currículo em PDF",
        copyEmail: "Copiar endereço de e-mail",
        toggleTheme: "Alternar tema claro/escuro",
        toggleLanguage: "Trocar idioma (PT / EN)",
        editPortfolio: "Alternar modo de edição",
        openLattes: "Abrir Currículo Lattes",
      },
    },
    footer: {
      copy: "Davi Andrade. Portfólio e projetos.",
    },
    system: {
      notFoundTitle: "Página não encontrada",
      notFoundDesc:
        "O endereço que você abriu não existe ou foi movido. Volte para o início do portfólio ou envie uma mensagem.",
      errorTitle: "Algo deu errado",
      errorDesc:
        "Ocorreu um erro inesperado ao carregar esta página. Tente novamente ou volte para o início.",
      backHome: "Voltar ao início",
      tryAgain: "Tentar novamente",
      reference: "Referência",
    },
    hero: {
      eyebrow: "João Pessoa, Brasil · UTC-3",
      role: "Engenheiro de Software Full-Stack · Ciência da Computação",
      title: "Davi Andrade",
      titleFirst: "Davi",
      titleHighlight: "Andrade",
      bodyLead: "Mais de 5 anos desenvolvendo software web e mobile em produção com",
      bodyHighlight1: "TypeScript, React, Next.js, Node.js, Java e PostgreSQL",
      bodyMiddle: ". De sistemas de auditoria e transparência no TCE-PB ao",
      bodyHighlight2: "Asebili",
      bodyEnd:
        " e aos apps com SSO compartilhado de daviandrade.dev.",
      bodySecondary:
        "Disponível para vagas de engenharia de software full-stack e aberto a colaborações de pesquisa em IHC e acessibilidade.",
      profileAlt: "Davi Andrade, retrato de engenheiro de software full-stack",
      portraitBadge: "Aberto a novas propostas · Remoto · PT / EN",
      focus: "Stack principal & foco",
      focusItems: [
        "TypeScript · React · Next.js",
        "Node.js · Java · PostgreSQL",
        "React Native · Expo · Docker",
        "WCAG 2.2 AA · i18n · IHC",
      ],
      actions: {
        projects: "Ver projetos",
        resume: "Currículo vivo",
        command: "Acesso rápido",
      },
      proof: {
        work: {
          eyebrow: "Produção · 5+ anos",
          title: "Sistemas web e setor público",
          body: "Plataformas de auditoria, transparência e gestão em produção (SAGRES, Hub de Portais, Educação Básica e login interno).",
        },
        research: {
          eyebrow: "Pesquisa & EdTech",
          title: "Asebili · IHC e Acessibilidade",
          body: "Ecossistema multiplataforma para ensino de português escrito a alunos surdos. Manuscrito em preparação.",
        },
        credentials: {
          eyebrow: "Formação & Sistemas",
          title: "CC + Pós Full-Stack e Cloud",
          body: "UNIPÊ e Gran · Membro ACM e ANETI · Hub central Better Auth SSO integrado a todo o ecossistema.",
        },
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
        "Sistemas não públicos e protótipos de pesquisa, incluindo o TecVoto e o protótipo do Asebili de 2023.",
    },
    cv: {
      eyebrow: "Downloads em PDF",
      title: "Currículo",
      body: "Baixe a versão acadêmica ou profissional em português ou inglês.",
      downloadAction: "Baixar",
      downloaded: "Download do currículo iniciado",
      items: {
        academicPt: {
          title: "Currículo Acadêmico (PT-BR)",
          description: "Pesquisa em IHC, publicações, formação acadêmica e trajetória técnica.",
        },
        professionalPt: {
          title: "Currículo Profissional (PT-BR)",
          description: "Experiência em engenharia full-stack, stack técnica e entregas em produção.",
        },
        academicEn: {
          title: "Currículo Acadêmico (EN)",
          description: "Versão em inglês com pesquisa em IHC, publicações, GPA e afiliações.",
        },
        professionalEn: {
          title: "Currículo Profissional (EN)",
          description: "Versão em inglês voltada a vagas internacionais de engenharia full-stack.",
        },
      },
    },
    resume: {
      eyebrow: "Currículo vivo",
      title: "Experiência e pesquisa",
      lattes: "Currículo Lattes",
      current: "Atual",
      inProgress: "Em andamento",
      tagsLabel: "Tecnologias",
      interestsTitle: "Interesses de pesquisa",
      portfolio: "Portfólio",
      filterLabel: "Filtrar linha do tempo",
      filters: {
        all: "Tudo",
        research: "Pesquisa",
        experience: "Experiência",
        volunteering: "Voluntariado",
      },
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

function collectPaths(node: unknown, prefix = ""): string[] {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    return prefix ? [prefix] : [];
  }
  return Object.entries(node).flatMap(([key, value]) =>
    collectPaths(value, prefix ? `${prefix}.${key}` : key),
  );
}

export function translationPaths(language: Language): string[] {
  return collectPaths(copy[language]).sort();
}
