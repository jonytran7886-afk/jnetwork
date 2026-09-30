import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';

// ============================================================================
// Types
// ============================================================================

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber?: string;
  bio?: string;
  role?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface OpportunityDoc {
  id?: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  title: string;
  category: 'project' | 'resource' | 'space' | 'partner' | string;
  description: string;
  location: string;
  scale: string;
  reward: string;
  imageUrl?: string;
  status: 'active' | 'closed' | 'paused';
  createdAt?: any;
  updatedAt?: any;
}

export interface InvitationDoc {
  id?: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  opportunityId: string;
  opportunityTitle: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: any;
  updatedAt?: any;
}

export interface ConversationDoc {
  id?: string;
  participantIds: string[];
  participantNames?: Record<string, string>;
  lastMessage?: string;
  lastMessageSenderId?: string;
  lastMessageAt?: any;
  createdAt?: any;
  updatedAt?: any;
}

export interface MessageDoc {
  id?: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp?: any;
}

// ============================================================================
// 1. Users Collection Service
// ============================================================================

export const syncUserProfile = async (user: {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
}): Promise<UserProfile> => {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const newProfile: UserProfile = {
      id: user.uid,
      displayName: user.displayName || 'Thành viên Cùng Làm',
      email: user.email || '',
      photoURL: user.photoURL || '',
      phoneNumber: user.phoneNumber || '',
      bio: 'Thành viên kết nối nguồn lực tại Cùng Làm',
      role: 'member',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  } else {
    const existing = snap.data() as UserProfile;
    await updateDoc(userRef, {
      updatedAt: serverTimestamp(),
      ...(user.displayName && { displayName: user.displayName }),
      ...(user.photoURL && { photoURL: user.photoURL }),
    });
    return { ...existing, id: user.uid };
  }
};

// ============================================================================
// 2. Opportunities Collection Service (with ownerId protection)
// ============================================================================

export const fetchOpportunities = async (): Promise<OpportunityDoc[]> => {
  try {
    const oppsRef = collection(db, 'opportunities');
    const q = query(oppsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as OpportunityDoc[];
  } catch (error) {
    console.warn('Lỗi lấy danh sách opportunities từ Firestore, sử dụng dữ liệu dự phòng:', error);
    return [];
  }
};

export const createOpportunity = async (
  data: Omit<OpportunityDoc, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('Bạn cần đăng nhập tài khoản để đăng cơ hội & chia sẻ nguồn lực.');
  }

  const oppsRef = collection(db, 'opportunities');
  const docRef = await addDoc(oppsRef, {
    ...data,
    ownerId: auth.currentUser.uid,
    ownerName: data.ownerName || auth.currentUser.displayName || 'Thành viên J-Network',
    status: data.status || 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateOpportunity = async (
  id: string,
  ownerId: string,
  data: Partial<OpportunityDoc>
): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('Bạn cần đăng nhập để cập nhật cơ hội.');
  }
  const oppRef = doc(db, 'opportunities', id);
  const snap = await getDoc(oppRef);
  if (!snap.exists()) throw new Error('Không tìm thấy cơ hội');
  if (snap.data()?.ownerId !== ownerId) {
    throw new Error('Chỉ người tạo (owner) mới có quyền chỉnh sửa cơ hội này');
  }

  await updateDoc(oppRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteOpportunity = async (
  id: string,
  ownerId: string
): Promise<void> => {
  const oppRef = doc(db, 'opportunities', id);
  const snap = await getDoc(oppRef);
  if (!snap.exists()) throw new Error('Không tìm thấy cơ hội');
  if (snap.data()?.ownerId !== ownerId) {
    throw new Error('Chỉ người tạo (owner) mới có quyền xóa cơ hội này');
  }

  await deleteDoc(oppRef);
};

// ============================================================================
// 3. Invitations Collection Service
// ============================================================================

export const sendInvitation = async (
  invitation: Omit<InvitationDoc, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('Bạn cần đăng nhập tài khoản để gửi đề xuất hợp tác.');
  }

  const invRef = collection(db, 'invitations');
  const docRef = await addDoc(invRef, {
    ...invitation,
    senderId: auth.currentUser.uid,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const fetchUserInvitations = async (userId: string): Promise<InvitationDoc[]> => {
  try {
    const invRef = collection(db, 'invitations');
    const q1 = query(invRef, where('receiverId', '==', userId));
    const snap1 = await getDocs(q1);

    const q2 = query(invRef, where('senderId', '==', userId));
    const snap2 = await getDocs(q2);

    const all = [...snap1.docs, ...snap2.docs].map((d) => ({
      id: d.id,
      ...d.data(),
    })) as InvitationDoc[];

    // Remove duplicates
    const seen = new Set();
    return all.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  } catch (error) {
    console.warn('Lỗi lấy invitations:', error);
    return [];
  }
};

// ============================================================================
// 4. Conversations & Messages Collection Service
// ============================================================================

export const createConversation = async (
  participantIds: string[],
  participantNames: Record<string, string>,
  initialMessage?: string,
  senderId?: string
): Promise<string> => {
  const convRef = collection(db, 'conversations');
  const docRef = await addDoc(convRef, {
    participantIds,
    participantNames,
    lastMessage: initialMessage || 'Cuộc trò chuyện mới',
    lastMessageSenderId: senderId || '',
    lastMessageAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (initialMessage && senderId) {
    const messagesRef = collection(db, 'conversations', docRef.id, 'messages');
    await addDoc(messagesRef, {
      senderId,
      senderName: participantNames[senderId] || 'Thành viên',
      content: initialMessage,
      timestamp: serverTimestamp(),
    });
  }

  return docRef.id;
};

export const fetchUserConversations = async (userId: string): Promise<ConversationDoc[]> => {
  try {
    const convRef = collection(db, 'conversations');
    const q = query(convRef, where('participantIds', 'array-contains', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as ConversationDoc[];
  } catch (error) {
    console.warn('Lỗi lấy conversations:', error);
    return [];
  }
};

export const sendMessage = async (
  conversationId: string,
  senderId: string,
  senderName: string,
  content: string
): Promise<string> => {
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  const msgDoc = await addDoc(messagesRef, {
    senderId,
    senderName,
    content,
    timestamp: serverTimestamp(),
  });

  const convRef = doc(db, 'conversations', conversationId);
  await updateDoc(convRef, {
    lastMessage: content,
    lastMessageSenderId: senderId,
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return msgDoc.id;
};
