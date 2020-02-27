import { storageService } from '../storage.service.js';
import { utilService } from '../util.service.js'
const STORAGE_KEY = 'mister_email'

export const emailService = {
    getEmails,
    readEmail,
    deleteEmail,
    removeDeletedEmail,
    sendEmail,
    getStatus
}

let emails = null;

function loadEmails(){
    if(emails) return;
    emails = storageService.load(STORAGE_KEY);
    if(!emails || !emails.length){
        emails = [
            {id: utilService.makeId(), subject: 'Wassap?', body: 'Pick up!', isRead: false, isDeleted:false, sentAt : 1551133930594},
            {id: utilService.makeId(), subject: 'First Email', body: 'Wellcam to Mister-Email!', isDeleted:false, isRead: true, sentAt : 1551133930594},
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
    return Promise.resolve(emails)
}

function deleteEmail(emailId){
    const currEmail = emails.find(email=>email.id===emailId);
    currEmail.isDeleted = true
    storageService.store(STORAGE_KEY,emails);
}

function removeDeletedEmail(id){}

function readEmail(emailId){
    const currEmail = emails.find(email=>email.id===emailId);
    currEmail.isRead = true;
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