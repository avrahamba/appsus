import { storageService } from '../storage.service.js';
import { utilService } from '../util.service.js'
const STORAGE_KEY = 'notes'

export const noteService = {
    saveNote,
    getNotes,
    getNoteById,
    removeNote
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
//TODO
function createNotes() {
    return [
        {
            type: 'noteText',
            id: utilService.makeId(),
            info: {
                txt: 'test'
            }
        },
        {
            type: 'noteImg',
            id: utilService.makeId(),
            info: {
                url: 'https://files.geektime.co.il/wp-content/uploads/2020/02/soccer-1582703061-768x576.jpg'
            }
        },
        {
            type: 'noteTodos',
            id: utilService.makeId(),
            info: {
                todoList: [
                    { id:0, txt: 'test1' },
                    { id:1, txt: 'test2' },

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
//TODO
function _addNewNote(info) {

    const note = { id: utilService.makeId(), }

    switch (info.type) {
        case 'txt':
            note.type = 'noteText'
            note.info = {txt:info.txt}
                break;
        case 'img':
            note.type = 'noteImg'
            note.info = {url:info.url}
                break;
        case 'video':
            note.type = 'noteVideo'
            let url = info.url;
            url = url.substr(url.indexOf('v=')+2)
            if(url.indexOf('&')!==-1){
                url = url.substr(0,url.indexOf('&'))
            }
            url = `https://www.youtube.com/embed/${url}`
            note.info = {url}
                break;
        case 'todo':
            note.type = 'noteTodos'
            note.info = {todoList: info.todos.map((todo,inx)=>{return{id:inx,txt:todo}})}
                break;
    }
    notes.unshift(note)
    storageService.store(STORAGE_KEY, notes);
}
//TODO
function _editExistNote(info) {

}
//TODO
function getNotes() {
    loadNotes();
    return Promise.resolve(notes)
}
//TODO
function getNoteById() { }
//TODO
function removeNote(noteId) {
    const currInx = notes.findIndex(note => note.id === noteId);
    notes.splice(currInx, 1);
    storageService.store(STORAGE_KEY, notes);
}
