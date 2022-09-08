module.exports.autoadmin = async (a = {}) => {
    return new Promise((resolve) => {
        const { spawn } = require('child_process');
        const os = require('os')
        const argTemplate = {action: undefined, command: undefined, user: undefined}
        const allArgKeys = Object.keys(a);
        let args = {};
        for (const arg of allArgKeys) {
            arg in a ? args[arg] = a[arg] : args[arg] = argTemplate[arg];
        }
        const escape = (arr) => {
            if (arr.length === 0) return
            col = [];
            arr.forEach((string)=>{
                const regex1 = /[^a-zA-Z\d\s_:\/&-]/g;
                const regex2 = /\s/;
                string = string.replaceAll(regex1, '^$&');
                col.push(regex2.test(string) ? `"${string}"` : string);
            })
            return col.join(' ');
        }
        const runAndResolve = (command) => {
            const execution = spawn(command, [], {cwd: process.env.USERPROFILE, shell: true})

            execution.stderr.on('data', (data) => {
                console.error(`${data}`);
                resolve(false)
            });

            execution.on('close', (code) => {
                resolve(true)
            });
        }
        switch(args['action']) { 
            case undefined:
                console.error('No action was passed.')
                resolve(false)
                break;
            case 'hook':
                if (args['command'] === undefined) {
                    console.error('No command was specified.')
                    resolve(false)
                }
                const command = args['command']
                const user = args['user'] === undefined ? os.userInfo().username : args['user']
                runAndResolve(`schtasks /create /tn "autoadmin" /tr ${escape([command])} /sc ONLOGON /IT /ru ${escape([user])} /RL HIGHEST /F`)
                break;
            case 'unhook':
                runAndResolve(`schtasks /Delete /tn "autoadmin" /F`)
                break;
            case 'run':
                runAndResolve(`schtasks /run /tn "autoadmin"`)
                break;
        }
    });
}
