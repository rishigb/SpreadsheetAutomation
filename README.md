# SpreadsheetAutomation

Aim is to send an email when a form is submitted. Simple isn't it? Well, google's scipt example doesn't work. [Here](https://developers.google.com/apps-script/articles/expense_report_approval) is the link to the that.

I have made a lot of changes, you will see some of them here.

What's happening inside:

<s>1. Email is sent to the manager the moment a form is submited.<s>

<s>2. Email includes a link to approval from the manager.</s>

3. When the manager approves or rejects, the filed in the spreadsheet is updated.

4. If 3 doesn't happen, another field called submitted is updated.

5. Based on the status in column for approval or reject, the email is sent back to employee saying that the request has been submitted.

