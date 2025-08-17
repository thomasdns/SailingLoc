const ALLOWED_ROLES = ['admin', 'locataire', 'proprietaire'];

export function validateRole(role: string): string | null {
    if (!ALLOWED_ROLES.includes(role)) {
        return "Rôle invalide. Rôles autorisés: admin, locataire, proprietaire";
    }
    return null;
}
