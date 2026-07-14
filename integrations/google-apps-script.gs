/**
 * Google Apps Script webhook for the Botifiy leads backup sheet.
 * Script properties required: SPREADSHEET_ID and WEBHOOK_SECRET.
 * Optional: SHEET_NAME (defaults to "Leads").
 */
function doPost(event) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    var payload = JSON.parse(event.postData.contents || "{}");
    var expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret || !payload.lead) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    var properties = PropertiesService.getScriptProperties();
    var spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    var sheetName = properties.getProperty("SHEET_NAME") || "Leads";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    var lead = payload.lead;

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "id", "created_at", "name", "whatsapp", "business_type", "needs",
        "selected_plan", "source", "ip", "user_agent", "status"
      ]);
      sheet.setFrozenRows(1);
    }

    // Deduplicate retries using the immutable Supabase lead ID.
    if (sheet.getLastRow() > 1) {
      var idMatch = sheet
        .getRange(2, 1, sheet.getLastRow() - 1, 1)
        .createTextFinder(String(lead.id))
        .matchEntireCell(true)
        .findNext();
      if (idMatch) return jsonResponse({ ok: true, duplicate: true });
    }

    sheet.appendRow([
      safeCell(lead.id),
      safeCell(lead.created_at),
      safeCell(lead.name),
      safeCell(lead.whatsapp),
      safeCell(lead.business_type),
      safeCell((lead.needs || []).join("، ")),
      safeCell(lead.selected_plan),
      safeCell(lead.source),
      safeCell(lead.ip),
      safeCell(lead.user_agent),
      safeCell(lead.status)
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(JSON.stringify({ event: "lead_sheet_write_failed", error: String(error) }));
    return jsonResponse({ ok: false, error: "write_failed" });
  } finally {
    lock.releaseLock();
  }
}

function safeCell(value) {
  var text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

