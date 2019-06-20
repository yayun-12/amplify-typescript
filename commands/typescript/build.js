const fs = require('fs');
const path = require('path');
const tsc = require('node-typescript-compiler')

const subcommand = 'build';

module.exports = {
    name: subcommand,
    run: async (context) => {
        const { amplify, print } = context
       
        let projectDetails = await amplify.getProjectDetails();
        const projectPath = projectDetails.projectConfig.projectPath 
            ? projectDetails.projectConfig.projectPath
            : projectDetails.localEnvInfo.projectPath;
        let basePath = path.join(projectPath, 'amplify/backend/function');
        let functions = fs.readdirSync(basePath)
        
        for (const func of functions) {
            let functionPath = path.join(basePath, func, 'src');
            let tsconfig = path.join(functionPath, 'tsconfig.json')
            if (!fs.existsSync(tsconfig)) {
                continue;
            }
            print.info(`building ${func}:`);
            await tsc.compile({
                'project': functionPath
            });
        }

        return functions;
    }
}