# syntax=docker/dockerfile:1

# Build stage: compile and publish with the full .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy only the project file first so `restore` is cached unless deps change.
COPY Kanban.Api/Kanban.Api.csproj Kanban.Api/
RUN dotnet restore Kanban.Api/Kanban.Api.csproj

# Now copy the rest of the source and publish a Release build.
COPY Kanban.Api/ Kanban.Api/
RUN dotnet publish Kanban.Api/Kanban.Api.csproj -c Release -o /app

# Runtime stage: ship only the published output on the small ASP.NET image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app .

EXPOSE 8080
ENTRYPOINT ["dotnet", "Kanban.Api.dll"]
