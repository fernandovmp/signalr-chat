# SignalR chat

## Getting started

Restore dotnet packages running:

```
dotnet restore ./src/SignalRChat.Server
```

Run the signalr server

```
dotnet run --project ./src/SignalRChat.Server
```

Install frontend packages running:

```
yarn --cwd ./src/web-client
```

Run the frontend app

```
yarn --cwd ./src/web-client start
```
