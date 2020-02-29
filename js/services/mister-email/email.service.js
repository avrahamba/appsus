import { storageService } from '../storage.service.js';
import { utilService } from '../util.service.js'
import {eventBus,EVENT_CHANGE_STATUS_EMAIL} from '../event-bus.service.js';
const STORAGE_KEY = 'mister_email'
const STORAGE_KEY_DRAFTS = 'mister_email_drafts'

export const emailService = {
    getEmails,
    readEmail,
    deleteEmail,
    sendEmail,
    getStatus,
    getEmailById,
    setStar,
    restorEmail,
    saveDraft,
    getDrafts,
    deleteDraft,
    getDraftById
}

let emails = null;
let drafts = null;

function loadEmails(){
    if(emails) return;
    emails = storageService.load(STORAGE_KEY);
    if(!emails || !emails.length){
        emails = [
            {id: utilService.makeId(), subject: 'Wassap?',send:'avraham@mister-mail.com' , body: 'Pick up!', isRead: false, isDeleted:false, star: true, sentAt : 1551133930594},
            {id: utilService.makeId(), subject: 'First Email',send:'shlomi@mister-mail.com', body: 'Wellcam to Mister-Email!',isRead: true, star: false,  isDeleted:false, sentAt : 1551133930594},
        ]
        storageService.store(STORAGE_KEY,emails);
    }
}

function getEmails(){
    loadEmails();
    return Promise.resolve(emails)
}

function sendEmail(email){
    loadEmails()
    emails.unshift({id: utilService.makeId(), subject: email.subject,send: email.sendTo, body: email.body, isRead: false, isDeleted:false, star: false, sentAt: Date.now()})
    storageService.store(STORAGE_KEY,emails);
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    return Promise.resolve(emails)
}

function deleteEmail(emailId){
    const currEmail = emails.find(email=>email.id===emailId);
    if(currEmail.isDeleted){
       const inx = emails.findIndex(email=>email.id===emailId);
       emails.splice(inx,1);
    }else{
        currEmail.isDeleted = true
    }
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    storageService.store(STORAGE_KEY,emails);
}
function restorEmail(emailId){
    const currEmail = emails.find(email=>email.id===emailId);
    currEmail.isDeleted = false
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    storageService.store(STORAGE_KEY,emails);

}

function readEmail(emailId){
    loadEmails()
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

function setStar(emailId) {
    const email = emails.find(email=>emailId===email.id)
    email.star = !email.star
    eventBus.$emit(EVENT_CHANGE_STATUS_EMAIL);
    storageService.store(STORAGE_KEY,emails);
    return Promise.resolve(email)
}

function loadDrafts(){
    if(drafts) return;
    drafts = storageService.load(STORAGE_KEY_DRAFTS);
    if(!drafts){
        drafts = []
        storageService.store(STORAGE_KEY_DRAFTS,drafts);
    }
}

function getDrafts(){
    loadDrafts();
    return Promise.resolve(drafts) 
}

function getDraftById(draftId){
    loadDrafts();
    const draft = drafts.find(draft=>draft.id===draftId)
    return Promise.resolve(draft) 
}

function saveDraft(email){
    loadDrafts();
    drafts.unshift({id: utilService.makeId(), subject: email.subject,send: email.sendTo, body: email.body})
    storageService.store(STORAGE_KEY_DRAFTS,drafts);
    return Promise.resolve(drafts[0].id) 
}

function deleteDraft(draftId){
    loadDrafts();
    const inx = drafts.findIndex(draft=>draft.id===draftId)
    drafts.splice(inx,1);
    storageService.store(STORAGE_KEY_DRAFTS,drafts);
}