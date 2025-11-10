/**
 * Convierte una fecha a string para input[type="date"]
 */
export const formatDateForInput = (date: Date | string | null): string => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
};

/**
 * Convierte una fecha a formato legible para display
 */
export const formatDateForDisplay = (date: Date | string | null): string => {
    if (!date) return 'No completado';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Convierte string de input date a Date object para el backend
 */
export const parseDateFromInput = (dateString: string): Date | null => {
    if (!dateString) return null;
    return new Date(dateString);
};

/**
 * Toma los valores del formulario y los convierte a string para procesarlos
 * @param formData 
 * @param key 
 * @returns 
 */
export const getFormDataValue = (formData: FormData, key: string): string => {
    const value = formData.get(key);
    return value ? value.toString() : '';
};

/**
 * Convierte una fecha del formulario al formato de fecha que pide el backend
 * @param dateString: String 
 * @returns string || null
 */

export const formatDateForBackend = (dateString: string): string | null => {
    if (!dateString) return null;

    // El input date devuelve YYYY-MM-DD, lo convertimos a ISO
    const date = new Date(dateString);
    return date.toISOString();
};
