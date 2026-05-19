import dns from 'dns'

console.log('Resolving google.com...')
dns.resolve('google.com', (err, addresses) => {
  if (err) {
    console.error('DNS error google.com:', err)
  } else {
    console.log('google.com resolved to:', addresses)
  }
})

console.log('Resolving zxihupnuifxgaqwbdkat.supabase.co...')
dns.resolve('zxihupnuifxgaqwbdkat.supabase.co', (err, addresses) => {
  if (err) {
    console.error('DNS error Supabase:', err)
  } else {
    console.log('Supabase resolved to:', addresses)
  }
})
