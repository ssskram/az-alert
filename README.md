# AZ Alert

AD Alert is a BaaS service hosted in Azure that monitors production applications for server errors..

## alertListener
This is a cron job that runs every 10 minutes.  It calls up [azure-proxy](https://github.com/CityofPittsburgh/azure-proxy) for lists of all applications in production.  Then, for each application, it requests the previous 10 minutes of 500/400 errors occuring on the service.  If there were errors, developers are alerted via [slack](https://github.com/CityofPittsburgh/baloo).

## Authorization

No auth, only timer jobs

## Running Locally

### Prerequisites
* [.Net Core](https://dotnet.microsoft.com/download) - BaaS execution environment
* [Node.js](https://nodejs.org) - JS runtime
* local.settings.json - See local.settings.json.example for all required secrets

### Installation
```
git clone https://github.com/CityofPittsburgh/az-alert
cd az-alert
func extensions install
func host start
```

## Deployment

Deployed as an Azure Function.  Application is deployed directly from github, and can be triggered either (a) through the Azure GUI, (b) through the [CLI](https://docs.microsoft.com/en-us/cli/azure/webapp/deployment/source?view=azure-cli-latest#az-webapp-deployment-source-sync), or (c) through the [proxy service](https://github.com/CityofPittsburgh/azure-proxy).

For complete documentation on the azure environment, see [here](https://github.com/CityofPittsburgh/all-things-azure.git).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details