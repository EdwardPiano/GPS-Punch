function setHtmlStructure() {
  const divTimeCard = document.getElementById("timeCard");
  divTimeCard.innerHTML = `<div class='showTimeSpace'>
    <div id="map"></div>
  </div>
    <div class='showTimeSpace'>
    <div id='date'>2022/06/15</div>
    <div id='time'>13:42:35</div>
    </div>
    <div class='btnZone'>
    <div><button id="punchIn" class='punchIn' type='submit'></button></div>
    <div><button id="punchOut" class='punchOut' type='submit'></button></div>
    </div>`;
}
