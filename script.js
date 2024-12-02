function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function generateReportHtml(sheet) {
  var range = sheet.getRange('A10:BN11'); // Specific range
  var values = range.getValues();
  var backgroundColors = range.getBackgrounds(); // Get background colors

  var html = '<table border="1" cellpadding="5" cellspacing="0">';
  
  for (var i = 0; i < values.length; i++) {
    html += '<tr>';
    
    for (var j = 0; j < values[i].length; j++) {
      var cellValue = values[i][j];
      var bgColor = backgroundColors[i][j];
      
      // Check if the cell contains a date
      if (cellValue instanceof Date) {
        // Format the date to mm/dd/yyyy
        cellValue = Utilities.formatDate(cellValue, Session.getScriptTimeZone(), "MM/dd/yyyy");
      }
      
      html += '<td style="background-color:' + bgColor + ';">' + (cellValue || '') + '</td>';
    }
    
    html += '</tr>';
  }
  
  html += '</table>';
  
  return html;
}

function getAllSheetData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Trang tinh1');
  if (!sheet) {
    return 'Sheet not found';
  }
  
  // Generate the HTML table with the data and background colors
  var reportHtml = generateReportHtml(sheet);
  
  return reportHtml;
}

function updateSheetData(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Trang tinh1');
  if (!sheet) {
    return;
  }

  // Update specific cells with the provided data
  sheet.getRange('B1').setValue(data.name || '');
  sheet.getRange('B2').setValue(data.dob || '');
  sheet.getRange('B4').setValue(data.month || '');
  sheet.getRange('B5').setValue(data.year || '');
}
