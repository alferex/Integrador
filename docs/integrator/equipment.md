# Equipamento Usado

**Tópicos:**
- **Raspberry Pi 3B+**: Centraliza a comunicação e hospeda o painel web.
- **CLP com OPC-UA**: Executa comandos recebidos de forma confiável.
- **MariaDB e SQL local**: Armazenam registros com segurança e precisão.

🎙 **Relato:**  
Para a construção do sistema, utilizamos três elementos principais: o Raspberry Pi 3B+, que foi responsável por hospedar o painel web e coordenar as comunicações; o CLP, que recebia os comandos e acionava fisicamente os dispositivos conectados; e o banco de dados local, configurado com MariaDB e SQL diretamente no Raspberry, onde todas as ações foram registradas automaticamente. Essa estrutura garante que mesmo sem internet os dados sejam salvos localmente, mantendo segurança, com possibilidade futura de replicação para nuvem.

---
