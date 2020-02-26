import { storageService } from '../storage.service.js';
import { utilService } from '../util.service.js'
const STORAGE_KEY = 'notes'

export const noteService = {
    saveNote,
    getNotes,
    getNoteById,
    removeNote,
    setTodo
}


let notes;

function loadNotes() {
    if (notes) return
    notes = storageService.load(STORAGE_KEY);
    if (!notes || !notes.length) {
        notes = createNotes();
        storageService.store(STORAGE_KEY, notes);
    }
}
function createNotes() {
    return [
        {
            type: 'noteText',
            id: utilService.makeId(),
            info: {
                title: 'title test',
                txt: 'test',
            }
        },
        {
            type: 'noteImg',
            id: utilService.makeId(),
            info: {
                url: 'https://files.geektime.co.il/wp-content/uploads/2020/02/soccer-1582703061-768x576.jpg',
                title: 'test title',
                txt: 'text'
            }
        },
        {
            type: 'noteTodos',
            id: utilService.makeId(),
            info: {
                todoList: [
                    { id: 0, txt: 'test1', do: false },
                    { id: 1, txt: 'test2', do: false },
                ]

            }
        },
        {
            type: 'noteVideo',
            id: utilService.makeId(),
            info: {
                url: 'https://www.youtube.com/embed/qhehT0uYySk'
            }
        },
    ]
}
function saveNote(info) {
    if (info.id) return _editExistNote(info)
    return _addNewNote(info)
}
function _addNewNote(info) {

    const note = { id: utilService.makeId(), }

    switch (info.type) {
        case 'txt':
            note.type = 'noteText'
            note.info = { txt: info.txt, title: info.title }
            break;
        case 'img':
            note.type = 'noteImg'
            note.info = { url: info.url, title: info.title, txt:info.txt}
            break;
        case 'video':
            note.type = 'noteVideo'
            const url =  _editUrlYoutube(info.url);
            note.info = { url }
            break;
        case 'todo':
            note.type = 'noteTodos'
            note.info = { todoList: info.todos.map((todo, inx) => { return { id: inx, txt: todo, do: false } }) }
            break;
    }
    notes.unshift(note)
    storageService.store(STORAGE_KEY, notes);
}

//TODO
function _editExistNote(info) {
    console.log('info :', info);
    let currNote = notes.find((note)=>note.id===info.id)
    switch(currNote.type){
        case 'noteText':
            currNote.info.title = info.info.title
            currNote.info.txt = info.info.txt
            break
        case 'noteTodos':
            currNote.info = info.info
            break
        case 'noteImg':
            currNote.info.title = info.info.title
            currNote.info.txt = info.info.txt
            currNote.info.url = info.info.url
            break
        case 'noteVideo':
            currNote.info.url = _editUrlYoutube(info.url)
            break
    }
    storageService.store(STORAGE_KEY, notes);
}
function _editUrlYoutube(url){
    url = url.substr(url.indexOf('v=') + 2)
    if (url.indexOf('&') !== -1) {
        url = url.substr(0, url.indexOf('&'))
    }
    return `https://www.youtube.com/embed/${url}`
}
function getNotes() {
    loadNotes();
    return Promise.resolve(notes)
}
function getNoteById(noteId) { 
    const note = notes.find(note => note.id === noteId);
    return Promise.resolve(note)
}
function removeNote(noteId) {
    const currInx = notes.findIndex(note => note.id === noteId);
    notes.splice(currInx, 1);
    storageService.store(STORAGE_KEY, notes);
}
function setTodo(noteId,inx){
    const note = notes.find(note => note.id === noteId);
    note.info.todoList[inx].do=!note.info.todoList[inx].do
    storageService.store(STORAGE_KEY, notes);
}
