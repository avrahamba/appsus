import { storageService } from '../storage.service.js';
import { utilService } from '../util.service.js'
import {eventBus,EVENT_CHANGE_STATUS_EMAIL} from '../event-bus.service.js';
const STORAGE_KEY = 'mister_email'

export const emailService = {
    getEmails,
    readEmail,
    deleteEmail,
    removeDeletedEmail,
    sendEmail,
    getStatus,
    getEmailById
}

let emails = null;

function loadEmails(){
    if(emails) return;
    emails = storageService.load(STORAGE_KEY);
    if(!emails || !emails.length){
        emails = [
            {id: utilService.makeId(), subject: 'Wassap?', body: 'Pick up!', isRead: false, isDeleted:false, sentAt : 1551133930594},
            {id: utilService.makeId(), subject: 'First Email', body: 'Wellcam to Mister-Email!',isRead: true,  isDeleted:false, sentAt : 1551133930594},
        ]
        storageService.store(STORAGE_KEY,emails);
    }
}

function getEmails(){
    loadEmails();
    return Promise.resolve(emails)
}

function sendEmail(email){
    emails.unshift({id: utilService.makeId(), subject: email.subject, body: email.body, isRead: false, isDeleted:false, sentAt: Date.now()})
    storageService.store(STORAGE_KEY,emails);
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    return Promise.resolve(emails)
}

function deleteEmail(emailId){
    const currEmail = emails.find(email=>email.id===emailId);
    currEmail.isDeleted = true
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    storageService.store(STORAGE_KEY,emails);
}

function removeDeletedEmail(id){}

function readEmail(emailId){
    const currEmail = emails.find(email=>email.id===emailId);
    currEmail.isRead = true;
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    storageService.store(STORAGE_KEY,emails);
}
function getStatus(){
    loadEmails()
    let allEmails = 0
    let unreadedEmails = 0;
    emails.forEach(email => {
        if(!email.isDeleted){
            if(!email.isRead)unreadedEmails++;
            allEmails++;
        }
    });

    return Promise.resolve({
        allEmails,
        unreadedEmails
    })
}

function getEmailById(emailId){
    const email = emails.find(email=>emailId===email.id)
    return Promise.resolve(email)
}