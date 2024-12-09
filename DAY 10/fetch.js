function Fetch(method, url) {
  var promise = new Promise((f1, f2) => {
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState == 4 && helper.status == 200) {
        var result = JSON.parse(helper.responseText);
        f1(result);
      } else if (helper.readyState == 4 && helper.status == 500) {
        f2();
      }
    };
    helper.open(method, url);
    helper.send();
  });
  return promise;
}
