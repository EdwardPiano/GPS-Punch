(function (PLUGIN_ID) {
  "use strict";
  kintone.events.on("app.record.index.show", function () {
    const divTimeCard = document.getElementById("timeCard");
    console.log(divTimeCard);
    divTimeCard.insertAdjacentHTML(
      "afterbegin",
      '<div class="date-time"><table style = "margin: 0 auto;"><tr><td class="date" id="date"></td></tr><tr><td class="time" id="time" rowspan="2"></td></tr></table></div ><div class="timecard"><div id="button1"><button class="button1" type="submit"></button></div><div id="button2"><button class="button2" type="submit"></button></div></div><div class="timecard"><div id="button3"><button class="button3" type="submit">確認位置</button></div></div>'
    );
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    console.log(config);
  });
})(kintone.$PLUGIN_ID);
