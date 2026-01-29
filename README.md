# blockchain-js

Blockchain em JavaScript (ES modules) com transações assinadas e mineração.

## Uso em outro projeto (npm)

Em um repositório separado (ex.: front-end Angular):

```bash
npm i Leonardo-Borges-AF/blockchain-js
```

O pacote é instalado pelo GitHub. O nome do pacote no `package.json` do seu projeto será `blockchain` (conforme definido aqui).

```js
import { Blockchain, Transaction, generateKeyPair, keyFromPrivate } from 'blockchain';
```

## Exemplo local

```bash
node src/main.js
```