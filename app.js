$("#navbar").load("navbar.html");
// $("#footer").load("footer.html");

const MQTT_URL = "http://localhost:5001/send-command";
const API_URL = "http://localhost:5000/api";

$.get(`${API_URL}/devices`)
  .then((response) => {
    response.forEach((device) => {
      $("#devices tbody").append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

$("#add-device").on("click", () => {
  const name = $("#name").val();
  const user = $("#user").val();
  const sensorData = [];

  const body = {
    name,
    user,
    sensorData,
  };

  $.post(`${API_URL}/devices`, body)
    .then((response) => {
      location.href = "device-list.html";
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});

$("#send-command").on("click", function () {
  const deviceId = $("#deviceId").val();
  const command = $("#command").val();
  $.post(MQTT_URL, { deviceId, command }).then((response) => {
    location.href = "/";
  });
});