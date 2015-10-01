document.addEventListener('click', handleAddMore);

function handleAddMore(evt) {

  if (evt.target.id === 'addMore') {
    addMore(evt.target);
  }

  function addMore(button) {

    var parentElement = button.parentElement;
    var childs = parentElement.children;
    var newFieldset = findFirstFieldset(childs).cloneNode(true);
    emptyInputs(newFieldset);
    parentElement.insertBefore(newFieldset, button);

    function findFirstFieldset(childs) {
      for (var i = 0; i < childs.length; i++) {
        if (childs[i].tagName === 'FIELDSET') {
          return childs[i];
        }
      }
    }

    function emptyInputs (element) {
      var childs = element.children;

      for (var i = 0; i < childs.length; i++) {
        if (childs[i].tagName === 'select') {
          childs[i].value = '';
        } else {
          emptyInputs(childs[i]);
        }
      }
    }
  }
}
