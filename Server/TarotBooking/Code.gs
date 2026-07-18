// 部署方式：貼到 Google 試算表的「擴充功能 → Apps Script」編輯器裡，
// 再用「部署 → 新增部署 → 網頁應用程式」部署成公開可寫入的端點。
// 只處理寫入（doPost），不提供讀取（doGet 不回傳任何試算表內容），
// 避免公開端點變成資料外洩破口。

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var name = (data.name || '').toString().trim();
  var contact = (data.contact || '').toString().trim();
  var method = (data.method || '').toString().trim();
  var topic = (data.topic || '').toString().trim();
  var message = (data.message || '').toString().trim();
  var consent = data.consent === true;

  if (!name || !contact || !message || !consent) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'missing required fields' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([new Date(), name, contact, method, topic, message, consent]);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: '此端點僅接受預約表單 POST 提交，不提供資料讀取。' }))
    .setMimeType(ContentService.MimeType.JSON);
}
