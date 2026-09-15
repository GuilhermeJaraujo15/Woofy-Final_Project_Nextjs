export function getSupabaseConfig() {
  // Keep direct process.env references so Next.js can include public values
  // in the browser bundle at build time.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  const missing: string[] = []
  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!key) {
    missing.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  if (!url || !key) {
    throw new Error(
      `Configuracao do Supabase incompleta: ${missing.join('; ')}. ` +
      'Configure as variaveis no projeto Vercel para o ambiente deste deploy ' +
      '(Production ou Preview) antes do build e execute um novo deploy.'
    )
  }

  return { url, key }
}
