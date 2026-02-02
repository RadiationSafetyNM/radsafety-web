
import { persistentMap } from '@nanostores/persistent';
import { getRole, getCertification } from '../config/auth';

export const userProfile = persistentMap('userProfile', {
    id: '',
    email: '',
    full_name: '',
    avatar_url: '',
    provider: '',
    is_approved: 'false', // 'true' | 'false' | 'pending'
    role: 'user', // 'admin' | 'user'
    certification: 'none' // 'ksnm' | 'ksnmt' | 'special' | 'none'
});

export function setUser(user: { id: string, email: string, full_name: string, avatar_url: string, provider: string }) {
    userProfile.set({
        ...user,
        is_approved: 'true', // Auto-approve for now (or logic)
        role: getRole(user.email),
        certification: getCertification(user.email)
    });
}

export function clearUser() {
    userProfile.set({
        id: '',
        email: '',
        full_name: '',
        avatar_url: '',
        provider: '',
        is_approved: 'false',
        role: 'user',
        certification: 'none'
    });
}
