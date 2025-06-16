##  Desafios Enfrentados

O desenvolvimento do projeto envolveu **desafios técnicos e práticos** que contribuíram para o amadurecimento da solução:

### ⚙️ Instalação do Sistema

- Foi necessário configurar o Raspberry com uma **distribuição enxuta e leve**, garantindo desempenho estável mesmo com múltiplos serviços rodando (banco de dados, servidor Node-RED, rede OPC-UA).

### 🌐 Integração de Redes

- A comunicação entre o Raspberry e o CLP exigiu cuidados com o **endereçamento IP, protocolos e regras de firewall**.
- Foram utilizados **padrões abertos** para garantir compatibilidade e segurança.

### 🖥️ Ajustes na Interface (Node-RED Dashboard UE)

- A interface precisou ser **intuitiva, responsiva e funcional**, mesmo em dispositivos com telas pequenas ou conexões mais lentas.
- Foi feito um trabalho para garantir que os **fluxos de dados estivessem sincronizados** com o comportamento dos elementos visuais da interface.

---

##  Conclusão

O projeto demonstrou, de forma prática, que é possível construir um **sistema funcional e confiável de automação industrial** usando ferramentas acessíveis e modernas.

### ✅ Resultados Alcançados:

- **Sistema funcional e completo:** Atende aos requisitos de controle, registro e integração.
- **Prova de conceito validada:** Mostrou-se possível unir TI e automação com sucesso.
- **Base para aplicações reais:** A estrutura pode ser aplicada ou adaptada a **cenários industriais reais**, inclusive com expansão para a nuvem, integração com sensores IoT, e mais.

### 🚀 Próximos Passos (sugestões):

- Implantar **mecanismos de autenticação e controle de acesso** na interface.
- Adicionar **sensores e atuadores adicionais** para ampliar o controle.
- Desenvolver **visualizações analíticas** dos dados registrados.
- Sincronizar dados com **serviços em nuvem** (Google Cloud, Azure, etc.).