# Bank project

BMSZC Petrik Lajos technikum egységtesztelést bemutató projektje

## Telepítési és futtatási lépések

- Telepítsük a szükséges node modulokat

    ```sh
    npm install
    ```

- A program nem tartalmaz futtatható osztályt, csak a Bank osztályt és annak teszteseteit. A tesztesetek futtatásához az alábbi utasítást adjuk ki, vagy telepítsük VSCODE-ban a [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) bővítményt:

    ```sh
    npm test
    ```

  - A program tartalmaz példát olyan tesztesetekre is amik hibára futnak, ezek eléréséhez nevezzük át a [Peldatest.js](./src/Peldatest.js) fájlt Pelda.test.js-re és úgy futtassuk a teszteket
