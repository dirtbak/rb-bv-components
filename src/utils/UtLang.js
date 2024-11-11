export const UtLang = {
    changeLocalization(field, newLocale) {
        const baseField = field.replace(/[A-Z][a-z]$/, '');
        // Добавляем новый суффикс
        return `${baseField}${newLocale}`;
    },
    getLabel (item, displayName) {
        if (item[displayName]) {
            return item[displayName]
        } else {
            return item[this.changeLocalization(displayName, 'Ru')]
        }
    }
}