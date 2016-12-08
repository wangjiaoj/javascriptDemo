  var x = $("submit");
  x.addHandler("click", submit)

  function submit() {
      var userName = $("userName").val();
      var passward = $("passWard").val();
      alert("name" + userName);
      $.ajax({
          url: "/ajax-login", //请求地址
          type: "post", //请求方式
          data: { name: userName, passward: passward }, //请求参数
          dataType: "json",
          success: function(response, xml) {
              // 此处放成功后执行的代码
              debugger
          },
          fail: function(status) {
              // 此处放失败后执行的代码
              debugger
          }
      });

  }