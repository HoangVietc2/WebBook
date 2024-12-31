var token = $.cookie("token");
function GetAdminUser(){
    $.ajax({
      url: "http://localhost:7070/v8/listApmAdmin",
      type: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .done(function (data) {
        let stt = 1;
        // Xử lý dữ liệu đã nhận được từ API khi yêu cầu thành công
        data.forEach((value) => {
          let status =
            value.status === "completed"
              ? "Đã xác nhận"
              : value.status === "pending"
              ? "Đang chờ"
              : "";

          // Tạo bảng HTML
          let html = `
        <tr>
          <td>${value.appointment_date}</td>
          <td>${value.trainer_name}</td>
          <td>${value.description}</td>
          <td>${value.phone_number}</td>
          <td>${status}</td>`;

          // Điều kiện hiển thị nút dựa trên status
          if (value.status === "completed") {
            html += `<td><a class="btn btn-success disabled" role="button">Đã xác nhận</a></td>`;
          } else if (value.status === "pending") {
            html += `<td><a class="btn btn-danger" role="button" onclick="UpdateApm(${value.id})">Xác nhận</a></td>`;
          }

          // Đóng thẻ tr
          html += `</tr>`;

          // Thêm dữ liệu vào bảng
          $(".t-body").append(html);
        });
      })
      .fail(function (xhr, status, error) {
        // Xử lý lỗi nếu có khi yêu cầu thất bại
        console.error("Error:", status, error);
      });

}
GetAdminUser();

  function UpdateApm(id) {
    $.ajax({
      url: `http://localhost:7070/v8/updateApmAdmin/${id}`,
      type: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .done(function (response) {
        GetAdminUser();
        alert(response);
      })
      .fail(function (error) {
        console.log("Error:", error);
      });
  }
