/* global data */
/* exported data */
var $titleBoxInput = document.getElementById('title-text');
var $imageInput = document.getElementById('image-text');
var $notesText = document.getElementById('notes-text');
var $image = document.querySelector('img');
var $noEntries = document.querySelector('.no-entries');
var $view = document.querySelectorAll('.view');
var $entryFormbutton = document.getElementById('create-entry-btn');
var $navBar = document.querySelector('.nav-bar');
var $ul = document.querySelector('.entry-list');
var $titleEntryForm = document.querySelector('.title-entry-form');
var $deleteEntryBtn = document.querySelector('.delete-entry-btn');
var $modalCancelButton = document.querySelector('.modal-button-cancel');
// var $modalConfirmButton = document.querySelector('.modal-button-confirm');
var $modal = document.querySelector('.modal');

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

  if (data.editing !== null) {

    for (var i = 0; i <= data.entries.length - 1; i++) {
      if (data.editing === data.entries[i].id + '') {
        data.entries[i].imageUrl = $imageInput.value;
        data.entries[i].title = $titleBoxInput.value;
        data.entries[i].notes = $notesText.value;

        var $entry = dataEntry(data.entries[i]);
        $ul.children[i].replaceWith($entry);
        data.editing = null;
      }
    }

  } else {
    data.nextEntryId++;
    data.entries.unshift(formValues);
    $entry = dataEntry(formValues);

    $ul.prepend($entry);
  }

  $formCode.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $deleteEntryBtn.setAttribute('class', 'delete-entry-btn hidden');

  swapViews(event);
  // console.log(event);
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
  $textColumn.setAttribute('class', 'column-half');
  $row.appendChild($textColumn);

  var $entryText = document.createElement('div');
  $entryText.setAttribute('class', 'entry-text');
  $textColumn.appendChild($entryText);

  var $titleText = document.createElement('h2');
  $titleText.textContent = entry.title;
  $entryText.appendChild($titleText);

  var $editBtn = document.createElement('i');
  $editBtn.setAttribute('data-view', 'entry-form');
  $editBtn.setAttribute('data-entry-id', entry.id);
  $editBtn.setAttribute('class', 'fas fa-pencil-alt');
  $entryText.appendChild($editBtn);

  var $notesText = document.createElement('p');
  $notesText.textContent = entry.notes;
  $textColumn.appendChild($notesText);

  return $li;

}

function swapViews(event) {
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
  if (data.entries.length > 0) {
    $noEntries.className = 'no-entries hidden';

  }

}

$navBar.addEventListener('click', swapViews);
$entryFormbutton.addEventListener('click', newEntry);

function newEntry(event) {
  $titleEntryForm.textContent = 'New Entry';
  data.editing = null;
  $deleteEntryBtn.setAttribute('class', 'delete-entry-btn hidden');
  $formCode.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapViews(event);
}

function createEntryList(entries) {
  for (var i = 0; i <= entries.length - 1; i++) {
    var entry = dataEntry(entries[i]);
    $ul.appendChild(entry);
  }
}

function prepopulateEntryForm(entries) {

  if (data.editing) {
    $titleEntryForm.textContent = 'Edit Entry';
    $deleteEntryBtn.setAttribute('class', 'delete-entry-btn');
    for (var i = 0; i <= data.entries.length - 1; i++) {

      if (data.entries[i].id + '' === data.editing) {
        $imageInput.value = data.entries[i].imageUrl;
        $image.setAttribute('src', data.entries[i].imageUrl);
        $titleBoxInput.value = data.entries[i].title;
        $notesText.value = data.entries[i].notes;
      }
    }
  }
}

function loadEntryList(event) {
  createEntryList(data.entries);
  swapViews();
  prepopulateEntryForm(data.entries);

}
window.addEventListener('DOMContentLoaded', loadEntryList);

function editButton(event) {
  var entryId = event.target.getAttribute('data-entry-id');
  $titleEntryForm.textContent = 'Edit Entry';
  $deleteEntryBtn.setAttribute('class', 'delete-entry-btn');

  if (entryId) {
    for (var i = 0; i <= data.entries.length - 1; i++) {

      if (data.entries[i].id + '' === entryId) {
        $imageInput.value = data.entries[i].imageUrl;
        $image.setAttribute('src', data.entries[i].imageUrl);
        $titleBoxInput.value = data.entries[i].title;
        $notesText.value = data.entries[i].notes;
        data.editing = entryId;
      }
    }
    swapViews(event);

  }
}
$ul.addEventListener('click', editButton);

function openModal(event) {
  // console.log(event.target);
  $modal.className = 'modal open';
}

function closedModal(event) {
  // console.log(event.target);
  $modal.className = 'modal';
}

// $modalConfirmButton.addEventListener('click', deleteEntry);
$deleteEntryBtn.addEventListener('click', openModal);
$modalCancelButton.addEventListener('click', closedModal);
