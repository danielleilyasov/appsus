import { utilService } from '../../../../js/service/util-service.js'
import { storageService } from './async-storage-service.js'

const NOTES_KEY = 'notes'
_createNotes()

export const keepService = {
  query,
  remove,
  save,
  getEmptyNote,
  get,
  getNextNoteId,
  addNote,
  addDuplicatedKeep,
}

function addDuplicatedKeep(note) {
  const duplicatedNote = _createNote('', note.type, note.info, note.isPinned, note.style)
  return storageService.post(NOTES_KEY, duplicatedNote)
}

function addNote(note) {
  return storageService.post(NOTES_KEY, note)
}

function query() {
  return storageService.query(NOTES_KEY)
  // return utilService.loadFromStorage(noteS_KEY);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)

  // const notes = query();
  // const idx = notes.findIndex(note => note.id === noteId);
  // notes.splice(idx, 1);
  // utilService.saveToStorage(noteS_KEY, notes);
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note)
  else return storageService.post(NOTES_KEY, note)
  // note.id = utilService.makeId();
  // const notes = query();
  // notes.push(note);
  // utilService.saveToStorage(noteS_KEY, notes);
  // return note;
}

function getNextNoteId(noteId) {
  return storageService.query(NOTES_KEY).then((notes) => {
    const idx = notes.findIndex((note) => note.id === noteId)
    console.log(idx)
    return idx < notes.length - 1 ? notes[idx + 1].id : notes[0].id
  })
}

function getEmptyNote() {
  return { id: '', title: '', price: 0 }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    const notes = []
    notes.push(_createNote('n101', 'note-txt', { txt: 'Fullstack Me Baby!', title: 'we will be legend' }, true))
    notes.push(_createNote('n102', 'note-img', { src: 'app/keep/img/Appsus.png', title: 'Bobi and Me' }, false, { backgroundColor: '#ffffff' }))
    notes.push(
      _createNote('n103', 'note-todos', {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Driving liscence', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ],
      })
    )
    notes.push(_createNote('n104', 'note-video', { src: 'app/keep/videos/pexels-tima-miroshnichenko-5377684.mp4', title: 'hacker cracker' }))
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  return notes
}

function _createNote(id, type, info, isPinned = false, style = { backgroundColor: '#ffffff' }) {
  const note = {
    id,
    type,
    info,
    isPinned,
    style,
  }

  return note
}

function rand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
