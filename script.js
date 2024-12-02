// The function that handles GET requests (to fetch data)
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Trang tinh1');
  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found");
  }

  var range = sheet.getRange('A10:BN11');
  var values = range.getValues();
  var html = generateReportHtml(values);  // Generate table HTML
  
  return ContentService.createHtmlOutput(html);  // Return HTML to be displayed on the website
}

// Generate HTML for table
function generateReportHtml(values) {
  var html = '<table border="1" cellpadding="5" cellspacing="0">';
  for (var i = 0; i < values.length; i++) {
    html += '<tr>';
    for (var j = 0; j < values[i].length; j++) {
      var cellValue = values[i][j];
      html += '<td>' + (cellValue || '') + '</td>';
    }
    html += '</tr>';
  }
  html += '</table>';
  return html;
}

// The function that handles POST requests (to update data)
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Trang tinh1');
  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found");
  }

  // Get data from POST request
  var data = JSON.parse(e.postData.contents);  // assuming the data is sent as JSON

  sheet.getRange('B1').setValue(data.name || '');
  sheet.getRange('B2').setValue(data.dob || '');
  sheet.getRange('B4').setValue(data.month || '');
  sheet.getRange('B5').setValue(data.year || '');

  return ContentService.createTextOutput('Data updated successfully');
}
