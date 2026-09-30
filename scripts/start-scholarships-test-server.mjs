import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import https from 'node:https'
import os from 'node:os'
import path from 'node:path'
import next from 'next'

// Test-only TLS serves the actual production build. Safari correctly rejects
// Secure cookies over HTTP localhost. Keep the application security unchanged.
const port = Number(process.argv[2] ?? 3347)
const directory = mkdtempSync(path.join(os.tmpdir(), 'prism-scholarships-tls-'))
process.on('exit', () => rmSync(directory, { recursive: true, force: true }))
const keyPath = path.join(directory, 'localhost.key')
const certificatePath = path.join(directory, 'localhost.crt')
execFileSync(
  'openssl',
  [
    'req',
    '-x509',
    '-newkey',
    'rsa:2048',
    '-nodes',
    '-days',
    '1',
    '-subj',
    '/CN=localhost',
    '-addext',
    'subjectAltName=DNS:localhost,IP:127.0.0.1',
    '-keyout',
    keyPath,
    '-out',
    certificatePath,
  ],
  { stdio: 'ignore' },
)

const application = next({ dev: false, hostname: 'localhost', port })
await application.prepare()
const handle = application.getRequestHandler()
const server = https.createServer(
  {
    key: readFileSync(keyPath),
    cert: readFileSync(certificatePath),
  },
  (request, response) => {
    request.headers['x-forwarded-proto'] = 'https'
    void handle(request, response)
  },
)

let closing = false
async function close() {
  if (closing) return
  closing = true
  server.close()
  server.closeAllConnections()
  await application.close()
  rmSync(directory, { recursive: true, force: true })
  process.exit(0)
}
process.on('SIGTERM', () => void close())
process.on('SIGINT', () => void close())
server.listen(port)
