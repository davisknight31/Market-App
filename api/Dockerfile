# Use the .NET 8 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the .csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code and build the application
COPY . ./
RUN dotnet publish -c Release -o out

# Generate the development certificate
RUN dotnet dev-certs https -ep /https/aspnetapp.pfx -p lavender


# Use the runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=https://+:5286
ENV ASPNETCORE_HTTPS_PORT=5286
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=lavender
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx

# Expose port 5286
EXPOSE 5286

# Copy the certificate
COPY --from=build /https/aspnetapp.pfx /https/aspnetapp.pfx

# Run the application
ENTRYPOINT ["dotnet", "api.dll"]