/* global data */
/* exported data */
var $titleBoxInput = document.getElementById('title-text');
var $imageInput = document.getElementById('image-text');
var $notesText = document.getElementById('notes-text');
var $image = document.querySelector('img');
var $noEntries = document.getElementById('no-entries');
var $view = document.querySelectorAll('.view');
var $entryFormbutton = document.getElementById('create-entry-btn');
var $navBar = document.querySelector('.nav-bar');
var $ul = document.querySelector('.entry-list');

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

  var $entry = dataEntry(formValues);
  $ul.prepend($entry);

  entriesClick(event);
}

$formCode.addEventListener('submit', submitForm);

function dataEntry(entry) {
  var $li = document.createElement('li');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  var $imageColumn = document.createElement('div');
  $imageColumn.setAttribute('class', 'column-half ');
  $row.appendChild($imageColumn);

  var $imageView = document.createElement('img');
  $imageView.setAttribute('src', entry.imageUrl);
  $imageColumn.appendChild($imageView);

  var $textColumn = document.createElement('div');
  $textColumn.setAttribute('class', 'column-half entry-text');
  $row.appendChild($textColumn);

  var $titleText = document.createElement('h2');
  $titleText.textContent = entry.title;
  $textColumn.appendChild($titleText);

  var $notesText = document.createElement('p');
  $notesText.textContent = entry.notes;
  $textColumn.appendChild($notesText);

  return $li;
}

function entriesClick(event) {
  var viewer;

  if (event) {
    viewer = event.target.getAttribute('data-view');

  } else {
    viewer = data.view;
  }

  if (viewer) {
    for (var i = 0; i < $view.length; i++) {
      if ($view[i].getAttribute('data-view') === viewer) {
        $view[i].className = 'view';
      } else {
        $view[i].className = 'view hidden';
      }
    }
    data.view = viewer;
  }
}

$navBar.addEventListener('click', entriesClick);
$entryFormbutton.addEventListener('click', entriesClick);

function createEntryList(entries) {
  if (entries.length > 0) {
    $noEntries.remove();
  }
  for (var i = 0; i <= entries.length - 1; i++) {
    var entry = dataEntry(entries[i]);
    $ul.appendChild(entry);
  }
}

function loadEntryList(event) {
  createEntryList(data.entries);
  entriesClick();
}
window.addEventListener('DOMContentLoaded', loadEntryList);
