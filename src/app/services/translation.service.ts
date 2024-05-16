import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: { [lang: string]: string } } = {
    // Página de Detalles
    reviews:{
      en: 'Reviews',
      es: 'Reseñas'
    },
    share:{
      en: 'Share',
      es: 'Compartir'
    },
    saved:{
      en: 'Saved',
      es: 'Guardado'
    },
    hostedBy:{
      en: 'Hosted by',
      es: 'Anfitrión'
    },
    guests:{
      en: 'guests',
      es: 'huéspedes'
    },
    bathrooms: {
      en: 'bathrooms',
      es: 'Baños'
    },
    bedrooms: {
      en: 'bedrooms',
      es: 'Dormitorios'
    },
    checkOut: {
      en: 'Check-out',
      es: 'Salida'
    },
    checkIn: {
      en: 'Check-in',
      es: 'Entrada'
    },
    youWontBeChargedYet: {
      en: 'You won\'t be charged yet',
      es: 'No se te cobrará todavía'
    },
    priceShownIsTotal: {
      en: 'Price shown is the total trip price, including additional fees and taxes.',
      es: 'El precio mostrado es el precio total del viaje, incluidas las tarifas e impuestos adicionales.'
    },
    nights: {
      en: 'nights',
      es: 'noches'
    },
    cleaningFee: {
      en: 'Cleaning fee',
      es: 'Tarifa de limpieza'
    },
    serviceFee: {
      en: 'Service fee',
      es: 'Tarifa de servicio'
    },
    cleanliness: {
      en: 'Cleanliness',
      es: 'Limpieza'
    },
    location: {
      en: 'Location',
      es: 'Ubicación'
    },
    communication: {
      en: 'Communication',
      es: 'Comunicación'
    },
    accuracy: {
      en: 'Accuracy',
      es: 'Precisión'
    },
    value: {
      en: 'Value',
      es: 'Valor'
    },
    send: {
      en: 'Send',
      es: 'Enviar'
    },
    whereYoullBe: {
      en: 'Where you\'ll be',
      es: 'Donde estarás'
    },
    reserve: {
      en: 'Reserve',
      es: 'Reservar'
    },
    capacity: {
      en: 'Capacity',
      es: 'Capacidad'
    },

    //Modal lenguaje
    suggestedLanguages: {
      en: 'Suggested languages',
      es: 'Idiomas sugeridos'
    },
    otherLanguages: {
      en: 'Choose a language',
      es: 'Elige un idioma'
    },

    //Header
    yourHome: {
      en: 'Your home a Depa',
      es: 'Tu casa un Depa'
    },

    //Header Modal
    signUp: {
      en: 'Sign up',
      es: 'Regístrate'
    },
    login: {
      en: 'Login',
      es: 'Iniciar sesión'
    },
    logout: {
      en: 'Logout',
      es: 'Cerrar sesión'
    },
    trips:{
      en: 'Trips',
      es: 'Viajes'
    },
    wishlist:{
      en: 'Wishlist',
      es: 'Lista de deseos'
    },
    //Add stays
    price:{
      en: 'Price',
      es: 'Precio'
    },
    night:{
      en: 'night',
      es: 'noche'
    },
    stay_type:{
      en: 'Stay type',
      es: 'Tipo de alojamiento'
    },
    property_type:{
      en: 'Property type',
      es: 'Tipo de propiedad'
    },
    country:{
      en: 'Country',
      es: 'País'
    },
    city:{
      en: 'City',
      es: 'Ciudad'
    },
    address:{
      en: 'Address',
      es: 'Dirección'
    },
    description:{
      en: 'Description',
      es: 'Descripción'
    },
    save:{
      en: 'Save',
      es: 'Guardar'
    },
    language:{
      en: 'Language',
      es: 'Idioma'
    },
    orders:{
      en: 'Orders',
      es: 'Pedidos'
    },
    my_trips:{
      en: 'My trips request',
      es: 'Mis solicitudes de viajes'
    },
    my_stays:{
      en: 'My Depas',
      es: 'Mis Depas'
    },
    add_a_stay:{
      en: 'Add a Depa',
      es: 'Añadir un Depa'
    },
    omg:{
      en: '¡OMG!',
      es: '¡Dios Mio!'
    },
    anywhere:{
      en: 'Anywhere',
      es: 'Donde sea'
    },
    anyweek:{
      en: 'Any week',
      es: 'Cuando'
    },
    addGuests:{
      en: 'Add guests',
      es: 'Huéspedes'
    },
    where:{
      en: 'Where',
      es: 'Donde'
    },
    who:{
      en: 'Who',
      es: 'Quien'
    },
    searchDestination:{
      en: 'Search destination',
      es: 'Buscar destino'
    },
    addDates:{
      en: 'Add dates',
      es: 'Añadir fechas'
    },
    search:{
      en: 'Search',
      es: 'Buscar'
    },
    infants:{
      en: 'Infants',
      es: 'Bebés'
    },
    pets:{
      en: 'Pets',
      es: 'Mascotas'
    },
    signIn:{
      en: 'Sign in',
      es: 'Iniciar sesión'
    },
    userName:{
      en: 'Username',
      es: 'Nombre de usuario'
    },
    password:{
      en: 'Password',
      es: 'Contraseña'
    },
    signInDemo:{
      en: 'Sign with demo user',
      es: 'Iniciar sesión con usuario de demostración'
    },
    orSignWith:{
      en: 'Or sign in with',
      es: 'O inicia sesión con'
    },
    notRegistered:{
      en: 'Not registered yet?',
      es: '¿No estás registrado?'
    },
    createAccount:{
      en: 'Create an account',
      es: 'Crear una cuenta'
    },
    fullName:{
      en: 'Full name',
      es: 'Nombre completo'
    },
    getStartedFree:{
      en: 'Get started for free',
      es: 'Comienza gratis'
    },
    alreadyHaveAccount:{
      en: 'Already have an account?',
      es: '¿Ya tienes una cuenta?'
    },
    requiredFullName:{
      en: 'Full name is required',
      es: 'Se requiere el nombre completo'
    },
    requiredFullNameLength:{
      en: 'Full name must be at least 3 characters long',
      es: 'El nombre completo debe tener al menos 3 caracteres'
    },
    requiredUsername:{
      en: 'Username is required',
      es: 'Se requiere el nombre de usuario'
    },
    requiredUsernameLength:{
      en: 'Username must be at least 3 characters long',
      es: 'El nombre de usuario debe tener al menos 3 caracteres'
    },
    requiredPassword:{
      en: 'Password is required',
      es: 'Se requiere la contraseña'
    },
    requiredPasswordLength:{
      en: 'The password must be at least 8 characters, 1 uppercase letter and 1 symbol',
      es: 'La contraseña debe tener al menos 8 caracteres, 1 mayuscula y 1 simbolo'
    },
    welcomeBack:{
      en: 'Welcome back',
      es: 'Bienvenido de nuevo'
    },
    home:{
      en: 'Home',
      es: 'Inicio'
    },
    whoWeAre:{
      en: 'Who We Are',
      es: 'Quienes somos'
    },
    contact:{
      en: 'Contact',
      es: 'Contacto'
    },
    requiredEmail:{
      en: 'Email is required',
      es: 'Se requiere el email'
    },
    requiredEmailLength:{
      en: 'Email must be at least 8 characters long',
      es: 'El email debe tener al menos 8 caracteres'
    },
    cloud_download:{
      en: 'Download CSV',
      es: 'Descargar CSV'
    },
    print:{
      en: 'Print',
      es: 'Imprimir'
    },
    filter_alt:{
      en: 'Filter Table',
      es: 'Filtrar Tabla'
    },
    searchByName:{
     en: 'Search by name',
      es: 'Buscar por nombre'
    },
    name_:{
      en: 'Name',
      es: 'Nombre'
    }
  };

  private currentLanguage: string = 'en';

  constructor(private eventService: EventService) {}

  get currentLang(): string {
    return this.currentLanguage;
  }
  
  getTranslation(key: string): string{
    return this.translations[key][this.currentLanguage] || key;
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    this.eventService.publish('languageChanged', language);
  }
}
