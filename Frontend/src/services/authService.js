const AUTH_STORAGE_KEY = "cput_shc_active_user";

const mockUsers = [
    {
        role: "student",
        email: "student@example.com",
        password: "Student123!",
        name: "Tumi Jacobs",
    },
    {
        role: "landlord",
        email: "landlord@example.com",
        password: "Landlord123!",
        name: "Sipho Mbeki",
    },
    {
        role: "admin",
        email: "admin@example.com",
        password: "Admin123!",
        name: "Agnes Mokoena",
    },
];

const persistUser = (user) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

const clearPersistedUser = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

const resolveStoredUser = () => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (error) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
};

export const login = (role, email, password) =>
    new Promise((resolve, reject) => {
        if (!role) {
            reject(new Error("Please choose a role to sign in."));
            return;
        }

        if (!email || !password) {
            reject(new Error("Email and password are required."));
            return;
        }

        const normalisedEmail = email.trim().toLowerCase();

        const matchedUser = mockUsers.find(
            (user) =>
                user.role === role &&
                user.email.toLowerCase() === normalisedEmail &&
                user.password === password
        );

        setTimeout(() => {
            if (!matchedUser) {
                reject(new Error("Invalid email or password for the selected role."));
                return;
            }

            const sessionUser = {
                role: matchedUser.role,
                email: matchedUser.email,
                name: matchedUser.name,
            };

            persistUser(sessionUser);
            resolve(sessionUser);
        }, 400);
    });

export const logout = () => {
    clearPersistedUser();
};

export const getCurrentUser = () => resolveStoredUser();

export const isAuthenticated = () => Boolean(resolveStoredUser());

export default {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
};