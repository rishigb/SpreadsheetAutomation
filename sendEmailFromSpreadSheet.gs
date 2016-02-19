var submitted ="SUBMITTED";

function sendEmails() {
	    var sheet = SpreadsheetApp.getActiveSheet();
			var startRow = 2;  // First row of data to process
			var numRows = sheet.getLastRow();   // Number of rows to process - This has to be the maximum number of rows. this part is workin
			// Fetch the range of cells , with the increase in number of columns, increase 12 too	
			var dataRange = sheet.getRange(startRow, 1, numRows-1, 16)//getRange(row, column/starting column of the range, numRows, numColumns/number of columns to return) this part is working.
			var data = dataRange.getValues();
		  for (i in data) {
		    var row = data[i];//data[i][0] is going to give the value of the cell.
		    var empId = row[0];  // First column
	      var empName = row[2]; // Second column
		    var managerEmail=row[3];//
		    var vendor =row[5];//
		    var amount = row[10];//
		    var formId= row[0];//Timestamp as of now
		    var empEmail =row[15];// Employee Email
																															    
																																    
																																			    
		  //Check for form submission |Need to write code to update the flag on submission 
		    Logger.log(row[11]);
																																    
		   if (row[11]!=submitted){
		    //sendReportToManager(empName,amount,vendor,formId,managerEmail);
		      Logger.log("sending email to manager");
		     }
		 }
																																																								   
}

function sendReportToManager(_empName,_amount,_vendor,_formId,_managerEmail) { //Create a function with variable names, passing the inputs in above code.
  var message = "<html><body>"
	    + "<p>" + _empName + " has requested your approval for an expense report."
			    + "<p>" + "Amount: " + _amount
					    + "<p>" + "Vendor: " + _vendor
							    + "<p>" + "Report Id: " + _formId
									    + '<p>Please approve or reject the expense report <a href="' + APPROVAL_FORM_URL + '">here</a>.'
											    + "</body></html>";
													  MailApp.sendEmail(_managerEmail, "Expense Report Approval Request", "", {htmlBody: message}); 
														 
}
