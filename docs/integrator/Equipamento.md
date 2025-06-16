##  Equipamentos Utilizados

A seleção dos equipamentos levou em conta critérios como **baixo custo**, **eficiência energética**, **compatibilidade industrial** e **facilidade de integração** com tecnologias de TI.

### 🧩 Componentes principais:

#### 🖥️ Raspberry Pi 3B+

- Atua como **hub de integração do sistema**.
- Hospeda o **painel web** desenvolvido em Node-RED.
- Gerencia toda a **comunicação entre os dispositivos**, o banco de dados e o CLP.
- Possui bom desempenho para aplicações embarcadas e é altamente configurável.

#### ⚙️ CLP com suporte a OPC-UA

- Controlador industrial que **executa fisicamente os comandos** recebidos do painel web.
- Utiliza o protocolo **OPC-UA** para comunicação confiável, padronizada e segura.
- Garante **resposta em tempo real**, essencial em ambientes industriais.

#### 🗄️ MariaDB e SQL Local

- Banco de dados instalado diretamente no Raspberry Pi.
- Armazena os **logs de todas as ações realizadas no sistema**.
- Estrutura pronta para **expansão para nuvem** ou replicação para sistemas de BI e analytics.

---