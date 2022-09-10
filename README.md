# autoadmin-node
Use `autoadmin` to register a task, which always runs when you log in, as Administrator, without UAC prompt.

A use case for this module is re-launching a program as Administrator after restart, without spawning the UAC prompt.\
Can be removed with one function call.

# How to use

Import the module from the file:

```javascript
{ autoadmin } = require('./autoadmin.js');
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

`true` is returned when the action has been completed successfully.
