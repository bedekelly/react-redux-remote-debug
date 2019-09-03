# React-Redux Remote Debugging

This isn't ready for publishing yet, but it's a neat demo. Created because there's no Redux DevTools for iOS Safari, so I'm maximising what an SSH client plus tmux can do.

#### Client
Wrap your app in the `<RemoteDebug />` component, inside your Redux provider:

```
<Provider store={ store }>
  <RemoteDebug store={ store }>
    <App />
  </RemoteDebug>
</Provider>
```

#### Server
Use `wscat -l 9876` to start a websocket server. Console logs, errors, warnings and exceptions will be logged here. The whole state will also be sent each time it changes -- this will probably need to be opt-in in future.

You can also type commands here:
* `get a.b.c` retrieves a deep value from the current state.
* `dispatch { type: 'ACTION_TYPE', ... }` will dispatch that action on the client.