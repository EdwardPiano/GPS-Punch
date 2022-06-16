(function (PLUGIN_ID) {
  "use strict";
  kintone.events.on("app.record.index.show", function () {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    setHtmlStructure(config); // 設定打卡畫面
    // 取的畫面元素
    const btnPunchIn = document.getElementById("punchIn"); // 上班按鈕
    const btnPunchOut = document.getElementById("punchOut"); // 下班按鈕
    const showDateSpace = document.getElementById("date"); // 顯示日期位置
    const showTimeSpace = document.getElementById("time"); // 顯示時間位置

    function setTime() {
      showDateSpace.innerText = moment().format("YYYY/MM/DD");
      showTimeSpace.innerText = moment().format("HH:mm:ss");
    }
    setInterval(setTime, 1000);

    // Google Map 顯示
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 },
      zoom: 0,
    });

    const geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // google.maps.LatLng 物件
        const coord = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // 傳入 latLng 資訊至 geocoder.geocode
        geocoder.geocode({ latLng: coord }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            // 如果有資料就會回傳
            if (results) {
              console.log(results[0]);
              const marker = new google.maps.Marker({
                position: pos,
                title: String(results[0].formatted_address),
                draggable: true,
              });

              const popupContent = new google.maps.InfoWindow();
              google.maps.event.addListener(
                marker,
                "click",
                (function () {
                  return function () {
                    popupContent.setContent(results[0].formatted_address);
                    popupContent.open(map, marker);
                  };
                })(marker)
              );
              marker.setMap(map);
              map.setCenter(pos);
              map.setZoom(19);
              google.maps.event.trigger(marker, "click", {}); // 啟動後自動顯示當前地址
            }
          }
          // 經緯度資訊錯誤
          else {
            alert("Reverse Geocoding failed because: " + status);
          }
        });
      });
    }

    btnPunchIn.onclick = () => {
      // 查看是否已經打過上班卡

      alert("OK");
    };
    btnPunchOut.onclick = () => {
      alert("OK!!");
    };

    console.log(config);
  });
})(kintone.$PLUGIN_ID);
