const fetch = require('node-fetch')
global.Headers = fetch.Headers

module.exports = async (context, req) => {

    // get all APIs, pass to error handlers
    fetch("https://azureproxy.azurewebsites.us/apiApps/allApis", {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.AZURE_PROXY
        })
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(app => {
                fiveHundo(app)
                fourHundo(app)
            })
        })

    // get all clients, pass to error handlers
    fetch("https://azureproxy.azurewebsites.us/clientApps/allClients", {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.AZURE_PROXY
        })
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(app => {
                fiveHundo(app)
                fourHundo(app)
            })
        })

    // get all lambdas, pass to error handlers
    fetch("https://azureproxy.azurewebsites.us/serverlessApps/allServerlessApps", {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.AZURE_PROXY
        })
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(app => {
                fiveHundo(app)
                fourHundo(app)
            })
        })

    context.done()
}

const fiveHundo = app => {
    fetch("https://azureproxy.azurewebsites.us/metrics/fiveHundo?minutes=10&resourceGroup=" + app.resourceGroup + "&appName=" + app.name, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.AZURE_PROXY
        })
    })
        .then(res => res.json())
        .then(data => {
            data[0].metrics.forEach(metric => {
                if (metric.average > 0) {
                    tellBaloo({
                        appName: app.name,
                        errorType: "500",
                        countError: metric.average,
                        time: metric.timestamp
                    })
                }
            })
        })
}

const fourHundo = app => {
    fetch("https://azureproxy.azurewebsites.us/metrics/fourHundo?minutes=10&resourceGroup=" + app.resourceGroup + "&appName=" + app.name, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.AZURE_PROXY
        })
    })
        .then(res => res.json())
        .then(data => {
            data[0].metrics.forEach(metric => {
                if (metric.average > 0) {
                    tellBaloo({
                        appName: app.name,
                        errorType: "400",
                        countError: metric.average,
                        time: metric.timestamp
                    })
                }
            })
        })
}

const tellBaloo = alert => {
    fetch("https://baloo.azurewebsites.us/azMonitor/alert", {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.BALOO,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(alert)
    })
}
