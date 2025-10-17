Render Logs:

2025-10-17T20:16:55.215475629Z  Configurações do Supabase encontradas!
2025-10-17T20:16:55.407083817Z  Arquivos de migração a aplicar:
2025-10-17T20:16:55.407118828Z  - /opt/render/project/src/backend/migrations/supabase-migration-fixed.sql
2025-10-17T20:16:55.407125778Z  - /opt/render/project/src/backend/migrations/align_sqlrun_schema.sql
2025-10-17T20:16:55.40762352Z 
2025-10-17T20:16:55.40763505Z  Executando comando 1/33...
2025-10-17T20:16:55.40763878Z  SQL: CREATE EXTENSION IF NOT EXISTS "pgcrypto";
2025-10-17T20:16:56.271390659Z  Comando 1 executado com sucesso!
2025-10-17T20:16:56.332126391Z 
2025-10-17T20:16:56.332149522Z  Executando comando 3/33...
2025-10-17T20:16:56.332322046Z  SQL: CREATE INDEX IF NOT EXISTS idx_clientes_nome ON clientes(nome);
2025-10-17T20:16:56.707625373Z  Comando 3 executado com sucesso!
2025-10-17T20:16:56.767438334Z 
2025-10-17T20:16:56.767451654Z  Executando comando 5/33...
2025-10-17T20:16:56.767493995Z  SQL: CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);
2025-10-17T20:16:57.03779387Z  Comando 5 executado com sucesso!
2025-10-17T20:16:57.098269507Z 
2025-10-17T20:16:57.098294547Z  Executando comando 7/33...
2025-10-17T20:16:57.098366969Z  SQL: RETURN NEW;
2025-10-17T20:16:57.325717134Z  Erro no comando 7: syntax error at or near "RETURN"
2025-10-17T20:16:57.386345043Z 
2025-10-17T20:16:57.386366084Z  Executando comando 8/33...
2025-10-17T20:16:57.386450566Z  SQL: END;
2025-10-17T20:16:57.628061993Z  Erro no comando 8: EXECUTE of transaction commands is not implemented
2025-10-17T20:16:57.690758969Z 
2025-10-17T20:16:57.69077896Z  Executando comando 9/33...
2025-10-17T20:16:57.690951584Z  SQL: $$ language 'plpgsql';
2025-10-17T20:16:57.922268888Z  Erro no comando 9: unterminated dollar-quoted string at or near "$$ language 'plpgsql';"
2025-10-17T20:16:57.982592151Z 
2025-10-17T20:16:57.982613591Z  Executando comando 10/33...
2025-10-17T20:16:57.982625402Z  SQL: CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias FOR EACH ROW EXECUTE FUNCTION update_updated_at_...
2025-10-17T20:16:58.220113216Z  Objeto já existe, continuando...
2025-10-17T20:16:58.220162697Z  Erro no comando 10: trigger "update_categorias_updated_at" for relation "categorias" already exists
2025-10-17T20:16:58.280401588Z 
2025-10-17T20:16:58.280423088Z  Executando comando 12/33...
2025-10-17T20:16:58.280433489Z  SQL: CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_colu...
2025-10-17T20:16:58.513464792Z  Erro no comando 12: trigger "update_produtos_updated_at" for relation "produtos" already exists
2025-10-17T20:16:58.513465242Z  Objeto já existe, continuando...
2025-10-17T20:16:58.573903587Z 
2025-10-17T20:16:58.573924768Z  Executando comando 14/33...
2025-10-17T20:16:58.573961839Z  SQL: CREATE TRIGGER update_ordens_updated_at BEFORE UPDATE ON ordens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()...
2025-10-17T20:16:58.788543406Z  Erro no comando 14: trigger "update_ordens_updated_at" for relation "ordens" already exists
2025-10-17T20:16:58.788591676Z  Objeto já existe, continuando...
2025-10-17T20:16:58.84893411Z 
2025-10-17T20:16:58.84896042Z  Executando comando 16/33...
2025-10-17T20:16:58.84896454Z  SQL: CREATE TRIGGER update_vendas_updated_at BEFORE UPDATE ON vendas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()...
2025-10-17T20:16:59.075044257Z  Erro no comando 16: trigger "update_vendas_updated_at" for relation "vendas" already exists
2025-10-17T20:16:59.075078998Z  Objeto já existe, continuando...
2025-10-17T20:16:59.135784319Z 
2025-10-17T20:16:59.135806819Z  Executando comando 18/33...
2025-10-17T20:17:06.295092521Z  Comando 30 executado com sucesso!
2025-10-17T20:17:06.354516644Z 
2025-10-17T20:17:06.354543584Z  Executando comando 32/38...
2025-10-17T20:17:06.354554605Z  SQL: UPDATE public.vendas SET data_venda = created_at WHERE data_venda IS NULL AND created_at IS NOT NULL;
2025-10-17T20:17:06.588080019Z  Comando 32 executado com sucesso!
2025-10-17T20:17:06.647480751Z 
2025-10-17T20:17:06.647507172Z  Executando comando 34/38...
2025-10-17T20:17:06.647511442Z  SQL: UPDATE public.ordem_fotos SET caminho = caminho_arquivo WHERE caminho IS NULL AND caminho_arquivo IS NOT NULL;
2025-10-17T20:17:06.880058195Z  Comando 34 executado com sucesso!
2025-10-17T20:17:06.93918077Z 
2025-10-17T20:17:06.939202811Z  Executando comando 36/38...
2025-10-17T20:17:06.939302253Z  SQL: UPDATE public.ordem_historico SET data_alteracao = created_at WHERE created_at IS NOT NULL;
2025-10-17T20:17:07.16229754Z  Comando 36 executado com sucesso!
2025-10-17T20:17:07.222642143Z 
2025-10-17T20:17:07.222666213Z  Executando comando 38/38...
2025-10-17T20:17:07.222678074Z  SQL: CREATE OR REPLACE VIEW public.produtos_com_alertas AS
2025-10-17T20:17:07.222685804Z SELECT 
2025-10-17T20:17:07.222688534Z   p.id,
2025-10-17T20:17:07.222690614Z   p.nome,
2025-10-17T20:17:07.222693554Z   p.categoria_id,
2025-10-17T20:17:07.222696374Z   c.nome AS categoria_...
2025-10-17T20:17:07.490930813Z  Comando 38 executado com sucesso!
2025-10-17T20:17:07.551300526Z 
2025-10-17T20:17:07.551323757Z ==================================================
2025-10-17T20:17:07.551579733Z  RESUMO DA MIGRAÇÃO:
2025-10-17T20:17:07.551587693Z  Comandos executados com sucesso: 34
2025-10-17T20:17:07.551590253Z  Total de comandos processados: 38
2025-10-17T20:17:07.551592293Z 
2025-10-17T20:17:07.551595263Z  MIGRAÇÃO CONCLUÍDA COM ALGUNS ERROS — verifique os logs acima
2025-10-17T20:17:07.551597363Z 
2025-10-17T20:17:07.551599553Z  Verificando funções do dashboard...
2025-10-17T20:17:07.783032871Z  dashboard_resumo_mes disponível
2025-10-17T20:17:07.783095702Z 
2025-10-17T20:17:07.783101312Z 🏁 Script de migração finalizado!
2025-10-17T20:17:09.614639624Z ⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217
2025-10-17T20:17:09.615429681Z 🔍 Debug Supabase:
2025-10-17T20:17:09.615499223Z SUPABASE_URL: Configurado
2025-10-17T20:17:09.615516763Z SUPABASE_SERVICE_ROLE_KEY: Configurado
2025-10-17T20:17:09.615600425Z ✅ SERVICE ROLE ok
2025-10-17T20:17:10.020148313Z 🔍 Debug DatabaseAdapter:
2025-10-17T20:17:10.020673295Z supabase.isReady(): true
2025-10-17T20:17:10.020714046Z 🗄️ Usando banco de dados: Supabase (PostgreSQL)
2025-10-17T20:17:10.710497227Z ðŸ“± WhatsApp removido do sistema - funcionalidades desabilitadas permanentemente
2025-10-17T20:17:12.311850005Z ==> Your service is live 🎉
2025-10-17T20:17:12.341216413Z ==> 
2025-10-17T20:17:12.366439051Z ==> ///////////////////////////////////////////////////////////
2025-10-17T20:17:12.394738189Z ==> 
2025-10-17T20:17:12.422265717Z ==> Available at your primary URL https://assistencia-tecnica-1k5g.onrender.com
2025-10-17T20:17:12.448677264Z ==> 
2025-10-17T20:17:12.473561043Z ==> ///////////////////////////////////////////////////////////
2025-10-17T20:18:11.860868571Z 20:18:11 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:18:11.860899631Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:18:11.860903362Z }
2025-10-17T20:20:53.201456676Z 20:20:53 [error]: Unhandled error in request {
2025-10-17T20:20:53.201497187Z   "error": {
2025-10-17T20:20:53.201504527Z     "name": "TypeError",
2025-10-17T20:20:53.201510007Z     "message": "normalizeStatus is not a function",
2025-10-17T20:20:53.201523147Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:20:53.201530608Z   },
2025-10-17T20:20:53.201535108Z   "context": {
2025-10-17T20:20:53.201538918Z     "method": "POST",
2025-10-17T20:20:53.201543338Z     "url": "/api/ordens",
2025-10-17T20:20:53.201546908Z     "ip": "127.0.0.1",
2025-10-17T20:20:53.201550838Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:20:53.201554428Z     "requestId": "2e55a27f-fe2f-4472-8a67-cbbceb99376d"
2025-10-17T20:20:53.201557948Z   }
2025-10-17T20:20:53.201561478Z }
2025-10-17T20:20:53.202859698Z 20:20:53 [error]: [ERROR-5XX] {
2025-10-17T20:20:53.202872268Z   "error": {
2025-10-17T20:20:53.202877058Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:20:53.202881668Z   },
2025-10-17T20:20:53.202897318Z   "context": {}
2025-10-17T20:20:53.202900309Z }
2025-10-17T20:21:01.211531387Z 20:21:01 [error]: Unhandled error in request {
2025-10-17T20:21:01.211554208Z   "error": {
2025-10-17T20:21:01.211557978Z     "name": "TypeError",
2025-10-17T20:21:01.211560218Z     "message": "normalizeStatus is not a function",
2025-10-17T20:21:01.211568358Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:21:01.211570808Z   },
2025-10-17T20:21:01.211573208Z   "context": {
2025-10-17T20:21:01.211575588Z     "method": "POST",
2025-10-17T20:21:01.211578328Z     "url": "/api/ordens",
2025-10-17T20:21:01.211583928Z     "ip": "127.0.0.1",
2025-10-17T20:21:01.211587398Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:21:01.211589588Z     "requestId": "89e1a072-2a33-45f4-8c65-705504f62363"
2025-10-17T20:21:01.211591738Z   }
2025-10-17T20:21:01.211593978Z }
2025-10-17T20:21:01.212303934Z 20:21:01 [error]: [ERROR-5XX] {
2025-10-17T20:21:01.212316485Z   "error": {
2025-10-17T20:21:01.212319255Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:21:01.212321335Z   },
2025-10-17T20:21:01.212323235Z   "context": {}
2025-10-17T20:21:01.212325025Z }
2025-10-17T20:22:12.637779795Z ==> Detected service running on port 3001
2025-10-17T20:22:12.744735196Z ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
2025-10-17T20:23:36.063084285Z 20:23:36 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:23:36.063121056Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:23:36.063126556Z }
2025-10-17T20:25:19.943066325Z 20:25:19 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:25:19.943099606Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:25:19.943103936Z }
2025-10-17T20:25:56.008587996Z 20:25:56 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:25:56.008620517Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:25:56.008625877Z }
2025-10-17T20:27:46.372069294Z 20:27:46 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:27:46.372090155Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:27:46.372094415Z }
2025-10-17T20:28:13.525541318Z 20:28:13 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:28:13.525570868Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:28:13.525575388Z }
2025-10-17T20:30:01.450348257Z 20:30:01 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:30:01.450387348Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:30:01.450393168Z }
2025-10-17T20:30:22.830370025Z 20:30:22 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:30:22.830419436Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:30:22.830425436Z }
2025-10-17T20:18:11.860868571Z 20:18:11 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:18:11.860899631Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:18:11.860903362Z }
2025-10-17T20:20:53.201456676Z 20:20:53 [error]: Unhandled error in request {
2025-10-17T20:20:53.201497187Z   "error": {
2025-10-17T20:20:53.201504527Z     "name": "TypeError",
2025-10-17T20:20:53.201510007Z     "message": "normalizeStatus is not a function",
2025-10-17T20:20:53.201523147Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:20:53.201530608Z   },
2025-10-17T20:20:53.201535108Z   "context": {
2025-10-17T20:20:53.201538918Z     "method": "POST",
2025-10-17T20:20:53.201543338Z     "url": "/api/ordens",
2025-10-17T20:20:53.201546908Z     "ip": "127.0.0.1",
2025-10-17T20:20:53.201550838Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:20:53.201554428Z     "requestId": "2e55a27f-fe2f-4472-8a67-cbbceb99376d"
2025-10-17T20:20:53.201557948Z   }
2025-10-17T20:20:53.201561478Z }
2025-10-17T20:20:53.202859698Z 20:20:53 [error]: [ERROR-5XX] {
2025-10-17T20:20:53.202872268Z   "error": {
2025-10-17T20:20:53.202877058Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:20:53.202881668Z   },
2025-10-17T20:20:53.202897318Z   "context": {}
2025-10-17T20:20:53.202900309Z }
2025-10-17T20:21:01.211531387Z 20:21:01 [error]: Unhandled error in request {
2025-10-17T20:21:01.211554208Z   "error": {
2025-10-17T20:21:01.211557978Z     "name": "TypeError",
2025-10-17T20:21:01.211560218Z     "message": "normalizeStatus is not a function",
2025-10-17T20:21:01.211568358Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:21:01.211570808Z   },
2025-10-17T20:21:01.211573208Z   "context": {
2025-10-17T20:21:01.211575588Z     "method": "POST",
2025-10-17T20:21:01.211578328Z     "url": "/api/ordens",
2025-10-17T20:21:01.211583928Z     "ip": "127.0.0.1",
2025-10-17T20:21:01.211587398Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:21:01.211589588Z     "requestId": "89e1a072-2a33-45f4-8c65-705504f62363"
2025-10-17T20:21:01.211591738Z   }
2025-10-17T20:21:01.211593978Z }
2025-10-17T20:21:01.212303934Z 20:21:01 [error]: [ERROR-5XX] {
2025-10-17T20:21:01.212316485Z   "error": {
2025-10-17T20:21:01.212319255Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:21:01.212321335Z   },
2025-10-17T20:21:01.212323235Z   "context": {}
2025-10-17T20:21:01.212325025Z }
2025-10-17T20:22:12.637779795Z ==> Detected service running on port 3001
2025-10-17T20:22:12.744735196Z ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
2025-10-17T20:23:36.063084285Z 20:23:36 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:23:36.063121056Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:23:36.063126556Z }
2025-10-17T20:25:19.943066325Z 20:25:19 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:25:19.943099606Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:25:19.943103936Z }
2025-10-17T20:25:56.008587996Z 20:25:56 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:25:56.008620517Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:25:56.008625877Z }
2025-10-17T20:27:46.372069294Z 20:27:46 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:27:46.372090155Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:27:46.372094415Z }
2025-10-17T20:28:13.525541318Z 20:28:13 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:28:13.525570868Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:28:13.525575388Z }
2025-10-17T20:30:01.450348257Z 20:30:01 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:30:01.450387348Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:30:01.450393168Z }
2025-10-17T20:30:22.830370025Z 20:30:22 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:30:22.830419436Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:30:22.830425436Z }
2025-10-17T20:31:52.306087856Z 20:31:52 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:31:52.306108676Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:31:52.306113266Z }
2025-10-17T20:32:10.84434014Z 20:32:10 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:32:10.844369331Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:32:10.844372701Z }
2025-10-17T20:18:11.860868571Z 20:18:11 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:18:11.860899631Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:18:11.860903362Z }
2025-10-17T20:20:53.201456676Z 20:20:53 [error]: Unhandled error in request {
2025-10-17T20:20:53.201497187Z   "error": {
2025-10-17T20:20:53.201504527Z     "name": "TypeError",
2025-10-17T20:20:53.201510007Z     "message": "normalizeStatus is not a function",
2025-10-17T20:20:53.201523147Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:20:53.201530608Z   },
2025-10-17T20:20:53.201535108Z   "context": {
2025-10-17T20:20:53.201538918Z     "method": "POST",
2025-10-17T20:20:53.201543338Z     "url": "/api/ordens",
2025-10-17T20:20:53.201546908Z     "ip": "127.0.0.1",
2025-10-17T20:20:53.201550838Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:20:53.201554428Z     "requestId": "2e55a27f-fe2f-4472-8a67-cbbceb99376d"
2025-10-17T20:20:53.201557948Z   }
2025-10-17T20:20:53.201561478Z }
2025-10-17T20:20:53.202859698Z 20:20:53 [error]: [ERROR-5XX] {
2025-10-17T20:20:53.202872268Z   "error": {
2025-10-17T20:20:53.202877058Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:20:53.202881668Z   },
2025-10-17T20:20:53.202897318Z   "context": {}
2025-10-17T20:20:53.202900309Z }
2025-10-17T20:21:01.211531387Z 20:21:01 [error]: Unhandled error in request {
2025-10-17T20:21:01.211554208Z   "error": {
2025-10-17T20:21:01.211557978Z     "name": "TypeError",
2025-10-17T20:21:01.211560218Z     "message": "normalizeStatus is not a function",
2025-10-17T20:21:01.211568358Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:21:01.211570808Z   },
2025-10-17T20:21:01.211573208Z   "context": {
2025-10-17T20:21:01.211575588Z     "method": "POST",
2025-10-17T20:21:01.211578328Z     "url": "/api/ordens",
2025-10-17T20:21:01.211583928Z     "ip": "127.0.0.1",
2025-10-17T20:21:01.211587398Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:21:01.211589588Z     "requestId": "89e1a072-2a33-45f4-8c65-705504f62363"
2025-10-17T20:21:01.211591738Z   }
2025-10-17T20:21:01.211593978Z }
2025-10-17T20:21:01.212303934Z 20:21:01 [error]: [ERROR-5XX] {
2025-10-17T20:21:01.212316485Z   "error": {
2025-10-17T20:21:01.212319255Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:21:01.212321335Z   },
2025-10-17T20:21:01.212323235Z   "context": {}
2025-10-17T20:21:01.212325025Z }
2025-10-17T20:22:12.637779795Z ==> Detected service running on port 3001
2025-10-17T20:22:12.744735196Z ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
2025-10-17T20:23:36.063084285Z 20:23:36 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:23:36.063121056Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:23:36.063126556Z }
2025-10-17T20:25:19.943066325Z 20:25:19 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:25:19.943099606Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:25:19.943103936Z }
2025-10-17T20:25:56.008587996Z 20:25:56 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:25:56.008620517Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:25:56.008625877Z }
2025-10-17T20:27:46.372069294Z 20:27:46 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:27:46.372090155Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:27:46.372094415Z }
2025-10-17T20:28:13.525541318Z 20:28:13 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:28:13.525570868Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:28:13.525575388Z }
2025-10-17T20:30:01.450348257Z 20:30:01 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:30:01.450387348Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:30:01.450393168Z }
2025-10-17T20:30:22.830370025Z 20:30:22 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:30:22.830419436Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:30:22.830425436Z }
2025-10-17T20:31:52.306087856Z 20:31:52 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:31:52.306108676Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:31:52.306113266Z }
2025-10-17T20:32:10.84434014Z 20:32:10 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:32:10.844369331Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:32:10.844372701Z }
2025-10-17T20:32:41.554698238Z 20:32:41 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:32:41.554728289Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:32:41.554732049Z }
2025-10-17T20:33:41.605483118Z 20:33:41 [error]: DB_ERROR {
2025-10-17T20:33:41.605520439Z   "error": {
2025-10-17T20:33:41.605529139Z     "message": "null value in column \"forma_pagamento\" of relation \"vendas\" violates not-null constraint"
2025-10-17T20:33:41.605532519Z   },
2025-10-17T20:33:41.605535539Z   "context": {
2025-10-17T20:33:41.605538949Z     "status": 400,
2025-10-17T20:33:41.60554176Z     "code": "23502"
2025-10-17T20:33:41.60554456Z   }
2025-10-17T20:33:41.60554738Z }
2025-10-17T20:34:21.526917021Z 20:34:21 [error]: DB_ERROR {
2025-10-17T20:34:21.526953472Z   "error": {
2025-10-17T20:34:21.526963683Z     "message": "null value in column \"forma_pagamento\" of relation \"vendas\" violates not-null constraint"
2025-10-17T20:34:21.526969453Z   },
2025-10-17T20:34:21.526974813Z   "context": {
2025-10-17T20:34:21.526980863Z     "status": 400,
2025-10-17T20:34:21.526986033Z     "code": "23502"
2025-10-17T20:34:21.526991183Z   }
2025-10-17T20:34:21.527015034Z }
2025-10-17T20:35:28.56051864Z 20:35:28 [warn]: ⚠️ Tabela fluxo_caixa não encontrada, retornando dados padrão {
2025-10-17T20:35:28.56054834Z   "context": {}
2025-10-17T20:35:28.56055325Z }
2025-10-17T20:35:29.307240524Z 20:35:29 [error]: Erro ao listar categorias financeiras {
2025-10-17T20:35:29.307274665Z   "error": {
2025-10-17T20:35:29.307280035Z     "message": "Could not find the table 'public.        SELECT * FROM categorias_financeiras         WHERE ativo = 1        ORDER BY tipo, nome' in the schema cache"
2025-10-17T20:35:29.307284265Z   },
2025-10-17T20:35:29.307288265Z   "context": {}
2025-10-17T20:35:29.307292816Z }
2025-10-17T20:35:29.309854234Z 20:35:29 [error]: DB_ERROR {
2025-10-17T20:35:29.309871754Z   "error": {
2025-10-17T20:35:29.309875974Z     "message": "column fluxo_caixa.origem_tipo does not exist"
2025-10-17T20:35:29.309878444Z   },
2025-10-17T20:35:29.309881124Z   "context": {
2025-10-17T20:35:29.309884534Z     "status": 500,
2025-10-17T20:35:29.309887294Z     "code": "42703"
2025-10-17T20:35:29.309889684Z   }
2025-10-17T20:35:29.309892215Z }
2025-10-17T20:35:40.188092784Z 20:35:40 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:35:40.188126915Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:35:40.188132245Z }
2025-10-17T20:35:43.571267453Z 20:35:43 [warn]: ⚠️ Tabela fluxo_caixa não encontrada, retornando dados padrão {
2025-10-17T20:35:43.571298833Z   "context": {}
2025-10-17T20:35:43.571303623Z }
2025-10-17T20:35:44.056642168Z 20:35:44 [error]: Erro ao listar categorias financeiras {
2025-10-17T20:35:44.056676209Z   "error": {
2025-10-17T20:35:44.056682939Z     "message": "Could not find the table 'public.        SELECT * FROM categorias_financeiras         WHERE ativo = 1        ORDER BY tipo, nome' in the schema cache"
2025-10-17T20:35:44.056687829Z   },
2025-10-17T20:35:44.056692569Z   "context": {}
2025-10-17T20:35:44.056697099Z }
2025-10-17T20:35:44.294958476Z 20:35:44 [error]: DB_ERROR {
2025-10-17T20:35:44.294992437Z   "error": {
2025-10-17T20:35:44.295036418Z     "message": "column fluxo_caixa.origem_tipo does not exist"
2025-10-17T20:35:44.295042708Z   },
2025-10-17T20:35:44.295046508Z   "context": {
2025-10-17T20:35:44.295051489Z     "status": 500,
2025-10-17T20:35:44.295055289Z     "code": "42703"
2025-10-17T20:35:44.295058929Z   }
2025-10-17T20:35:44.295062799Z }
2025-10-17T20:39:11.904293439Z 20:39:11 [error]: Unhandled error in request {
2025-10-17T20:39:11.904318039Z   "error": {
2025-10-17T20:39:11.904323809Z     "name": "TypeError",
2025-10-17T20:39:11.904328129Z     "message": "normalizeStatus is not a function",
2025-10-17T20:39:11.90433521Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:39:11.90433995Z   },
2025-10-17T20:39:11.90434446Z   "context": {
2025-10-17T20:39:11.90434865Z     "method": "POST",
2025-10-17T20:39:11.90435348Z     "url": "/api/ordens",
2025-10-17T20:39:11.90435743Z     "ip": "127.0.0.1",
2025-10-17T20:39:11.90436208Z     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
2025-10-17T20:39:11.90436705Z     "requestId": "28641a87-c93e-4f29-9390-b5e59b65bdb2"
2025-10-17T20:39:11.9043709Z   }
2025-10-17T20:39:11.904388521Z }
2025-10-17T20:39:11.905736381Z 20:39:11 [error]: [ERROR-5XX] {
2025-10-17T20:39:11.905745342Z   "error": {
2025-10-17T20:39:11.905748671Z     "stack": "TypeError: normalizeStatus is not a function\n    at validateOrdem (/opt/render/project/src/backend/src/middlewares/validation.js:40:23)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at normalizeOrdemBody (/opt/render/project/src/backend/src/middlewares/normalizeBody.js:37:5)\n    at Layer.handle [as handle_request] (/opt/render/project/src/backend/node_modules/express/lib/router/layer.js:95:5)\n    at next (/opt/render/project/src/backend/node_modules/express/lib/router/route.js:149:13)\n    at /opt/render/project/src/backend/src/middlewares/upload.js:71:5\n    at done (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:45:7)\n    at indicateDone (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:49:68)\n    at Multipart.<anonymous> (/opt/render/project/src/backend/node_modules/multer/lib/make-middleware.js:166:7)"
2025-10-17T20:39:11.905751662Z   },
2025-10-17T20:39:11.905755382Z   "context": {}
2025-10-17T20:39:11.905758002Z }
2025-10-17T20:41:34.996035769Z 20:41:34 [warn]: Tabela movimentacoes_estoque não encontrada: {
2025-10-17T20:41:34.996072119Z   "context": "column movimentacoes_estoque.data_movimentacao does not exist"
2025-10-17T20:41:34.99607611Z }

