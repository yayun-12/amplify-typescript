# amplify-typescript

This plugin allows to build lambda functions written in Typescript using the amplify-cli. 

It iterates over the functions directory and builds functions which contains the `tsconfig.json` file in their `src` directory`.

```bash
$ npm install -g amplify-typescript
```

## Lambda code structure
AWS Amplify creates directory for each lambda function in `Amplify/backend/functions/{function_name}`. Each directory has two subdirectories: `src` for the javascript code and `dist` for zipped packege. Therefore it is not possible to use the `dist` directory for the generated js code. Instead we'll create subdirectory in `src` with the source code while the generated code will be generated in `src`.

* Create new directory `/amplify/backend/function/{function_name}/src/**ts**`.
* Move the *.js/*.ts files to the new directory.
* In the `src` directory, create the tsconfig.json file.

For example:
```
{
    "compilerOptions": {
        "target": "es2017", 
        "noImplicitAny": false,
        "outDir": ".",
        "allowJs": true,
        "types": ["node"],
    },
    "include": [
        "ts/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

Build the typescript code: `amplify typescript build`

Package and upload the function: `amplify push`


Enjoy :)
