# Text Reader

Para executar o sistema é necessário que tenha o docker instalado na máquina

Link para instalar o docker e docker-compose

https://docs.docker.com/compose/install
https://docs.docker.com/install/linux/docker-ce/ubuntu/

----------------------------------------------------

Após a instalação renomeie o arquivo .env.example para .env

Insira sua chave do "Text to Speech" no .env

SPEECH_KAY coloque sua chave

SPEECH_URL coloque sua url

----------------------------------------------------

Após isso abra o terminal e vá até a raiz do projeto e execute o comando "make up" sem aspas.

Quando o servidor estiver rodando abra uma nova aba no terminal
vá até a raiz do projeto e execute "make migration" 

Ao fim da execução abra o browser em http://0.0.0.0:3333"
