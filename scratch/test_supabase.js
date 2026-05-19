import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Testing Supabase URL:', url)
console.log('Testing Anon Key (first 10 chars):', key ? key.substring(0, 10) + '...' : 'undefined')

const supabase = createClient(url, key)

async function run() {
  try {
    const { data, error } = await supabase.from('clients').select('*').limit(1)
    if (error) {
      console.error('Supabase error:', error)
    } else {
      console.log('Success connecting to Supabase! Data count:', data.length)
    }
  } catch (err) {
    console.error('Catch error:', err)
  }
}

run()
