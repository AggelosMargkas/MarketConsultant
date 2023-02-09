function submitForm() {
    var formData = new FormData();
    formData.append("jsonFile", $("input[name='jsonFile']")[0].files[0]);
    
    $.ajax({
      type: "POST",
      url: "path/to/your/server",
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        console.log(response);
      }
    });
  }
  