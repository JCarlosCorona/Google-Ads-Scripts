/*********************************************
* Pause Broad Match Keywords
* Version 1.0
* Created By: José Carlos Corona
* jcorona@epa.digital
* based on: http://www.freeadwordsscripts.com/2012/11/pause-all-keywords-with-no-impressions.html
**********************************************/
var TO_NOTIFY = "your_email@epa.digital";
function main() {
    var kwIter = AdsApp.keywords()
        .withCondition("KeywordMatchType = BROAD") // pause KW = broad
        .withCondition("Text DOES_NOT_CONTAIN '+'")
        .forDateRange("ALL_TIME") // could use a specific date range like "20130101","20131231"
        .withCondition("Status = ENABLED")
        .withCondition("CampaignStatus = ENABLED")
        .withCondition("AdGroupStatus = ENABLED")
        .get();

    var toPause = [];
    while (kwIter.hasNext()) {
        var kw = kwIter.next();
        toPause.push(kw);
        if (AdsApp.getExecutionInfo().isPreview() &&
            AdsApp.getExecutionInfo().getRemainingTime() < 10) {
            break;
        }
    }

    for (var i in toPause) {
        toPause[i].pause();
    }

    // Sent an email to notify you of the changes
    MailApp.sendEmail(TO_NOTIFY,
        "AdWords Script Paused " + toPause.length + " Keywords.",
        "Your AdWords Script paused " + toPause.length + " keywords.");
}