Logs inspecionados:

Erro ao criar nova ordem de serviço, mensagem: Erro interno do servidor

pdv:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
pdv:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
pdv:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
assistencia-tecnica-1k5g.onrender.com/api/financeiro/categorias:1  Failed to load resource: the server responded with a status of 500 ()
index-C6KN_xh-.js:1 ❌ Erro na resposta: Object
(anonymous) @ index-C6KN_xh-.js:1
index-C6KN_xh-.js:45 Erro ao listar categorias financeiras: y
listarCategorias @ index-C6KN_xh-.js:45
index-C6KN_xh-.js:45 Erro ao carregar dados: y
z @ index-C6KN_xh-.js:45
assistencia-tecnica-1k5g.onrender.com/api/financeiro/fluxo-caixa:1  Failed to load resource: the server responded with a status of 500 ()
index-C6KN_xh-.js:1 ❌ Erro na resposta: Object
(anonymous) @ index-C6KN_xh-.js:1
index-C6KN_xh-.js:45 Erro ao listar fluxo de caixa: y
listarFluxoCaixa @ index-C6KN_xh-.js:45
assistencia-tecnica-1k5g.onrender.com/api/financeiro/categorias:1  Failed to load resource: the server responded with a status of 500 ()
index-C6KN_xh-.js:1 ❌ Erro na resposta: Object
(anonymous) @ index-C6KN_xh-.js:1
index-C6KN_xh-.js:45 Erro ao listar categorias financeiras: y
listarCategorias @ index-C6KN_xh-.js:45
index-C6KN_xh-.js:45 Erro ao carregar dados: y
z @ index-C6KN_xh-.js:45
assistencia-tecnica-1k5g.onrender.com/api/financeiro/fluxo-caixa:1  Failed to load resource: the server responded with a status of 500 ()
index-C6KN_xh-.js:1 ❌ Erro na resposta: Object
(anonymous) @ index-C6KN_xh-.js:1
index-C6KN_xh-.js:45 Erro ao listar fluxo de caixa: y
listarFluxoCaixa @ index-C6KN_xh-.js:45
assistencia-tecnica-1k5g.onrender.com/api/ordens:1  Failed to load resource: the server responded with a status of 500 ()
index-C6KN_xh-.js:1 ❌ Erro na resposta: Object
(anonymous) @ index-C6KN_xh-.js:1
