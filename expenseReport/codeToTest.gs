var submitted ="SUBMITTED";
var approved ="APPROVED";
var rejected ="REJECTED";
var APPROVAL_FORM_URL ="https://docs.google.com/forms/d/1CFdDZOffbSSi1kFZvQ3BNLEMUUmLM4kw2QBJioqdnPI/viewform" ;
var APPROVALS_SPREADSHEET_ID="1jPaQ2OwMJfY565WbaQ7bhgo7tTJ7QdgOUSyMlNf_45c";

function mainFunction() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var startRow = 2;  // First row of data to process
    var numRows = sheet.getLastRow();   // Number of rows to process - This has to be the maximum number of rows. this part is working
    var statusCol = sheet.getLastColumn();
    //Logger.log(sheet.getLastColumn());
    // Fetch the range of cells , with the increase in number of columns, increase 12 too.
    var dataRange = sheet.getRange(startRow, 1, numRows-1, 48)//getRange(row, column/starting column of the range, numRows, numColumns/number of columns to return) this part is working.
    var data = dataRange.getValues();

     /* Open the second sheet here and check for the reportID and status here */
    var approvalSpreadsheet = SpreadsheetApp.openById(APPROVALS_SPREADSHEET_ID);
    var astartRow = 2;
    var aSpreadsheet = approvalSpreadsheet.getActiveSheet();
    var anumRow = approvalSpreadsheet.getLastRow();
    var astatusColumn = approvalSpreadsheet.getLastColumn();
    var adataRange = aSpreadsheet.getRange(astartRow,1,anumRow-1,astatusColumn);
    var adata = adataRange.getValues();

  for (i in data) {
    var row = data[i];//data[i][0] is going to give the value of the cell.
    var empEmail = row[1]; // Second column
    var managerEmail=row[45];// The number of the column where it is written, needs to be checked again.
    var vendor1 =row[4];// 
    var cost1 =row[9];
    var vendor2 = row[12];
    var cost2 = row[17];
    var vendor3 = row[20];
    var cost3 = row[25];
    var vendor4= row[28];
    var cost4 = row[33];
    var vendor5 = row [36];
    var cost5 = row [41];

    var vendorAndCostInfo = (vendor1+":"+cost1+vendor2+":"+cost2+vendor3+":"+cost3+vendor4+":"+cost4+vendor5+":"+cost5 );
    Logger.log(vendorAndCostInfo);
    var amount = row[10];// Total Amount
    var reportId= startRow++;//Row Number form the sheet
    var approverEmail =row[44];
    

    //Update the status on the main sheet from here 
    for (j in adata){
      //When both the report ID in main sheet and the approval form back end are the same, update the status or comment.      
      if (reportId == adata[j][1]){
       
        sheet.getRange(adata[j][1], statusCol).setValue(adata[j][2]);
      }
      
    }
     
/*********************Send emails here. Check the statuCol from the Main sheet and send emails on the basis of that. */
   if (row[statusCol-1] != submitted) {
         if (row[statusCol-1] == approved){
           //sendResponseEmployee (empEmail,reportId,row[statusCol-1]);
           Logger.log(statusCol)
          }
         if (row[statusCol-1] ==rejected) { //statusCol -1 is the status column, it can also be written as 46
           //sendResponseEmployee(empEmail,reportId,row[statusCol-1]);
           Logger.log("rejected");
         }
         if(row[statusCol-1] !=""){
          //sendEmailWithCommen(empEmail,reportId,row[statusCol-l]);
           Logger.log(row[statusCol-1]);
         }
         if(row[statusCol-1] ==""){
          //sendReportManager(userName,amount, vendorAndCostInfo,reportId,approverEmail);
           sheet.getRange(reportId, statusCol).setValue("SUBMITTED");
         }
        
       }
    
   else {
        Logger.log("Report already submitted, doing no action");
      }
    }
}

/************************ Function to send emails */
function sendReportManager(_empName,_amount,_vendor,_reportId,_managerEmail) { //Create a function with variable names, passing the inputs in above code.
  var message = "<html><body>"
    + "<p>" + _empName + " has requested your approval for an expense report."
    + "<p>" + "Amount: " + _amount
    + "<p>" + "Vendor: " + _vendor
    + "<p>" + "Report Id: " + _reportId
    + '<p>Please approve or reject the expense report <a href="' + APPROVAL_FORM_URL + '">here</a>.'
    + "</body></html>";
  MailApp.sendEmail(_managerEmail, "Expense Report Approval Request", "", {htmlBody: message}); 
}


function sendResponseEmployee(_empName,_reportId,_status) { //Create a function with variable names, passing the inputs in above code.
  var message = "<html><body>"
    + "<p> Your request for the following has been" +_status + "</p>"
    + "<p>" + "Report Id: " + _reportId  
    + "</body></html>";
  MailApp.sendEmail(_empName, "Expense Report Approval Result", "", {htmlBody: message}); 
}

function sendEmailWithComment(_empName,_reportId,_comment) { //Create a function with variable names, passing the inputs in above code.
  var message = "<html><body>"
    + "<p> Your request for the following has been put on hold.</p>"
    + "<p>" + "Report Id: " + _reportId +"</p>"
    +"<p>"+"Comment: " +_comment +"</p>"
    + "</body></html>";
  MailApp.sendEmail(_empName, "Expense Report Approval Result", "", {htmlBody: message}); 
}