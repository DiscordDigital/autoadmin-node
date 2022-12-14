# autoadmin-node
Use `autoadmin` to register a task, which always runs when you log in, as Administrator, without UAC prompt.

A use case for this module is re-launching a program as Administrator after restart, without spawning the UAC prompt.\
Can be removed with one function call.

This does not bypass the initial UAC. However, it allows "saving" elevation for later use, and bypasses all UAC prompts on demand.

#### Important note

This will not work if another user is specified for elevation, because it will try to launch with that user interactively.\
Specifying the same user as the one signed in on the session, will allow "saving" the UAC elevation, therefore using another Administrator won't work.\
This utility is meant to preserve Administrator privileges after restart, so make sure the user you're working with has these permissions.

#### Use cases

- Deployment utility, relaunch a program after restart to continue installing software
- Create administrative utilities, which can elevate themselves to be more efficient
- Isolate modules from a program, so not the whole program has to run as administrator
- Create an auto updater which can elevate itself to update program code

# How to use

Import the module from the file:

```javascript
const { autoadmin } = require('./autoadmin.js');
```

#### Example 1: Hook a command into autostart

```javascript
await autoadmin({action: 'hook', command: 'cmd /c echo This prompt has admin privileges.& cmd'});
```

#### Example 2: Run hook manually

```javascript
await autoadmin({action: 'run'});
```

#### Example 3: Remove hook

```javascript
await autoadmin({action: 'unhook'});
```

#### Example 4: Add a hook that doesn't autostart with a different id

```javascript
await autoadmin({action: 'hook', command: 'cmd /c echo This prompt has admin privileges.& cmd', autostart: false, id: 'admincmd'});
```

#### Example 5: Run hook with different id

```javascript
await autoadmin({action: 'run', id: 'admincmd'});
```

#### Example 6: Remove hook with custom id

```javascript
await autoadmin({action: 'unhook', id: 'admincmd'});
```

`true` is returned when the action has been completed successfully.
