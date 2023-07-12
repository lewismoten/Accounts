function test_create() {
    console.log('create...');
    var request = new XMLHttpRequest();
    request.open('POST', '../create.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onerror = function() { console.log('ERROR')};
    request.onabort = function() { console.log('ABORT')};
    request.ontimeout = function() { console.log('TIMEOUT')};
    request.onreadystatechange = function() {
        if(request.readyState !== 4) return;
        console.log('response received');
        console.log(JSON.parse(request.responseText));
    }
    request.send(JSON.stringify({
        accountName: document.getElementById('accountName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }));
}

window.onload = function() {
    createButton.onclick = test_create;
}