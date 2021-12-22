/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousdataJSON = localStorage.getItem('code-journal-entry-form');

if (previousdataJSON !== null) {

  data = JSON.parse(previousdataJSON);
}

function before(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-entry-form', dataJSON);

}

window.addEventListener('beforeunload', before);
