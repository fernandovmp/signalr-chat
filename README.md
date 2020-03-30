# SignalR chat

## Getting started

### Build and restore .NET projects

```
dotnet build
```

### Run migrations

Install fluent migrator CLI tool

```
dotnet tool install -g FluentMigrator.DotNet.Cli
```

Run migrations

```
dotnet-fm migrate -p sqlserver -c "{connection string here}" -a "./src/SignalRChat.Infrastructure/bin/Debug/netstandard2.0/SignalRChat.Infrastructure.dll"
```

### Run tests

```
dotnet test
```

### Run the signalr server

```
dotnet run --project ./src/SignalRChat.Server
```

### Install frontend packages running:

```
yarn --cwd ./src/web-client
```

### Run the frontend app

```
yarn --cwd ./src/web-client start
```
