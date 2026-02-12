/**
 * Budibase Client - Prenotazione Uffici
 * Logica client-side per l'applicazione di prenotazione uffici
 */

// ============================================
// COSTANTI
// ============================================

const Tables = {
  UFFICI: 'ta_uffici',
  SLOT_ORARI: 'ta_slot_orari',
  PRENOTAZIONI: 'ta_prenotazioni'
};

const Screens = {
  DASHBOARD: '/dashboard',
  NUOVA_PRENOTAZIONE: '/nuova-prenotazione'
};

const Roles = {
  BASIC: 'BASIC',
  POWER: 'POWER',
  ADMIN: 'ADMIN'
};

const Stati = {
  CONFERMATA: 'confermata',
  CANCELLATA: 'cancellata'
};

// ============================================
// BUDIBASE CLIENT
// ============================================

const BudibaseClient = {
  /**
   * Verifica se uno slot è disponibile per una data e ufficio specifici
   * @param {Array} prenotazioni - Lista prenotazioni esistenti
   * @param {string} slotId - ID dello slot
   * @param {string} ufficioId - ID dell'ufficio
   * @param {string} data - Data della prenotazione
   * @returns {boolean}
   */
  isSlotDisponibile: function(prenotazioni, slotId, ufficioId, data) {
    return !prenotazioni.some(p => 
      p.slot._id === slotId && 
      p.ufficio._id === ufficioId && 
      p.data_prenotazione === data && 
      p.stato === Stati.CONFERMATA
    );
  },

  /**
   * Ottiene chi ha prenotato uno slot specifico
   * @param {Array} prenotazioni - Lista prenotazioni
   * @param {string} slotId - ID dello slot
   * @param {string} ufficioId - ID dell'ufficio
   * @param {string} data - Data della prenotazione
   * @returns {string|null}
   */
  getPrenotatoDa: function(prenotazioni, slotId, ufficioId, data) {
    const prenotazione = prenotazioni.find(p => 
      p.slot._id === slotId && 
      p.ufficio._id === ufficioId && 
      p.data_prenotazione === data && 
      p.stato === Stati.CONFERMATA
    );
    return prenotazione ? prenotazione.utente?.firstName : null;
  },

  /**
   * Filtra le prenotazioni dell'utente corrente
   * @param {Array} prenotazioni - Lista prenotazioni
   * @param {string} userId - ID utente corrente
   * @returns {Array}
   */
  getMiePrenotazioni: function(prenotazioni, userId) {
    return prenotazioni.filter(p => p.utente?._id === userId);
  },

  /**
   * Formatta l'orario di uno slot
   * @param {Object} slot - Oggetto slot orario
   * @returns {string}
   */
  formatSlotOrario: function(slot) {
    return `${slot.ora_inizio} - ${slot.ora_fine}`;
  },

  /**
   * Verifica se l'utente ha il permesso per un'azione
   * @param {string} userRole - Ruolo utente corrente
   * @param {string} requiredRole - Ruolo richiesto
   * @returns {boolean}
   */
  hasPermission: function(userRole, requiredRole) {
    const roleHierarchy = [Roles.BASIC, Roles.POWER, Roles.ADMIN];
    return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);
  },

  /**
   * Verifica se l'utente è admin
   * @param {string} userRole - Ruolo utente
   * @returns {boolean}
   */
  isAdmin: function(userRole) {
    return userRole === Roles.ADMIN;
  }
};

// ============================================
// BINDINGS
// ============================================

const Bindings = {
  // Slot Card
  slotOrario: '{{ Repeater.ora_inizio }} - {{ Repeater.ora_fine }}',
  slotDescrizione: '{{ Repeater.descrizione }}',
  slotDisponibile: '{{ Repeater.disponibile === true }}',
  
  // Stili condizionali
  slotBackgroundDisponibile: '#e8f5e9',
  slotBackgroundOccupato: '#ffebee',
  
  // Filtri
  filtroUtenteCorrente: '{{ Current User._id }}',
  filtroDataSelezionata: '{{ State.dataSelezionata }}',
  filtroUfficioSelezionato: '{{ State.ufficioSelezionato }}',
  
  // User info
  currentUserId: '{{ Current User._id }}',
  currentUserEmail: '{{ Current User.email }}',
  currentUserRole: '{{ Current User.roleId }}'
};

// ============================================
// TRANSFORMERS
// ============================================

const Transformers = {
  /**
   * Transformer per arricchire gli slot con info disponibilità
   * Da usare nel Data Provider degli slot
   */
  slotConDisponibilita: function(slots, prenotazioni, dataSelezionata, ufficioSelezionato) {
    const prenotazioniFiltered = prenotazioni.filter(p => 
      p.data_prenotazione === dataSelezionata &&
      p.ufficio._id === ufficioSelezionato &&
      p.stato === 'confermata'
    );

    const slotOccupati = prenotazioniFiltered.map(p => p.slot._id);

    return slots.map(slot => ({
      ...slot,
      disponibile: !slotOccupati.includes(slot._id),
      prenotatoDa: prenotazioniFiltered.find(p => p.slot._id === slot._id)?.utente?.firstName || null
    }));
  },

  /**
   * Transformer per filtrare solo uffici attivi
   */
  ufficiAttivi: function(uffici) {
    return uffici.filter(u => u.attivo === true);
  },

  /**
   * Transformer per filtrare solo slot attivi
   */
  slotAttivi: function(slots) {
    return slots.filter(s => s.attivo === true);
  },

  /**
   * Transformer per ordinare slot per ora_inizio
   */
  slotOrdinati: function(slots) {
    return slots.sort((a, b) => a.ora_inizio.localeCompare(b.ora_inizio));
  }
};

// ============================================
// EXPORTS
// ============================================

// Export per browser
if (typeof window !== 'undefined') {
  window.Tables = Tables;
  window.Screens = Screens;
  window.Roles = Roles;
  window.Stati = Stati;
  window.BudibaseClient = BudibaseClient;
  window.Bindings = Bindings;
  window.Transformers = Transformers;
}

// Export per Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Tables,
    Screens,
    Roles,
    Stati,
    BudibaseClient,
    Bindings,
    Transformers
  };
}
