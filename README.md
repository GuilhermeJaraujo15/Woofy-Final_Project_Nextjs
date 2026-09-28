(EN)

This is a system called Woofy, which refers to a veterinary clinic with different user roles, including: Pet Owner (regular user), Veterinarian (the doctor responsible for conducting consultations, administering vaccines, and ordering tests), and the Administrator, who has control over the entire system. It uses React and Next.js as its primary frameworks. Finally, the data is stored in the Supabase database.

It’s worth noting that this system was developed in collaboration with my Senai group; the shared repository and branch structure can be found at “https://github.com/GuilhermeJaraujo15/Woofy-Final_Project_Nextjs”

Check it out at the following link, which will take you to its hosting on Vercel > https://woofy-six.vercel.app/

## Deploy to Vercel

Configure the variables in **Settings → Environment Variables** before the build:

- `NEXT_PUBLIC_SUPABASE_URL`: URL of the Supabase project.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: public key provided by the current integration. Alternatively, the code also accepts `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

When both keys are present, the publishable key takes precedence. The URL and key must belong to the same Supabase project. Never use a secret key or `service_role` in public variables.

Confirm that the database is connected to the Vercel Woofy project and that the variables are available in the **Production** environment for production or the **Preview** environment for previews. The branch name alone does not identify this environment; check the environment displayed on Vercel.

Use the **Next.js** preset, the directory containing this `package.json` as the root, and `pnpm build` as the build command. After changing the variables, run a new deployment: the `NEXT_PUBLIC_` values are incorporated during the build. For local development, copy `.env.example` to `.env.local` and fill in the values.

References: [Supabase/Vercel integration](https://supabase.com/docs/guides/integrations/vercel-marketplace) and [Vercel environment variables](https://vercel.com/docs/environment-variables).


(PT)

Este é um Sistema chamado Woofy, o qual se refere a uma Clínica Veterinária que possue diferentes perfis, dentre os quais são: Tutor (Usuário comum), Veterinário (Médico Responsável em atender as Consultas, passar Vacinas e receitar Exames) e o Administrador que tem nas mãos controle sobre todo o Sistema. Este usa React e Nextjs como Framework principais. E por fim, os dados deste estão guardados no Banco de Dados do Supabase.

Vale ressaltar que este Sistema foi feito em Conjunto com meu grupo do Senai, onde o repositório compartilhado e a separação das branch se encontram em "https://github.com/GuilhermeJaraujo15/Woofy-Final_Project_Nextjs" 

Analise-o neste link a seguir, onde levar-te-á à sua hospedagem na Vercel > https://woofy-six.vercel.app/

## Deploy na Vercel

Configure as variáveis em **Settings → Environment Variables** antes do build:

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: chave pública fornecida pela integração atual. Como alternativa, o código também aceita `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Quando as duas chaves estão presentes, a publishable tem prioridade. A URL e a chave devem pertencer ao mesmo projeto Supabase. Nunca use uma chave secreta ou `service_role` nas variáveis públicas.

Confirme que o banco está conectado ao projeto Woofy da Vercel e que as variáveis estão disponíveis no ambiente do deploy: **Production** para produção ou **Preview** para previews. O nome da branch, sozinho, não identifica esse ambiente; confira o ambiente exibido na Vercel.

Use o preset **Next.js**, a pasta deste `package.json` como raiz e `pnpm build` como comando de build. Depois de alterar as variáveis, execute um novo deploy: os valores `NEXT_PUBLIC_` são incorporados durante o build. Para desenvolvimento local, copie `.env.example` para `.env.local` e preencha os valores.

Referências: [integração Supabase/Vercel](https://supabase.com/docs/guides/integrations/vercel-marketplace) e [variáveis de ambiente da Vercel](https://vercel.com/docs/environment-variables).
