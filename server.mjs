import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const port = Number(process.env.PORT || 4173)
const token = process.env.COZE_ACCESS_TOKEN || ''

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

const json = (response, status, body) => {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  })
  response.end(JSON.stringify(body))
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)

  if (requestUrl.pathname === '/api/coze/token') {
    if (request.method !== 'GET') {
      json(response, 405, { message: '请求方式不支持' })
      return
    }
    if (!token) {
      json(response, 503, { message: '对话凭证尚未配置' })
      return
    }
    json(response, 200, { token })
    return
  }

  try {
    const pathname = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname
    const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '')
    const filePath = join(root, safePath)

    if (!filePath.startsWith(root) || safePath.includes('/.')) {
      response.writeHead(404)
      response.end('Not found')
      return
    }

    const info = await stat(filePath)
    if (!info.isFile()) throw new Error('Not a file')
    const body = await readFile(filePath)
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    })
    response.end(body)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('页面不存在')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`AI 健康助手已启动：http://127.0.0.1:${port}`)
})
