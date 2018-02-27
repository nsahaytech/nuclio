// @nuclio.configure
//
// function.yaml:
//   spec:
//     runtime: "nodejs"
//     handler: "handler"
//     build:
//       commands:
//       - "npm install --global moment"
//       - "npm install --global regex"

var moment = require('moment');
var Regex = require('regex');

exports.handler = function(context, event) {
    var data = event.body.toString();
    var snn = new Regex(/\b\d{3}-\d{2}-\d{4}\b/);
    var ccard = new Regex(/\b(?:\d[ -]*?){13,16}\b/);
    var matchList = []
    // Unstructured debug message
	context.logger.info("Process document for input " + data);

    var rx = {}
    rx["SSN"] = snn;
    rx["Credit card"] = ccard
    for (var key in rx){
        if (rx[key].test(data)){
            matchList.push("Contains "+key)
        }
    }
    if (matchList.length > 0){
        context.Logger.warnWith("Document content warningcontent", matchList)
        context.callback(matchList);
    }
    context.callback("Passed");
};
