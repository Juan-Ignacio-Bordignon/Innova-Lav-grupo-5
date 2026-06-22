export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'Carolina',
  email: 'caro@contacto.com',
  role: 'Estudiante Premium',
  joinDate: 'Mayo 2026',
};