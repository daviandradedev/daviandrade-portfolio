import {
  textPair,
  type PortfolioDocument,
} from "@/lib/portfolio-document";

const pair = textPair;

export const portfolioSeed: PortfolioDocument = {
  version: 1,
  profile: {
    name: "Davi Andrade",
    headline: pair(
      "Full-stack developer and computer science graduate",
      "Desenvolvedor full-stack e bacharel em Ciência da Computação",
    ),
    location: pair("João Pessoa, Paraíba, Brazil", "João Pessoa, Paraíba, Brasil"),
    email: "daviandrade.dev@gmail.com",
    phone: "+55 (83) 99316-5070",
    phoneHref: "tel:+5583993165070",
    website: "https://daviandrade.dev",
    github: "https://github.com/daviandradedev",
    linkedin: "https://linkedin.com/in/daviandradedev",
    lattes: "http://lattes.cnpq.br/7450050413231065",
    summary: pair(
      "A timeline pulled from my CV, linked to the projects on this site. I am looking for graduate research paths and advisor fit in computer science, with interests spanning software engineering, applied computing, web and mobile systems, HCI, human-centered computing, and education.",
      "Uma linha do tempo baseada no meu CV, conectada aos projetos deste site. Busco caminhos de pesquisa de pós-graduação e alinhamento com orientadores em Ciência da Computação, com interesses em engenharia de software, computação aplicada, sistemas web e mobile, IHC, computação centrada em pessoas e educação.",
    ),
    interests: pair(
      "Software engineering, applied computing, web and mobile systems, Human-Computer Interaction (HCI), human-centered computing, artificial intelligence applied to accessible interfaces, educational technology, digital accessibility, assistive technologies, and computing for social impact. I am actively seeking a graduate research path, advisor fit, and collaborations in computer science.",
      "Engenharia de software, computação aplicada, sistemas web e mobile, Interação Humano-Computador (IHC), computação centrada em pessoas, inteligência artificial aplicada a interfaces acessíveis, tecnologia educacional, acessibilidade digital, tecnologias assistivas e computação para impacto social. Busco ativamente um caminho de pesquisa de pós-graduação, alinhamento com orientadores e colaborações em Ciência da Computação.",
    ),
  },
  education: [
    {
      id: "gran",
      period: pair("2024 – 2026", "2024 – 2026"),
      title: pair(
        "Postgraduate Certificate in Full Stack Development and Cloud Computing",
        "Pós-graduação em Desenvolvimento Full Stack e Cloud Computing",
      ),
      org: pair("Gran University Center", "Centro Universitário Gran"),
      location: pair("João Pessoa, PB, Brazil", "João Pessoa, PB, Brasil"),
      inProgress: true,
    },
    {
      id: "unipe",
      period: pair("2019 – 2023", "2019 – 2023"),
      title: pair(
        "Bachelor of Science in Computer Science",
        "Bacharelado em Ciência da Computação",
      ),
      org: pair(
        "João Pessoa University Center (UNIPÊ)",
        "Centro Universitário de João Pessoa (UNIPÊ)",
      ),
      location: pair("João Pessoa, PB, Brazil", "João Pessoa, PB, Brasil"),
    },
  ],
  timeline: [
    {
      id: "asebili-research",
      block: "research",
      period: pair("2022 – 2023", "2022 – 2023"),
      title: pair("Undergraduate Researcher", "Pesquisador de graduação"),
      org: pair(
        "UNIPÊ · Advisor: Ricardo Roberto de Lima, M.S.",
        "UNIPÊ · Orientador: Ricardo Roberto de Lima, M.Sc.",
      ),
      location: pair("João Pessoa, PB, Brazil", "João Pessoa, PB, Brasil"),
      bullets: [
        pair(
          "Designed Asebili, a gamified educational web application to support written Portuguese acquisition as a second language for Libras speakers.",
          "Projetou o Asebili, aplicação web gamificada para apoiar a aquisição do português escrito como segunda língua para falantes de Libras.",
        ),
        pair(
          "Implemented the initial architecture with TypeScript, Angular, Java, and Spring Boot, integrating educational content, interactive flows, and accessibility-oriented UI components.",
          "Implementou a arquitetura inicial com TypeScript, Angular, Java e Spring Boot, integrando conteúdo educacional, fluxos interativos e componentes de interface orientados à acessibilidade.",
        ),
        pair(
          "Conducted user-centered research with deaf learners and educators, focusing on visual interface requirements, usability constraints, accessibility needs, and learner engagement.",
          "Conduziu pesquisa centrada no usuário com aprendizes surdos e educadores, focando em requisitos visuais de interface, restrições de usabilidade, necessidades de acessibilidade e engajamento.",
        ),
        pair(
          "Ongoing evolution: expanding Asebili into a cross-platform ecosystem with Next.js, React Native/Expo, Neon, and cloud infrastructure for deployment and performance analytics.",
          "Evolução contínua: expansão do Asebili em um ecossistema multiplataforma com Next.js, React Native/Expo, Neon e infraestrutura em nuvem para deploy e analytics de desempenho.",
        ),
      ],
      links: [
        {
          label: pair("See Asebili (2023 prototype)", "Ver Asebili (protótipo 2023)"),
          href: "#project-asebili-legacy",
        },
        {
          label: pair("See current Asebili demos", "Ver demos atuais do Asebili"),
          href: "#projects",
        },
      ],
      tags: ["TypeScript", "Angular", "Spring Boot", "HCI"],
    },
    {
      id: "pbsoft-tce",
      block: "experience",
      period: pair("2023 – Present", "2023 – Atual"),
      title: pair("Full Stack Developer", "Desenvolvedor Full Stack"),
      org: pair(
        "PBSoft, contracted to the Paraíba State Court of Accounts (TCE-PB)",
        "PBSoft, contratado pelo Tribunal de Contas do Estado da Paraíba (TCE-PB)",
      ),
      location: pair("João Pessoa, PB, Brazil", "João Pessoa, PB, Brasil"),
      current: true,
      bullets: [
        pair(
          "Developed components of SAGRES Auditor, an internal auditing and data-querying platform used to support state auditors in monitoring public expenditures.",
          "Desenvolveu componentes do SAGRES Auditor, plataforma interna de auditoria e consulta de dados para apoiar auditores no monitoramento de despesas públicas.",
        ),
        pair(
          "Contributed to SAGRES Cidadão, a public-facing transparency portal designed to improve citizen access to government financial data.",
          "Contribuiu para o SAGRES Cidadão, portal público de transparência para ampliar o acesso cidadão a dados financeiros governamentais.",
        ),
        pair(
          "Developed custom WordPress architectures for the official TCE-PB portal, supporting institutional communication and content management.",
          "Desenvolveu arquiteturas WordPress customizadas para o portal oficial do TCE-PB, apoiando comunicação institucional e gestão de conteúdo.",
        ),
        pair(
          "Developed the official login page for internal access to institutional systems.",
          "Desenvolveu a página oficial de login para acesso interno a sistemas institucionais.",
        ),
        pair(
          "Engineered a centralized Portal Hub, including the specialized Basic Education Portal, establishing a unified, accessible architecture for citizen access to state-wide institutional data and educational metrics.",
          "Estruturou um hub central de portais, incluindo o Portal Educação Básica, com uma arquitetura única e acessível para o acesso cidadão a dados institucionais e indicadores educacionais do estado.",
        ),
      ],
      links: [
        { label: pair("See SAGRES", "Ver SAGRES"), href: "#project-sagres-auditor" },
        { label: pair("See Sagres Cidadão", "Ver Sagres Cidadão"), href: "#project-sagres" },
        { label: pair("See Portal TCE-PB", "Ver Portal TCE-PB"), href: "#project-tce" },
        { label: pair("See identity gateway", "Ver gateway de identidade"), href: "#project-login" },
        { label: pair("See Portal Educação Básica", "Ver Portal Educação Básica"), href: "#project-tce-educacao-basica" },
        { label: pair("See Agregador de Portais", "Ver Agregador de Portais"), href: "#project-tce-portais" },
      ],
      tags: ["React", "Kotlin", "Angular", "WordPress"],
    },
    {
      id: "maxima",
      block: "experience",
      period: pair("2024 – 2025", "2024 – 2025"),
      title: pair("Full Stack Developer", "Desenvolvedor Full Stack"),
      org: pair("Maxima Solutions", "Maxima Solutions"),
      location: pair("João Pessoa, PB, Brazil", "João Pessoa, PB, Brasil"),
      bullets: [
        pair(
          "Developed TecVoto, a secure digital voting platform for municipal secretariats and legislative city councils using PHP and Laravel.",
          "Desenvolveu o TecVoto, plataforma segura de votação digital para secretarias municipais e câmaras legislativas com PHP e Laravel.",
        ),
        pair(
          "Implemented backend logic, relational database structures, and workflows designed to support vote integrity, scalability, and availability during legislative sessions.",
          "Implementou lógica de back-end, estruturas de banco relacional e fluxos de sistema para integridade de votos, escalabilidade e disponibilidade em sessões legislativas.",
        ),
      ],
      links: [{ label: pair("See TecVoto", "Ver TecVoto"), href: "#project-tecvoto" }],
      tags: ["PHP", "Laravel", "PostgreSQL"],
    },
    {
      id: "tce-intern",
      block: "experience",
      period: pair("2021 – 2023", "2021 – 2023"),
      title: pair("Undergraduate Intern", "Estagiário de graduação"),
      org: pair("TCE-PB", "TCE-PB"),
      location: pair("João Pessoa, PB, Brazil", "João Pessoa, PB, Brasil"),
      bullets: [
        pair(
          "Developed Mural Licitações, a front-end dashboard using Angular to visualize and track public procurement and bidding processes integrated with the Tramita system.",
          "Desenvolveu o Mural Licitações, dashboard front-end em Angular para visualizar e acompanhar processos de licitação integrados ao sistema Tramita.",
        ),
        pair(
          "Collaborated with senior engineers to design user-centered interfaces for improving transparency, traceability, and public access to procurement information.",
          "Colaborou com engenheiros seniores no design de interfaces centradas no usuário para melhorar transparência, rastreabilidade e acesso público a informações de compras.",
        ),
      ],
      links: [],
      tags: ["Angular", "UI/UX"],
    },
    {
      id: "transempregos-role",
      block: "volunteering",
      period: pair("2026 – 2026", "2026 – 2026"),
      title: pair("Front-End Developer & UX", "Desenvolvedor Front-End & UX"),
      org: pair("Transempregos", "Transempregos"),
      location: pair("Brazil", "Brasil"),
      current: false,
      bullets: [
        pair(
          "Redesigned and rebuilt the user interface and information architecture for the leading employability platform dedicated to the transgender community in Brazil.",
          "Redesenhou e reconstruiu a interface e a arquitetura de informação da principal plataforma de empregabilidade dedicada à comunidade trans no Brasil.",
        ),
        pair(
          "Overhauled the platform access flow and job listing displays with a strong focus on UX, ensuring intuitive and accessible navigation.",
          "Reestruturou o fluxo de acesso e as listagens de vagas com forte foco em UX, garantindo navegação intuitiva e acessível.",
        ),
        pair(
          "Contributed to a high-impact project aimed at increasing digital accessibility and facilitating inclusive job market integration.",
          "Contribuiu para um projeto de alto impacto voltado à acessibilidade digital e à integração inclusiva no mercado de trabalho.",
        ),
      ],
      links: [],
      tags: ["UX", "Accessibility", "Front-end"],
    },
  ],
  skills: [
    {
      id: "languages",
      label: pair("Programming languages", "Linguagens de programação"),
      items: [
        "TypeScript",
        "JavaScript",
        "PHP",
        "Kotlin",
        "Java",
        "HTML5",
        "CSS3",
        "SASS",
      ].map((item) => pair(item, item)),
    },
    {
      id: "frontend",
      label: pair("Front-end & mobile", "Front-end e mobile"),
      items: [
        "React",
        "Next.js",
        "Angular",
        "React Native",
        "Expo",
        "WordPress Theme Development",
        "Tailwind CSS",
        "Bootstrap",
        "Ag-Grid",
      ].map((item) => pair(item, item)),
    },
    {
      id: "backend",
      label: pair("Back-end & cloud", "Back-end e cloud"),
      items: ["Node.js", "Laravel", "Spring Boot", "Supabase", "REST APIs"].map((item) =>
        pair(item, item),
      ),
    },
    {
      id: "data",
      label: pair("Databases", "Bancos de dados"),
      items: ["PostgreSQL", "MySQL", "SQL Server", "Neon"].map((item) => pair(item, item)),
    },
    {
      id: "tooling",
      label: pair("Tools", "Ferramentas"),
      items: ["Git", "GitHub", "GitLab", "Bitbucket", "Redmine", "Postman", "DBeaver", "npm"].map(
        (item) => pair(item, item),
      ),
    },
    {
      id: "design",
      label: pair("Design & UX", "Design e UX"),
      items: ["Figma", "Adobe Photoshop"].map((item) => pair(item, item)),
    },
    {
      id: "research",
      label: pair("Research areas", "Áreas de pesquisa"),
      items: [
        pair("Human-Computer Interaction", "Interação Humano-Computador"),
        pair("Artificial intelligence", "Inteligência artificial"),
        pair("Usability Testing", "Testes de Usabilidade"),
        pair("Accessibility", "Acessibilidade"),
        pair("Educational Technology", "Tecnologia Educacional"),
      ],
    },
  ],
  publications: [
    {
      id: "asebili-manuscript",
      text: pair(
        "Manuscript in preparation: Andrade, D. C.; Paiva, L. K.; Lima, R. R. “Asebili: A Cross-Platform Ecosystem for Teaching Written Portuguese to Deaf Learners.”",
        "Manuscrito em preparação: Andrade, D. C.; Paiva, L. K.; Lima, R. R. “Asebili: A Cross-Platform Ecosystem for Teaching Written Portuguese to Deaf Learners.”",
      ),
      href: "#projects",
    },
  ],
  affiliations: [
    {
      id: "acm",
      title: pair(
        "Student Member, Association for Computing Machinery (ACM)",
        "Membro estudante, Association for Computing Machinery (ACM)",
      ),
      period: pair("2026 – Present", "2026 – Atual"),
      href: "https://www.acm.org/",
    },
    {
      id: "aneti",
      title: pair(
        "Member, National Association of IT Specialists (ANETI)",
        "Membro, Associação Nacional de Especialistas em TI (ANETI)",
      ),
      period: pair("2026 – Present", "2026 – Atual"),
      href: "https://aneti.org.br",
    },
  ],
  projects: [
    {
      id: "work-schedule",
      category: "projects",
      title: pair("Work Schedule Generator", "Gerador de Escala de Trabalho"),
      body: pair(
        "Builds fair on-site team rotations with configurable rules, PDF export, and an operations-first web UI.",
        "Monta rodízios presenciais justos com regras configuráveis, exportação em PDF e interface voltada à operação.",
      ),
      href: "https://work-schedule.daviandrade.dev",
      internal: false,
      ongoing: false,
      cover: "/media/projects/work-schedule/screenshot.png",
      coverAlt: pair(
        "Work Schedule Generator project cover",
        "Capa do projeto Gerador de Escala de Trabalho",
      ),
      accent: "linear-gradient(135deg, #1d4ed8 0%, #16a34a 100%)",
      highlights: [
        pair("Scheduling", "Escalas"),
        pair("Next.js", "Next.js"),
        pair("PDF", "PDF"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/work-schedule/screenshot.png",
          alt: pair(
            "On-site Work Schedule dashboard with team rotation calendar for June 2026",
            "Dashboard do On-site Work Schedule com calendário de rodízio de equipes em junho de 2026",
          ),
        },
      ],
    },
    {
      id: "seriesaholic",
      category: "projects",
      title: pair("Seriesaholic", "Seriesaholic"),
      body: pair(
        "Tracks series, seasons, and episode progress, and signs in with the same daviandrade.dev account used across the other apps.",
        "Acompanha séries, temporadas e progresso de episódios, e entra com a mesma conta daviandrade.dev dos outros apps.",
      ),
      href: "https://seriesaholic.daviandrade.dev",
      internal: false,
      ongoing: false,
      cover: "/media/projects/seriesaholic/screenshot.jpg",
      coverAlt: pair(
        "Seriesaholic home with watch-now posters, a watching shelf, and show counts",
        "Home do Seriesaholic com pôsteres para assistir agora, prateleira em exibição e contagem de séries",
      ),
      accent: "linear-gradient(135deg, #7c2d12 0%, #b45309 100%)",
      highlights: [
        pair("Series tracking", "Séries"),
        pair("Next.js", "Next.js"),
        pair("Shared account", "Conta compartilhada"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/seriesaholic/screenshot.jpg",
          alt: pair(
            "Seriesaholic home with watch-now posters, a watching shelf, and show counts",
            "Home do Seriesaholic com pôsteres para assistir agora, prateleira em exibição e contagem de séries",
          ),
        },
      ],
    },
    {
      id: "asebili-instructor",
      category: "projects",
      title: pair("Asebili: Instructor dashboard", "Asebili: Painel do instrutor"),
      body: pair(
        "Instructor hub for deaf education: class missions, LIBRAS explainer videos, quizzes, and learner evidence.",
        "Hub do instrutor para educação de surdos: missões de turma, vídeos explicativos em LIBRAS, quizzes e evidências de aprendizagem.",
      ),
      href: "https://asebili-instructor.daviandrade.dev",
      internal: false,
      ongoing: false,
      cover: "/media/projects/asebili-instructor/screenshot.png",
      coverAlt: pair(
        "Asebili instructor dashboard cover",
        "Capa do painel do instrutor Asebili",
      ),
      accent: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
      highlights: [
        pair("EdTech", "EdTech"),
        pair("LIBRAS", "LIBRAS"),
        pair("Dashboard", "Dashboard"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/asebili-instructor/screenshot.png",
          alt: pair(
            "Asebili instructor dashboard with class missions, live demo, and activity management",
            "Painel do instrutor Asebili com missões de turma, demo ao vivo e gestão de atividades",
          ),
        },
      ],
    },
    {
      id: "asebili-student",
      category: "projects",
      title: pair("Asebili: Student simulator", "Asebili: Simulador do aluno"),
      body: pair(
        "Students enter a class code and complete visual written-Portuguese challenges in a mobile-friendly web flow.",
        "O aluno entra com o código da turma e responde desafios visuais de português escrito em um fluxo web mobile-friendly.",
      ),
      href: "https://asebili-student.daviandrade.dev",
      internal: false,
      ongoing: false,
      cover: "/media/projects/asebili-student/screenshot.png",
      coverAlt: pair(
        "Asebili student simulator cover",
        "Capa do simulador do aluno Asebili",
      ),
      accent: "linear-gradient(135deg, #0891b2 0%, #16a34a 100%)",
      highlights: [
        pair("EdTech", "EdTech"),
        pair("Quizzes", "Quizzes"),
        pair("Accessibility", "Acessibilidade"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/asebili-student/screenshot.png",
          alt: pair(
            "Asebili student simulator join screen with class mission code input",
            "Tela de entrada do simulador do aluno Asebili com código da missão da turma",
          ),
        },
      ],
    },
    {
      id: "gradmatch",
      category: "ongoing",
      title: pair("GradMatch", "GradMatch"),
      body: pair(
        "Graduate program matching tooling I am iterating on for advisor fit, research discovery, and admissions workflows.",
        "Ferramenta de matching de programas de pós que estou iterando para alinhamento com orientadores, descoberta de pesquisa e fluxos de admissão.",
      ),
      href: "",
      internal: true,
      ongoing: true,
      cover: "/media/projects/gradmatch/cover.svg",
      coverAlt: pair("GradMatch ongoing project cover", "Capa do projeto GradMatch em andamento"),
      accent: "linear-gradient(135deg, #475569 0%, #334155 100%)",
      highlights: [
        pair("Research", "Pesquisa"),
        pair("Graduate programs", "Pós-graduação"),
      ],
      media: [],
    },
    {
      id: "tce",
      category: "contributions",
      title: pair("Portal TCE-PB", "Portal TCE-PB"),
      body: pair(
        "Official portal for news, citizen services, institutional content, and access to transparency tools.",
        "Portal oficial de notícias, serviços ao cidadão, conteúdo institucional e acesso a ferramentas de transparência.",
      ),
      href: "https://tce.pb.gov.br/",
      internal: false,
      ongoing: false,
      cover: "/media/projects/tce/screenshot.png",
      coverAlt: pair(
        "Portal TCE-PB cover",
        "Capa do Portal TCE-PB",
      ),
      accent: "linear-gradient(135deg, #0f766e 0%, #1d4ed8 100%)",
      highlights: [
        pair("Public sector", "Setor público"),
        pair("Institutional", "Institucional"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/tce/screenshot.png",
          alt: pair(
            "Portal TCE-PB homepage with news, services, and Sagres Cidadão access",
            "Home do Portal TCE-PB com notícias, serviços e acesso ao Sagres Cidadão",
          ),
        },
      ],
    },
    {
      id: "tce-educacao-basica",
      category: "contributions",
      title: pair("Portal Educação Básica (TCE-PB)", "Portal Educação Básica (TCE-PB)"),
      body: pair(
        "Coordinated audit portal on early elementary performance in Paraíba's municipal public school systems.",
        "Portal da auditoria coordenada sobre o desempenho nos anos iniciais do ensino fundamental das redes municipais paraibanas.",
      ),
      href: "https://portais.tce.pb.gov.br/educacao-basica",
      internal: false,
      ongoing: false,
      cover: "/media/projects/tce-educacao-basica/screenshot.jpg",
      coverAlt: pair(
        "Portal Educação Básica home with the audit sidebar, sample stats, and the reason for the theme",
        "Home do Portal Educação Básica com a barra da auditoria, indicadores da amostra e a razão do tema",
      ),
      accent: "linear-gradient(135deg, #7f1d1d 0%, #292524 100%)",
      highlights: [
        pair("Audit", "Auditoria"),
        pair("Basic education", "Educação básica"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/tce-educacao-basica/screenshot.jpg",
          alt: pair(
            "Portal Educação Básica home with the audit sidebar, sample stats, and the reason for the theme",
            "Home do Portal Educação Básica com a barra da auditoria, indicadores da amostra e a razão do tema",
          ),
        },
      ],
    },
    {
      id: "tce-portais",
      category: "contributions",
      title: pair("Agregador de Portais (TCE-PB)", "Agregador de Portais (TCE-PB)"),
      body: pair(
        "Entry point that routes people to the TCE-PB coordinated audit portals, including UPAs and Educação Básica.",
        "Entrada que leva aos portais de auditoria coordenada do TCE-PB, entre eles UPAs e Educação Básica.",
      ),
      href: "https://portais.tce.pb.gov.br/",
      internal: false,
      ongoing: false,
      cover: "/media/projects/tce-portais/screenshot.jpg",
      coverAlt: pair(
        "TCE-PB portal picker with Portal UPAs and Portal Educação Básica",
        "Seletor de portais do TCE-PB com Portal UPAs e Portal Educação Básica",
      ),
      accent: "linear-gradient(135deg, #9f1239 0%, #7f1d1d 100%)",
      highlights: [
        pair("Portals", "Portais"),
        pair("TCE-PB", "TCE-PB"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/tce-portais/screenshot.jpg",
          alt: pair(
            "TCE-PB portal picker with Portal UPAs and Portal Educação Básica",
            "Seletor de portais do TCE-PB com Portal UPAs e Portal Educação Básica",
          ),
        },
      ],
    },
    {
      id: "sagres",
      category: "contributions",
      title: pair("Sagres Cidadão", "Sagres Cidadão"),
      body: pair(
        "Citizen transparency portal for municipal revenue, spending, procurement, suppliers, and personnel data.",
        "Portal de transparência cidadã com receita, despesa, licitação, fornecedores e dados de pessoal por município.",
      ),
      href: "https://sagrescidadao.tce.pb.gov.br/",
      internal: false,
      ongoing: false,
      cover: "/media/projects/sagres/screenshot.png",
      coverAlt: pair(
        "Sagres Cidadão transparency portal cover",
        "Capa do portal Sagres Cidadão",
      ),
      accent: "linear-gradient(135deg, #ca8a04 0%, #16a34a 100%)",
      highlights: [
        pair("Transparency", "Transparência"),
        pair("Citizen portal", "Portal cidadão"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/sagres/screenshot.png",
          alt: pair(
            "Sagres Cidadão municipal dashboard with revenue, expense, and procurement modules",
            "Dashboard municipal do Sagres Cidadão com módulos de receita, despesa e licitação",
          ),
        },
      ],
    },
    {
      id: "login",
      category: "contributions",
      title: pair("TCE-PB identity gateway", "Gateway de identidade TCE-PB"),
      body: pair(
        "Unified login for TCE-PB systems, with gov.br authentication and institutional account flows.",
        "Login unificado para sistemas do TCE-PB, com autenticação gov.br e fluxos de conta institucional.",
      ),
      href: "https://login.tce.pb.gov.br/",
      internal: false,
      ongoing: false,
      cover: "/media/projects/login/screenshot.png",
      coverAlt: pair(
        "TCE-PB identity gateway cover",
        "Capa do gateway de identidade TCE-PB",
      ),
      accent: "linear-gradient(135deg, #dc2626 0%, #7c3aed 100%)",
      highlights: [
        pair("Authentication", "Autenticação"),
        pair("SSO", "SSO"),
      ],
      media: [
        {
          type: "image",
          src: "/media/projects/login/screenshot.png",
          alt: pair(
            "TCE-PB login screen with gov.br authentication and institutional branding",
            "Tela de login do TCE-PB com autenticação gov.br e identidade institucional",
          ),
        },
      ],
    },
    {
      id: "asebili-legacy",
      category: "internal",
      title: pair("Asebili (2023 prototype)", "Asebili (protótipo 2023)"),
      body: pair(
        "Early classroom prototype for accessibility and written Portuguese with Libras speakers. It seeded the current Asebili ecosystem.",
        "Protótipo inicial de sala de aula para acessibilidade e português escrito com falantes de Libras. Deu origem ao ecossistema Asebili atual.",
      ),
      href: "",
      internal: true,
      ongoing: false,
      cover: "/media/projects/asebili-legacy/cover.svg",
      coverAlt: pair("Asebili 2023 prototype cover", "Capa do protótipo Asebili 2023"),
      accent: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      highlights: [
        pair("Accessibility", "Acessibilidade"),
        pair("Prototype", "Protótipo"),
      ],
      media: [
        {
          type: "embed",
          src: "https://drive.google.com/file/d/1YvFCL1H9bJarZwVmPghGKi5U5_Ri-lye/preview",
          alt: pair(
            "Asebili 2023 prototype walkthrough video",
            "Vídeo de demonstração do protótipo Asebili 2023",
          ),
        },
      ],
    },
    {
      id: "sagres-auditor",
      category: "internal",
      title: pair("SAGRES", "SAGRES"),
      body: pair(
        "Internal auditing and data-querying platform that supports state auditors monitoring public expenditures at TCE-PB.",
        "Plataforma interna de auditoria e consulta de dados que apoia auditores no monitoramento de despesas públicas no TCE-PB.",
      ),
      href: "",
      internal: true,
      ongoing: false,
      cover: "/media/projects/sagres-auditor/cover.svg",
      coverAlt: pair(
        "SAGRES internal auditing platform cover",
        "Capa da plataforma interna SAGRES",
      ),
      accent: "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
      highlights: [
        pair("Auditing", "Auditoria"),
        pair("Data querying", "Consulta de dados"),
      ],
      media: [],
    },
    {
      id: "tecvoto",
      category: "internal",
      title: pair("TecVoto", "TecVoto"),
      body: pair(
        "Secure digital voting platform for municipal secretariats and legislative city councils, built with PHP and Laravel.",
        "Plataforma segura de votação digital para secretarias municipais e câmaras legislativas, com PHP e Laravel.",
      ),
      href: "",
      internal: true,
      ongoing: false,
      cover: "/media/projects/tecvoto/cover.svg",
      coverAlt: pair(
        "TecVoto digital voting platform cover",
        "Capa da plataforma TecVoto",
      ),
      accent: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
      highlights: [
        pair("Digital voting", "Votação digital"),
        pair("Laravel", "Laravel"),
      ],
      media: [],
    },
  ],
};
