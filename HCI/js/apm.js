var token = $.cookie("token");






$(document).ready(function () {
  // ClassicEditor initialization completed
  $("#form-add-apm").submit(function (e) {
    e.preventDefault();

    // Lấy giá trị của các trường input
    const phone_number = $("#phone_number").val();
    const appointment_date = $("#appointment_date").val();
    const trainer_id = $("#trainer_id").val(); // Lấy giá trị của trainer_id
    const description = $("#description").val(); // Lấy giá trị của description

    // Gửi dữ liệu qua AJAX
    $.ajax({
      url: "http://localhost:7070/v8/insertApm",
      type: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        phone_number: phone_number,
        appointment_date: appointment_date,
        trainer_id: trainer_id,
        description: description,
      },
      success: function (data) {
        // Nếu thành công, reload trang
        location.reload();
      },
      error: function (error) {
        // Nếu có lỗi, hiển thị thông báo lỗi
        swal({
          icon: "error",
          text: "Error: " + error.responseText,
        });
        console.log(error.status); // In ra mã lỗi để kiểm tra
      },
    });
  });
});



function showPT() {
  $.ajax({
    url: `http://localhost:7070/v8/getUserRole`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (data) {
      let selectOption = "";
      data.forEach((value) => {
        selectOption += `<option value="${value.id_user}">${value.username}</option>`;
      });
      $(".select-pt").append(selectOption);
    })
    .fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có khi yêu cầu thất bại
      console.error("Error:", status, error);
    });
}
showPT();