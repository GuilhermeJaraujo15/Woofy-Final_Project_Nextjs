# Woofy — análise para deploy na Vercel

Data: 15/09/2026. Projeto analisado: `Woofy-Final_Project_Nextjs`.

## Conclusão

O erro da imagem foi reproduzido exatamente: o build compila, mas falha ao pré-renderizar `/dashboard/aprovacoes` porque faltam `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Com as duas variáveis preenchidas com valores fictícios, o mesmo código concluiu o build e gerou as 16 páginas. Isso comprova a causa da falha de build, mas não comprova conexão, autenticação ou funcionamento dos dados reais.

As variáveis precisam existir **antes do build**. Não é necessário gravar chaves no código ou no Git. Cadastre-as no projeto da Vercel e faça um novo deploy. Variáveis com prefixo `NEXT_PUBLIC_` são incorporadas ao JavaScript durante a compilação; alterar apenas a configuração depois não atualiza um build existente. [Documentação do Next.js](https://nextjs.org/docs/app/guides/environment-variables), [documentação da Vercel](https://vercel.com/docs/environment-variables).

## Evidências dos testes

Ambiente local: Windows, Node.js 24.14.1, pnpm 10.0.0 e dependências instaladas a partir do lockfile existente.

| Verificação | Resultado |
| --- | --- |
| `pnpm install --frozen-lockfile` | Passou, sem alteração de versões no lockfile. |
| `tsc --noEmit --incremental false` | Passou, sem erros de TypeScript. |
| `pnpm build` sem as variáveis | Falhou em `/dashboard/aprovacoes`, com o erro do Supabase mostrado na imagem. |
| `pnpm build` com valores fictícios | Passou: `Generating static pages (16/16)`. |
| Servidor de produção local, sem sessão | Páginas públicas responderam 200; nove rotas privadas verificadas responderam 307 para `/login`. |
| `/arquivados` sem sessão | Respondeu 200, sem redirecionamento no servidor. |
| `/logo-pet-shop.png` / `/icon.svg` | 200 / 404. |
| `pnpm lint` | Falhou: ESLint não está instalado. |
| `pnpm audit --prod` | Reportou 29 ocorrências: 2 críticas, 16 altas e 11 moderadas. A contagem inclui caminhos de dependências; não equivale a 29 falhas exploráveis comprovadas no sistema. |

Os valores fictícios foram usados somente nos processos locais de teste. Não houve acesso ao banco real nem alteração das configurações de Vercel ou Supabase. O servidor temporário foi encerrado. O código da aplicação foi preservado.

## Configuração da Vercel

1. Abra o projeto já criado na Vercel.
2. Em **Settings → Environment Variables**, cadastre os nomes exatos abaixo, com os valores do seu projeto Supabase:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
   ```

   Use os valores reais, sem copiar os marcadores acima. A URL é a URL do projeto/API, não uma string de conexão PostgreSQL. A chave deve ser a chave pública `anon`; nunca use `service_role` ou uma chave secreta em uma variável `NEXT_PUBLIC_`. [Chaves do Supabase](https://supabase.com/docs/guides/api/api-keys).

3. Habilite as variáveis para **Production** e também **Preview** se publicar branches/previews.
4. Configure o framework como **Next.js**. A **Root Directory** deve apontar para a pasta que contém `package.json`: `.` se ela já é a raiz do repositório importado; `Woofy-Final_Project_Nextjs` se a pasta pai foi enviada ao Git.
5. Use `pnpm install --frozen-lockfile` para instalação e `pnpm build` para build. Mantenha o diretório de saída no padrão do framework. O projeto usa autenticação no servidor; não o converta em exportação estática para tentar contornar este erro.
6. Selecione Node.js **24.x**, a versão principal utilizada nesta validação e suportada pela Vercel. [Versões de Node.js na Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
7. Execute **Redeploy**. Ao mudar essas variáveis novamente, faça outro deploy.

## Achados no código

### 1. Bloqueio confirmado: cliente Supabase criado durante o build

- [lib/supabase.ts](Woofy-Final_Project_Nextjs/lib/supabase.ts), linhas 3–7: entrega as duas variáveis diretamente a `createBrowserClient`.
- [context/auth-context.tsx](Woofy-Final_Project_Nextjs/context/auth-context.tsx), linha 40: chama `createClient()` em `useMemo`, durante a renderização.
- [app/layout.tsx](Woofy-Final_Project_Nextjs/app/layout.tsx), linha 52: inclui `AuthProvider` no layout global.
- [página de aprovações](Woofy-Final_Project_Nextjs/app/(dashboard)/dashboard/aprovacoes/page.tsx), linha 28: também cria o cliente durante a renderização.

`"use client"` não impede a pré-renderização inicial de um componente. O `!` depois de `process.env...` é uma indicação ao TypeScript, não uma validação nem um valor padrão em execução. A página citada no erro é onde a falha apareceu; a dependência das variáveis é compartilhada por várias páginas.

Correção imediata: configurar as variáveis antes do build. Uma melhoria adicional seria validar a configuração com uma mensagem explícita antes da compilação. Inserir valores fictícios como fallback em produção apenas esconderia uma configuração inválida.

### 2. Rota administrativa `/arquivados` fora da proteção

[middleware.ts](Woofy-Final_Project_Nextjs/middleware.ts), linha 5, não inclui `/arquivados` em `adminRoutes`. O servidor confirmou resposta 200 sem sessão, enquanto `/dashboard`, `/pets` e as demais rotas protegidas redirecionaram ao login.

A [página de arquivados](Woofy-Final_Project_Nextjs/app/(dashboard)/arquivados/page.tsx) verifica a existência de usuário no navegador, mas não verifica se ele é administrador. Um tutor ou veterinário autenticado consegue alcançar essa interface; o acesso efetivo a registros depende das políticas do banco. O HTTP 200 sozinho não demonstra vazamento de dados.

Correção: incluir `/arquivados` na proteção administrativa e validar as permissões de leitura/restauração no Supabase.

### 3. Destino do login aceita parâmetro sem validação

[app/login/page.tsx](Woofy-Final_Project_Nextjs/app/login/page.tsx), linhas 24 e 58: `redirect` vem da URL e é passado diretamente a `router.push` após o login.

Correção: aceitar apenas caminhos internos permitidos para o perfil, recusando URLs externas e esquemas como `javascript:`. O Next.js documenta o risco de passar URLs não confiáveis a `router.push`. [Documentação de useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router).

### 4. Risco de travamento do fluxo de autenticação

[context/auth-context.tsx](Woofy-Final_Project_Nextjs/context/auth-context.tsx), linhas 84–87: o callback assíncrono de `onAuthStateChange` aguarda `fetchProfile()`, que faz outra chamada ao mesmo cliente Supabase.

Esse padrão tem risco documentado de deadlock, isto é, chamadas que ficam esperando umas pelas outras. Pode afetar login e atualização de sessão. Não foi reproduzido com credenciais reais nesta análise.

Correção: deixar o callback de autenticação síncrono e carregar o perfil fora dele, por exemplo em um efeito separado, com tratamento de erro e descarte de respostas de sessões antigas. [Orientação do Supabase](https://supabase.com/docs/guides/troubleshooting/why-is-my-supabase-api-call-not-returning-PGzXw0).

### 5. Redirecionamentos descartam cookies renovados

[middleware.ts](Woofy-Final_Project_Nextjs/middleware.ts), linhas 29–40: a renovação grava cookies em `supabaseResponse`. Os retornos `NextResponse.redirect(url)` criam outra resposta sem copiar esses cookies.

Correção: preservar os cookies de `supabaseResponse` na resposta de redirecionamento. A ocorrência depende de uma renovação de sessão durante uma requisição que redireciona; o teste sem sessão não valida esse cenário. [Padrão SSR do Supabase](https://supabase.com/docs/guides/auth/server-side/creating-a-client).

### 6. Verificações de qualidade incompletas

- [next.config.mjs](Woofy-Final_Project_Nextjs/next.config.mjs), linha 4: `ignoreBuildErrors: true` desabilita a checagem de tipos no build. A checagem independente passou; é possível reativar a validação sem corrigir erros de tipos nesta revisão.
- [package.json](Woofy-Final_Project_Nextjs/package.json): declara `lint: eslint .`, mas não instala ESLint e não contém configuração correspondente. Isso bloqueia `pnpm lint`, embora o build atual não execute lint.
- `middleware.ts` emite aviso de depreciação no Next.js 16; a convenção atual é `proxy.ts`. O aviso não impediu o build. [Migração oficial](https://nextjs.org/docs/messages/middleware-to-proxy).

### 7. Dependências com alertas de segurança

A auditoria sinalizou Next.js 16.2.6, Sharp e dependências indiretas de processamento de CSS/gráficos. Recomenda-se atualizar para versões corrigidas, atualizar o lockfile e repetir build e auditoria.

Os avisos críticos de Next.js consultados têm correção na linha 16 a partir de **16.3.3**. Isso não significa que atualizar apenas Next.js resolva todos os avisos indiretos. [Aviso sobre otimização AVIF](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4).

A aplicabilidade exige contexto: o projeto configura `images.unoptimized: true`, não define `i18n.locales`, e a Vercel não é uma hospedagem Windows. Assim, não foi demonstrada exploração dos alertas de AVIF, bypass condicionado a locale ou execução remota em servidor Windows nesta implantação. O erro da captura é de configuração do Supabase, e não um bloqueio de segurança identificado no log. [Condições do aviso de middleware](https://github.com/vercel/next.js/security/advisories/GHSA-6gpp-xcg3-4w24).

### 8. Banco depende das migrações e de permissões adicionais

O arquivo [schema.sql](Woofy-Final_Project_Nextjs/supabase/schema.sql) é uma base parcial em relação ao código atual. Aprovação de contas, CRMV, serviços, exames e campos adicionais são introduzidos nos scripts datados de 20260605 a 20260613. Para uma base nova, a sequência é o schema inicial seguido desses scripts em ordem de nome/data. Em uma base existente, confira quais já foram aplicados; alguns scripts fazem atualizações de dados e o schema não pode ser simplesmente repetido como se fosse totalmente idempotente.

Dois pontos merecem revisão das regras do banco antes do uso real:

- A aprovação/rejeição é verificada no middleware, mas os helpers `get_my_role`, `is_admin`, `is_tutor` e várias políticas de acesso não exigem `approval_status = 'approved'`. Pelos SQLs locais, uma sessão válida de conta pendente/rejeitada pode conservar permissões em chamadas diretas à API, mesmo que a interface redirecione essa conta.
- As políticas de atualização de `lancamentos`, em [20260612_exams_workflow.sql](Woofy-Final_Project_Nextjs/supabase/20260612_exams_workflow.sql), linhas 178–191, permitem ao proprietário atualizar registros de serviços sem restringir `valor` e outros campos financeiros a valores calculados pelo servidor. A confirmação de vacinas também libera atualização da linha sem um guard equivalente ao existente para os campos clínicos de exames. Permissões por linha não limitam automaticamente quais colunas podem mudar.

Correção: exigir aprovação nas permissões apropriadas e impor no banco as restrições de campos/operações destinadas a cada perfil. As regras efetivamente instaladas no Supabase não puderam ser comparadas com os arquivos locais.

### 9. Confirmação de e-mail e aprovação são etapas diferentes

[app/login/page.tsx](Woofy-Final_Project_Nextjs/app/login/page.tsx), linha 38, apresenta erro de e-mail não confirmado como possível falta de aprovação da clínica. Contudo, [approveProfile](Woofy-Final_Project_Nextjs/lib/clinic-data.ts), linha 1032, atualiza somente `profiles`; não confirma o e-mail em Supabase Auth.

Se a confirmação de e-mail estiver habilitada, o tutor precisa confirmar o e-mail além de receber a aprovação. Configure o **Site URL** e os redirecionamentos autorizados no Supabase para o domínio publicado e teste o fluxo de e-mail utilizado. [Configuração de autenticação](https://supabase.com/docs/guides/auth/general-configuration), [URLs de redirecionamento](https://supabase.com/docs/guides/auth/redirect-urls).

### 10. Ícones referenciados não existem

[app/layout.tsx](Woofy-Final_Project_Nextjs/app/layout.tsx) referencia `/icon-light-32x32.png`, `/icon-dark-32x32.png`, `/icon.svg` e `/apple-icon.png`, ausentes em `public`. `/icon.svg` retornou 404 no teste. Corrigir os caminhos ou fornecer os arquivos resolve a apresentação; isso não bloqueia o build.

## Limites e próximo passo

A análise cobriu configuração, dependências, compilação, tipos, estrutura de rotas/imports, inicialização do Supabase, autenticação e scripts SQL relevantes ao deploy. Não é uma certificação de todos os fluxos clínicos ou de segurança: faltam o banco real, contas dos três perfis e as configurações efetivas da hospedagem.

O próximo passo para resolver a falha mostrada é cadastrar as duas variáveis na Vercel e executar **Redeploy**. Em seguida, validar login, aprovação, acesso por perfil, consultas, vacinas, exames e financeiro contra a base configurada, tratando os achados acima antes de uso com dados reais.
