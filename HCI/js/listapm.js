var token = $.cookie("token");
$.ajax({
  url: "http://localhost:7070/v8/listbyUser",
  type: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .done(function (data) {
    let stt = 1;
    // Xử lý dữ liệu đã nhận được từ API khi yêu cầu thành công
    data.forEach((value) => {
      let html = `  <tr>
                        
                        <td>${value.appointment_date}</td>
                        <td>${value.trainer_name}</td>
                        <td>${value.description}</td>
                        <td>${value.status}</td>
                        
                    </tr>`;
      $(".t-body").append(html);
    });
  })
  .fail(function (xhr, status, error) {
    // Xử lý lỗi nếu có khi yêu cầu thất bại
    console.error("Error:", status, error);
  });