# Text Reader

Para executar instale o
[Docker](https://docs.docker.com/compose/install) e
[Docker Compose](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

----------------------------------------------------

Clone o repositório, abra o terminal na raiz do projeto e execute:

```
$ make setup
```

Insira sua chave do "Text to Speech" no .env

SPEECH_KAY coloque sua chave

SPEECH_URL coloque sua url

----------------------------------------------------

Após isso execute:

```
$ make up
```

Quando o servidor estiver rodando abra uma nova aba no terminal e execute:

```
$ make migrate
```

Ao fim da execução abra o browser em http://0.0.0.0:3333"
