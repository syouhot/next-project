export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',   // "numeric" is the default
        month: 'long',     // "long" is the default
        day: 'numeric'     // "numeric" is the default      
    });
}