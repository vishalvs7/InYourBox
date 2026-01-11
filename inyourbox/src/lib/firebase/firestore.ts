// src/lib/firebase/firestore.ts - Create this file
import { db } from './config';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';

// Collections
const COLLECTIONS = {
  USERS: 'users',
  CONTACTS: 'contacts',
  CONTACT_LISTS: 'contactLists',
  CAMPAIGNS: 'campaigns',
} as const;

// Contact Types
export interface Contact {
  id: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  tags: string[];
  customFields: Record<string, any>;
  status: 'subscribed' | 'unsubscribed' | 'bounced' | 'pending';
  listIds: string[];
  createdAt: Date;
  updatedAt: Date;
  lastCampaignSent?: Date;
  opens: number;
  clicks: number;
  bounceReason?: string;
}

// Contact List Types
export interface ContactList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  contactCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Service
export const contactService = {
  // Create a new contact
  async createContact(userId: string, contactData: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'opens' | 'clicks'>) {
    const contact: Omit<Contact, 'id'> = {
      ...contactData,
      userId,
      opens: 0,
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), contact);
    return { id: docRef.id, ...contact };
  },

  // Get all contacts for a user
  async getContacts(userId: string, options?: { limit?: number; status?: Contact['status'] }) {
    let q = query(
      collection(db, COLLECTIONS.CONTACTS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    if (options?.status) {
      q = query(q, where('status', '==', options.status));
    }

    if (options?.limit) {
      q = query(q, limit(options.limit));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
  },

  // Update a contact
  async updateContact(contactId: string, updates: Partial<Contact>) {
    const docRef = doc(db, COLLECTIONS.CONTACTS, contactId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // Delete a contact
  async deleteContact(contactId: string) {
    const docRef = doc(db, COLLECTIONS.CONTACTS, contactId);
    await deleteDoc(docRef);
  },

  // Bulk import contacts
  async bulkImportContacts(userId: string, contacts: Array<Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'opens' | 'clicks'>>) {
    const batchResults = [];
    
    for (const contactData of contacts) {
      const result = await this.createContact(userId, contactData);
      batchResults.push(result);
    }
    
    return batchResults;
  },

  // Get contact stats
  async getContactStats(userId: string) {
    const contacts = await this.getContacts(userId);
    
    return {
      total: contacts.length,
      subscribed: contacts.filter(c => c.status === 'subscribed').length,
      unsubscribed: contacts.filter(c => c.status === 'unsubscribed').length,
      bounced: contacts.filter(c => c.status === 'bounced').length,
    };
  },
};

// Contact List Service
export const contactListService = {
  // Create a new contact list
  async createList(userId: string, name: string, description?: string) {
    const list: Omit<ContactList, 'id'> = {
      userId,
      name,
      description,
      contactCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.CONTACT_LISTS), list);
    return { id: docRef.id, ...list };
  },

  // Get all lists for a user
  async getLists(userId: string) {
    const q = query(
      collection(db, COLLECTIONS.CONTACT_LISTS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactList));
  },
};