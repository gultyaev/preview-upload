"use strict";

var input = document.querySelector('input[type="file"]'),
    column1 = document.querySelector('.col1-list'),
    column2 = document.querySelector('.col2-list');

function addFile(e) {
  var files = e.target.files;
  if (files.length) {
    [].forEach.call(files, function (currentFile) {
      console.log(currentFile);

      var reader = new FileReader();

      reader.onload = function (e) {
        var data = e.target.result,
            img = document.createElement('img'),
            p = document.createElement('p'),
            div = document.createElement('li'),
            checkBox = document.createElement('input');
        div.classList.add('item');
        p.classList.add('title');
        img.classList.add('img');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.classList.add('none');

        function size() {
          var counter = 0,
              countValue = [' B', ' Kb', ' Mb', ' Gb', ' Tb'];

          return function recursion(z) {
            if (z > 1024) {
              counter++;
              return recursion(z / 1024);
            } else {
              return 'size: ' + z.toFixed(1) + countValue[counter];
            }
          };

          // if (z>1024) {
          //   while (z>1024) {
          //     z = (z/1024).toFixed(2);
          //     ++counter;
          //   }
          //   return z+countValue[counter];
          // } else {
          //   return z+countValue[counter];
          // }
        }

        if (currentFile.type.indexOf('image') != '-1') {

          img.src = data;

          //FileName
          p.innerHTML = currentFile.name + '<br>' + size()(currentFile.size);

          div.appendChild(img);
          div.appendChild(checkBox);
          div.appendChild(p);
          column1.appendChild(div);
        } else {
          p.innerHTML = currentFile.name + '<br>' + size()(currentFile.size);
          div.appendChild(checkBox);
          div.appendChild(p);
          column2.appendChild(div);
        }
      };

      reader.readAsDataURL(currentFile);
    });
  }
}

input.addEventListener('change', function (e) {
  addFile(e);
});
input.addEventListener('drop', function (e) {
  addFile(e);
});

document.querySelector('.remove').addEventListener('click', function () {
  var button = document.querySelectorAll('.toggle'),
      checkbox = document.querySelectorAll('input[type="checkbox"'),
      buttonRemove = document.querySelector('.remove');

  [].forEach.call(button, function (e) {
    e.classList.toggle('none');
  });
  [].forEach.call(checkbox, function (e) {
    e.classList.toggle('none');
  });

  if (!buttonRemove.classList.contains('none')) {
    [].forEach.call(checkbox, function (e) {
      if (e.checked) {
        e.parentNode.parentNode.removeChild(e.parentNode);
      }
    });
  }
});