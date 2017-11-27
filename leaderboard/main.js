$(document).ready(function () {
	var userList = null;
	$.get('https://backend-ttom.herokuapp.com/users', function (responseText) {
		userList = responseText;
	}).done(function() {
    table(userList);
  });
});

function table(list) {
	var count = 1;
	list.forEach(element => {
		var newRowContent = '"<tr><td>'+count+'</td><td>'+element.username+'</td><td>'+element.score+'</td></tr>';
		$("tbody").append(newRowContent);
		console.log(element.username);
		console.log(element.score);
		count++;
	});
}