(function (PLUGIN_ID) {
  "use strict";

  console.log("PLUGIN_ID ", PLUGIN_ID);
  const client = new KintoneRestAPIClient();

  // 獲取所有選項物件
  const punchInTimeElement = document.getElementById("punch-in-time"); // 上班時間
  const punchInLocationElement = document.getElementById("punch-in-location"); // 上班位置
  const punchOutTimeElement = document.getElementById("punch-out-time"); // 下班時間
  const punchOutLocationElement = document.getElementById("punch-out-location"); // 下班位置
  const GoogleTokenElement = document.getElementById("GoogleToken"); // Google API使用權
  const saveBtn = document.getElementById("save");
  const cancelBtn = document.getElementById("cancel");

  // Escape HTML
  const escapeHtml = (htmlStr) => {
    return htmlStr
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  // 設定上次保存的值
  const setDefault = () => {
    const conf = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (conf) {
      punchInTimeElement.value = conf.punchInTime;
      punchInLocationElement.value = conf.punchInLocation;
      punchOutTimeElement.value = conf.punchOutTime;
      punchOutLocationElement.value = conf.punchOutLocation;
      GoogleTokenElement.value =
        conf.GoogleToken !== undefined ? conf.GoogleToken : "";
    }
  };

  // 新增選項到表單的欄位中
  const setElementPotions = () => {
    const params = {
      app: kintone.app.getId(),
      preview: true,
    };
    return client.app
      .getFormFields(params)
      .then((resp) => {
        console.log(resp);
        for (const key of Object.keys(resp.properties)) {
          const prop = resp.properties[key];
          const punchInTimeElementOption = document.createElement("option"); // 上班時間(欄位選項)
          const punchOutTimeElementOption = document.createElement("option"); // 下班時間(欄位選項)
          const punchInTextElementOption = document.createElement("option"); // 上班地點(欄位選項)
          const punchOutTextElementOption = document.createElement("option"); // 下班地點(欄位選項)
          switch (prop.type) {
            // 欄位類型為時間
            case "TIME":
              punchInTimeElementOption.setAttribute(
                "value",
                escapeHtml(prop.code)
              );
              punchInTimeElementOption.innerText = escapeHtml(prop.label);
              punchInTimeElement.appendChild(punchInTimeElementOption);

              punchOutTimeElementOption.setAttribute(
                "value",
                escapeHtml(prop.code)
              );
              punchOutTimeElementOption.innerText = escapeHtml(prop.label);
              punchOutTimeElement.appendChild(punchOutTimeElementOption);
              break;
            // 欄位類型為文字
            case "SINGLE_LINE_TEXT":
              punchInTextElementOption.setAttribute(
                "value",
                escapeHtml(prop.code)
              );
              punchInTextElementOption.innerText = escapeHtml(prop.label);
              punchInLocationElement.appendChild(punchInTextElementOption);

              punchOutTextElementOption.setAttribute(
                "value",
                escapeHtml(prop.code)
              );
              punchOutTextElementOption.innerText = escapeHtml(prop.label);
              punchOutLocationElement.appendChild(punchOutTextElementOption);
              break;
          }
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "錯誤",
          text: error,
        });
      });
  };

  // 回上一頁
  cancelBtn.onclick = () => {
    history.back();
  };

  // 保存當前頁面的選擇
  saveBtn.onclick = () => {
    const config = {};
    if (
      !punchInTimeElement.value ||
      !punchInLocationElement.value ||
      !punchOutTimeElement.value ||
      !punchOutLocationElement.value ||
      !GoogleTokenElement.value
    ) {
      Swal.fire({
        icon: "error",
        title: "欄位值未完成",
        text: "請完成所有必填欄位",
      });
      return false;
    }
    config.punchInTime = punchInTimeElement.value;
    config.punchInLocation = punchInLocationElement.value;
    config.punchOutTime = punchOutTimeElement.value;
    config.punchOutLocation = punchOutLocationElement.value;
    config.GoogleToken = GoogleTokenElement.value;
    kintone.plugin.app.setConfig(config);
    return true;
  };

  setElementPotions().then(() => {
    setDefault();
  });
})(kintone.$PLUGIN_ID);
