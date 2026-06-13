import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'contact-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/contact') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                // Save in contacts.json in the project root
                const contactsPath = path.resolve(__dirname, 'contacts.json');
                
                let contacts = [];
                if (fs.existsSync(contactsPath)) {
                  const content = fs.readFileSync(contactsPath, 'utf8');
                  contacts = JSON.parse(content || '[]');
                }
                
                contacts.push({
                  ...data,
                  id: Date.now().toString(),
                  date: new Date().toISOString()
                });
                
                fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
                
                res.writeHead(200, { 
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ success: true, message: 'Message enregistré avec succès !' }));
              } catch (err: unknown) {
                const errMsg = err instanceof Error ? err.message : 'Unknown error';
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: errMsg }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})
