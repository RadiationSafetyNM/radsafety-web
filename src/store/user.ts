
import { persistentMap } from '@nanostores/persistent';

export const userProfile = persistentMap('userProfile', {
    id: '',
    email: '',
    full_name: '',
    avatar_url: '',
    provider: '',
    is_approved: 'false' // 'true' | 'false' | 'pending'
});

export function clearUser() {
    userProfile.set({
        id: '',
        email: '',
        full_name: '',
        avatar_url: '',
        provider: '',
        is_approved: 'false'
    });
}
