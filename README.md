# linktree-breno

Agregador de links pessoal estilo LinkTree, construído como primeiro desafio da formação da [Rocketseat](https://rocketseat.com.br).

## Stack

- **Next.js 16** — App Router, Server Components, `unstable_cache`
- **TypeScript** — tipagem estrita em todo o projeto
- **Tailwind CSS v4** — estilização com suporte a dark mode via seletor de classe
- **Prismic CMS** — fonte de dados via singleton `profile`
- **next-themes** — alternância de tema light/dark sem flash
- **lucide-react** — ícones

## Funcionalidades

- Foto de perfil com fallback para inicial do nome
- Lista de links configurável via Prismic (sem redeploy)
- Ícones de redes sociais (GitHub, LinkedIn, Instagram, Twitter, YouTube, Website)
- Tema claro/escuro com persistência
- Cache de 5 minutos com revalidação por tag (`revalidateTag("profile")`)
- Acessibilidade: navegação por teclado, `aria-label` em todos os interativos

## Pré-requisitos

- Node.js 20+
- Conta no [Prismic](https://prismic.io) com repositório criado

## Configuração

**1. Clone e instale as dependências**

```bash
git clone <url-do-repositorio>
cd linktree-breno
npm install
```

**2. Configure as variáveis de ambiente**

```bash
cp .env.local.example .env.local
```

Edite `.env.local`:

```env
PRISMIC_REPOSITORY_NAME=nome-do-seu-repositorio
```

**3. Configure o Custom Type no Prismic**

No painel do Prismic, crie um Custom Type **Single** com API ID `profile` e cole o JSON abaixo no editor JSON:

<details>
<summary>Ver JSON do Custom Type</summary>

```json
{
  "Main": {
    "name": {
      "type": "Text",
      "config": { "label": "Name", "placeholder": "Seu nome" }
    },
    "bio": {
      "type": "Text",
      "config": { "label": "Bio", "placeholder": "Uma frase curta sobre você" }
    },
    "avatar": {
      "type": "Image",
      "config": {
        "label": "Avatar",
        "constraint": { "width": 400, "height": 400 },
        "thumbnails": []
      }
    },
    "links": {
      "type": "Group",
      "config": {
        "label": "Links",
        "fields": {
          "title": {
            "type": "Text",
            "config": { "label": "Title", "placeholder": "Meu Portfólio" }
          },
          "url": {
            "type": "Link",
            "config": { "label": "URL", "allowTargetBlank": true, "select": "web" }
          }
        }
      }
    },
    "social_links": {
      "type": "Group",
      "config": {
        "label": "Social Links",
        "fields": {
          "platform": {
            "type": "Select",
            "config": {
              "label": "Platform",
              "options": ["github", "linkedin", "instagram", "twitter", "youtube", "website"],
              "default_value": "website"
            }
          },
          "url": {
            "type": "Link",
            "config": { "label": "URL", "allowTargetBlank": true, "select": "web" }
          }
        }
      }
    }
  }
}
```

</details>

**4. Crie e publique o documento Profile**

No Prismic, vá em **Documents → Profile** e preencha:

| Campo | Descrição |
|---|---|
| Name | Seu nome completo |
| Bio | Frase curta de apresentação |
| Avatar | Foto de perfil (recomendado: 400×400px) |
| Links | Lista de botões — cada item tem `title` e `url` |
| Social Links | Ícones de redes — escolha a `platform` e cole a `url` |

Valores válidos para `platform`: `github` `linkedin` `instagram` `twitter` `youtube` `website`

**5. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx          # Fonte Inter, ThemeProvider, metadata
│   ├── page.tsx            # Server Component principal
│   └── globals.css         # Tailwind v4 + dark mode
├── components/
│   ├── avatar-profile.tsx  # Avatar com fallback de inicial
│   ├── link-button.tsx     # Botão de link com ícone ArrowUpRight
│   ├── social-links.tsx    # Ícones de redes sociais
│   ├── theme-provider.tsx  # Wrapper RSC do next-themes
│   └── theme-toggle.tsx    # Botão light/dark com guard de hidratação
├── lib/
│   ├── cms.ts              # getProfileData() com cache de 5 min
│   ├── prismic.ts          # Inicialização do cliente Prismic
│   └── utils.ts            # cn() — clsx + tailwind-merge
└── types/
    └── profile.ts          # ProfileData, ProfileLink, SocialLink, SocialPlatform
```

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento (Turbopack)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # ESLint
```

## Licença

MIT
