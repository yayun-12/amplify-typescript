const fs = require('fs');
const path = require('path');
const tsc = require('node-typescript-compiler')

const subcommand = 'build';

module.exports = {
    name: subcommand,
    run: async (context) => {
        const { amplify, print } = context
       
        let projectDetails = await amplify.getProjectDetails();
        let basePath = path.join(projectDetails.projectConfig.projectPath, 'amplify/backend/function');
        let functions = fs.readdirSync(basePath)
        
        for (const func of functions) {
            print.info(`building ${func}:`);
            await tsc.compile({
                'project': path.join(basePath, func, 'src')
            });
        }

        return functions;
    }
}