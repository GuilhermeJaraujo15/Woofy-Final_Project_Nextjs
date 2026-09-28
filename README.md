(EN)

Este é um Sistema chamado Woofy, o qual se refere a uma Clínica Veterinária que possue diferentes perfis, dentre os quais são: Tutor (Usuário comum), Veterinário (Médico Responsável em atender as Consultas, passar Vacinas e receitar Exames) e o Administrador que tem nas mãos controle sobre todo o Sistema. Este usa React e Nextjs como Framework principais. E por fim, os dados deste estão guardados no Banco de Dados do Supabase.

Vale ressaltar que este Sistema foi feito em Conjunto com meu grupo do Senai, onde o repositório compartilhado e a separação das branch se encontram em "https://github.com/heloisabolognesi/Woofy-projetoFinal.git"

Analise-o neste link a seguir, onde levar-te-á à sua hospedagem na Vercel > https://woofy-six.vercel.app/


Este é um Sistema chamado Woofy, o qual se refere a uma Clínica Veterinária que possue diferentes perfis, dentre os quais são: Tutor (Usuário comum), Veterinário (Médico Responsável em atender as Consultas, passar Vacinas e receitar Exames) e o Administrador que tem nas mãos controle sobre todo o Sistema. Este usa React e Nextjs como Framework principais. E por fim, os dados deste estão guardados no Banco de Dados do Supabase.

Vale ressaltar que este Sistema foi feito em Conjunto com meu grupo do Senai, onde o repositório compartilhado e a separação das branch se encontram em "https://github.com/heloisabolognesi/Woofy-projetoFinal.git" 

Analise-o neste link a seguir, onde levar-te-á à sua hospedagem na Vercel > https://woofy-six.vercel.app/

## Deploy na Vercel

Configure as variáveis em **Settings → Environment Variables** antes do build:

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: chave pública fornecida pela integração atual. Como alternativa, o código também aceita `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Quando as duas chaves estão presentes, a publishable tem prioridade. A URL e a chave devem pertencer ao mesmo projeto Supabase. Nunca use uma chave secreta ou `service_role` nas variáveis públicas.

Confirme que o banco está conectado ao projeto Woofy da Vercel e que as variáveis estão disponíveis no ambiente do deploy: **Production** para produção ou **Preview** para previews. O nome da branch, sozinho, não identifica esse ambiente; confira o ambiente exibido na Vercel.

Use o preset **Next.js**, a pasta deste `package.json` como raiz e `pnpm build` como comando de build. Depois de alterar as variáveis, execute um novo deploy: os valores `NEXT_PUBLIC_` são incorporados durante o build. Para desenvolvimento local, copie `.env.example` para `.env.local` e preencha os valores.

Referências: [integração Supabase/Vercel](https://supabase.com/docs/guides/integrations/vercel-marketplace) e [variáveis de ambiente da Vercel](https://vercel.com/docs/environment-variables).
