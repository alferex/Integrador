# Aplicação e Integração – Raspberry Pi

**Tópicos:**
- **Intermediador do sistema**: Liga painel, CLP e banco de dados.
- **Gerencia fluxo de dados**: Organiza entrada e registro dos comandos.
- **Permite expansão**: Dados locais que podem ir facilmente à nuvem.

🎙 **Relato:**  
O Raspberry Pi assumiu um papel fundamental como núcleo de integração do sistema. Além de hospedar o painel web acessado pelo usuário, ele recebia os comandos de acionamento, os transmitia ao CLP e registrava tudo localmente no banco de dados MariaDB. Essa centralização das funções proporcionou um fluxo de dados organizado e eficiente. Um ponto importante é que os dados, apesar de armazenados localmente, foram estruturados de forma que possam ser exportados ou sincronizados com servidores em nuvem com facilidade, tornando o sistema escalável.

---