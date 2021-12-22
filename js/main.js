/* global data */
/* exported data */
var $titleBoxInput = document.getElementById('title-text');
var $imageInput = document.getElementById('image-text');
var $notesText = document.getElementById('notes-text');
var $image = document.querySelector('img');

function updateImage(event) {
  var insideText = $imageInput.value;
  $image.setAttribute('src', insideText);
}

$imageInput.addEventListener('input', updateImage);

var $formCode = document.querySelector('.form-code');

function submitForm(event) {
  event.preventDefault();
  var formValues = {
    imageUrl: $imageInput.value,
    title: $titleBoxInput.value,
    notes: $notesText.value,
    id: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(formValues);
  $formCode.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

}

$formCode.addEventListener('submit', submitForm);
