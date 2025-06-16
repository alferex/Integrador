##  Aplicação e Integração – Raspberry Pi

O **Raspberry Pi** representa o **núcleo de processamento e integração** do projeto. Ele assume diversas responsabilidades dentro do sistema, centralizando o controle lógico.

### 🔗 Responsabilidades detalhadas:

- **Painel Web com Node-RED:** O Raspberry hospeda a interface gráfica de controle. Essa interface é acessível via navegador e permite que operadores enviem comandos facilmente.
- **Intermediador entre sistemas:** Ele recebe os comandos da interface, os transforma em mensagens que o CLP entende (via OPC-UA), e registra tudo no banco de dados.
- **Banco de dados local:** O Raspberry armazena registros no MariaDB, mesmo sem conexão com a internet.
- **Pronto para expansão:** A estrutura do sistema foi pensada para permitir **integração futura com serviços em nuvem**, como dashboards remotos, notificações por e-mail ou controle via dispositivos móveis.

---